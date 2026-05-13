## 2024-05-13 - [DoS & CSRF Enhancements]
**Vulnerability:** Missing request boundary checks (CSRF & Max Payload Size)
**Learning:** API boundaries blindly trusted requests that could inflate application state or leverage implicit cross-origin form POST vulnerabilities if content type wasn't restricted.
**Prevention:** Strictly enforce `application/json` Content-Type on all relevant REST endpoints, and implement conservative maximum string boundaries locally to filter DoS attack payloads early.
