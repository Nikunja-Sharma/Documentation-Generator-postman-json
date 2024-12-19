# SocioX

```markdown
# SocioX API Documentation

## Overview

This document outlines the API endpoints for the SocioX application. It covers authentication, user management, subscription management, and admin functionalities.

## Authentication (Auth)

### 1. Register Parent Email
   * **Description:** Registers a new parent user with an email and password.
   * **Method:** `POST`
   * **Endpoint:** `/api/v1/auth/register`
   * **Headers:**
     *   `Content-Type: application/json`
   * **Request Body:**
      ```json
      {
        "email": "parent@example.com",
        "password": "yourpassword123",
        "name": "Parent User"      
      }
      ```
   * **Response:** 
          *  A successful registration will typically return a 201 status code.
          *  Errors may include 400 for bad request, 409 for email already taken. Details see resonse body.
  
   * **Notes:** Use this endpoint to onboard a new parent user to the application.

### 2. Register Child Email
   * **Description:** Registers a new child user under a specific parent account.
   * **Method:** `POST`
    * **Endpoint:** `/api/users/child-users`
   * **Headers:**
      *   `Content-Type: application/json`
      *   `Authorization: Bearer <parent_token>` (must be a parent's valid JWT)
   * **Request Body:**
      ```json
      {
        "email": "child@example.com",
        "password": "childpassword123",
        "name": "Child User", 
        "permissions": ["create_posts", "view_analytics"]
      }
      ```
   * **Response:** 
        * A successful registration will typically return a 201 status code.
        * Errors may include 400 for bad request, 401 if authorization is invalid, 409 for email already taken. Details see resonse body.
   * **Notes:** A valid parent JWT is required in the Authorization header.
   
### 3. Login Email
    * **Description:** Logs in a user with email address and password.
    * **Method:** `POST`
    * **Endpoint:** `/api/v1/auth/login`
    * **Headers:**
        * `Content-Type: application/json`
    * **Request Body:**
    ```json
     {
       "email": "john@example.com",
       "password": "userpassword"
    }
    ```
    * **Response:**
        * A successful login will return a 200 status code as well as a JWT access token in the body.
        * Errors may include 400 for bad request, 401 for invalid credentials. Details see response body for details.
    * **Notes:** The response body include  `accessToken`, `user` details, and other user details.

### 4. ForgotPassword
    * **Description:** Initiates the password reset process for a user.
    * **Method:** `POST`
    * **Endpoint:** `/api/auth/forgot-password`
    * **Headers:**
        * `Content-Type: application/json`
    * **Request Body:**
    ```json
     {
       "email": "forgot@example.com"
     }
    ```
    * **Response:**
      * A successful request will return a 200 status code.
      * Errors may include 400 for bad request, 404 if email doesnt exist. Details see response body for details.
   * **Notes:** This endpoint sends a reset password link to user email.

### 5. Reset Email Password
    * **Description:** Resets a user's password after they have requested a password reset link.
    * **Method:** `POST`
    * **Endpoint:** `/api/auth/reset-password`
    * **Headers:**
        * `Content-Type: application/json`
    * **Request Body:**
    ```json
        {
           "email": "forgot@example.com",
           "otp": "123456",
           "newPassword": "new_password_user" 
        }
    ```
    * **Response:**
           * A successful request will return a 200 status code.
           * Errors may include 400 for bad request, 401 for invalid credentials. Details see response body for details.
    
    * **Notes:** Requires the user's email, OTP (One Time Password), and the new password

## Admin

### User Subscription
   
#### 1. Subscribe User Plan
    * **Description:** Subscribes a user to a specific subscription plan.
    * **Method:** `POST`
    * **Endpoint:** `/api/v1/admin/users/:userId/subscription` (`:userId` should be replaced with the actual user ID.)
    * **Headers:**
        * `Content-Type: application/json`
        * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Request Body:**
    ```json
        {
           "planId": "67616c378c821544d3c5400b",
           "billingCycle": "monthly"
        }
    ```
    * **Response:**
          * A successful request will return a 201 status code.
          * Errors may include 400 for bad request, 401 if authorization is invalid. Details see response body for details.
    * **Notes:** Requires a valid admin JWT token for authorization.

#### 2. Cancel User Subscription
    * **Description:** Cancels a user's active subscription.
    * **Method:** `POST`
    * **Endpoint:** `/api/v1/admin/users/:userId/subscription/cancel` (`:userId` should be replaced with the actual user ID.)
    * **Headers:**
        * `Content-Type: application/json`
       * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Request Body:**
    ```json
      {
          "reason": "subscription cancellation reason"
      }
    ```
    * **Response:**
           * A successful request will return a 200 status code.
           * Errors may include 400 for bad request, 401 if authorization is invalid. Details see response body for details.
    * **Notes:** Requires a valid admin JWT token for authorization.

#### 3. Get Subscription By User Id
    * **Description:** Retrieves the subscription details for a specific user.
    * **Method:** `GET`
    * **Endpoint:** `/api/admin/users/:userId/subscription` (`:userId` should be replaced with the actual user ID.)
    * **Headers:**
        * `Content-Type: application/json`
        * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Response:** 
          * A successful request will return a 200 status code along with subscription details in response body.
          * Errors may include 400 for bad request, 401 if authorization is invalid or 404 if user not found. Details see response body for details.
    * **Notes:** Requires a valid admin JWT token for authorization.

 ####  4. Update Subscription By User Id
     * **Description:** Updates an existing user's subscription plan.
     * **Method:** `POST`
     * **Endpoint:** `/api/admin/users/:userId/subscription/update` (`:userId` should be replaced with the actual user ID.)
     * **Headers:**
        *  `Content-Type: application/json`
         * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
      * **Request Body:**
     ```json
      {
          "planId": "67616c378c821544d3c5400b",
          "billingCycle": "monthly"
      }
     ```
     * **Response:**
            * A successful request will return a 200 status code.
            * Errors may include 400 for bad request, 401 if authorization is invalid. Details see response body for details.
     * **Notes:** Requires a valid admin JWT token for authorization.

### Subscription Management
#### 1. Get Plans
   *  **Description:** Retrieves a list of subscription plans.
   *  **Method:** `GET`
   *  **Endpoint:** `/api/v1/admin/subscription/plans`
   *  **Query Parameters:**
        * `category` (optional): Filters plans by category .
        * `status` (optional): Filters plans by status.
         * `name` (optional): Filters plans by plan name.
   * **Headers:**
        * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
   * **Response:**
        * Will return a 200 status code and a list of plans with details in the response body.
       * Errors may include 400 for bad request, 401 for invalid authorization. Details see response body for details.

  * **Notes:** Apply the required filters using query parameters.

#### 2. Get Plans By Id
   * **Description:** Retrieves a single subscription plan by its ID.
   * **Method:** `GET`
   * **Endpoint:** `/api/admin/subscription/plans/:planId` (`:planId` should be replaced with the actual plan ID.)
   *  **Headers:**
         * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Response:**
        * A successfull request will return a 200 status code with plan details in response body
        * Errors include 400 for bad requests, 401 if authorization is invalid, 404 if plan is not found. Details see response body for details.


   * **Notes:** Use to fetch details of a specific plan.

  
#### 3. Update Custom Features 
   *  **Description:** Updates the custom features of a specific subscription plan.
   *  **Method:** `PATCH`
   *  **Endpoint:** `/api/admin/subscription/plans/:planId/features` (`:planId` should be replaced with the actual plan ID.)
   *  **Headers:**
        * `Content-Type: application/json`
         * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
   *  **Request Body:**
    ```json
      {
        "customFeatures": ["White label reports", "Custom URL shortener", "Advanced team permissions", "API rate limit increase"]
      }
    ```
   * **Response:** 
        * A successful request returns a 200 status code.
        * Errors may include 400 for bad request and 401 for invalid authorization. Details see response body for details.
   * **Notes:** This endpoint updates only the custom features of the plan.

#### 4. Create Plan
    * **Description:** Creates a new subscription plan.
    * **Method:** `POST`
    * **Endpoint:** `/api/admin/subscription/plans`
    * **Headers:**
        * `Content-Type: application/json`
         * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Request Body:**
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
    * **Response:**
           * A succesful request returns a 201 status code along with new subscription plan id in response body.
           * Errors may include 400 for bad request and 401 for invalid authorization. Details see response body for details.
   * **Notes:** Use to create new subscription plan with all required fields

#### 5. Update Plan
    * **Description:** Updates an existing subscription plan.
    * **Method:** `PUT`
    * **Endpoint:** `/api/admin/subscription/plans/:planId` (`:planId` should be replaced with the actual plan ID.)
    * **Headers:**
        * `Content-Type: application/json`
         * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Request Body:**
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
    * **Response:**
           * A successful request will return a 200 status code.
           * Errors may include 400 for bad request and 401 for invalid authorization or 404 if plan does not exist. Details see response body for details.
    *  **Notes:**  Use this to modify details for a specific plan.

#### 6. Update Plan Status
    * **Description:** Updates the status of a specific subscription plan.
    * **Method:** `POST`
    * **Endpoint:** `/api/subscription/admin/plans/:planId/status` (`:planId` should be replaced with the actual plan ID.)
    * **Headers:**
        * `Content-Type: application/json`
         * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Request Body:**
   ```json
      {
          "status": "active"
      }
   ```
    * **Response:**
            * A successfull request will return a 200 status code.
            * Errors may include 400 for bad request and 401 for invalid authorization or 404 if plan not exist. Details see response body for details.

    * **Notes:** This allows to enable or disable a plan.

#### 7. Delete Plan
    * **Description:** Deletes a specific subscription plan.
    * **Method:** `DELETE`
    * **Endpoint:** `/api/subscription/admin/plans/:planId` (`:planId` should be replaced with the actual plan ID.)
    * **Headers:**
         * `Content-Type: application/json`
         * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Response:**
         * A successfull request will return a 200 status code.
         * Errors may include 400 for bad request, 401 for invalid authorization, and 404 if plan is not found. Details see response body for details.
    * **Notes:** This endpoint allows to remove a plan completely.

#### 8. Update Both Features
    * **Description:** Updates both standard and custom features of a specific subscription plan.
    * **Method:** `PUT`
    * **Endpoint:** `/api/subscriptions/plan-features/:planId` (`:planId` should be replaced with the actual plan ID.)
    * **Headers:**
         * `Content-Type: application/json`
         * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Request Body:**
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
    * **Response:** 
          * A successfull request will return a 200 status code.
           * Errors may include 400 for bad request, 401 for invalid authorization, and 404 if plan is not found. Details see response body for details.
    * **Notes:** Use this to update both standard and custom features of a plan in one shot.

####  9. Update Standard Feature
   *  **Description:** Updates only the standard feature of a subscription plan.
   *  **Method:** `PUT`
   *  **Endpoint:** `/api/subscriptions/plan-features/:planId` (`:planId` should be replaced with the actual plan ID.)
   *  **Headers:**
        *  `Content-Type: application/json`
        * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
   *  **Request Body:**
    ```json
      {
        "features": {
          "teamMembers": 15,
         "support": "24/7"
         }
      }
     ```
   *  **Response:**
          * A successfull request will return a 200 status code.
          *  Errors may include 400 for bad request and 401 for invalid authorization, 404 if plan not exist. Details see response body for details.
  *  **Notes:** Use this when you only want to modify the standard set of pre-defined features.

#### 10. Get Plan By Categories
  *  **Description:** Fetch plans based on categories
  *  **Method:** `GET`
  *  **Endpoint:** `/api/subscriptions/plan-features/:planId`
  * **Response:** 
        * A successful request returns a 200 status code with list of respective plans with details in response body..
        * Errors may include 400 for bad request, 401 for invalid credential. Details see response body for details.

### User Management
#### 1. Reactivate User
  * **Description:** Reactivates a previously deactivated user account.
     * **Method:** `GET`
     * **Endpoint:** `/api/admin/users/:userId/reactivate` (`:userId` should be replaced with the actual user ID.)
    * **Headers:**
        * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Response:**
           * A successful activation will return a 200 status code
           * Errors may include 400 for bad request, 401 if authorization is invalid, 404 if user not found. Details see response body for details.
    * **Notes:** Requires admin JWT for authorization.

#### 2. Get List Of Users
   * **Description:** Retrieves a list of all users in the system.
   * **Method:** `GET`
   * **Endpoint:** `/api/v1/admin/users`
     * **Headers:**
        * `Content-Type: application/json`
        *  `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
    * **Response:**
          * A successful request returns a 200 status code with a list of the users details in response body.
           * Errors may include 400 for bad request and 401 for invalid authorization.

  * **Notes:** Requires admin JWT for authorization.

