# SocioX

```markdown
# SocioX API Documentation

This document provides a comprehensive guide to the SocioX API endpoints.

## Authentication (Auth)

### 1. Register Parent Email

*   **Description:** Registers a new parent user with an email, password, and name.
*   **Method:** `POST`
*   **Endpoint:** `/api/v1/auth/register`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Request Body:**
    ```json
    {
        "email": "xnikunjadu@gmail.com",
        "password": "yourpassword123",
        "name": "Test User"
    }
    ```
*   **Response:**
    *   (Response details will depend on the backend, typically successful registration would respond with user data and/or a success message)
*   **Notes:**
    *   This endpoint is used to create new parent accounts.

### 2. Register Child Email

*   **Description:** Registers a new child user under a parent account. Requires a parent bearer token.
*   **Method:** `POST`
*   **Endpoint:** `/api/users/child-users`
*   **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <PARENT_JWT_TOKEN>`
*   **Request Body:**
    ```json
    {
        "email": "child@example.com",
        "password": "childewqepassword123",
        "name": "Child User",
        "permissions": ["create_posts", "view_analytics"]
    }
    ```
 *   **Response:**
    *   (Response details will depend on the backend, typically successful registration would respond with user data and/or a success message)
*   **Notes:**
    *   A valid parent JWT token is required in the `Authorization` header.

### 3. Login Email

*   **Description:** Authenticates a user and provides a JWT token.
*   **Method:** `POST`
*   **Endpoint:** `/api/v1/auth/login`
*   **Headers:**
    *    `Content-Type: application/json`
*   **Request Body:**
    ```json
    {
        "email": "john@example.com",
        "password": "childewqepassword123"
   }
    ```
*    **Response:**
    *   (Response details will depend on the backend, typically successful login would respond with a JWT token)
*   **Notes:**
    * Used to generate a user authentication token upon successful login.

### 4. Forgot Password

*   **Description:** Initiates the password reset process by sending a reset OTP link on mail to email provided.
*   **Method:** `POST`
*   **Endpoint:** `/api/auth/forgot-password`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Request Body:**
    ```json
        {
           "email": "xnikunjadu2@gmail.com"
        }
    ```
*   **Response:**
    * (Response details will depend on the backend, typically successful request would respond with a success message)
*    **Notes:** Initiates password reset process for registered users

### 5. Reset Email Password

*   **Description:** Resets a user's password using an OTP and a new password.
*    **Method:** `POST`
*    **Endpoint:** `/api/auth/reset-password`
*   **Headers:**
    *   `Content-Type: application/json`
*    **Request Body:**
    ```json
    {
        "email": "xnikunjadu2@gmail.com",
        "otp": "360892",
        "newPassword": "your-new-password"
    }
    ```
*   **Response:**
     *   (Response details will depend on the backend, typically successful password reset would respond with success message)
*   **Notes:**
    *  Requires a valid OTP sent to the user's email to reset password

---

## Admin

### User Subscription

#### 1. Subscribe User Plan

