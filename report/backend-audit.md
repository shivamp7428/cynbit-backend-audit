# Cynbit – Backend Technical Audit Report

**Target Website:** https://www.cynbit.in/  
**Audit Area:** Backend Architecture, API Behaviour, Security and Performance  
**Assessment Method:** Passive Inspection using Browser Developer Tools  
**Date:** November 2026

---

## 1. Objective

The objective of this technical audit is to examine the publicly observable backend-related behaviour of the Cynbit website and identify potential areas for improvement in backend architecture, API communication, data validation, security, performance and error handling.

The assessment focuses primarily on the Careers section and its Backend Developer application form.

The audit was conducted using publicly accessible website functionality and browser developer tools. No unauthorized access, exploitation, load testing or disruptive activities were performed.

The findings are based on observable behaviour only. Internal backend implementation details that could not be verified have been clearly identified as areas requiring further investigation.

---

## 2. Technology and Infrastructure Observations

During the inspection, the following technologies and infrastructure indicators were observed.

### 2.1 Hosting Infrastructure

The website is served through Vercel infrastructure.

The inspected HTTP responses contained the following header:

- `server: Vercel`

This indicates that Vercel is involved in serving the website. However, it does not establish the complete backend hosting architecture.

### 2.2 Frontend Framework

The website uses Next.js.

This was identified through the following response headers and request patterns:

- `x-powered-by: Next.js`
- `x-matched-path: /careers/[slug]`
- React Server Component request headers.

### 2.3 HTTPS and Transport Security

The website uses HTTPS for communication.

The inspected responses also included:

`strict-transport-security: max-age=63072000`

This indicates that HTTP Strict Transport Security (HSTS) is enabled for the observed responses.

### 2.4 Dynamic Job Detail Routing

The Backend Developer job page is accessible through:

`/careers/backend-developer`

The response contained:

`x-matched-path: /careers/[slug]`

This suggests that the website uses a dynamic Next.js route to render individual job-detail pages.

**Analysis:**

The observed infrastructure indicates that the website uses Next.js and Vercel for its web delivery.

These observations help identify the website's frontend and hosting environment, but do not establish its database technology, internal services or complete backend architecture.

---

## 3. Network and Routing Analysis

During the inspection of the Careers page, multiple network requests were observed for website routes such as:

- `/story`
- `/team`
- `/services`
- `/products`
- `/impact`
- `/contact`
- `/careers`

Several requests contained the following characteristics:

- `_rsc` query parameter.
- `rsc: 1` request header.
- `next-router-prefetch: 1` request header.
- `content-type: text/x-component` response header.

### 3.1 Analysis of React Server Component Requests

These request patterns are consistent with Next.js React Server Component (RSC) navigation and prefetching.

Such requests allow Next.js to retrieve route-related rendering data and support client-side navigation.

They should not automatically be classified as conventional REST API endpoints.

### 3.2 API Discovery Status

During the inspection, no business-specific REST API endpoint was conclusively identified through the observed navigation requests.

The observed RSC requests provide information about the website's rendering and routing behaviour, but do not reveal the complete backend API structure.

**Recommendation:**

A further authorized assessment of application-related network requests would be required to understand the actual API communication and backend service interactions.

---

## 4. Careers Application Form Analysis

The Careers section contains a Backend Developer application form designed to collect candidate information.

The form is divided into the following sections.

### 4.1 Basic Information

The form collects:

- Full name
- Email address
- Phone number
- WhatsApp number
- Date of birth
- Gender

### 4.2 Academic and Professional Background

The form collects:

- Highest qualification
- Degree or qualification
- Specialization
- College or university
- Graduation year
- Education status
- Score system and score value
- Notice period
- Key technical skills

The form also provides an option to add additional qualifications.

### 4.3 Location and Professional Profiles

The form requests:

- Current city
- Permanent address
- Portfolio or resume link
- LinkedIn profile URL
- Optional GitHub or other professional profile links

### 4.4 Architectural Narrative

The candidate is required to provide an application statement explaining their engineering interests and professional goals.

### 4.5 Observed Submission Behaviour

During passive inspection, the Submit Application Blueprint button was clicked while all fields were empty.

The following behaviour was observed:

- A POST request was generated.
- The request URL was `/careers/backend-developer`.
- The response status was `200 OK`.
- The response content type was `text/x-component`.
- The browser URL remained unchanged.
- The form displayed an error.
- The page moved towards the upper section of the page.

### 4.6 Analysis

The observed POST request is consistent with a Next.js server-side interaction and may involve a Server Action.

However, the exact implementation could not be confirmed from the available observations.

The HTTP 200 response indicates that the HTTP request received a successful response. It does not necessarily mean that the application was accepted or successfully stored.

The displayed form error suggests that validation or submission-related feedback is provided to the user.

