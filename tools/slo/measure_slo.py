#!/usr/bin/env python3
"""Measure an SLO for the Well Live article homepage (UC-CON-browse-feed).

What it measures: the backend request the article homepage needs to load,
GET /api/assessment (the member's saved answers, which pick the articles).
Every INTERVAL seconds it signs in as a fictitious test member if needed,
sends that request, and appends one row to a CSV log.

A request is "good" when the server answers correctly (not a 5xx, no
connection error) within the latency threshold (3 s, from PER-feed-load).

Usage:
  python3 measure_slo.py run     --api http://localhost:8080 [--interval 30] [--log slo_log.csv]
  python3 measure_slo.py summary [--log slo_log.csv] [--target 0.99]

Stop `run` with Ctrl+C whenever the window is over. Uses only the standard library.
"""
import argparse
import csv
import http.cookiejar
import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone

EMAIL = os.environ.get("SLO_EMAIL", "slo-probe@example.com")      # fictitious account
PASSWORD = os.environ.get("SLO_PASSWORD", "slo-probe-Passw0rd!")
THRESHOLD_S = 3.0  # PER-feed-load: feed opens in under 3 seconds


class Client:
    def __init__(self, api):
        self.api = api.rstrip("/")
        self.jar = http.cookiejar.CookieJar()
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.jar))

    def _send(self, method, path, body=None, headers=None, timeout=10):
        data = json.dumps(body).encode() if body is not None else None
        req = urllib.request.Request(self.api + path, data=data, method=method, headers=headers or {})
        if data is not None:
            req.add_header("Content-Type", "application/json")
        try:
            with self.opener.open(req, timeout=timeout) as resp:
                resp.read()
                return resp.status
        except urllib.error.HTTPError as e:
            return e.code

    def _csrf_headers(self):
        self._send("GET", "/api/auth/csrf")
        token = next((c.value for c in self.jar if c.name == "XSRF-TOKEN"), None)
        return {"X-XSRF-TOKEN": token} if token else {}

    def sign_in(self):
        status = self._send("POST", "/api/auth/login",
                            {"email": EMAIL, "password": PASSWORD}, self._csrf_headers())
        if status == 200:
            return True
        # First run: create the fictitious probe account, which also signs it in.
        status = self._send("POST", "/api/auth/register", {
            "firstName": "SLO", "lastName": "Probe", "email": EMAIL, "password": PASSWORD,
            "ageEligibilityConfirmed": True, "termsAccepted": True,
        }, self._csrf_headers())
        return status in (200, 201)

    def probe(self):
        """Time one homepage request. Returns (status or error text, seconds)."""
        start = time.monotonic()
        try:
            status = self._send("GET", "/api/assessment", timeout=THRESHOLD_S * 3)
        except Exception as e:  # connection refused, timeout, DNS ...
            return f"error:{type(e).__name__}", time.monotonic() - start
        return status, time.monotonic() - start


def is_good(status, seconds):
    return isinstance(status, int) and status < 500 and status not in (401, 403) and seconds < THRESHOLD_S


def run(args):
    client = Client(args.api)
    new_file = not os.path.exists(args.log)
    with open(args.log, "a", newline="") as f:
        writer = csv.writer(f)
        if new_file:
            writer.writerow(["timestamp_utc", "status", "latency_ms", "good"])
        print(f"Probing {args.api}/api/assessment every {args.interval}s -> {args.log}. Ctrl+C to stop.")
        while True:
            status, seconds = client.probe()
            if status in (401, 403):  # session expired or not signed in yet
                client.sign_in()
                status, seconds = client.probe()
            good = is_good(status, seconds)
            row = [datetime.now(timezone.utc).isoformat(timespec="seconds"), status,
                   round(seconds * 1000), int(good)]
            writer.writerow(row)
            f.flush()
            print(*row)
            time.sleep(args.interval)


def summary(args):
    with open(args.log) as f:
        rows = list(csv.DictReader(f))
    if not rows:
        sys.exit("Log is empty.")
    total = len(rows)
    good = sum(int(r["good"]) for r in rows)
    bad = total - good
    latencies = sorted(int(r["latency_ms"]) for r in rows)
    p95 = latencies[min(total - 1, int(0.95 * total))]
    sli = good / total
    budget = (1 - args.target) * total          # bad requests the target allows
    used = bad / budget * 100 if budget else float("inf")
    print(f"Window:          {rows[0]['timestamp_utc']} to {rows[-1]['timestamp_utc']}")
    print(f"Requests:        {total}  (good {good}, bad {bad})")
    print(f"SLI (good/total): {sli:.2%}")
    print(f"Target:          {args.target:.2%} good, each under {THRESHOLD_S:.0f} s")
    print(f"Error budget:    {budget:.1f} bad requests allowed; {bad} used ({used:.0f}% of budget)")
    print(f"Latency:         median {latencies[total // 2]} ms, p95 {p95} ms, max {latencies[-1]} ms")
    print("Result:          " + ("MEETS the target" if sli >= args.target else "MISSES the target"))


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("run")
    r.add_argument("--api", default="http://localhost:8080")
    r.add_argument("--interval", type=float, default=30)
    r.add_argument("--log", default="slo_log.csv")
    s = sub.add_parser("summary")
    s.add_argument("--log", default="slo_log.csv")
    s.add_argument("--target", type=float, default=0.99)  # AVL-uptime: 99%
    a = p.parse_args()
    run(a) if a.cmd == "run" else summary(a)
