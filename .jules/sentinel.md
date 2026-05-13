## 2026-05-13 - [Added Missing Input Length Limits]
**Vulnerability:** API endpoints `/api/contact` and `/api/newsletter` accepted arbitrarily long strings for fields like `name`, `message`, and `subject`, exposing the application to Denial of Service (DoS) attacks and potential upstream service errors (Resend API).
**Learning:** While basic input validation and minimum lengths were implemented, lack of upper bounds on input fields is a common oversight that attackers can use to exhaust server memory or degrade performance.
**Prevention:** Always enforce both minimum and maximum length bounds on any user-provided string fields in API validation functions.
