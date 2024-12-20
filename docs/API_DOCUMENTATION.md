# SocioX

Okay, here is the comprehensive API documentation for the provided Postman collection, structured as requested:

## SocioX API

### Overview
The SocioX API provides functionalities for user authentication, subscription management, and administrative tasks. It allows users to register, login, manage their subscriptions, and for administrators to handle users, subscriptions, and other administrative tasks. The API supports both parent and child user types, each with varying levels of access and permissions.

### Authentication
The SocioX API uses JSON Web Tokens (JWT) for authentication. Most endpoints require a valid JWT in the `Authorization` header as a bearer token. Ensure to include `Bearer` prefix e.g., `Bearer your_token_here`.

### Endpoints

### Auth

#### 1. Register parent email
*   **Description**: Registers a new parent user.
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/auth/register`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Request Body**:

    ```json
    {
        "email": "xnikunjadu@gmail.com",
        "password": "yourpassword123",
        "name": "Test User"
    }
    ```
*   **Response**:
      *   On Success: 201 (Created)
    *   A valid JWT in the response.
 *   **Response Example**:

     ```json
      {
          "token":"your-generated-jwt-token",
           "message": "User created successfully"
      }
    ```
*   **Notes**:
    *   The password should be securely hashed on the server side.

#### 2. Register child email
*   **Description**: Registers a new child user under a parent account.
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/users/child-users`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <parent_jwt_token>`

*   **Request Body**:

    ```json
    {
        "email": "child@example.com",
        "password": "childewqepassword123",
        "name": "Child User",
        "permissions": ["create_posts", "view_analytics"]
    }
    ```
*   **Response**:
      *   On Success: 201 (Created)
    *   A valid JWT in the response.
*   **Response Example**:

     ```json
      {
          "token":"your-generated-jwt-token",
           "message": "User created successfully"
      }
    ```
*   **Notes**:
    *   Requires a valid parent JWT for authorization.
    *   Permissions can be tailored to your application's needs.
  

#### 3. Login email
*   **Description**: Logs in an existing user via email and password.
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/auth/login`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Request Body**:

    ```json
    {
        "email": "john@example.com",
        "password": "childewqepassword123"
    }
    ```
* **Response**:
    *   On success: 200 (ok)
    *   A valid JWT token in the response.
*   **Response Example**:
        ```json
        {
        "token":"your-generated-jwt-token"
           "message": "Logged in successfully"
        }
    ```
*  **Notes**:
    *   The password should be securely hashed on server.
  

#### 4. Forgot Password
*   **Description**: Initiates the password reset process by sending an OTP (One-Time Password) to user email.
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/auth/forgot-password`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Request Body**:

    ```json
    {
        "email": "xnikunjadu2@gmail.com"
    }
    ```
*   **Response**:
    *    On Success: 200 (ok)
    *   Response message containing the status of task.
*   **Response Example**:
    ```json
        {
           "message": "Password reset OTP send to your register email"
        }
    ```
*   **Notes**:
    *   The server should generate and store a time-sensitive OTP for the email.

#### 5. Reset Email Password
*   **Description**: Resets user password after OTP verification.
*   **Method**: `POST`
*  **URL**: `http://localhost:5000/api/auth/reset-password`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Request Body**:

    ```json
    {
        "email": "xnikunjadu2@gmail.com",
        "otp": "360892",
        "newPassword": "your-new-password"
    }
    ```
  **On Success**: 200 (Ok)
*   **Response**:
    *  A success message
*  **Response Example**:
     ```json
        {
           "message": "Password reset  successfully"
        }
    ```
*   **Notes**:
    *   The server should verify the OTP and update the password after secure hashing.

### Admin

#### User Subscription

##### 1. Subscribe user plan
*   **Description**: Subscribes a user to a specific plan.
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/admin/users/{userId}/subscription`
*   **Headers**:
    *   `Content-Type: application/json`
    *  `Authorization: Bearer <admin_jwt_token>`
*   **Request Body**:

    ```json
    {
        "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
    }
    ```
*   **Response**:
           *    On Success: 201 (Created)
      * Success message along the plan details.
*   **Notes**:
    *   Requires admin authentication via JWT.
    *   The `userId` should be path variable and a valid user ObjectId

##### 2. Cancel user plan
*   **Description**: Cancels a user's active subscription.
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/admin/users/{userId}/subscription/cancel`
 *  **Headers**:
    *  `Content-Type: application/json`
    *  `Authorization: Bearer <admin_jwt_token>`