*   **Description:** Assigns a subscription plan to a user with a given `userId`.
*   **Method:** `POST`
*   **Endpoint:** `/api/v1/admin/users/{userId}/subscription`
*   **Headers:**
    *   `Content-Type: application/json`
    *  `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Path Parameter:**
    *   `userId`: The user ID to assign the subscription. (e.g., 6761443efbceffa2810be4be)
*   **Request Body:**
    ```json
    {
        "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
    }
    ```
*   **Response:**
      * (Response details will depend on the backend, typically successful request would respond with user data and/or a success message)
*   **Notes:**
    *   Requires admin authorization via a JWT token.
   *    The user ID is passed din the URL.

#### 2. Cancel User Subscription Plan

*   **Description:** Cancels a user's active subscription plan.
*   **Method:** `POST`
*   **Endpoint:** `/api/v1/admin/users/{userId}/subscription/cancel`
*   **Headers:**
    *   `Content-Type: application/json`
    *    `Authorization: Bearer <ADMIN_JWT_TOKEN_HERE>`
*   **Path Parameter:**
     *   `userId`: The user ID whose subscription is to be canceled.(e.g., 6761443efbceffa2810be4be)
*   **Request Body:**
    ```json
    {
        "reason": "i dont really know the reason"
    }
    ```
*   **Response:**
       * (Response details will depend on the backend, typically successful request would respond with user data and/or a success message)
*   **Notes:**
    *   Requires admin authorization via a JWT token.
   * The user ID is passed din the URL.

#### 3. Get Subscription by User ID

*   **Description:** Retrieves the current subscription details of a specific user by `userId`.
*   **Method:** `GET`
*    **Endpoint:** `/api/admin/users/{userId}/subscription`
*   **Headers:**
     * `Content-Type: application/json`
    *   `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Path Parameter:**
     *   `userId`: The user ID to retrieve the subscription for.(e.g., 6761443efbceffa2810be4be)

*   **Response:**
    * (Response details will depend on the backend, typically successful request would respond subscription details)
*   **Notes:**
    *   Requires admin authorization via a JWT token.
  * The user ID is passed din the URL.
*   **Body:** This route does not use a request body, so can be left empty.

#### 4. Update Subscription by User ID
*   **Description:** Updates a user's current subscription plan.
*    **Method:** `POST`
*   **Endpoint:** `/api/admin/users/{userId}/subscription/update`
*   **Headers:**
    *    `Content-Type: application/json`
    *    `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Path Parameters:**
    *   `userId`: The user ID whose subscription to be updated.(e.g., 6761443efbceffa2810be4be)
*   **Request Body:**
    ```json
    {
         "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
    }
    ```
*   **Response:**
       * (Response details will depend on the backend, typically successful request would respond with user data and/or success message)
*   **Notes:**
    *   Requires admin authorization via a JWT token.
   * The user ID is passed din the URL.

### Subscription Management

#### 1. Get Plans

*   **Description:** Retrieves a list of subscription plans, optionally filtered by category, status, or name.
*   **Method:** `GET`
*   **Endpoint:** `/api/v1/admin/subscription/plans`
*   **Headers:**
    *   `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*    **Query Parameters:**
   *   `category`:  filter by plan category (e.g., `enterprise`).
   *   `status`: filter by plan status (e.g., `active`).
   *   `name` filter by plan name (e.g., `premium`).
*   **Response:**
   * (Response details will depend on the backend, typically successful request would return a list of subscription plans)
*   **Notes:**
    *   Requires admin authorization via a JWT token.

    *  Query parameters are optional and can be combined for filtering.

     *Example request:  `/api/v1/admin/subscription/plans?category=enterprise&status=active&name=premium`

#### 2. Get Plan by ID

*   **Description:** Retrieves a single subscription plan by its ID.
*   **Method:** `GET`
*   **Endpoint:** `/api/admin/subscription/plans/{planId}`
*   **Headers:**
    * `Content-Type: application/json`
     *  `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Path Parameter:**
    * `planId`: The ID of the subscription plan to retrieve.(e.g., 67616c378c821544d3c5400b)
*   **Response:**
   * (Response details will depend on the backend, typically successful request would return details of a specific plan)
*   **Notes:**
    *   Requires admin authorization via a JWT token.
   * The plan ID is passed din the URL.

#### 3. Update Custom Features

*   **Description:** Updates custom features for a specific subscription plan.
*   **Method:** `PATCH`
*   **Endpoint:** `/api/admin/subscription/plans/{planId}/features`
*   **Headers:**
    *   `Content-Type: application/json`
    *    `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*    **Path Parameter:**
    *    `planId`: The ID of the subscription plan to update. (e.g., 67616c378c821544d3c5400b)
*   **Request Body:**
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
*   **Response:**
    * (Response details will depend on the backend, typically successful request would return message)
*   **Notes:**
    *   Requires admin authorization via a JWT token.
   * The plan ID is passed din the URL.

