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
  