*   **Request Body**:

    ```json
    {
        "reason": "i dont really know the reason"
    }
    ```
*   **Response**:
    *   On Success: 200 (Ok)
    *  A success message
*   **Notes**:
    *  Requires admin authentication via JWT.
    * `userId` should be a valid mongoDB ObjectId.

##### 3. get sub by userId
*   **Description**: Retrieves a user's subscription details.
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/admin/users/{userId}/subscription`
*  **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <admin_jwt_token>`

*  **Response**:
    *    On Success: 200 (Ok)
    *   subscription details
*   **Notes**:
     *  Requires admin authentication via JWT.
    *   `userId` should be a valid mongoDB ObjectId.

##### 4. Update sub by userId
*   **Description**: Updates a user's subscription details.
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/admin/users/{userId}/subscription/update`
*    **Headers**:
        *   `Content-Type: application/json`
        *   `Authorization: Bearer <admin_jwt_token>`
*   **Request Body**:

    ```json
    {
        "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
    }
    ```
*   **Response**:
   *    On Success: 200 (Ok)
  *   Updated plan details
*   **Notes**:
    *  Requires admin authentication via JWT.
    *   `userId` should be a valid mongoDB ObjectId.

#### Subscription Management

##### 1. Get Plans
*   **Description**: Retrieves a list of subscription plans based on query parameters.
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/v1/admin/subscription/plans`
*   **Query Parameters**:
    *   `category`: Filter by Plan Category (e.g., enterprise, basic).
    *   `status`: Filter by plan status (e.g., active, inactive )
    *   `name`: filter by plan name
*   **Headers**:
    *   `Authorization: Bearer <admin_jwt_token>`
*   **Response**:
    *   On Success: 200 (Ok)
    *   A list of plan objects in the body
*   **Notes**:
    *   Requires admin authentication via JWT.
    * Example URL: `http://localhost:5000/api/v1/admin/subscription/plans?category=enterprise&status=active&name=premium`

#####  2. Get Plans by id
    *  **Description**: Retrieves a subscription plan's details based on plan id.
    *  **Method**: `GET`
    *  **URL**: `http://localhost:5000/api/admin/subscription/plans/{planId}`
    *   **Headers**:
        *   `Authorization: Bearer <admin_jwt_token>`
    *  **Response**:
        * On Success: 200 (Ok)
        *   Plan object
    *   **Notes**:
        *   Requires admin authentication via JWT.
        * `planId` should be a valid mongoDB ObjectId.

##### 3. Update custom features

*   **Description**: Updates custom features for a specific subscription plan.
*   **Method**:  `PATCH`
*   **URL**: `http://localhost:5000/api/admin/subscription/plans/{planId}/features`
*    **Headers**:
        *   `Authorization: Bearer <admin_jwt_token>`
        *  `Content-Type: application/json`
*   **Request Body**:

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
*   **Response**:
        *   On Success: 200 (Ok)
        *   Confirmation message along with plan object
*   **Notes**:
        *  Requires admin authentication via JWT.
        *   `planId` should be a valid mongoDB ObjectId.

##### 4. Create plan
    *   **Description**: Creates a new subscription plane
    *   **Method**: `POST`
    *   **URL**: `http://localhost:5000/api/admin/subscription/plans/`
    *    **Headers**:
            *   `Authorization: Bearer <admin_jwt_token>`
            *    `Content-Type: application/json`
    *   **Request Body**:
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
    * **Response**:
         *On Success: 201 (Created)
        *    A success message with new created plan object.
   *   **Notes**:
            *  Requires admin authentication via JWT.
##### 5. Update plan

*   **Description**: Updates an existing subscription plan's overall structure and attributes.
*   **Method**: `PUT`
*   **URL**: `http://localhost:5000/api/admin/subscription/plans/{planId}`
*    **Headers**:
        *   `Authorization: Bearer <admin_jwt_token>`
        *    `Content-Type: application/json`
*   **Request Body**:
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
*   **Response**:
      *    On Success: 200 (Ok)
      *    A success message including the updated plan details
*   **Notes**:
        *  Requires admin authentication via JWT.
        *   `planId` should be a valid mongoDB ObjectId.