Further inspection would be required to determine whether validation is performed on the client, server or both.

---

## 5. Security and Performance Observations

This section distinguishes between positive observations and areas that require additional verification.

### 5.1 Positive Security Observations

**HTTPS Communication**

The inspected website pages use HTTPS, helping protect data during transmission.

**HTTP Strict Transport Security**

HSTS was present in the inspected responses. This helps browsers enforce HTTPS connections for the website.

**Vercel Infrastructure**

The website is served through Vercel infrastructure, which provides hosting and web delivery capabilities.

These observations do not independently establish the security of the entire backend system.

### 5.2 Areas Requiring Further Verification

The following backend capabilities could not be conclusively verified through the available passive inspection:

- Server-side input validation.
- Authentication and authorization mechanisms.
- Database access controls.
- Rate limiting on application submission.
- Duplicate application prevention.
- Secure storage of applicant information.
- Backend error logging and monitoring.
- Database query performance.

These items are potential areas for further assessment and should not be treated as confirmed production vulnerabilities.

---

## 6. Potential Risks and Improvement Opportunities

The following recommendations describe potential backend risks and improvements for an application-processing system similar to the Careers application workflow.

### 6.1 Input Validation

**Potential Risk**

The application form collects several types of information, including email addresses, phone numbers, academic scores, graduation years and professional profile URLs.

If incoming data is not properly validated on the server, invalid or unexpected values could enter the application-processing system.

Client-side validation alone is insufficient because client-side checks can be bypassed.

**Recommended Improvement**

Implement server-side validation using a schema validation library such as Zod or Joi.

Validation should cover:

- Required fields.
- Email address format.
- Phone number format.
- Valid graduation years.
- Academic score ranges.
- URL formats.
- Maximum input lengths.

The backend should reject invalid requests with an appropriate HTTP 400 response.

This helps maintain data consistency and prevents malformed input from reaching the database.

### 6.2 Personal Data Protection

**Potential Risk**

The application form collects personal information, including names, contact numbers, date of birth and permanent addresses.

Improper access controls or insecure data handling could expose applicant information to unauthorized users.

**Recommended Improvement**

Implement appropriate data protection measures:

- Restrict applicant information to authorized personnel.
- Apply role-based access control where required.
- Use HTTPS for data transmission.
- Avoid exposing sensitive information in application responses.
- Prevent personal information from appearing in application logs.
- Apply appropriate database access restrictions.
- Define suitable data retention and deletion policies.

These measures help protect applicant privacy and reduce the risk of unauthorized data exposure.

### 6.3 Rate Limiting

**Potential Risk**

Repeated requests to an application submission endpoint could create unnecessary server load or allow automated submission attempts.

**Recommended Improvement**

Implement endpoint-specific rate limiting to restrict excessive requests from a single client.

For example, an Express application can use `express-rate-limit` to limit the number of requests within a defined time window.

For distributed deployments with multiple application instances, a shared rate-limiting store such as Redis should be considered.

This helps control excessive requests and protects application endpoints from basic automated abuse.

### 6.4 Duplicate Application Prevention

**Potential Risk**

Candidates may accidentally click the submission button multiple times or retry a request when the response is delayed.

Without duplicate protection, the same application could potentially be stored multiple times.

**Recommended Improvement**

Implement duplicate-submission protection using:

- Idempotency keys for submission requests.
- Appropriate database unique constraints.
- Checks for existing applications associated with the same candidate and job.
- Transaction-safe database operations where necessary.

This helps prevent duplicate records and maintain consistency in application data.

### 6.5 Centralized Error Handling

**Potential Risk**

If different backend routes handle errors independently, the application may return inconsistent error responses.

Additionally, exposing raw database or internal server errors could reveal implementation details.

**Recommended Improvement**

Implement centralized error-handling middleware.

All application routes should pass unexpected errors to a common error handler.

The error handler should:

- Return consistent error response structures.
- Use appropriate HTTP status codes.
- Avoid exposing internal stack traces to clients.
- Log relevant error details securely.
- Distinguish between expected application errors and unexpected server failures.

This improves maintainability, debugging and API consistency.

### 6.6 Database Performance Optimization

**Potential Risk**

As the number of applications increases, inefficient database queries and missing indexes could increase response times and database load.

For example, frequently retrieving applications without suitable indexes may become expensive as the dataset grows.

**Recommended Improvement**

Consider the following database optimization techniques:

- Create indexes on frequently queried fields.
- Avoid unnecessary database queries.
- Use pagination when retrieving application records.
- Select only the required fields from database queries.
- Monitor slow queries.
- Use caching for frequently accessed, non-sensitive data where appropriate.

These improvements can help maintain consistent performance as application volume increases.

### 6.7 Logging and Monitoring

**Potential Risk**

