# SocioX

# SocioX API Documentation

## Overview

This API provides functionalities for user authentication, admin management, subscription management, and user operations. It's designed to support a platform with parent and child user roles, various subscription plans, and administrative oversight.

### Authentication
Authentication is primarily handled using JSON Web Tokens (JWT). Certain endpoints require a valid JWT to be included in the `Authorization` header as a `Bearer` token. When interacting with admin functionality make sure admin token is provided.

### Endpoints

Here's a detailed breakdown of the available endpoints:

---
## Auth

### Register parent email

*   **Description:** Registers a new parent user with email, password, and name.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/v1/auth/register`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Request Body (raw JSON):**

    ```json
    {
        "email": "xnikunjadu@gmail.com",
        "password": "yourpassword123",
        "name": "Test User"
    }
    ```
*   **Response:**
    *   Success: 201 status , the user is registered successfully.
    *   Failure: Appropriate status codes like 400,500.

*   **Notes:**
    * This endpoint creates a parent user account.
   
### Register child email

*   **Description:** Registers a new child user under a parent account. Requires a valid parent JWT token.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/users/child-users`
*    **Headers:**
        *    `Content-Type: application/json`
        *    `Authorization: Bearer <PARENT_JWT_TOKEN>`
*   **Request Body (raw JSON):**

    ```json
    {
      "email": "child@example.com",
      "password": "childewqepassword123",
      "name": "Child User",
      "permissions": ["create_posts", "view_analytics"]
    }
    ```
*   **Response:**
    *   Success: 201 status code along with the user data.
    *   Failure: Appropriate status codes like 400,500.
*   **Notes:**
    *   Requires a valid JWT representing a parent user.
    *  The `permissions` field is an array specifying the child's access levels.

### Login email

*   **Description:** Logs in an existing user with email and password.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/v1/auth/login`
*   **Headers:**
    *   `Content-Type: application/json`
*  **Request Body (raw JSON):**
    ```json
    {
        "email": "john@example.com",
        "password": "childewqepassword123"
    }
    ```
*   **Response:**
    *   Success: 200 status code with a jwt token
    *   Failure: Appropriate status codes like 400,401.
*   **Notes:**
    *   Returns a JWT upon successful authentication.

### ForgotPassword

*   **Description:** Initiates the password reset process by sending a reset link to the user's email.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/auth/forgot-password`
*   **Headers:**
    *   `Content-Type: application/json`
*  **Request Body (raw JSON):**
    ```json
    {
        "email": "xnikunjadu2@gmail.com"
    }
    ```
*   **Response:**
   * Success: 200 status, an email will be sent to the registered email address.
   * Failure: 400 status if email is not provided or any server error.
*   **Notes:** The server will send an email with a link containing a reset token.

### Reset Email Password

*   **Description:** Resets the user's password using the reset token and new password.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/auth/reset-password`
*   **Headers:**
    *   `Content-Type: application/json`
*  **Request Body (raw JSON):**
    ```json
    {
      "email": "xnikunjadu2@gmail.com",
      "otp": "360892",
      "newPassword": "your-new-password"
    }
    ```
*  **Response:**

    *   Success: 200 status code. password changed .
    *   Failure: 400, 500 status codes based on errors.
*   **Notes:**
    *   The `otp` is the reset token sent to the user's email.
 
---

## Admin
### User subscription
#### subs user plan

*   **Description:** Subscribes a user to a specific plan.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/v1/admin/users/{userId}/subscription`
*   **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*  **Request Body (raw JSON):**
    ```json
    {
        "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
    }
    ```
*  **Response:**
   * Success: 200 status.
   *  Failure: 400, 500 status codes with errors.
*   **Notes:**

    *   Replace `{userId}` with the actual ID of the user.

#### cancel subs user plan

*   **Description**: Cancels a user's active subscription.
*   **Method:** `POST`
*   **URL:**  `http://localhost:5000/api/v1/admin/users/{userId}/subscription/cancel`
*   **Headers:** 
    * `Content-Type: application/json`
   *  `Authorization: Bearer YOUR_ADMIN_TOKEN`
* **Request Body (raw JSON):**
    ```json
    {
        "reason":"i dont really know the reason"
    }
    ```
*   **Response:**
    * Success: 200 status.
    * Failure: 400 ,500 status codes with errors.
*   **Notes:**

    *   Replace `{userId}` with the actual ID of the user.

#### get sub by userid

*   **Description:** Retrieves the subscription details for a specific user.
*   **Method:** `GET`
*   **URL:** `http://localhost:5000/api/admin/users/{userId}/subscription`
*    **Headers:**
        *  `Content-Type: application/json`
        *  `Authorization: Bearer YOUR_ADMIN_TOKEN`