#### 4. Create Plan

*   **Description:** Creates a new subscription plan.
*   **Method:** `POST`
*    **Endpoint:** `/api/admin/subscription/plans`
*   **Headers:**
   *    `Content-Type: application/json`
   *  `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Request Body:**
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
       *    (Response details will depend on the backend, typically successful request would return the plan details)

*   **Notes:**
    *   Requires admin authorization via JWT token.

#### 5. Update Plan

*   **Description:** Updates an existing subscription plan with the provided details.
*   **Method:** `PUT`
*   **Endpoint:** `/api/admin/subscription/plans/{planId}`
*   **Headers:**
    * `Content-Type: application/json`
    *   `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Path Parameter:**
    *   `planId`: The ID of the plan to be updated.(e.g., 67615fa882f14b0d21c065a3)
*   **Request Body:**
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
    * (Response details will depend on the backend, typically successful request would return the updated plan data)
*  **Notes:**
       * Requires admin authentication
  *   The plan ID is passed din the URL.

#### 6. Update Plan Status

*   **Description:** Updates the status of a specific subscription plan (e.g., "active" or "inactive").
*   **Method:** `POST`
*   **Endpoint:** `/api/subscription/admin/plans/{planId}/status`
*   **Headers:**
    * `Authorization: Bearer <ADMIN_JWT_TOKEN>`
    *   `Content-Type: application/json`
*   **Path Parameter:**
    *   `planId`: The ID of the plan to update the status (e.g., 67615fa882f14b0d21c065a3)
*   **Request Body:**
    ```json
    {
        "status": "active"
   }
   ```
*      **Response:**
    *   (Response details will depend on the backend, typically successful request would return the updated plan data)
*   **Notes:**
     *   Requires admin authorization via a JWT token.
     *   The plan ID is passed din the URL.

#### 7. Delete Plan

*   **Description:** Deletes a subscription plan by its ID.
*    **Method:** `DELETE`
*   **Endpoint:** `/api/subscription/admin/plans/{planId}`
*   **Headers:**
    * `Authorization: Bearer <ADMIN_JWT_TOKEN>`
    *   `Content-Type: application/json`
*   **Path Parameters:**
    *    `planId`: The ID of the plan to be deleted.(e.g., 67615fa882f14b0d21c065a3)
    **Request Body:**

     ```json
       {
            "status":"inactive"
       }
     ```

*   **Response:**
    *   (Response details will depend on the backend, typically successful request will return a success message)

*   **Notes:**
    *   Requires admin authorization via a JWT token.
   * The plan ID is passed din the URL.

#### 8. Update Both Features (Standard and Custom)

*   **Description:** Updates both standard and custom features for a subscription plan using the plan ID.
*   **Method:** `PUT`
*    **Endpoint:** `/api/subscriptions/plan-features/{planId}`
*   **Headers:**
    *   `Content-Type: application/json`
     * `Authorization: Bearer <ADMIN_JWT_TOKEN>`
 *   **Path Parameters:**
      * `planId`: The id of the plan to update.(e.g., 64f5a7b1c25a)
*   **Request Body:**
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
*  **Response**:
      *  (Response details will depend on the backend, typically successful request would return success message)

*   **Notes:**
    *   Requires admin authorization via a JWT token.
    *   The plan ID is passed din the URL.

