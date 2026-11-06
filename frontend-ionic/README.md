# Ionic frontend

This React/Ionic client uses the Spring Boot API in `../backend`.

## Run locally

Start the backend from the repository root in one terminal:

```sh
export ASSESSMENT_ENCRYPTION_KEY="$(openssl rand -base64 32)"
mvn -f backend/pom.xml spring-boot:run
```

In another terminal:

```sh
cd frontend-ionic
npm install
npm start
```

The development environment file starts this client at `http://localhost:8100`
and points it at `http://localhost:8080`, matching the backend's default CORS
origin. Override `PORT` or `REACT_APP_API_BASE_URL` as needed; if the frontend
origin changes, set the backend's `FRONTEND_ORIGIN` to the same origin.

The client uses the backend's session cookie and CSRF cookie. It includes
credentials on API calls and sends the `X-XSRF-TOKEN` header for registration,
sign-in, section validation, submission and sign-out. The questionnaire itself
is loaded from `GET /api/assessment/form`; IDs, wording, types and answer
options are not duplicated in the frontend.

Run frontend checks from this directory:

```sh
npm test -- --watchAll=false
npm run build
```