*  **Request Body (raw JSON):**
    ```json
    {
        "reason":"i dont really know the reason"
    }
    ```
*  **Response:**
    *   Success: 200 status code along with subscription details.
    *   Failure: 400, 500 status codes with errors.
*   **Notes:**
    *   Replace {userId} with the actual ID of the user.

#### update sub by userid

*   **Description:** Updates a user's subscription with a new plan.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/admin/users/{userId}/subscription/update`
*  **Headers:**
     * `Content-Type: application/json`
     * `Authorization: Bearer YOUR_ADMIN_TOKEN`
*  **Request Body (raw JSON):**
    ```json
    {
        "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
    }
    ```
*  **Response:**
    *   Success: 200 status code
    *  Failure: 400,500 status codes with error messages.
*   **Notes:**

    *   Replace `{userId}` with the actual ID of the user.

### Subscription management

#### get Plans

*   **Description:** Retrieves a list of subscription plans based on optional query parameters.
*   **Method:** `GET`
*   **URL:** `http://localhost:5000/api/v1/admin/subscription/plans?category=enterprise&status=active&name=premium`
*   **Headers:**
    *   `Authorization: Bearer YOUR_JWT_TOKEN`
*   **Query Parameters:**
    *   `category`: Filters plans by category.
    *   `status`: Filters plans by status (e.g., active, inactive).
    *   `name`: Filters plans by name.
*   **Response:**
    *   Success: 200 status . Returns a list of plans.
    *   Failure: 400,500 status codes with error.
*   **Notes:**
    *   All query parameters are optional.

#### get Plans by id

*   **Description:** Retrieves a specific subscription plan by its ID.
*   **Method:** `GET`
*   **URL:** `http://localhost:5000/api/admin/subscription/plans/{planId}`
*   **Headers:**
    *   `Content-Type: application/json`
*  **Response:**
    *   Success: 200 status code with plan details.
    *   Failure: 400, 500 status codes if plan is not found or any server issue.
*   **Notes:**
    *   Replace `{planId}` with the actual ID of the plan.

#### update custom features

*   **Description:** Updates the custom features of a subscription plan.
*   **Method:** `PATCH`
*   **URL:** `http://localhost:5000/api/admin/subscription/plans/{planId}/features`
*   **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_ADMIN_TOKEN`
*  **Request Body (raw JSON):**
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
*  **Response:**
   * Success: 200 status code.
   *  Failure: 400,500 status codes with error.
*   **Notes:**
    *   Replace `{planId}` with the actual ID of the plan.

#### create plan

*   **Description:** Creates a new subscription plan.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/admin/subscription/plans`
*   **Headers:**
    *   `Content-Type: application/json`
*  **Request Body (raw JSON):**
    ```json
    {
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
          "reportTypes": ["basic", "advanced"],
          "exportFormats": ["pdf", "csv"],
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
      "category": "enterprise"
    }
    ```
*   **Response:**
    *   Success: 201 status code with the new plan details.
    *   Failure: 400, 500 status codes with error.

#### update plan

*   **Description:** Updates an existing subscription plan by ID.
*   **Method:** `PUT`
*   **URL:** `http://localhost:5000/api/admin/subscription/plans/{planId}`
     *  `Authorization: Bearer YOUR_JWT_TOKEN`
*   **Headers:**
    *   `Content-Type: application/json`

* **Request Body (raw JSON):**
    ```json
    {
        "name": "basic",
        "displayName": "Basic Plan",
        "price": {
          "monthly": {
            "amount": 29.99,
            "currency": "USD"
          },
          "yearly": {
            "amount": 299.99,
            "currency": "USD",
            "savings": 59.89
          }
        },
        "features": {
          "socialAccounts": {
            "total": 5,
            "perPlatform": {
              "facebook": 2,
              "instagram": 2,
              "twitter": 1
            }
          },
        "teamMembers": 3,
        "posting": {
          "postsPerDay": 10,
          "bulkScheduling": true,
          "autoScheduling": false
        },
        "analytics": {
            "reportTypes": ["basic", "advanced"],
            "exportFormats": ["pdf", "csv"],
            "retentionDays": 30
        },
        "support": "email",
        "additional": {
            "customBranding": false,
            "apiAccess": false,
            "contentCalendar": true,
            "hashtagManager": true
        }
        },
        "recommended": false,
        "category": "basic"
    }
    ```
*   **Response:**
    *   Success: 200 status with updated plan details.
    *   Failure: 400, 500 status codes with error.