####  3. User Delete
    * **Description:** Deletes a specified user from the system.
    * **Method:** `DELETE`
    * **Endpoint:** `/api/admin/users/:userId` (`:userId` should be replaced with the actual user ID.)
    * **Headers:**
        *  `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
        * `Content-Type: application/json`
     * **Response:**
            * A successful deletion will return a 200 status code
            * Errors may include 400 for bad request, 401 if authorization is invalid, 404 if user or admin not found. Details see response body for details.

    *  **Notes:**Requires admin JWT for authorization. This should delete the user completely from the database.

#### 4. Deactivate User
    * **Description:** Deactivates a user account, preventing them from accessing the system.
    * **Method:** `GET`
    * **Endpoint:** `/api/admin/users/:userId/deactivate` (`:userId` should be replaced with the actual user ID.)
    * **Headers:**
         * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)

    * **Response:**
           * A successful deactivation will return a 200 status code.
           * Errors may include 400 for bad request, 401 if authorization is invalid, 404 if no user or admin is found. Details see response body for details.
    * **Notes:** Requires valid admin JWT for authorization.

####  5. Complete User Details By Id
  *   **Description:** Gets Complete User details by user id.
  *   **Method:** `GET`
  *   **Endpoint:** `/api/admin/users/:userId/details` (`:userId` should be replaced with the actual user ID.)
  *   **Headers:**
          * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
  *   **Response:**
          * A successful deletion will return a 200 status code with user details in response body.
        * Errors may include 400 for bad request and 401 for invalid authorization or 404 if user or admin is not found. Details see response body for details.
  *   **Notes:**Requires admin JWT for authorization.

#### 6. Send Reset Password Link
    *  **Description:** Sends a password reset link to a specific user using email.
    *  **Method:** `POST`
    *  **Endpoint:** `/api/admin/users/sendPasswordResetLink`
    * **Headers:**
        *  `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
   *  **Request Body:**
   ```json
        {
           "email": "xnikunjadu2@gmail.com"
        }
   ```
    *  **Response:**
        * A successfull reset password request will return a 200 status code.
        *   Errors may include 400 for bad requests, 401 if authorization is invalid, or 404 if user or admin not found. Details see response body for details.
    *  **Notes:** Requires admin JWT for authorization.