#### 9. Update Standard Features
*    **Description:** Updates the standard features for a subscription plan using the plan ID.
*    **Method:** `PUT`
*    **Endpoint:**  `/api/subscriptions/plan-features/{planId}`
*  **Headers:**
    *   `Content-Type: application/json`
    *  `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*  **Path Parameters:**
    *   `planId`: The id of the plan to update.(e.g., 64f5a7b1c25a)
*   **Request Body:**
    ```json
    {
        "features": {
           "teamMembers": 15,
           "support": "24/7"
        }
   }
    ```
*   **Response:**

    *   (Response details will depend on the backend, typically successful request would return success message)
*   **Notes:**
         *   Requires admin authorization via a JWT token.

        *    The plan ID is passed din the URL.

#### 10. Get Subscription Plan by Categories
* **Description:** Retrieves a subscription plan based on various categories.
* **Method** `: GET`
* **Endpoint**: `/api/subscriptions/plan-features/{planId}` [Currently empty , Will update soon]
* **Headers:**
    *`Authorization: Bearer <ADMIN_JWT_TOKEN>`
 * **Response**:
      *  (Response details will depend on the backend)

*  **Notes**
      * Requires admin authorization
      * This is a future endpoint, and will be implemented soon.

### User Management
#### 1. Reactivate User
* **Description:** Reactivate a deactivated user by `userId`.
* **Method**: `GET`
* **Endpoint:** `/api/admin/users/{userId}/reactivate`
*   **Headers:**
   *  `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*Path Parameters:
     * `userId`:  The ID of the user to reactivate (e.g.,6761443efbceffa2810be4be).
* **Body**:
This route does not use a request body, so can be left empty.
* **Response:**
  * (Response details will depend on the backend, typically successful request would return the reactivated user data)
* **Notes**
     * Requires admin authentication
     * Path parameters must contain user id.

#### 2. Get List of Users
* **Description:** Get All users with pagination and fitlering.
* **Method**: `GET`
* **Endpoint** : `/api/v1/admin/users`
* **Headers:**
      *   `Content-Type: application/json`
       *   `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Response:**
    *    (Response details will depend on the backend, typically successful request would respond with a list of users)
* **Body**:
This route does not use a request body, so can be left empty.
* **Notes**
    *  Admin authentication is needed to access this route.

#### 3. Delete User
* **Description:** Delete user based on `userId`.
* **Method**: `DELETE`
* **Endpoint:** `/api/admin/users/{userId}`
*   **Headers:**
   *    `Authorization: Bearer <ADMIN_JWT_TOKEN>`
* **Path Parameters:**
     * userId : The id of the user should be passed here(e.g., 6761443efbceffa2810be4be)
* **Body:**
            This route does not use a request body, so can be left empty.
* **Response:**
     *  (Response details will depend on the backend, typically successful delete would respond with a status message)

* **Notes**:
    *    Admin authentication is required.
     * Path parameters must contain user id.

#### 4. Deactivate User
* **Description:** Deactivate a user on the basis of `userId`.
* **Method:** `GET`
* **Endpoint**: `/api/admin/users/{userId}/deactivate`
* **Headers:**
          * `Authorization: Bearer <ADMIN_JWT_TOKEN>`
* **Path Parameters:**
         *  `userId`: The ID of the user to deactivate.(e.g., 6761443efbceffa2810be4be)
* **Body**:
This route does not use a request body, so can be left empty.
* **Response:**
     *  (Response details will depend on the backend, typically successful delete would respond with a status message)
*  **Notes**:
     * Requires admin authentication
     * Path Parameters must contain the user ID.

#### 5.Complete User Details By Id
* **Description:** Returns a user's detail on the basis of `userId`.
* **Method**: `GET`
* **Endpoint**:  `/api/admin/users/{userId}/details`
* **Headers:**
    *     `Authorization: Bearer <ADMIN_JWT_TOKEN>`
* **Path Parameters:**
    *  `userId` : The ID of the user to get the details for(e.g., 6761443efbceffa2810be4be)
* **Body:**
This route does not use a request body, so can be left empty.
* **Response:**
        *  (Response details will depend on the backend, typically successful call would respond with user details)
* **Notes**:
    *   Admin authentication is needed

    *  The user ID need to be mentioned din the URL.

#### 6. Send Reset Password Link
* **Description:** Send reset password link to the user.
* **Method**: `POST`
* **Endpoint**:  `/api/admin/users/sendPasswordResetLink`
   **Headers:**
     *  `Authorization: Bearer <ADMIN_JWT_TOKEN>`
* **Request Body:**
     ```json
     {
       "email":"xnikunjadu2@gmail.com"
     }
     ```
* **Response**:
    * (Response details will depend on the backend, typically successful request would return a success message)
*  **Notes**:
       * Requires admin authentication

#### 7. Reset User Password
* **Description:**  Reset the password for the user.
* **Method**: `POST`
* **Endpoint**:  `/api/admin/users/reset-password`
   **Headers:**
         * `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*    **Request Body:**
      ```json
     {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDQzZWZiY2VmZmEyODEwYmU0YmUiLCJpYXQiOjE3MzQ1MDg1ODgsImV4cCI6MTczNDUxMjE4OH0.e17UzfnRrBCAqXkWfP9LWmN3UZyaSFaQtEz7keJDrhY",
        "newPassword":"123456"
     }
      ```