##### 6. Update plan status
*  **Description**: Updates the status (e.g., active, inactive) of a specified plan
 *   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/subscription/admin/plans/{planId}/status`
*    **Headers**:
        *    `Content-Type: application/json`
        *    `Authorization: Bearer <admin_jwt_token>`
*   **Request Body**:
     ```json
     {
         "status": "active"
     }
     ```
 * **Response**:
        *    On Success: 200 (Ok)
        *  A success message with the updated fields.
*   **Notes**
     *     Requires admin authentication via JWT.
        *  `planId` should be a valid mongoDB ObjectId.
##### 7. Delete plan
    *  **Description**:  Deletes a plan from the system.
    * **Method**: `DELETE`
    *  **URL**: `http://localhost:5000/api/subscription/admin/plans/{planId}`
 *    **Headers**:
        *   `Content-Type: application/json`
        *   `Authorization: Bearer <admin_jwt_token>`
*   **Response**:
    *    On Success: 200 (Ok)
    *   A Success Message
*   **Notes**:
    *   Requires admin authentication via JWT.
    *   `planId` should be a valid mongoDB ObjectId.

##### 8. update both ( features and CustomFeatures)
*  **Description**: Updates both the standard and custom features of subscription plan.
    * **Method**: `PUT`
 *  **URL**: `http://localhost:3000/api/subscriptions/plan-features/{planId}`
 *    **Headers**:
        *    `Content-Type: application/json`
        *   `Authorization: Bearer <admin_jwt_token>`
*   **Request Body**:
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
*   **Response**:
    *   On Success: 200 (ok)
     *  A success message along the updated features.
*   **Notes**:
    *   Requires admin authentication via JWT.
   * `planId` should be a valid mongoDB ObjectId.

##### 9. update standard feature
*  **Description**: Updates the standard features of a subscription plan
*  **Method**: `PUT`
 *    **URL**: `http://localhost:3000/api/subscriptions/plan-features/{planId}`
 *    **Headers**:
        *    `Content-Type: application/json`
        *    `Authorization: Bearer <admin_jwt_token>`
*  **Request Body**:

        ```json
        {
                    "features": {
                        "teamMembers": 15,
                        "support": "24/7"
                    }
        }
        ```
*  **Response**:
         *    On Success: 200 (ok)
         *    A success message including updated plan features
* **Notes**:
        *   Requires admin authentication via JWT.
        *  `planId` should be a valid mongoDB ObjectId.

#####  10. GET PLAN BY GATAGOTIES
 *   **Description**: Get plan based upon categories.
    *  **Method**: `GET`
 *  **URL**: `http://localhost:3000/api/subscriptions/plan-features`
 *    **Headers**:
        *   `Authorization: Bearer <admin_jwt_token>`
* **Response**:
    *    On Success: 200 (ok)
    *    list of plans
* **Notes**:
       *   Requires admin authentication via JWT.

#### User Management

##### 1. Reactivate user
*   **Description**: Reactivates a user account which is deactivated.
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/admin/users/{userId}/reactivate`
 *    **Headers**:
        *   `Authorization: Bearer <admin_jwt_token>`
*    **Response**:
        *   On Success: 200 (Ok)
        *   Success message
*   **Notes**:
    *  Requires admin authentication via JWT.
    *   `userId` should be a valid mongoDB ObjectId.

##### 2. Get List of users
*   **Description**: Fetches a list of all users.
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/v1/admin/users`
    *   **Headers**:
        *    `Content-Type: application/json`
        *    `Authorization: Bearer <admin_jwt_token>`
*   **Response**:
    * On Success: 200 (Ok)
     *   A list of user objects
*   **Notes**:
     *      Requires admin authentication via JWT.

##### 3. User delete
*   **Description**:  Deletes a specified user.
*   **Method**: `DELETE`
*   **URL**: `http://localhost:5000/api/admin/users/{userId}`
  *   **Headers**:
     *   `Authorization: Bearer <admin_jwt_token>`
*  **Response**:
    *    On Success: 200 (Ok)
    *   A message confirming user deletion
* **Notes**:
     *    Requires admin authentication via JWT.
    *   `userId` should be a valid mongoDB ObjectId.

#####  4. Deactivate User
*   **Description**: Deactivates a user
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/admin/users/{userId}/deactivate`
*    **Headers**:
        *   `Authorization: Bearer <admin_jwt_token>`
*   **Response**:
  * On Success 200 (ok)
        *   A success message
*   **Notes**:
    * Requires admin authentication via JWT.
    *   `userId` should be a valid mongoDB ObjectId.

##### 5. Complete user details by id
*  **Description**: Fetches details about a specific user by id.
*   **Method**: `GET`
*  **URL**:  `http://localhost:5000/api/admin/users/{userId}/details`
*   **Headers**:
    *   `Authorization: Bearer <admin_jwt_token>`