####  7. Reset User Password
    *   **Description:** Resets a user's password using a reset token.
    *   **Method:** `POST`
    *   **Endpoint:** `/api/admin/users/reset-password`
       * **Headers:**
            * `Authorization: Bearer <admin_token>` (must be a valid admin JWT)
       * **Request Body:**
    ```json
        {
         "token": "valid-reset-token",
        "newPassword": "user-new-password"
        }
     ```
   * **Response:**
         *  A succesful reset will return a 200 status code
          * Errors may include 400 for bad request and 401 for invalid authorization. Details see response body for details.

    *  **Notes:** Requires a valid reset token, and a new password to complete the process. Requires an admin token.

### Admin Management

#### 1. Admin Login
   * **Description:** Allows an admin user to log in using email and password.
   * **Method:** `POST`
    * **Endpoint:** `/api/v1/admin/login`
   * **Headers:**
        * `Content-Type: application/json`
   * **Request Body:** 
    ```json
     {
         "email": "admin@example.com",
         "password": "adminpassword123"
      }
    ```
  *  **Response:**
         * Returns a 200 status code with a JWT token in the response body.
           * Errors may include 400 for bad request, 401 if credentials are invalid. Details see response body for details.
  * **Notes:** Use this endpoint for logging in admin users.
  
#### 2. Create Admin By Superadmin
    *   **Description:** A super admin can create other admins within the application.
    *   **Method:** `POST`
    *   **Endpoint:** `/api/v1/admin/create-admin`
    *   **Headers:**
             *  `Content-Type: application/json`
            * `Authorization: Bearer <admin_token>` (must be a valid super admin JWT)
        * **Request Body:**
    ```json
        {
            "email": "newadmin@example.com",
           "password": "newadminpassword",
           "name": "New Admin",
           "permissions": ["manage_users", "view_user_details", "manage_content"]
        }
    ```
     *   **Response:**
            *  A successful request returns a 201 status code with the new admin details in the response body.
            * Errors may include 400 for bad request, 401 if authorization is invalid. Details see response body for details.
    *   **Notes:** Requires a valid super admin JWT for authorization