*  **Response**:
     *  (Response details will depend on the backend, typically successful reset password would return success message)
*  **Notes**:
       *  Admin authentication is needed.

### Admin Management

#### 1. Admin Login

*   **Description:** Authenticates an admin user and provides a JWT token.
*   **Method:** `POST`
*   **Endpoint:** `/api/v1/admin/login`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Request Body:**
    ```json
    {
       "email": "nikunjadu2@gmail.com",
       "password": "nikunjadu2"
    }
    ```
*   **Response:**
    *   (Response details will depend on the backend, typically successful request would respond with a JWT token)
*   **Notes:**
    *   Used for admin authentication.

#### 2. Create Admin by Super Admin

*   **Description:** Creates a new admin account. Only super admins can do this operation.
*   **Method:** `POST`
*  **Endpoint:** `api/v1/admin/create-admin`
*   **Headers:**
    *   `Authorization: Bearer <SUPER_ADMIN_JWT_TOKEN>`
    *   `Content-Type: application/json`
*   **Request Body:**
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
    *  (Response details will depend on the backend, typically successful request would respond with details of new admin or a success message)
*  **Notes:**
     * Only super admin could execute.
     * Requires a valid JWT Super admin token.

#### 3. Create Another Admin by Super Admin
*   **Description:** This is replica of Create Admin by Super Admin with a different email for checking.
*  **Method**: `POST`
*  **Endpoint**:   `api/v1/admin/create-admin`
  **Headers:**
    *   `Authorization: Bearer YOUR_JWT_TOKEN`
    *   `Content-Type: application/json`
*   **Request Body:**
    ```json
    {
        "email": "newadaasdsdsmsdfdin@examasdple.com",
        "password": "securePassword123!",
        "name": "New Admin",
       "permissions": [
            "manage_users",
            "view_user_details",
           "manage_content"
        ]
   }
    ```
    *  **Response**:
       * (Response details will depend on the backend, typically successful request would respond with details of new admin or a success message)
*  **Notes**:
       * Only super admin could execute.
       * Requires a valid JWT Super admin token.

#### 4. Get All Admins

*   **Description:** Retrieves a list of all admin accounts.
*   **Method:** `GET`
*   **Endpoint:** `/api/v1/admin/get-all-admins`
*   **Headers:**
     *     `Authorization: Bearer <SUPER_ADMIN_JWT_TOKEN>`
*   **Response:**
    *  (Response details will depend on the backend, typically successful request would return a list of all admins)
*   **Notes:**

    *   Requires super admin authentication.
*   **Body:** This route does not use a request body, so can be left empty.

#### 5. Delete Admins

*   **Description:** Deletes an admin account by its ID.
*    **Method:** `DELETE`
*   **Endpoint:** `/api/v1/admin/delete-admin/{adminId}`
*  **Headers:**
     *   `Authorization: Bearer <ADMIN_JWT_TOKEN>`
 *   **Path Parameter:**
    * `adminId` : The ID of the admin to be deleted.(e.g.,  675d5a34211f8b30cfadf3b5)

*   **Response:**
    *    (Response details will depend on the backend, typically successful request would return success message)