*   **Notes:**
    *   Replace `{planId}` with the actual ID of the plan.

#### update plan status

*   **Description:** Updates the status of a subscription plan (e.g., active/inactive).
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/subscription/admin/plans/{planId}/status`
*   **Headers:**
    *   `Authorization: Bearer YOUR_ADMIN_JWT_TOKEN`
    *    `Content-Type: application/json`
*  **Request Body (raw JSON):**
    ```json
    {
        "status": "active"
    }
    ```
*   **Response:**
    *   Success: 200 status code with updated plan details.
    *   Failure: 400, 500 with error.
*   **Notes:**
    *   Replace `{planId}` with the actual ID of the plan.

#### delete plan

*   **Description:** Deletes a subscription plan.
*   **Method:** `DELETE`
*   **URL:** `http://localhost:5000/api/subscription/admin/plans/{planId}`
*   **Headers:**
    *  `Authorization: Bearer YOUR_ADMIN_JWT_TOKEN`
  *   `Content-Type: application/json`
  *  **Request Body (raw JSON):**
  ```json
  {
    "status": "inactive"
  }
  ```
*   **Response:**
    *   Success: 200 status code.
    *  Failure: 404,500 status codes with errors if no plan is found.
*   **Notes:**
    *   Replace `{planId}` with the actual ID of the plan.

#### update both features

*  **Description:** Updates both standard and custom features of a subscription plan.
*  **Method:** `PUT`
*   **URL:** `http://localhost:3000/api/subscriptions/plan-features/{planId}`
*  **Headers:**
    * `Content-Type: application/json`
    * `Authorization: Bearer YOUR_ADMIN_TOKEN`
*   **Request body (raw JSON):**

    ```json
    {
        "features": {
          "socialAccounts": {
            "total": 15,
            "perPlatform": {
              "facebook": 5,
              "instagram": 5,
              "twitter": 5
            }
          },
          "teamMembers": 10,
          "posting": {
            "postsPerDay": 50,
            "bulkScheduling": true,
            "autoScheduling": true
          },
           "analytics": {
            "reportTypes": ["basic", "advanced"],
            "exportFormats": ["pdf", "csv"],
            "retentionDays": 90
          },
          "support": "priority"
        },
        "customFeatures": [
            "White label reports",
            "Custom URL shortener",
            "Advanced team permissions"
        ]
    }
    ```
*   **Response:**
    *   Success: 200 status.
    *   Failure: 400,500 status codes .
*   **Notes:**
    *    Replace `{planId}` with the actual ID of plan.
    * The `features` object encapsulates standard features, and `customFeatures` lists non-standard features.

#### update  standard feature

*  **Description:** Updates standard features of a subscription plan.
*   **Method:** `PUT`
*  `URL: http://localhost:3000/api/subscriptions/plan-features/{planId}`
*  **Headers:**
  * `Content-Type: application/json`
  * `Authorization: Bearer YOUR_ADMIN_TOKEN`
*   **Request Body (raw JSON):**
  ```json
    {
        "features": {
            "teamMembers": 15,
            "support": "24/7"
        }
    }
    ```
* **Response:**
   * Success: 200 status.
   * Failure: 400,500 status codes .
*   **Notes:**
    *    Replace `{planId}` with the actual ID of plan.
    *    `features` object contains the updated parameters.
#### GET PLAN BY GATAGOTIES

*   **Description:** Returns the subscription plans based on their categories.
*  **Method:** `GET`
*   **URL:**  // dynamic link.
*   **Headers** : None 
*  **Response**
    *   Success : 200 status code along with the plans matching categories.
    *  Failure : 400 or 500 errors if the plans are missing.
*Note :
   *  this endpoint may contain more details about categories of user.

### user management

#### reactivate user

*   **Description:** Reactivates a previously deactivated user account.
    **Method:** `GET`
    **URL:**  `http://localhost:5000/api/admin/users/{userId}/reactivate`
*  **Headers:**
    * None
* **Request Body**

```json
{
    "name":"Nikunja",
    "email":"xnikunja@gmail.com",
    "picture":"dsafsd"
}
```
*  **Response:**
    *   Success: 200 status code, with user details.
    *  Failure: 400,500 errors if not found.
*   **Notes:**
    *   Replace `{userId}` with the actual ID of the user.

#### Get List of users

*   **Description:** Retrieves a list of all users.
    **Method:** `GET`
*   **URL:**  `http://localhost:5000/api/v1/admin/users`
*   **Headers:**
        * `Content-Type: application/json`
* **Request body:**