####  3. Get All Admins
    * **Description:** Retrieves the details for all administrator accounts.
    * **Method:** `GET`
   *   **Endpoint:** `/api/v1/admin/get-all-admins`
   *   **Headers:**
             * `Authorization: Bearer <admin_token>` (must be a valid super admin JWT)
   *   **Response:**
         * A successful request will return a 200 status code with user details in response body.
         * Errors may include 400 for bad requests, 401 if authorization is invalid. Details see response body for details.
    * **Notes:** Requires super admin JWT for authorization
  
####  4. Delete Admins
   * **Description:** Super admins can delete existing administrator accounts.
   * **Method:** `DELETE`
   *   **Endpoint:** `/api/v1/admin/delete-admin/:adminId` (`:adminId` should be replaced with the actual admin ID.)
   *   **Headers:**
         *  `Authorization: Bearer <admin_token>` (must be a valid admin JWT with delete permissions)
   *   **Response:**
           * A successful deletion will return a 200 status code.
           *  Errors may include 400 for bad request, 401 if authorization is invalid, 404 when admin not exist. Detail see response body for details.
   *   **Notes:** Requires super admin JWT for authorization.

####  5. Get Admin Details
   *   **Description:** Retrieves the details of a specific administrator account.
   *   **Method:** `GET`
   *   **Endpoint:** `/api/v1/admin/get-admin-details/:adminId` (`:adminId` should be replaced with the actual admin ID.)
    *   **Headers:**
         *  `Authorization: Bearer <admin_token>` (must be a valid admin JWT)

   *   **Response:**
       *  A successful retrieval returns a 200 status code along with details of the requested administrator in the body.
         * Errors may include 400 for bad request, 401 if authorization is invalid, 404 if admin not exist. Detail see response body for details.
   *   **Notes:** Requires admin JWT with proper permissions for authorization.
   

