source:: https://apidog.com/blog/node-js-express-authentication/

AUTHENTICATION: the process of verifying the identity of a user,, "who are you?".

AUTHORIZTION: the process of determining what an autjenticated user is allowed to do. "what can you do?".

Stateless vs. Stateful authentication: in stateless authentication the server does not maintain any session data. Each request is independent and must contain all the necessary information for authentication, typically through tokens (e.g JWT)

Statefull Authentication: in this method the server maintains session data for authenticated users, often stored in a database or memory. The client holds a session ID to access thr stored session data.


COMMON NODE.js Express Authentication methods.
1. Basic authentication.

description :Users provide their username and password for each request.
use case: simple and quick to implement, suitable for basic application or internal tools.
No pecific library required, implemented using base64 encoding and decoding.

2. Token-Based Authentication (jwt)
description: users authenticate by receiving a JSON Web Token after loging in, which they include in the header of subsequent requests.

use case: Stateless authentication, commonly used in modern web and mobile applications.

libraries: jsonwebtoken, express-jwt

3. session-based Authentication

description: user credentials are stored in a session on the sercer after login. The session ID is stored in a cookie on the client side.

Use case: Traditional web applications where server-side sessions are manageable.
example libraries: express-session, connect-mongo.

4. OAuth2
description: Delegated authorixation framework that allows thid-party services to excange tokens on behalf of the user.

use case: integraton with third-party services like google, facebook, and github for authentication.

example: passport, passport-google-oauth20, passport-facebook, passport-github.

5.Social login
description: Authentication through social media accounts like google, facebook, or twitter.
use case: Allows user to login in using their socia media accounts, simplifyig the login process.
example: passport-google-oauth20, passport-facebook, passport-twitter.

6. Multi-factor Authentication.

Description: Adds an extra layer of security by requiring multiple forms of verification (e.g password + OTP).

Use case: High-security appications where additional authentication layerd are necessary.
Example libraries: speakeasy(for OTP generation), node-2fa

7. API key Authentication

des: users include an API key in the request header of each API CALL.
USE case: commonly use for service-to-service communication for public APIS.
Example Libraries: No specific library required, implementes by checking the api key in the reques header.

8. LDAP Authentication
Description: Authenticates users against a directory service like Microsoft Active Directory. 
use case:Enterprise applications where centralized autentication is required.
example libraries: passport-ldapauth, ldapjs.

9. SAML Authentication
des: Security Assertion Markup Language is an XML-based protocol for exchanging authentication and authorization data between parties.
use case: Enterprise singlr sign-on(sso) solutions.

example libraries: passport-saml