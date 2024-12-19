# SocioX

# SocioX API Documentation

## Overview

This document provides detailed information about the SocioX API, which includes authentication, user management, subscription management and admin functionalities. The API allows users to register, login, manage subscriptions and allows admin to manage users and subscriptions.

### Authentication
The API uses JSON Web Tokens (JWT) for authentication. Most endpoints require a valid JWT token to be included in the `Authorization` header as a `Bearer` token.

### Endpoints

---
## Auth Endpoints

### 1. Register Parent Email
#### Description
This endpoint registers a new parent user with an email and password.
#### Request
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/v1/auth/register`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Body:**
    ```json
    {
        "email": "parent@example.com",
        "password": "yourpassword123",
        "name": "Parent User"
    }
    ```

#### Response
*   **Status Code:** `201 Created` (successful registration) or `400 Bad Request` (if registration fails)
*   **Body:**
    ```json
    {
        "message": "User registered successfully",
        "user": {
            "userId": "some_user_id",
            "email": "parent@example.com",
            "name": "Parent User",
             "userType": "parent",
             "permissions" :[]
        }
    }
    ```
#### Curl Command:

```bash
curl -X POST \
  http://localhost:5000/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "parent@example.com",
    "password": "yourpassword123",
    "name": "Parent User"
  }'
```

#### Important Notes:
*   This endpoint creates a new user in the system.

---
### 2. Register Child Email
#### Description
This endpoint registers a new child user under a parent account given the token of parent.
#### Request
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/users/child-users`
*  **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <parent_jwt_token>`
*   **Body:**
    ```json
    {
        "email": "child@example.com",
       "password": "childewqepassword123",
       "name": "Child User",
       "permissions": ["create_posts", "view_analytics"]
    }
    ```

#### Response
*   **Status Code:** `201 Created` (successful registration) or `400 Bad Request` (if registration fails)
*   **Body:**
    ```json
{
    "message": "Child user created successfully",
    "user": {
        "permissions": [
            "create_posts",
            "view_analytics"
        ],
        "userId": "6764d98278f4e44081632791",
        "email": "child@example.com",
        "name": "Child User",
        "userType": "child",
        "parent_id": "6764d98278f4e44081632794"
    }
}
    ```

#### Curl Command:

```bash
curl -X POST \
  http://localhost:5000/api/users/child-users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYyYjdiZDQzZTFiNjgzZDZhYTlkMmEiLCJlbWFpbCI6ImNoaWxkQGV4YW1wbGUuY29tIiwidXNlclR5cGUiOiJjaGlsZCIsInBlcm1pc3Npb25zIjpbImNyZWF0ZV9wb3N0cyIsInZpZXdfYW5hbHl0aWNzIl0sInBhcmVudElkIjoiNjc2MTQ0M2VmYmNlZmZhMjgxMGJlNGJlIiwiaWF0IjoxNzM0NTIyODE0LCJleHAiOjE3MzQ2MDkyMTR9.E6aWLfK0ar0MSpAd6vDyhXPF9gYbG9y5UbsApb-JFMM' \
  -d '{
  "email": "child@example.com",
  "password": "childewqepassword123",
  "name": "Child User",
  "permissions": ["create_posts", "view_analytics"]
}'
```

#### Important Notes:
*   The `Authorization` header must contain a valid JWT token for parent user

---
### 3. Login Email
#### Description
This endpoint logs in an existing user with an email and password and returns a JWT token.
#### Request
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/v1/auth/login`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "userpassword"
    }
    ```

#### Response
*   **Status Code:** `200 OK` (successful login) or `401 Unauthorized` (if login fails)
*   **Body:**
    ```json
{
    "message": "user login successfull",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDQzZWZiY2VmZmEyODEwYmU0YmUiLCJlbWFpbCI6InhuaWt1bmphZHUyQGdtYWlsLmNvbSIsImlhdCI6MTczNDQyNTMzOSwiZXhwIjoxNzM0NTEyMDM5fQ.Wz-89ZqM594wgn-7VnK_K8I95P0S7A0p1J21w-x45I0",
    "user": {
        "userId": "6761443efbceffa2810be4be",
        "email": "user@example.com",
        "name": "Test User",
         "userType": "parent",
         "permissions":[]
    }
}
    ```
#### Curl Command:

```bash
curl -X POST \
  http://localhost:5000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "user@example.com",
    "password": "userpassword"
  }'