#### 6. Update Admin Permissions
    * **Description:** Allows updating of the permissions for a given admin account.
    * **Method:** `GET`
   *   **Endpoint:** `/api/v1/admin/get-admin-details/:adminId` (`:adminId` should be replaced with the actual admin ID.)
    *   **Headers:**
            * `Authorization: Bearer <admin_token>` (must be a valid admin JWT with permission)
   *   **Response:**
         *  A successful updation returns a 200 status code along with details of the updated administrator in the body.
         *   Errors may include 400 for bad requests, 401 if authorization is invalid, or 404 if admin not exist.  Detail see response body for details.
    *   **Notes:** Requires admin JWT with proper permissions.
    *  **Notes:** Should have the permission to mange other admins

## User

### Subscribe

#### 1. Get Current Plan
    *  **Description:** Fetches the current subscription plan of the logged-in user.
    *  **Method:** `GET`
    *  **Endpoint:** `/api/v1/users/subscription`
     *   **Headers:**
       *  `Authorization: Bearer <user_token>` (must be a valid user JWT)
    *  **Response:**
         * A successful request returns a 200 status code along with the current subscription plan in the response body
           * Errors may include 400 for bad request, 401 if authorization is invalid or if plan was not found. Details see response body for details.

    * **Notes:** Requires user JWT for authorization.

