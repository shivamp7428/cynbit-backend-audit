
# Cynbit Security Analysis

## 1. Website Response Headers

Target: https://www.cynbit.in/

HTTP Status: 200 OK

Observed Infrastructure:
- Server: Vercel
- HSTS: Present
- Content-Security-Policy: Not observed
- X-Frame-Options: Not observed
- X-Content-Type-Options: Not observed

## 2. Initial Observations

1. The website advertises HTTPS enforcement through HSTS.
2. CSP was not observed in the homepage document response.
3. X-Frame-Options was not observed.
4. X-Content-Type-Options was not observed.
5. Vercel cache returned HIT for this response.

## 3. Recommendations

- Review whether an appropriate Content-Security-Policy is configured.
- Review clickjacking protection using CSP frame-ancestors.
- Consider X-Content-Type-Options: nosniff.
- Review caching policies for dynamic and sensitive responses.

Note: These are preliminary observations.
Further verification is required before classifying them as security vulnerabilities.


## 4. Careers Page Response Analysis

Target: https://www.cynbit.in/careers

HTTP Status: 200 OK

Observed:
- Server: Vercel
- Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
- Age: 0

Observation:
The Careers page uses a stricter caching policy than the homepage.

Recommendation:
Review caching requirements for each page and ensure dynamic or sensitive responses are not stored in shared caches.
