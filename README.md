# User Registration Endpoint

## Endpoint

**POST** `/user/register`

## Description
The `/user/register` endpoint is used to register a new user in the system. It accepts user details in the request body, validates the input, and creates a new user record in the database.

## Request Body
The request body should be sent in JSON format and must include the following fields:

| Field         | Type   | Required | Description                        |
|---------------|--------|----------|------------------------------------|
| `username`    | String | Yes      | The unique username of the user.  |
| `email`       | String | Yes      | The email address of the user.    |
| `password`    | String | Yes      | The password for the user account.|

### Example
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

## Response

### Success Response
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "message": "User registered successfully.",
    "userId": "<generated_user_id>"
  }
  ```

### Error Responses

- **`400 Bad Request`**: Missing or invalid input data.
  ```json
  {
    "error": "Invalid request data."
  }
  ```

- **`409 Conflict`**: Email or username already exists.
  ```json
  {
    "error": "Email or username already in use."
  }
  ```

- **`500 Internal Server Error`**: Server error during registration.
  ```json
  {
    "error": "An unexpected error occurred."
  }
  
# API Documentation for Uber-Video Backend

## User Endpoints

### POST /user/login
**Description:**
Authenticate the user and provide a JWT token upon successful login.

**Request:**
- **Headers:** None
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

**Response:**
- **200 OK:**
  ```json
  {
    "message": "Login successful",
    "token": "string"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

**Notes:**
- Ensure email and password are validated before making the request.
- The token should be included in subsequent requests requiring authentication.

---

### GET /user/profile
**Description:**
Retrieve the profile details of the authenticated user.

**Request:**
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Body:** None

**Response:**
- **200 OK:**
  ```json
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

**Notes:**
- The token must be valid and not expired.
- If the token is blacklisted, the request will fail.

---

### POST /user/logout
**Description:**
Log out the authenticated user by blacklisting their token.

**Request:**
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Body:** None

**Response:**
- **200 OK:**
  ```json
  {
    "message": "Logout successful"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

**Notes:**
- Ensure the token is included in the header.
- Once logged out, the token cannot be reused for authentication.

---