```json
 {
  "email":"your.email@example.com",
  "password":"your_secure_password"
 }
```
*   **Response:**
    *   Success: 200 with a list of users..
    * Failure: 400 or 500 if list not found or server issue.

#### User delete
*   **Description:** Deletes a user.
*   **Method:** `DELETE`
*   **URL:**  `http://localhost:5000/api/admin/users/{userId}`
*   **Headers:** None
*  **Request body **
```json
{
    "name":"Nikunja",
    "email":"xnikunja@gmail.com",
    "picture":"dsafsd"
}
```
*  **Response:**

    *    Success: 200 status if deletion successful.
    *    Failure: 400,500 if user not found.
*   **Notes:**
    *   Replace `{userId}` with the actual ID of the user.

#### Deactivate User

*   **Description:** Deactivates a user account.
*   **Method:** `GET`
*    **URL:** `http://localhost:5000/api/admin/users/{userId}/deactivate`
* **Headers:** None

*    **Request Body**
```json
{
    "name":"Nikunja",
    "email":"xnikunja@gmail.com",
    "picture":"dsafsd"
}
```
*   **Response:**
    *   Success: 200, with the details of the deactivated user.
    *   Failure: 400,500 if no user is found or server error.
*   **Notes:**
    *   Replace `{userId}` with the actual ID of the user.

#### complete user details by id

*   **Description:** Retrieves complete details of a user with user id.
*   **Method:** `GET`
*   **URL:** `http://localhost:5000/api/admin/users/{userId}/details`
*   **Headers:** none
* **Request body:**
```json
{
    "name":"Nikunja",
    "email":"xnikunja@gmail.com",
    "picture":"dsafsd"
}
```
*    **Response:**
        * Success: 200 with user details.
       * Failure: 400 ,500 errors if the user is missing or request error.
*   **Notes:**
    *   Replace `{userId}` with the actual ID of the user.

#### send reset password link
    
*   **Description:** Sends a reset password link to the user's email address.
 *  **Method:** `POST`
*   **URL:** `http://localhost:5000/api/admin/users/sendPasswordResetLink`
*  **Headers:** None
 *   **Request body:**
    ```json
    {
        "email":"xnikunjadu2@gmail.com"
    }
    ```
*   **Response:**
        *  Success: 200 , an email with a password reset link will be sent.
       *   Failure: 400,500 status code based on server and request errors.

#### reset user password

*   **Description:** Resets the password of a user .
*   `Method: POST`
*   `URL: http://localhost:5000/api/admin/users/reset-password`
* `Headers: None`
*   **Request Body (raw JSON):**

  ```json
  {
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDQzZWZiY2VmZmEyODEwYmU0YmUiLCJpYXQiOjE3MzQ1MDg1ODgsImV4cCI6MTczNDUxMjE4OH0.e17UzfnRrBCAqXkWfP9LWmN3UZyaSFaQtEz7keJDrhY",
    "newPassword":"123456"
}
```
*   **Response:**
    *   Success: 200 status code, user password successfully reset.
         * Failure: 400 or 500 errors.
---

### admin management

#### Admin Login
*   **Description:** Authenticates an admin user and provides a JWT.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/v1/admin/login`
*    **Headers:**`Content-Type: application/json`
 *    **Request body:**

 ```json
 {
   "email": "nikunjadu2@gmail.com",
   "password": "nikunjadu2"
 }          
```
*   **Response:**
       *   Success: 200 status , JWT will be returned.
       *  Failure: 400, 401,500 status codes based on server error.

#### create admin by superadmin
*   **Description:** Creates new admin user by superadmin.
*   **Method:** `POST`
*   **URL:**`http://localhost:5000/api/v1/admin/create-admin`
*   **Headers:**
    *   `Authorization: Bearer YOUR_JWT_TOKEN`
    * `Content-Type: application/json`
*   **Request body :**
```json
{
    "email": "newadsmin@example.com",
    "password": "securePassword123!",
    "name": "New Admin",
    "permissions": [
        "manage_users",
        "view_user_details",
        "manage_content"
    ]
}
```
*   **Response:**
    *   Success: 201 status with new admin details.
    *   Failure: 400 ,500 if any error occurs.
*   **Notes:**
    *   This endpoint is only accessible to super admin users.

#### get-all-admins

 * **Description:** Retrieves a list of all admin users
 *  **Method:** `GET`
*  **URL:** `http://localhost:5000/api/v1/admin/get-all-admins`
*   **Headers:** None
*  **Response:**
    *   Success: 200 status with the admin list.
    *   Failure: 400,500 with not found or server error.

#### delete admins