```
#### Important Notes:
*   The response includes a `token` field that needs to be used for subsequent requests.

---
### 4. Forgot Password
 #### Description
This endpoint initiates the password reset process by sending an OTP (One-Time Password) to the provided email for further steps.
#### Request
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/auth/forgot-password`
*   **Headers:**
    *   `Content-Type: application/json`
*    **Body:**
        ```json
        {
            "email": "user@example.com"
        }
        ```
#### Response
*   **Status Code:** `200 OK` (if email exists and otp sent successfully), `404 Not Found` if user does not exist or `500 Internal Server Error` (if email sending fails)
*   **Body:**
    ```json
    {
        "message": "Password reset link sent"
    }
    ```
#### Curl Command:
```bash
curl -X POST 
  http://localhost:5000/api/auth/forgot-password 
  -H 'Content-Type: application/json' 
  -d '{
    "email": "user@example.com"
  }'
```

---
### 5. Reset Email Password
#### Description
This endpoint completes the password reset process by verifying the OTP and updating the password for a given user.
#### Request
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/auth/reset-password`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Body:**
    ```json
   {
        "email": "user@example.com",
        "otp": "123456",
        "newPassword": "your-new-password"
    }
    ```

#### Response
*   **Status Code:** `200 OK` (successful password reset) or `400 Bad Request` (if reset fails, invalid otp of user does not exist)
*    **Body:**
        ```json
        {
            "message": "Password reset successfully"
        }
        ```

#### Curl Command:

```bash
curl -X POST \
  http://localhost:5000/api/auth/reset-password \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "user@example.com",
    "otp": "123456",
    "newPassword": "your-new-password"
  }'