Without structured logging and monitoring, identifying application failures, database errors and unexpected backend behaviour can become difficult.

This can increase debugging time and delay issue resolution.

**Recommended Improvement**

Implement structured logging and application monitoring.

Recommended practices include:

- Log important application events.
- Record request failures and server errors.
- Monitor API response times.
- Track database operation failures.
- Avoid logging passwords, tokens or sensitive applicant information.
- Configure alerts for repeated failures and unusual request patterns.

Libraries such as Pino or Winston can be used for structured logging in Node.js applications.

This improves observability and makes production issues easier to diagnose.

---

## 7. Recommended Backend Architecture

For a scalable and maintainable application-processing workflow, a modular backend architecture is recommended.

The architecture can be organized into the following components.

### 7.1 Request Entry Point

The application receives incoming requests through an API endpoint or a server-side action.

The entry point is responsible for accepting requests and forwarding them to the appropriate processing layer.

### 7.2 Validation Layer

The validation layer checks incoming request data against predefined schemas.

Invalid requests are rejected before business logic or database operations are executed.

### 7.3 Authentication and Authorization

Where protected operations are involved, authentication verifies the user's identity and authorization determines whether the user has permission to perform the requested operation.

Administrative access to applicant information should be restricted appropriately.

### 7.4 Application Service Layer

The service layer contains the main business logic.

For example, it can handle:

- Application creation.
- Duplicate application checks.
- Application status management.
- Candidate information processing.

Keeping business logic separate from route handlers improves code organization and maintainability.

### 7.5 Database Layer

The database layer manages application records and related information.

Database operations should use appropriate validation, indexing, access restrictions and transaction handling.

### 7.6 Centralized Error Handling

All unexpected errors should be forwarded to a centralized error-handling mechanism.

This ensures consistent error responses and simplifies debugging.

### 7.7 Logging and Monitoring

Structured logging and monitoring should be integrated to track application performance, request failures and important system events.

### 7.8 Background Processing

Non-critical operations, such as sending application confirmation emails or internal notifications, can be handled through a background worker.

This prevents notification processing from unnecessarily delaying the main application submission response.

**Architecture Recommendation**

Separating request handling, validation, business logic, database operations and background processing provides a modular structure that is easier to maintain, test and scale.

---

## 8. Conclusion

The publicly observable Cynbit website uses Next.js and Vercel infrastructure. Its Careers section uses dynamic job-detail routing and React Server Component request patterns.

During the application form inspection, a POST request was observed when the form was submitted with empty fields. The request returned HTTP 200 with a React Server Component response, while the form displayed an error.

However, the complete application-processing workflow and internal backend implementation could not be determined through passive browser inspection alone.

The main improvement opportunities identified in this assessment include server-side input validation, personal data protection, endpoint-specific rate limiting, duplicate-submission prevention, centralized error handling, database optimization and structured logging.

The recommended architecture provides a practical approach to building a secure, maintainable and scalable application-processing backend.

The accompanying demonstration code illustrates selected backend improvements using Node.js and Express. These examples represent proposed implementation approaches and are not claimed to be part of Cynbit's production backend.

---

## Recommended Improvements


### 1. Security Headers
Use Helmet middleware to set security-related HTTP headers and reduce exposure to common web vulnerabilities.

**Implementation:**

```js
import helmet from "helmet";

app.use(helmet());





### 2. Request Validation

Validate incoming request data using a schema validation library such as Zod before processing it.

**Implementation:**

```js
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email()
});

const result = userSchema.safeParse(req.body);

if (!result.success) {
  return res.status(400).json({
    success: false,
    message: "Validation failed"
  });
}

### 3. Rate Limiting

Apply rate limiting to public endpoints, especially authentication and application submission routes.

**Implementation:**

```js
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api", limiter);

### 4. Centralized Error Handling

Use a centralized error-handling middleware to handle application errors consistently.

**Implementation:**

```js
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500
      ? "Internal server error"
      : err.message
  });
};

app.use(errorHandler);

### 5. Performance Optimization
Optimize database queries and response times through indexing, pagination, and caching.

**Recommended Improvements:**

- Add database indexes to frequently queried fields.
- Implement pagination for endpoints returning large datasets.
- Use Redis caching for frequently accessed data.
- Compress HTTP responses where appropriate.
- Monitor API response times and database query performance.

**Benefit:** Reduces unnecessary database workload, improves response times, and supports better scalability.

### 6. CORS Configuration
Configure Cross-Origin Resource Sharing (CORS) to allow requests only from trusted frontend origins.

**Implementation:**

```js
import cors from "cors";

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));


### 7. Request Payload Size Limit
Limit incoming JSON request body sizes to prevent unnecessarily large payloads.

**Implementation:**

```js
app.use(express.json({ limit: "10kb" }));