*  **Description:** Deletes an admin user.
*  **Method:** `DELETE`
* **URL:** `http://localhost:5000/api/v1/admin/delete-admin/{adminId}`
*   **Headers:** None
*  **Response:**
    * Success: 200 status.
    * Failure: 400,500 if server is missing or user not found.
* **Notes**:
        Replace {adminId} with the actual ID of the admin to be deleted.

#### get-admin-details

*  **Description:**  Retrieves details for a specific admin user.
*   **Method:** `GET`
*  `URL: http://localhost:5000/api/v1/admin/get-admin-details/{adminId}`
*   **Headers:** None
*  **Response:**
        *  Success: 200, with the specific admin details.
        *  Failure: 400,500 if server is down or the user is not available.
*   **Notes**:
    *   Replace {adminId} with the actual ID of the admin whose details you want.

#### update admin permission

*  **Description:**  Updates the permissions for a specific admin user by admin Id.
*   **Method:** `GET`
*  `URL: http://localhost:5000/api/v1/admin/get-admin-details/{adminId}`
*   **Headers:** None
*  **Response:**
         *  Success: 200, with the updated admin details.
         *   Failure: 400,500 if server is down or the user is not available.
*   **Notes**:
       *   Replace {adminId} with the actual ID of the admin whose details you want.
---

## user

### subscribe
#### Get current plan

*   **Description:** Retrieves the current subscription plan of a user.
*   **Method:** `GET`
*   **URL:** `http://localhost:5000/api/v1/users/subscription`
*   **Headers:**
    *   `Authorization: Bearer YOUR_JWT_TOKEN`
*    **Response:**
        *   Success: 200 , current sub details .
        *  Failure: 400, 500 if no plan found or server error.

#### cancel subs
*   **Description:** Cancels the user's current subscription.
    **Method:** `POST`
*   **URL:** `http://localhost:5000/api/v1/users/cancel-subscription`
*  **Headers:**
    *   `Content-Type: application/json`
    *   Authorization: Bearer YOUR_JWT_TOKEN
* **Request body (raw JSON):**

    ```json
    {
      "reason": "my wish why do u wanna know "
    }
    ```
*  **Response:**
        *   Success: 200 status with the message for cancellation request
        *  Failure: 400 or 500 based on error.

#### subscribe a plan

*   **Description:** Subscribes a user to a specific plan.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/v1/users/subscribe`
*   **Headers:**
     * `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_JWT_TOKEN`
*  **Request body (raw JSON):**

    ```json
    {
        "planId": "6763d06487f004a49970fd5a",
        "billingCycle": "monthly"
    }
    ```
*  **Response:**
        *   Success: 200 with new sub details.
        * Failure: 400, 500 based on server error.

#### update plan

*   **Description:** Updates the user's subscription plan.
*   **Method:** `PUT`
*   **URL:** `http://localhost:5000/api/v1/users/subscription/update`
*  **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_JWT_TOKEN`
*  **Request body (raw JSON):**
    ```json
    {
        "planId": "6763d06487f004a49970fd5a",
        "billingCycle": "monthly"
    }
    ```
* **Response:**
        *    Success: 200 . with updated subscription details
        *  Failure: 400 or 500 status code with the respective errors.

### USER OPERATION

#### user details

*   **Description:** Retrieves details of the currently authenticated user.
*   **Method:** `GET`
*   **URL:** `http://localhost:5000/api/users/details`
*   **Headers:** None
*  **Response:**
    *   Success: 200 status with user data .
  *  Failure: 400, 500 status codes with error.

#### delete User

*   **Description:** Initiates the process to delete the authenticated user.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/v1/users/delete`
*   **Headers:** None
*   **Request Body:**
 ```json
{
    "name":"Nikunja",
    "email":"xnikunja@gmail.com",
    "picture":"dsafsd"
}
```
*   **Response:**
    *   Success: 200 status code, an email will be sent to the given email address to confirm deletion.
    *   Failure:  400 or 500 with the proper server error.

#### confim delete user

*   **Description:** Confirms the deletion of the user account using a token.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/api/users/confirm-delete`
    *  **Headers:** None
*  **Request body :**
    ```json
    {
      "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDAxODRkNGE2NjJiMjVkZTc1MTgiLCJpYXQiOjE3MzQ0MjY2NjUsImV4cCI6MTczNDQzMDI2NX0.sEFZye1spypGkzc6pIIOwh_x7Xg6qMN3Woaw3wqowm0"
    }
    ```
*   **Response:**
    * Success: 200 with the message for user deletion.
       * Failure: 400,500 errors if invalid token or any server issue.
---