*   **Response**:
    *    On Success: 200 (Ok)
    *   User details along with profile and subscription object
* **Notes**:
    *   Requires admin authentication via JWT.
    *   `userId` should be a valid mongoDB ObjectId.
  

##### 6. Send reset password link
*   **Description**:  Sends a password reset link to a user email.
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/admin/users/sendPasswordResetLink`
*    **Headers**:
        *   `Authorization: Bearer <admin_jwt_token>`
*   **Request Body**:

    ```json
    {
        "email": "xnikunjadu2@gmail.com"
    }
    ```
*  **Response**:
    *    On Success: 200 (ok).
     *  A success message
*  **Notes**:
       *   Requires admin authentication via JWT.

##### 7. Reset user password
*  **Description**: Reset user password using JWT token.
 *  **Method**: `POST`
*   **URL**: `http://localhost:5000/api/admin/users/reset-password`
 *    **Headers**:
        *   `Authorization: Bearer <admin_jwt_token>`
*   **Request Body**:
     ```json
    {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDQzZWZiY2VmZmEyODEwYmU0YmUiLCJpYXQiOjE3MzQ1MDg1ODgsImV4cCI6MTczNDUxMjE4OH0.e17UzfnRrBCAqXkWfP9LWmN3UZyaSFaQtEz7keJDrhY",
        "newPassword":"123456"
    }
    ```
*    **Response**:
        * On Success: 200 (ok)
     *   A success Message
*   **Notes**:
         *   Requires admin authentication via JWT.

#### Admin Management
##### 1. Admin Login
    *  **Description**: Logs in an admin user with their credentials.
    *  **Method**: `POST`
    * **URL**: `http://localhost:5000/api/v1/admin/login`
*    **Headers**:
        *   `Content-Type: application/json`
*   **Request Body**:
    ```json
    {
       "email": "nikunjadu2@gmail.com",
       "password": "nikunjadu2"
     }
    ```
*  **Response**:
        * On Success 200 (ok)
     *    A Valid JWT token along with confirmation message
*   **Notes**:
         *   Admin password will be handled on server side.

##### 2. Create admin by superAdmin
*   **Description**: Creates  new admin user by a super admin account.
*   **Method**: `POST`
*   **URL**:  `http://localhost:5000/api/v1/admin/create-admin`
*    **Headers**:
         *   `Content-Type: application/json`
         *  `Authorization: Bearer <super_admin_jwt_token>`
*   **Request Body**:

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
*   **Response**:
    *   On Success 201 (Created)
     *  A  success messages along  created admin details.
*   **Notes**:
    * Requires super admin authentication via JWT.
   

##### 3. Create admin by superAdmin
*   **Description**: Creates a new admin user (duplicate of above one).
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/admin/create-admin`
*   **Headers**:
    *   `Authorization: Bearer <super_admin_jwt_token>`
    *   `Content-Type: application/json`
*   **Request Body**:

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
*   **Response**:
    *    On Success 201 (Created)
    *  A success messages.
*   **Notes**:
    * Requires super admin authentication via JWT.
    *   Duplicate of Endpoint 2.

##### 4. Get all admins
*   **Description**: Retrieve all list of admin users
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/v1/admin/get-all-admins`
*    **Headers**:
        *    `Authorization: Bearer <super_admin_jwt_token>`
*   **Response**:
    *    On Success 200 (Ok)
    *  A list of all admin accounts.
*   **Notes**:
    *   Requires super admin authentication via JWT.

##### 5. Delete admins
*   **Description**: Deletes an admin
*   **Method**: `DELETE`
*   **URL**:  `http://localhost:5000/api/v1/admin/delete-admin/{adminId}`
 *    **Headers**:
         *`Authorization: Bearer <admin_jwt_token>`
*   **Response**:
        * On Success: 200
    *  Confirmation message
*   **Notes**:
    * Requires admin authentication via JWT.
    *   `adminId` should be a valid mongoDB ObjectId.

##### 6. Get admin details
*  **Description**: Get details of a specific admin user by their ID
*  **Method**: `GET`
*  **URL**: `http://localhost:5000/api/v1/admin/get-admin-details/{adminId}`
*   **Headers**:
     * `Authorization: Bearer <admin_jwt_token>`
* **Response**:
    *  On Success: 200 (Ok)
     * Specific admin details