#### 2. Cancel Subscription
    * **Description:** Cancels the active subscription of the currently authenticated user.
    * **Method:** `POST`
    * **Endpoint:** `/api/v1/users/cancel-subscription`
    *  **Headers:**
        * `Content-Type: application/json`
       * `Authorization: Bearer <user_token>` (must be a valid user JWT)
    * **Request Body:**
   ```json
       {
         "reason": "user-cancellation-reason"
        }
   ```
    * **Response:**
      *  A successful cancellation returns  200 status code
        *   Errors may include 400 for bad requests, 401 if authorization is invalid. Detail see response body for details.
    *  **Notes:** Requires user JWT for authorization.
      
#### 3. Subscribe a Plan

        * **Description:** Allows a user to subscribe to a new subscription plan.
        * **Method:** `POST`
        * **Endpoint:** `/api/v1/users/subscribe`
         *   **Headers:**
                 * `Content-Type: application/json`
                 * `Authorization: Bearer <user_token>` (must be a valid user JWT)

        * **Request Body:**
         ```json
         {
             "planId": "6763d06487f004a49970fd5a",
             "billingCycle": "monthly"
             }
         ```
        * **Response:**
          *  A successful subscription will return a 201 status code
          *   Errors may include 400 for bad requests, 401 if authorization is invalid. Detail see response body for details.
        * **Notes**: Requires user JWT for authentication.

#### 4. Update Plan
      * **Description:** Allows a user to update their current subscription plan.
      * **Method:** `PUT`
      * **Endpoint:** `/api/v1/users/subscription/update`
      * **Headers:**
            * `Content-Type: application/json`
            *`Authorization: Bearer <user_token>` (must be a valid user JWT)
      * **Request Body:**
      ```json
            {
              "planId": "6763d06487f004a49970fd5a",
               "billingCycle": "monthly"
         }
      ```
      * **Response:**
          *  A successful request returns a 200 status code.
         *  Errors may include 400 for bad request and 401 for invalid authentication. Detail see response body for details.
      * **Notes:** Requires user JWT for authentication.
            
### User Operation
          

#### 1. User Details
   * **Description:** Retrieves the details of the currently logged-in user.
   * **Method:** `GET`
   * **Endpoint:** `/api/users/details`
    * **Headers:**
       * `Authorization: Bearer <user_token>` (must be a valid user JWT)
   * **Response:**
      *   Returns a 200 status code with user details in the response body.
      *  Errors may include 400 for bad request and 401 for invalid authentication. Detail see response body for details.
   *  **Notes:** Requires the user's JWT for authorization.

#### 2. Delete User
    * **Description** Initiates the deletion process for the authenticated user
    * **Method:** `POST`
    * **Endpoint:** `/api/v1/users/delete`
    * **Headers:**
           * `Authorization: Bearer <user_token>` (must be a valid user token)
    * **Request Body:**
    ```json
        {
           "name":"Nikunja",
            "email":"xnikunja@gmail.com",
            "picture":"dsafsd"
        }
    ```
    * **Response:**
          *  A successful delete request will return a 200 status code and send a reset link