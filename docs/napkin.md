# Well Live — Technical Assessment & Project Brief

**Client / Founder:** Sarah Becan  
**Document:** System Architecture Breakdown & Technical Feasibility Assessment  
**Date:** September 2026  

---

## 1. System Shape

### Summary
At its core, **Well Live** is a personalized **CRUD application** featuring content-feed aggregation, community interaction, and strict content moderation pipelines backed by a relational and document data store.

### Architectural Diagram / Functional Boxes
```
+-----------------------------------------------------------------------------------+
| 1. Client Presentation Layer (Web / Mobile)                                      |
|    - User Profile & Onboarding Assessment                                         |
|    - Multi-format Feed (Articles, Audio/Podcasts, Video)                          |
|    - Community Forums & Support Chat Rooms                                        |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| 2. API Gateway, Authentication & Access Control                                   |
|    - Role-based Auth (Users, Clinicians/Moderators, Admins)                       |
|    - HIPAA-compliant Session & Token Management                                    |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| 3. Core Domain & CRUD Services                                                    |
|    - User & Health Profile Service (Encrypted Health History, Medications, Goals) |
|    - Social & Community Service (Posts, Comments, Threads, Direct/Group Chat)     |
|    - Subscription & Billing Service (Stripe / Apple / Google Pay)                 |
+-----------------------------------------------------------------------------------+
                                         │
                    ┌────────────────────┴────────────────────┐
                    ▼                                         ▼
+---------------------------------------+ +-----------------------------------------+
| 4. Personalization Engine             | | 5. Content Verification & Moderation    |
|    - Rule-based Tag Matching          | |    - Automated AI Guardrails / Ingestion|
|    - Personalized Curriculum Delivery | |    - Human-in-the-Loop Clinical Review  |
|    - Evidence-based Content Retrieval | |    - Policy Violation & Reporting Queue |
+---------------------------------------+ +-----------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
| 6. Data & Media Storage Layer                                                     |
|    - Relational DB (PostgreSQL) for Users, Access Control, Subscriptions          |
|    - Document / Search Store for Tagged Health Articles & Forum Threads           |
|    - Object Storage (AWS S3) for Encrypted Media (Videos, Audio, Images)           |
+-----------------------------------------------------------------------------------+
```

---

## 2. The Hard Part

> **Personalization vs. Evidence-Based Verification & Moderation**

Building social feeds and CRUD profiles is standard; the single defining engineering and operational hurdle is **safely personalizing health information while guaranteeing factual credibility and preventing harmful misinformation**.
* Medical advice carries severe legal and physical liability. 
* Unchecked peer-to-peer discussions can quickly propagate false claims, dangerous holistic remedies, or toxic wellness advice.
* Structuring an onboarding assessment to map medical histories (e.g., oncology treatments, metabolic conditions) to verified, clinically approved multimedia content without acting as an unlicensed diagnostic medical device is the core complexity.

---

## 3. Bottleneck

> **Under Scale (Human-in-the-Loop Verification & Content Moderation)**

While standard infrastructure can scale web traffic with read replicas and caching, the system breaks first **under scale at the verification and community moderation layer**:
* As user-generated content (UGC) grows, automated filters struggle with nuanced health advice, requiring human moderation to prevent policy violations and medical harm.
* Additionally, handling sensitive Protected Health Information (PHI) under scale introduces significant compliance, encryption, and auditing bottlenecks.

---

## 4. Technology Stack

* **Backend:** **Java (Spring Boot)**  
  * *Rationale:* Enterprise-grade maturity, strong type safety, battle-tested security frameworks, and robust ecosystem for compliant data handling and microservice integration.
* **Frontend:** **TypeScript / JavaScript (React / React Native or Next.js)**  
  * *Rationale:* High component reusability across web and mobile, rich ecosystem for responsive media streaming, and rapid UI iteration for social interfaces.
* **Database:** **PostgreSQL** (relational data, ACID compliance for subscriptions/profiles) with **Redis** (caching, real-time sessions).

---

## 5. Kill Risks

1. **Bad Plan Requirements & Scope Creep:** Attempting to combine Facebook, Reddit, Spotify, and WebMD in version 1.0 without clear boundaries, leading to an over-engineered, incomplete product.
2. **Policy Violations & Medical Misinformation:** Inaccurate user advice or unchecked claims exposing the company to platform bans, legal liability, and brand failure.
3. **Regulatory & Privacy Non-Compliance:** Mishandling user health data, medication histories, and personal identifiers without adequate HIPAA/GDPR safeguards.

---

## 6. Feasibility Verdict & MVP Scope

* **Verdict:** **Yes, feasible** for a small engineering team within a phased roadmap, provided non-essential real-time features are deferred.
* **What to Cut First (MVP Reductions):**
  1. **Real-time Live Chat Rooms:** Replace with asynchronous, moderated community discussion boards to cut socket complexity and eliminate 24/7 real-time moderation needs.
  2. **Automated AI Content Scraping / Dynamic Generation:** Rely initially on a curated, manually vetted library of evidence-based articles and audio before building automated ingestion pipelines.
  3. **Complex Deep-Learning Recommendation Engines:** Use deterministic profile-to-tag matching (e.g., mapping user onboarding tags directly to content categories) for initial personalization.

---

## 7. Original Project Brief

### Overview
**Well Live** is a health and wellness platform founded by Sarah Becan. Conceived as a focused hybrid of familiar social platforms (Facebook, Reddit, Twitter) strictly dedicated to health and wellness, Well Live is a subscription-based application where users share personal experiences, connect with supportive communities, and access evidence-based education tailored to their unique health profiles.

Educational topics encompass:
* Nutrition
* Fitness
* Financial Health
* Mental Health
* Spiritual Health

Content formats include educational articles, pictures, videos, and podcasts, supported by dedicated community support spaces. 

### Mission & Vision
Well Live is explicitly designed to reject unrealistic, curated fitness-influencer aesthetics in favor of authentic, truthful self-care. The target audience includes everyday individuals navigating real challenges—such as a mother undergoing cancer treatment, an adolescent dealing with body image distress, or a family budgeting on food assistance. The mission is to bridge the systemic divide between home, clinic, and hospital environments.

### Core Objectives
1. **Enhance Patient Health Outcomes:** Provide practical, actionable guidance that supports daily wellness and clinical adherence.
2. **Romanticize Truthful Self-Care:** Shift wellness culture away from superficial aesthetics toward authentic, accessible practices.
3. **Increase Health Literacy:** Deliver transparent, digestible, and evidence-based education.
4. **Facilitate Community Discussions:** Foster safe, constructive dialogues surrounding lived health experiences.
5. **Cultivate Peer Engagement:** Connect individuals facing similar circumstances for shared social support.
6. **Demystify Healthcare Resources:** Educate users on health topics, diagnostic devices, and available healthcare services.

### Implementation Roadmap
1. **Needs Assessment & Research:** Analyze ongoing public health priorities (aligned with Healthy People 2030 benchmarks).
2. **Focus Groups:** Conduct targeted user research sessions to validate feature priorities and content tone.
3. **Health Onboarding Flow:** Construct a comprehensive initial assessment capturing health history, medications, and wellness goals.
4. **Content Ingestion & Verification:** Establish semi-automated workflows and AI tooling to pull and vet evidence-based educational material.
5. **UX/UI Design:** Develop an intuitive, empathetic, and accessible interface optimized for diverse demographics.
6. **Compliance & Security Audits:** Implement end-to-end data encryption, regulatory compliance (HIPAA/privacy standards), and community guidelines.
