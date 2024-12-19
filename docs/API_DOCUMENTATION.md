# SocioX

# API Documentation for SocioX

This document provides detailed information about the SocioX API endpoints, including authentication, admin, and user functionalities.

## Authentication (`Auth`)

### 1. Register Parent Email
   - **Description**: Registers a new parent user with an email, password, and name.
   - **Endpoint**: `POST http://localhost:5000/api/v1/auth/register`
   - **Headers**:
        ```
        Content-Type: application/json
        ```
   - **Request Body (JSON)**:
        ```json
        {
           "email": "parent@example.com",
           "password": "yourpassword123",
           "name": "Test User"
        }
        ```
   - **Response**:
        - On successful registration, a 201 status code should be sent with a bearer token. Example response:
        ```json
            {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYzZmQ4NTg2YjFiN2Q1M2E5NTRmZjQiLCJlbWFpbCI6InhuaWt1bmphZHVAZ21haWwuY29tIiwidXNlclR5cGUiOiJwYXJlbnQiLCJwZXJtaXNzaW9ucyI6W10sImlhdCI6MTczNDYwNjIxMywiZXhwIjoxNzM0NjkyNjEzfQ.EezVLPzObZHW9Dx1P0fLVX84VOXImGkwbKHiLVdvsEM",
              "user": {
                      "id": "6763fd8586b1b7d53a954ff4",
                      "name": "Test User",
                      "email": "parent@example.com",
                      "userType": "parent",
                      "createdAt": "2024-01-16T10:19:55.277Z",
                      "updatedAt": "2024-01-16T10:19:55.277Z"
                    }
            }
        ```
   - **Notes**:
       - Ensure the email is unique and the password meets the application's complexity requirements.

### 2. Register Child Email
   - **Description**: Registers a new child user under a parent account with an email, password, name,  and permissions.
   - **Endpoint**: `POST http://localhost:5000/api/users/child-users`
    - **Headers**:
       ```
       Content-Type: application/json
       Authorization: Bearer YOUR_PARENT_TOKEN
        ```
   - **Request Body (JSON)**:
        ```json
        {
          "email": "child@example.com",
          "password": "childpassword123",
          "name": "Child User",
          "permissions": ["create_posts", "view_analytics"] 
       }
        ```
    - **Response**:
      - On successful registration, should sent 201 status code with the user data. Example response:
        ```json
             {
              "id": "6763fda0a9e16003b9119575",
              "name": "Child User",
              "email": "child@example.com",
              "permissions": [
                  "create_posts",
                  "view_analytics"
              ],
              "userType": "child",
              "parentId": "6761443efbceffa2810be4be",
              "createdAt": "2024-01-16T10:24:32.994Z",
              "updatedAt": "2024-01-16T10:24:32.994Z"
            }
        ```
   - **Notes**:
        - Requires a valid parent's token for `Authorization`.
        - Permissions should be valid and pre-defined by the application.

### 3. Login Email
   - **Description**: Logs in an existing user with their email and password.
   - **Endpoint**: `POST http://localhost:5000/api/v1/auth/login`
    - **Headers**:
        ```
        Content-Type: application/json
        ```
   - **Request Body (JSON)**:
        ```json
        {
           "email": "user@example.com",
           "password": "userpassword123"
        }
        ```
        - **Response**:
      - On successful login, should sent 200 status code with the user data and bearer token data. Example response:
        ```json
           {
               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYzZmQ4NTg2YjFiN2Q1M2E5NTRmZjQiLCJlbWFpbCI6InhuaWt1bmphZHVAZ21haWwuY29tIiwidXNlclR5cGUiOiJwYXJlbnQiLCJwZXJtaXNzaW9ucyI6W10sImlhdCI6MTczNDYwNjIxMywiZXhwIjoxNzM0NjkyNjEzfQ.EezVLPzObZHW9Dx1P0fLVX84VOXImGkwbKHiLVdvsEM",
               "user": {
                   "id": "6763fd8586b1b7d53a954ff4",
                   "name": "Test User",
                   "email": "user@example.com",
                   "userType": "parent",
                   "createdAt": "2024-01-16T10:19:55.277Z",
                   "updatedAt": "2024-01-16T10:19:55.277Z"
               }
           }
        ```
   - **Notes**:
       - If the email or password doesn't match the stored record a 404 or 401 should be sent.

### 4. Forgot Password
    - **Description**: Initiates the forgot password flow by sending an email with a reset OTP.
    - **Endpoint**: `POST http://localhost:5000/api/auth/forgot-password`
    - **Headers**:
        ```
        Content-Type