```

#### Important Notes:
*   The `otp` must be a valid one, sent to users email.

---

## Admin Endpoints

### User Subscription Management

#### 1. Subscribe User to a Plan
##### Description
This endpoint allows a admin to subscribe a user to a plan. The admin must be authorized to perform this action.
##### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/admin/users/{userId}/subscription`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <admin_jwt_token>`
*    **Path Parameters:**
    *   `userId`: The ID of the user to subscribe to the plan.
*   **Body**:
    ```json
     {
        "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
    }
    ```

##### Response
*   **Status Code**: `200 OK` (success), or `400 Bad Request`(if plan or user not found) or `401 Unauthorized` (if no admin auth)
*   **Body:**
    ```json
    {
    "message": "User subscribed to plan successfully",
     "subscription": {
        "_id": "6764d8194d0e253769e52d8a",
        "planId": "67616c378c821544d3c5400b",
        "userId": "6761443efbceffa2810be4be",
        "billingCycle": "monthly",
        "subscriptionStatus": "active",
        "startDate": "2024-01-12T19:25:45.425Z",
        "updatedAt": "2024-01-12T19:25:45.427Z",
        "createdAt": "2024-01-12T19:25:45.427Z",
        "__v": 0
    }
}
    ```
##### Curl Command:
```bash
curl -X POST \
  http://localhost:5000/api/v1/admin/users/6761443efbceffa2810be4be/subscription \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYzZmQ4NTg2YjFiN2Q1M2E5NTRmZjQiLCJlbWFpbCI6InhuaWt1bmphZHVAZ21haWwuY29tIiwidXNlclR5cGUiOiJwYXJlbnQiLCJwZXJtaXNzaW9ucyI6W10sImlhdCI6MTczNDYwNjIxMywiZXhwIjoxNzM0NjkyNjEzfQ.EezVLPzObZHW9Dx1P0fLVX84VOXImGkwbKHiLVdvsEM' \
  -d '{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
}'
```

##### Important Notes:
*   Admin token should have proper permission to subscribe user.

---
#### 2. Cancel User Subscription
##### Description
This endpoint cancels a user's subscription. The admin must be authorized to perform this action.
##### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/admin/users/{userId}/subscription/cancel`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <admin_jwt_token>`
*   **Path Parameters:**
    *   `userId`: The ID of the user whose subscription is to be cancelled.
*   **Body**: 
    ```json
        {
            "reason": "i dont really know the reason"
        }
    ```
##### Response
*   **Status Code**: `200 OK`  (success), or `400 Bad Request` (if subscription or user not found), `401 Unauthorized`  (if no admin auth)
*  **Body:**
```json
{
    "message": "subscription canceled succesfully",
    "subscription": {
    "_id": "6764da984d0e253769e52d92",
    "planId": "67616c378c821544d3c5400b",
    "userId": "6761443efbceffa2810be4be",
        "billingCycle": "monthly",
        "subscriptionStatus": "cancelled",
        "cancellationReason": "i dont really know the reason",
        "startDate": "2024-01-12T19:34:16.957Z",
        "endDate": "2024-01-12T19:34:24.289Z",
        "updatedAt": "2024-01-12T19:34:24.302Z",
        "createdAt": "2024-01-12T19:34:16.957Z",
        "__v": 0
     }
}
```
##### Curl Command:
```bash
curl -X POST \
  http://localhost:5000/api/v1/admin/users/6761443efbceffa2810be4be/subscription/cancel \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYzZmQ4NTg2YjFiN2Q1M2E5NTRmZjQiLCJlbWFpbCI6InhuaWt1bmphZHVAZ21haWwuY29tIiwidXNlclR5cGUiOiJwYXJlbnQiLCJwZXJtaXNzaW9ucyI6W10sImlhdCI6MTczNDYwNjIxMywiZXhwIjoxNzM0NjkyNjEzfQ.EezVLPzObZHW9Dx1P0fLVX84VOXImGkwbKHiLVdvsEM' \
  -d '{
    "reason":"i dont really know the reason"
}'
```
##### Important Notes:
*   Admin token should have proper permission to cancel user subscription.

---
#### 3. Get Subscription Details by User ID
##### Description
This endpoint retrieves the subscription details of a user given the user id. The admin must be authorized to perform this action.
##### Request
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/admin/users/{userId}/subscription`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <admin_jwt_token>`
 *    **Path Parameters:**
    *   `userId`: The ID of the user whose subscription details are requested.   
##### Response:
*   **Status Code**: `200 OK` (success), or `404 Not Found` (if subscription or user not found),  `401 Unauthorized`  (if no admin auth)
*   **Body:**
    ```json
  {
    "subscriptionDetails": {
        "_id": "6764d8194d0e253769e52d8a",
        "planId": "67616c378c821544d3c5400b",
        "userId": "6761443efbceffa2810be4be",
        "billingCycle": "monthly",
        "subscriptionStatus": "active",
        "startDate": "2024-01-12T19:25:45.425Z",
        "updatedAt": "2024-01-12T19:25:45.427Z",
        "createdAt": "2024-01-12T19:25:45.427Z",
        "__v": 0
    }
}
    ```
##### Curl Command:
```bash
curl -X GET \
  'http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZDVhMzQyMTFmOGIzMGNmYWRmM2I1Iiwicm9sZSI6InN1cGVyX2FkbWluIiwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3N1YnNjcmlwdGlvbnMiLCJtYW5hZ2VfY29udGVudCIsInZpZXdfYW5hbHl0aWNzIiwibWFuYWdlX3NldHRpbmdzIiwibWFuYWdlX2FkbWlucyJdLCJpYXQiOjE3MzQ1MDQxOTYsImV4cCI6MTczNDU0NzM5Nn0.T2hZGQ_--k0y-AUa9EPAlz21vmd_OdN6_OnFVfEcvhU'
```

##### Important Notes:
*   Admin must be authorised to view the user subscription details.

---
#### 4. Update User Subscription
##### Description
This endpoint updates a user's subscription details. The admin must be authorized to perform this action.
##### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/admin/users/{userId}/subscription/update`
*   **Headers**:
    *   `Content-Type: application/json`
    *  `Authorization: Bearer <admin_jwt_token>`
* **Path Parameters:**
   *   `userId`: The ID of the user whose subscription details are requested.
*   **Body**:
    ```json
    {
        "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
    }
    ```
##### Response:
*   **Status Code**: `200 OK`   (success), or `400 Bad Request`  (if plan or user not found),   `401 Unauthorized`  (if no admin auth)
*  **Body:**
    ```json
{
    "message": "Subscription updated successfully",
    "subscription": {
        "_id": "6764d8194d0e253769e52d8a",
        "planId": "67616c378c821544d3c5400b",
        "userId": "6761443efbceffa2810be4be",
        "billingCycle": "monthly",
         "subscriptionStatus": "active",
        "startDate": "2024-01-12T19:25:45.425Z",
        "updatedAt": "2024-01-12T19:35:57.041Z",
      "createdAt": "2024-01-12T19:25:45.427Z",
        "__v": 0
    }
}   
    ```