* **Notes**:
     *   Requires admin authentication via JWT.
     *`adminId` should be a valid mongoDB ObjectId.

##### 7. Update admin permission
*   **Description**: Updates the permissions of admin.
*  **Method**: `GET`
* **URL**: `http://localhost:5000/api/v1/admin/get-admin-details/{adminId}`
*   **Headers**:
      *    `Authorization: Bearer <admin_jwt_token>`
* **Response**:
    *   On Success: 200 (ok)
   *    Update admin permission success message
* **Notes**:
    *   Requires admin authentication via JWT.
     *  `adminId` should be a valid mongoDB ObjectId.
### User
#### Subscribe

    ##### 1. Get Current Plan
*  **Description**: Get a current user subscription's details.
* **Method**: `GET`
* **URL**: `http://localhost:5000/api/v1/users/subscription`
*   **Headers:**
        * `Authorization: Bearer <user_jwt_token>`
* **Response**:
    *    On Success: 200 (Ok)
    *   Subscription plan object.
*   **Notes**:
        *   Requires user authentication via JWT.

##### 2. Cancel sub
*  **Description**: Cancel a user subscription plan by valid user JWT token.
  * **Method**: `POST`
 *  **URL**: `http://localhost:5000/api/v1/users/cancel-subscription`
*   **Headers**:
        *   `Content-Type: application/json`
        *    `Authorization: Bearer <user_jwt_token>`
* **Request Body**:

    ```json
    {
      "reason": "my wish why do u wanna know "
     }
     ```
* **Response**:
    * On Success 200(ok)
    *   A Confirmation Message
* **Notes:**
    *     Requires user authentication via JWT.

##### 3. Subscribe a plan
*  **Description**:  Subscribes user to a new plan.
 *   **Method**: `POST`
*  **URL**: `http://localhost:5000/api/v1/users/subscribe`
*   **Headers**:
        *    `Content-Type: application/json`
        *   `Authorization: Bearer <user_jwt_token>`
*  **Request Body**:
    ```json
  {
        "planId": "6763d06487f004a49970fd5a",
        "billingCycle": "monthly"
   }
  ```
*   **Response**:
        * On Success 201 (Created)
        *   Success Message along with the user subscription details
*   **Notes**:
        *    Requires user authentication via JWT.

##### 4. Update Plan
*   **Description** :   Update a user's subscription plan.
*   **Method**: `PUT`
 *   **URL**: `http://localhost:5000/api/v1/users/subscription/update`
*    **Headers**:
       *   `Authorization: Bearer <user_jwt_token>`
       * `Content-Type: application/json`
*   **Request Body**:
    ```json
      {
            "planId": "6763d06487f004a49970fd5a",
            "billingCycle": "monthly"
      }
   ```
*   **Response**:
    *   On Success 200(ok)
   * A success message including update plan details.
*  **Notes**:
    *       Requires user authentication via JWT.

#### User Operation

##### 1. User Details
*  **Description**: Get detail information about logged in user
 *   **Method**: `GET`
*  **URL**: `http://localhost:5000/api/users/details`
 * **Headers**:
      * `Authorization: Bearer <user_jwt_token>`
* **Response**:
     *  On Success 200 (ok)
   *  User's profile details.
* **Notes**:
    *  Requires user authentication via JWT.

##### 2. Delete User
*  **Description**: Initiates a delete process, send verification email to the user.
 * **Method**: `POST`
* **URL**: `http://localhost:5000/api/v1/users/delete`
*   **Headers**:
     *  `Authorization: Bearer <admin_jwt_token>`
*   **Response**
   *  On Success: 200 (Ok)
    * Confirmation message for verification email.
*   **Notes**:
   * Requires admin authentication via JWT.

##### 3. Confirm delete user
*  **Description**: Confirms and completes the  deletion process of user account.
*  **Method**: `POST`
* **URL**:  `http://localhost:5000/api/users/confirm-delete`
* **Headers**:
      * `Authorization: Bearer <user_jwt_token>`
* **Request Body**:
    ```json
    {
      "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDAxODRkNGE2NjJiMjVkZTc1MTgiLCJpYXQiOjE3MzQ0MjY2NjUsImV4cCI6MTczNDQzMDI2NX0.sEFZye1spypGkzc6pIIOwh_x7Xg6qMN3Woaw3wqowm0"
    }
    ```
* **Response**:
        *   On Success: 200
        *   Confirmation message