*   **Notes:**
    *   Requires admin or super admin authorization.
    *  The admin ID is passed din the URL.

#### 6. Get Admin Details

*  **Description:** Retrieves details of admin by their ID.
*   **Method:** `GET`
*   **Endpoint:** `/api/v1/admin/get-admin-details/{adminId}`
*   **Headers:**
    * `Authorization: Bearer <ADMIN_JWT_TOKEN>`
*   **Path Parameter:**
        * `adminId` : The ID of the admin to get the details.(e.g., 675d5a34211f8b30cfadf3b5)
*   **Response:**
      *   (Response details will depend on the backend, typically successful request would return user details)
*   **Notes:**
    *  Admin or super admin should be authenticated.
    *   admin ID must be in the path parameter
*   **Body:** This route does not use a request body, so can be left empty.

#### 7. Update Admin Permissions

* **Description**: update the admin permissions of the targeted admins using their id.
* **Method:** `GET`
*  **Endpoint**: `/api/v1/admin/get-admin-details/{adminId}`
*  **Headers**:
  * `Authorization: Bearer  <ADMIN_JWT_TOKEN>`
* **Path Parameter**:
    * `adminId` :  The ID of the admin to update.(e.g., 675d5a34211f8b30cfadf3b5)

*   **Response:**
     *  (Response will depend on the backend, typically returning the updated user details or a success message.)

 *  **Notes**:
    * Admin or super admin authentication is needed.
    * admin ID must be correct.
* **Body:** This route does not use a request body, so can be left empty.
---

## User

### Subscribe

#### 1. Get Current Plan

*   **Description:** Retrieves the current subscription plan details of the authorized user.
*   **Method:** `GET`
*   **Endpoint:** `/api/v1/users/subscription`
*   **Headers:**
    * `Authorization: Bearer <USER_JWT_TOKEN>`
*   **Response:**
      *  (Response details will depend on the backend, typically a request would respond with details of user's current subscription.)
*   **Notes:**

    *  Requires User authentication with  JWT token

 *  **Body:** This route does not use a request body, so can be left empty.

#### 2. Cancel Subscription

*   **Description:** Allows a user to cancel their active subscription plan.
*   **Method:** `POST`
*   **Endpoint:** `/api/v1/users/cancel-subscription`
*   **Headers:**
    * `Content-Type: application/json`
    *   `Authorization: Bearer <USER_JWT_TOKEN>`
*   **Request Body:**
    ```json
    {
       "reason": "my wish why do u wanna know "
   }
  ```
*   **Response:**
    *    (Response details will depend on the backend, typically successful request would return a success message.)
*   **Notes:**

    *  Requires User authentication with  JWT token.
#### 3. Subscribe a Plan

*   **Description:** Allows a user to subscribe to a plan.
*   **Method:** `POST`
*   **Endpoint:** `/api/v1/users/subscribe`
*   **Headers:**
 *   `Content-Type: application/json`
    *    `Authorization: Bearer <USER_JWT_TOKEN>`
*   **Request Body:**
    ```json
   {
       "planId": "6763d06487f004a49970fd5a",
        "billingCycle": "monthly"
   }
    ```
*   **Response:**
     *  (Response details will depend on the backend, typically successful request would return subscription details.)
*  **Notes:**
    *   Requires a valid user token in the Authorization header.

#### 4. Update Plan

*   **Description:** Allows a user to update their active plan .
*   **Method:** `PUT`
*   **Endpoint:** `/api/v1/users/subscription/update`
*   **Headers:**
    * `Content-Type: application/json`
    *    `Authorization: Bearer <USER_JWT_TOKEN>`
*   **Request Body:**
   ```json
  {
         "planId": "6763d06487f004a49970fd5a",
          "billingCycle": "monthly"
   }
   ```
*   **Response:**
     *  (Response details will depend on the backend, typically successful request would return subscription details)
*  **Notes:**
    *   Requires a valid user token in the Authorization header.

### User Operations