##### Curl Command:
```bash
curl -X POST \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription/update \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZDVhMzQyMTFmOGIzMGNmYWRmM2I1Iiwicm9sZSI6InN1cGVyX2FkbWluIiwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3N1YnNjcmlwdGlvbnMiLCJtYW5hZ2VfY29udGVudCIsInZpZXdfYW5hbHl0aWNzIiwibWFuYWdlX3NldHRpbmdzIiwibWFuYWdlX2FkbWlucyJdLCJpYXQiOjE3MzQ1MDQxOTYsImV4cCI6MTczNDU0NzM5Nn0.T2hZGQ_--k0y-AUa9EPAlz21vmd_OdN6_OnFVfEcvhU' \
  -d '{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
}'
```

##### Important Notes:
*   Admin token should have proper permission to update user subscription plan.

---
### Subscription management Endpoints

#### 1. Get Subscription Plans
##### Description
    This endpoint retrieves a list of subscription plans based on optional query parameters. The admin must be authorized to perform this action.
##### Request
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/v1/admin/subscription/plans`
*   **Headers**:
     *   `Authorization: Bearer <admin_jwt_token>`
*   **Query Parameters:**
    *   `category` (optional): Filter plans by category (e.g., "enterprise", "basic").
    *   `status` (optional): Filter plans by status (e.g., "active", "inactive").
    *   `name` (optional): Filter plans by name.

##### Response
*   **Status Code**: `200 OK` (success), or  `401 Unauthorized` (if no admin auth)
*   **Body:**

```json
 {
    "plans": [
        {
            "_id": "67616c378c821544d3c5400b",
            "name": "premium",
            "displayName": "Premium Plan",
            "price": {
                "monthly": {
                    "amount": 29.99,
                    "currency": "USD"
                },
                "yearly": {
                    "amount": 299.99,
                    "currency": "USD",
                    "savings": 60
                }
            },
            "features": {
                "socialAccounts": {
                    "total": 10,
                    "perPlatform": {
                        "facebook": 3,
                        "instagram": 3,
                        "twitter": 4
                    }
                },
                "teamMembers": 5,
                "posting": {
                    "postsPerDay": 20,
                    "bulkScheduling": true,
                    "autoScheduling": true
                },
                "analytics": {
                    "reportTypes": [
                        "basic",
                        "advanced"
                    ],
                    "exportFormats": [
                        "pdf",
                        "csv"
                    ],
                    "retentionDays": 365
                },
                "support": "24/7",
                "additional": {
                    "customBranding": true,
                    "apiAccess": true,
                    "contentCalendar": true,
                    "hashtagManager": true
                }
            },
            "recommended": true,
            "category": "enterprise",
            "status": "active",
            "createdAt": "2024-01-08T10:42:47.732Z",
            "updatedAt": "2024-01-08T10:42:47.732Z",
            "__v": 0,
             "customFeatures": [
                "White label reports",
                "Custom URL shortener",
                "Advanced team permissions",
                "API rate limit increase"
              ]
        }
    ]
}
```
##### Curl Command:
```bash
curl -X GET \
  'http://localhost:5000/api/v1/admin/subscription/plans?category=enterprise&status=active&name=premium' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZDVhMzQyMTFmOGIzMGNmYWRmM2I1Iiwicm9sZSI6InN1cGVyX2FkbWluIiwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3N1YnNjcmlwdGlvbnMiLCJtYW5hZ2VfY29udGVudCIsInZpZXdfYW5hbHl0aWNzIiwibWFuYWdlX3NldHRpbmdzIiwibWFuYWdlX2FkbWlucyJdLCJpYXQiOjE3MzQ1OTQxNjEsImV4cCI6MTczNDYzNzM2MX0.dPENmp2SXyHoQyF7dkkLHP572-naaWHP-D4YxZrtDq4'
```
##### Important Notes:
*    Admin token must be valid and have permission to read subscription plans

---
#### 2. Get Plan by ID
##### Description
  This endpoint retrieves a specific subscription plan by its ID. The admin must be authorized to perform this action.
##### Request
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/admin/subscription/plans/{planId}`
*   **Headers**:
    *  `Content-Type: application/json`
     *  `Authorization: Bearer <admin_jwt_token>`
