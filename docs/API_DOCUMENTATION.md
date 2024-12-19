# SocioX

# SocioX API Documentation

This document provides comprehensive documentation for the SocioX API, including details about authentication, admin functionalities, and user operations.

## Table of Contents
1. [Authentication](#authentication)
2. [Admin API](#admin-api)
   - [User Subscription](#user-subscription)
   - [Subscription Management](#subscription-management)
   - [User Management](#user-management)
   - [Admin Login](#admin-login)
3.  [User API](#user-api)
    -  [Subscription](#subscription-1)
    -  [User Profile](#user-profile)
    -  [User Operations](#user-operations)

---

## 1. Authentication

This section details the endpoints for user registration, login, and password management.

### Register Parent Email

*   **Endpoint:** `POST /api/auth/register`
*   **Description:** Registers a new parent user with an email and password.
*   **Request Body:**
    ```json
    {
         "email": "xnikunjadu2@gmail.com",
         "password": "yourpassword123",
         "name": "Test User"
    }
    ```
*   **Response:** (No response example provided, typically returns a success message or error)
*   **Notes:**
    *   The `email` should be a valid email address.
    *   The `password` must adhere to password policies.
    *   The `name` should represent user's complete name

### Register Child Email

*   **Endpoint:** `POST /api/auth/register`
*   **Description:** Registers a new child user with an email and password.
*   **Request Body:**
    ```json
    {
         "email": "xnikunjadu2@gmail.com",
         "password": "yourpassword123",
         "name": "Test User"
    }
    ```
*    **Response:** (No response example provided, typically returns a success message or error)
*   **Notes:**
    *   The `email` should be a valid email address.
    *   The `password` must adhere to password policies.
    *   The `name` should represent user's complete name or child nickname.

### Login Email

*   **Endpoint:** `POST /api/auth/login`
*   **Description:** Allows a user to log in with a registered email and password.
*   **Request Body:**
    ```json
    {
        "email": "xnikunjadu2@gmail.com",
        "password": "123456"
    }
    ```
*    **Response:** (No response example provided, typically returns a JWT token or error)
*   **Notes:** Successful login will return a JWT which should be used to authorize subsequent request

### Forgot Password

*   **Endpoint:** `POST /api/auth/forgot-password`
*   **Description:** Initiates the forgot password process for a user by email.
*   **Request Body:**
    ```json
    {
       "email": "xnikunja@gmail.com"
    }
    ```
*   **Response:** (No response example provided, typically returns a success message or error)
*   **Notes:**
    *   Sends an OTP to the user's email

### Reset Email Password

*   **Endpoint:** `POST /api/auth/reset-password`
*   **Description:** Resets a user's password using a provided OTP and a new password.
*   **Request Body:**
    ```json
    {
        "email": "xnikunja@gmail.com",
        "otp": "840907",
        "newPassword": "your-new-password"
      }
    ```
*   **Response:** (No response example provided, typically returns a success message or error)
*   **Notes:**
    *   Ensure the provided OTP is valid and corresponding to the email.
    *   The new password should adhere to security guidelines

---

## 2. Admin API

This sections documents API endpoints available only to authorized administrators.

### User Subscription
This category contains endpoints related to user subscriptions.

#### Subscribe User Plan

*   **Endpoint:** `POST /api/admin/users/:userId/subscription`
*   **Description:** Subscribes a user to a specific plan with a given billing cycle.
*   **Request URL Parameter:**
    *   `userId` (string, required): The unique ID of the user.
*  **Request Headers:**
    *   `Content-Type`:  `application/json`
    *    `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*   **Request Body:**
    ```json
    {
        "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
    }
    ```
*   **Response:** (No response example provided, typically confirms the subscription)

*   **Notes:** A valid admin JWT is required.

#### Cancel User Subscription

*   **Endpoint:** `POST /api/admin/users/:userId/subscription/cancel`
*   **Description:** Cancels a user's active subscription, requiring a cancellation reason.
*   **Request URL Parameter:**
    *   `userId` (string, required): The unique ID of the user.
*   **Request Headers:**
    *   `Content-Type`:  `application/json`
    *    `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)

*   **Request Body:**
    ```json
    {
        "reason":"i dont really know the reason"
    }
    ```
*    **Response:** (No response example provided, typically confirms the cancellation)

*   **Notes:** A valid admin JWT is required.

#### Get Subscription by User ID

*   **Endpoint:** `GET /api/admin/users/:userId/subscription`
*   **Description:** Retrieves the subscription details for a specific user.
*   **Request URL Parameter:**
    *   `userId` (string, required): The unique ID of the user.
*  **Request Headers:**
    *    `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*    **Response:** (No response example provided, typically returns user subscription details.)
*   **Notes:** A valid admin JWT is required.

#### Update Subscription by User ID
*   **Endpoint:** `POST /api/admin/users/:userId/subscription/update`
*   **Description:** Updates the subscription details for a specific user.
*   **Request URL Parameter:**
     *  `userId` (string, required): The unique ID of the user.
 *   **Request Headers:**
    *   `Content-Type`: `application/json`
    *   `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*   **Request Body:**
    ```json
    {
        "planId": "67616c378c821544d3c5400b",
         "billingCycle": "monthly"
    }
    ```
*     **Response:** (No response example provided, typically confirms the update)
*   **Notes:** A valid admin JWT is required.

###  Subscription Management
This category contains the various endpoints related to subscription plan management.

#### Get All Plans

*   **Endpoint:** `GET /api/subscription/admin/plans`
*   **Description:** Retrieves a list of all available subscription plans.
*  **Request Headers:**
    *    `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*   **Response:** (No response example provided, typically returns a list of subscription plans)
*   **Notes:** A valid admin JWT is required.

#### Get Plan by ID
*   **Endpoint:** `GET /api/subscription/admin/plans/:planId`
*   **Description:** Retrieves the details of a specific subscription plan by its ID.

*    **Request URL Parameter:**
     *   `planId` (string, required): The unique ID of the subscription plan.
*  **Request Headers:**
    *   `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*    **Response:** (No response example provided, typically returns specified subscription plan details.)
*   **Notes:** A valid admin JWT is required.

#### Update Plan Custom Features

*   **Endpoint:** `PATCH /api/subscription/admin/plans/:planId/features`
*    **Description:** Updates the custom features of a specific subscription plan
*   **Request URL Parameter:**
     *   `planId` (string, required): The unique ID of the subscription plan.
*  **Request Headers:**
    *     `Content-Type`: `application/json`
    *    `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
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
*   **Response:** (No response example provided, typically confirms the updated features)
*   **Notes:** A valid admin JWT is required.

#### Create New Plan
*   **Endpoint:** `POST /api/subscription/admin/plans`
*   **Description:** Creates a new subscription plan.
*  **Request Headers:**
    *   `Content-Type`:  `application/json`
    *   `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*   **Request Body:**
     ```json
    {
        "id": "unique-plan-id",
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
*   **Response:** (No response example provided, typically confirms the creation)
*  **Notes:** A valid admin JWT is required. `id` should always be unique

#### Update Plan

*   **Endpoint:** `PUT /api/subscription/admin/plans/:planId`
*   **Description:** Updates an existing subscription plan.

*    **Request URL Parameter:**
     *   `planId` (string, required): The unique ID of the subscription plan.
*  **Request Headers:**
   *  `Content-Type`: `application/json`
   *   `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
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
*   **Response:** (No response example provided, typically confirms the update)
*   **Notes:** A valid admin JWT is required.

#### Update Plan Status

*   **Endpoint:** `POST /api/subscription/admin/plans/:planId/status`
*   **Description:** Updates the status of a specific subscription plan.
*    **Request URL Parameter:**
     *   `planId` (string, required): The unique ID of the subscription plan.
*  **Request Headers:**
    *   `Content-Type`:  `application/json`
    *    `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*   **Request Body:**
    ```json
    {
        "status": "active"
    }
    ```
*   **Response:** (No response example provided, typically confirms the status update)
*   **Notes:** A valid admin JWT is required.

#### Delete a Plan
*    **Endpoint:** `DELETE /api/subscription/admin/plans/:planId`
*   **Description:** Delete a specific plan by its ID.
*    **Request URL Parameter:**
     *   `planId` (string, required): The unique ID of the subscription plan.
*   **Request Headers:**
  *     `Content-Type`:  `application/json`
  *     `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*   **Response:** (No response example provided, typically confirms the plan deletion)

*   **Notes:** A valid admin JWT is required.

#### Update Plan Features
*  **Endpoint:** `PUT /api/subscriptions/plan-features/:planId`
*  **Description:**
    *   Updates both custom and standard features of a subscription plan.
*   **Request URL Parameter:**
     *   `planId` (string, required): The unique ID of the subscription plan.
*   **Request Headers:**
 *   `Content-Type`:  `application/json`
 *   `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
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
*   **Response:** (No response example provided, typically confirms the update)
*  **Notes:** A valid admin JWT is required.

#### Update Standard Feature
*  **Endpoint:** `PUT /api/subscriptions/plan-features/:planId`
*  **Description:** Update specific standard feature of a subscription plan.
*  **Request URL Parameter:**
     *   `planId` (string, required): The unique ID of the subscription plan.
*   **Request Headers:**
     *   `Content-Type`: `application/json`
     *    `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)

*   **Request Body:**
    ```json
   {
    "features": {
      "teamMembers": 15,
      "support": "24/7"
    }
   }
  ```
*    **Response:** (No response example provided, typically confirms the update)
*    **Notes:** A valid admin JWT is required.

### User Management

This category includes endpoints for managing user accounts by administrators.

#### Reactivate User

*   **Endpoint:** `GET /api/admin/users/:userId/reactivate`
*   **Description:** Reactivates a deactivated user account.
*   **Request URL Parameter:**
    *   `userId` (string, required): The unique ID of the user to reactivate
*  **Request Headers:**
    *  `Authorization`:`Bearer YOUR_ADMIN_TOKEN` (replace with valid admin JWT)
*  **Request Body:**
    ```json
    {
        "name":"Nikunja",
        "email":"xnikunja@gmail.com",
        "picture":"dsafsd"
        }
  ```
*    **Response:** (No response example provided, typically confirms the user is active)

*   **Notes:** A valid admin JWT is required.

#### Get List of Users

*   **Endpoint:** `GET /api/admin/users`
*   **Description:** Retrieves a list of all registered users.

*   **Response:** (No response example provided, typically returns a list of user objects)

#### Delete User

*  **Endpoint:** `DELETE /api/admin/users/:userId`
*   **Description:** Deletes a specific user by ID.
*   **Request URL Parameter:**
    *   `userId` (string, required): The unique ID of the user to delete.
*   **Request Headers:**
    *   `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*   **Response:** (No response example provided, typically confirms the user deletion).
*   **Notes:** A valid admin JWT is required

#### Deactivate User

*   **Endpoint:** `GET /api/admin/users/:userId/deactivate`
*   **Description:** Deactivates a user account by user ID.
*   **Request URL Parameter:**
     *   `userId` (string, required): The unique ID of the user to deactivate.
*   **Request Headers:**
   *   `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*   **Response:** (No response example provided, typically confirms user is deactivated)
*   **Notes:** A valid admin JWT is required. Not permanent deletion.

#### Get User Details

*   **Endpoint:** `GET /api/admin/users/:userId/details`
*   **Description:** Retrieves complete details for a specific user.
*   **Request URL Parameter:**
    *     `userId` (string, required): The unique ID of the user to get details.
*    **Request Headers:**
     * `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
 *  **Response:** (No response example provided, typically returns all details about user.)
*  **Notes:** A valid admin JWT is required.

#### Send Reset Password Link

*   **Endpoint:** `POST /api/admin/users/sendPasswordResetLink`
*   **Description:** Sends the reset password link to a given user's email.

*   **Request Headers:**
  *   `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)
*    **Request Body:**
      ```json
       {
           "email":"xnikunjadu2@gmail.com"
        }
    ```
*  **Response:** (No response example provided, typically confirms the password reset link)

*    **Notes:** A valid admin JWT is required.

#### Reset User Password

*   **Endpoint:** `POST /api/admin/users/reset-password`
*   **Description:** Resets a user's password by token and new password.
*   **Request Headers:**
   *  `Authorization`: `Bearer YOUR_ADMIN_TOKEN` (replace with a valid admin JWT)

*   **Request Body:**
    ```json
    {
         "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDQzZWZiY2VmZmEyODEwYmU0YmUiLCJpYXQiOjE3MzQ1MDg1ODgsImV4cCI6MTczNDUxMjE4OH0.e17UzfnRrBCAqXkWfP9LWmN3UZyaSFaQtEz7keJDrhY",
         "newPassword":"123456"
      }
    ```
*   **Response:** (No response example provided, typically confirms password reset)
*   **Notes:** A valid admin JWT is required.

### Admin Login
#### Admin Login

*   **Endpoint:** `POST /api/admin/login`
*   **Description:** Allows an administrator to log in with an email and password.
*   **Request Headers:**
    *    `Content-Type`: `application/json`
*   **Request Body:**
    ```json
    {"email":"your.email@example.com","password":"your_secure_password"}
    ```
 *  **Response:** (No response example provided, typically returns a JWT token upon successful login.)
 *  **Notes:** Upon successful login , response will include a JWT token for use with admin authentication

---
## 3. User API

 This section details API endpoints that are available to users of the application.

### Subscription

This section lists the available endpoints related to user subscription management.

#### Get Current Plan

*   **Endpoint:** `GET /api/users/subscription`
*   **Description:** Retrieves the current subscription plan for an authenticated user.
*   **Request Headers:**
    *   `Authorization`: `Bearer YOUR_JWT_TOKEN` (replace with valid user JWT)
*   **Response:** (No response example provided, returns the current subscription details)
*   **Notes**  A valid user JWT is required.

#### Cancel Subscription

*   **Endpoint:** `POST /api/users/cancel-subscription`
*   **Description:** Cancels the user's current subscription.
*   **Request Headers:**
    *   `Content-Type`:  `application/json`
    *    `Authorization`: `Bearer YOUR_JWT_TOKEN` (replace with valid user JWT)
*  **Request Body:**
    ```json
    {
        "reason": "Switching to a different service"
    }
    ```
*   **Response:** (No response example provided, typically confirms subscription cancellation)
*   **Notes:** A valid user JWT is required.

#### Subscribe to a Plan

*   **Endpoint:** `POST /api/users/subscribe`
*   **Description:** Subscribes the authenticated user to a specific plan.
*   **Request Headers:**
 *   `Content-Type`:  `application/json`
  *    `Authorization`:  `Bearer YOUR_JWT_TOKEN` (replace with valid user JWT)
*   **Request Body:**
     ```json
      {
          "planId": "67616c378c821544d3c5400b",
          "billingCycle": "monthly"
        }
    ```
*    **Response:** (No response example provided, typically confirms the subscription)
*   **Notes:** A valid user JWT is required.

#### Update Plan

*   **Endpoint**: `PUT /api/users/subscription/update`
*   **Description:** Updates the user's current plan.

*   **Request Headers:**
 *   `Content-Type`:  `application/json`
  *    `Authorization`: `Bearer YOUR_JWT_TOKEN` (replace with valid user JWT)
*   **Request Body:**
     ```json
        {
          "planId": "67616c378c821544d3c5400b",
          "billingCycle": "monthly"
         }
    ```
*   **Response:** (No response example provided, typically confirms the updated plan)
*   **Notes:**
     * A valid user JWT is required.

### User Profile

This section lists the available endpoints for fetching and updating user profile information.

#### Get User Profile

*   **Endpoint:** `GET /api/users/:userId/profile`
*   **Description:** Retrieves the profile information for a specific user.
*   **Request URL Parameter:**
    * `userId`(string, required) : The unique Id of the user whose profile needs to be accessed.
*   **Response:** (No response example provided, typically returns user profile details)

#### Update User Profile

*   **Endpoint:** `PUT /api/users/:userId/profile`
*   **Description:** Updates a user's profile information.
*   **Request URL Parameter:**
    *   `userId` (string,required) : user Id of the use whose profile will be updated.
*   **Request Headers:**
    *   `Authorization` : `Bearer YOUR_JWT_TOKEN` (replace with valid user JWT)
*   **Request Body:**
   ```json
   {
        "name":"Nikunja",
        "email":"xnikunja@gmail.com",
        "picture":"dsafsd"
  }
   ```
*   **Response:** (No response example provided, typically confirms that user profile has been updated.)
*  **Notes:**
    *  A valid user JWT is required.

#### Get User Details

*   **Endpoint:** `GET /api/users/details`
*   **Description:** Retrieves details for the authenticated user.
*   **Request Headers:**
    *    `Authorization`: `Bearer YOUR_JWT_TOKEN` (replace with valid user JWT)
*     **Response:** (No response example provided, typically returns most details related to user.)
*   **Notes:** A valid user JWT is required.

### User Operations

This section lists the available endpoints for deletion operations.

#### Delete User

*   **Endpoint:** `POST /api/users/delete`
*   **Description:** Initiates the deletion process for an authenticated user profile.

*     **Request Headers:**
     *     `Authorization`: `Bearer YOUR_JWT_TOKEN` (replace with a valid user JWT)

*   **Request Body:**
   ```json
    {
        "name":"Nikunja",
        "email":"xnikunja@gmail.com",
        "picture":"dsafsd"
    }
     ```
*   **Response:** (No response example provided, typically confirms the deletion request)

*  **Notes**:
    *  A valid user JWT is required.

#### Confirm Delete User

*   **Endpoint:** `POST /api/users/confirm-delete`
*   **Description:** Confirms the user account deletion process using a token received via email.
*  **Request Headers:**
   *    `Authorization`: `Bearer YOUR_JWT_TOKEN` (replace with a valid user JWT)
*   **Request Body:**
     ```json
   {
       "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDAxODRkNGE2NjJiMjVkZTc1MTgiLCJpYXQiOjE3MzQ0MjY2NjUsImV4cCI6MTczNDQzMDI2NX0.sEFZye1spypGkzc6pIIOwh_x7Xg6qMN3Woaw3wqowm0"
   }
    ```
    *   **Response:** (No response example provided, typically confirms that user account has been deleted)
*    **Notes**:
    *  A valid user JWT is required.
    *  A email is sent upon requesting deletion which contains the token to be used here.
---
This documentation should help you work effectively with the SocioX API. If you have any questions or need further clarifications, please reach out to the support team.