*  **Path Parameters:**
   * `planId`: The ID of the plan to retrieve.
##### Response
*   **Status Code**: `200 OK` (success), or `404 Not Found` (if plan not found), or  `401 Unauthorized` (if no admin auth)
*   **Body:**
    ```json
{
    "plan": {
        "_id": "67616c378c821544d3c5400b",
        "name": "premium",
        "displayName": "Premium Plan",
        "price": {
            "monthly": {
                "amount": 29.99,
                "currency": "USD"
            },
            "yearly": {
                "amount": 299.99,
                "currency": "USD",
                "savings": 60
            }
        },
        "features": {
            "socialAccounts": {
                "total": 10,
                "perPlatform": {
                    "facebook": 3,
                    "instagram": 3,
                    "twitter": 4
                }
            },
            "teamMembers": 5,
            "posting": {
                "postsPerDay": 20,
                "bulkScheduling": true,
                "autoScheduling": true
            },
            "analytics": {
                "reportTypes": [
                    "basic",
                    "advanced"
                ],
                "exportFormats": [
                    "pdf",
                    "csv"
                ],
                "retentionDays": 365
            },
            "support": "24/7",
            "additional": {
                "customBranding": true,
                "apiAccess": true,
                "contentCalendar": true,
                "hashtagManager": true
            }
        },
        "recommended": true,
        "category": "enterprise",
        "status": "active",
        "createdAt": "2024-01-08T10:42:47.732Z",
        "updatedAt": "2024-01-08T10:42:47.732Z",
        "__v": 0,
         "customFeatures": [
                "White label reports",
                "Custom URL shortener",
                "Advanced team permissions",
                "API rate limit increase"
              ]
    }
}
    ```
##### Curl Command:
```bash
curl -X GET \
  'http://localhost:5000/api/admin/subscription/plans/67616c378c821544d3c5400b' \
  -H 'Content-Type: application/json'
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc1ZDVhMzQyMTFmOGIzMGNmYWRmM2I1Iiwicm9sZSI6InN1cGVyX2FkbWluIiwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3N1YnNjcmlwdGlvbnMiLCJtYW5hZ2VfY29udGVudCIsInZpZXdfYW5hbHl0aWNzIiwibWFuYWdlX3NldHRpbmdzIiwibWFuYWdlX2FkbWlucyJdLCJpYXQiOjE3MzQ0MzI1OTUsImV4cCI6MTczNDQ3NTc5NX0.HLCPyhBKBeUspn4YoJCHXYdSV5dhG4yzqXFxs_G3Zwk'
```

##### Important Notes:
*    Admin token must be valid and have permission to read subscription plans

---
#### 3. Update Custom Features of a Plan
##### Description
This endpoint updates the custom features of a specific subscription plan by its ID. The admin must be authorized to perform this action.
##### Request
*   **Method**: `PATCH`
*   **URL**: `http://localhost:5000/api/admin/subscription/plans/{planId}/features`
*   **Headers**:
    *   `Content-Type: application/json`
    *    `Authorization: Bearer <admin_jwt_token>`
*   **Path Parameters:**
    *   `planId`: The ID of the plan to update.
*   **Body**:
    ```json
    {
        "customFeatures": [
          "White label reports",
          "Custom URL shortener",
          "Advanced team permissions",
          "API rate limit increase"
        ]
    }
    ```
##### Response
*   **Status Code**: `200 OK` (success), or `404 Not Found`  (if plan not found) o `401 Unauthorized` (if no admin auth)
*   **Body:**
        ```json
        {
    "message": "Plan features updated successfully",
    "plan": {
        "_id": "67616c378c821544d3c5400b",
        "name": "premium",
        "displayName": "Premium Plan",
        "price": {
            "monthly": {
                "amount": 29.99,
                "currency": "USD"
            },
            "yearly": {
                "amount": 299.99,
                "currency": "USD",
                "savings": 60
            }
        },
        "features": {
            "socialAccounts": {
                "total": 10,
                "perPlatform": {
                    "facebook": 3,
                    "instagram": 3,
                    "twitter": 4
                }
            },
            "teamMembers": 5,
            "posting": {
                "postsPerDay": 20,
                