# SocioX

# SocioX API Documentation

## Overview

This document provides detailed API documentation for the SocioX platform. It covers authentication, user management, and subscription functionalities for both regular users and administrators.

### Authentication

SocioX utilizes JWT (JSON Web Tokens) for authentication. Most endpoints require a valid bearer token in the `Authorization` header.

### Endpoints

The API is structured into several main sections:

*   **Auth:** Handles user registration, login, and password reset.
*   **Admin:** Contains endpoints for managing users, subscriptions, and admin accounts.
*   **Users:** Manages user operations such as profiles , subscription management and account deletion.

## Auth

### Register parent email
    
Registers a new parent user with the platform.
   
   **Endpoint:**
   ```
   POST /api/v1/auth/register
   ```
   
   **Request Body:**
   
   ```json
   {
      "email": "parent@example.com",
      "password": "yourpassword123",
      "name": "Parent User"
   }
   ```
   
   
   **Response:**
   
      -Status Code: 200 Created or any relevant success code
        - This endpoint does not return any data in the response body upon successful  creation.

### Register child email

Registers a new child user under a parent account.
    
    **Endpoint:**
    ```
    POST /api/users/child-users
    ```
   
   **Headers:**
   
   - `Content-Type: application/json`
   - `Authorization: Bearer <parent_jwt_token>`
    
   **Request Body:**
   
   ```json
    {
      "email": "child@example.com",
      "password": "childpassword123",
      "name": "Child User",
      "permissions": ["create_posts", "view_analytics"]
   }
   ```
    
  **Response:**
  
      - Status Code: 201 Created or any relevant success code
        - This endpoint does not return any data in the response body upon successful child user creation.

### Login email

Authenticates a user and issues a JWT token.
    
    **Endpoint:**
    ```
    POST /api/v1/auth/login
    ```
    
    **Request Body:**
    
    ```json
    {
        "email": "user@example.com",
        "password": "yourpassword123"
    }
    ```
      
  **Response:**
  
     - Status Code: 200 OK or any relevant success code
       - This endpoint does not return any data in the response body upon successful login. A JWT is expected to be returned in the HTTP header.

### Forgot Password
    
Initiates the password reset process by sending a reset link to the user's email.
    
    **Endpoint:**
    ```
    POST /api/auth/forgot-password
    ```
    **Request Body:**
    
    ```json
    {
        "email": "user@example.com"
    }
    ```
    
    **Response:**
  
       -Status Code: 200 OK or any relevant success code
        - This endpoint does not return any data in the response body upon successful request of the email.

### Reset Email Password

Resets the user's password using a provided OTP.
    
  **Endpoint:**
  ```
  POST /api/auth/reset-password
  ```
    
  **Request Body:**
    
  ```json
  {
      "email": "user@example.com",
      "otp": "123456",
      "newPassword": "your-new-password"
  }
  ```

  **Response:**
  
      -Status Code: 200 OK or any relevant success code
        -This endpoint does not return any data in the response body upon successful password reset.

## Admin

### User Subscription Management

#### Subscribe user plan
    
Subscribes a user to a plan.
   
   **Endpoint:**
   ```
   POST /api/v1/admin/users/{userId}/subscription
   ```
   **Headers:**
   
  - `Content-Type: application/json`
  - `Authorization: Bearer <admin_jwt_token>`
     
   **URL Parameters:**
   
   -`userId`: The ID of the user to subscribe.
       
   **Request Body:**

   ```json
   {
       "planId": "67616c378c821544d3c5400b",
       "billingCycle": "monthly"
   }
   ```
  
  **Response:**
  
      -Status Code: 200 OK or any relevant success code
        -This endpoint does not return any data in the response body upon successful plan subscription.

#### Cancel subs user plan
    
Cancels a user's active subscription.
    
    **Endpoint:**
    ```
    POST /api/v1/admin/users/{userId}/subscription/cancel
   ```
    **Headers:**
   
     - `Content-Type: application/json`
     - `Authorization: Bearer <admin_jwt_token>`
       
    **URL Parameters:**
   
      -`userId`: The ID of the user whose subscription is to be cancelled.
    
  **Request Body:**
    
  ```json
    {
        "reason": "Cancellation reason..."
    }
  ```

   **Response:**
  
      -Status Code: 200 OK or any relevant success code
        -This endpoint does not return any data in the response body upon successful subscription cancellation.
    
#### Get sub by userid
    
Retrieves a user's current subscription details.
    
    **Endpoint:**
    ```
    GET /api/admin/users/{userId}/subscription
    ```
     **Headers:**
   
        - `Content-Type: application/json`
        -`Authorization: Bearer <admin_jwt_token>`
         
    **URL Parameters:**
    
       -`userId`: The ID of the user whose subscription information is to be retrieved.
     
    **Response:**
   
       -Status Code: 200 OK
       -Response body contains user subscription information.
       
 #### Update sub by user id
    
Updates a user's subscription.
    
    **Endpoint:**
    ```
    POST /api/admin/users/{userId}/subscription/update
    ```
    
    **Headers:**
      
    - `Content-Type: application/json`
    - `Authorization: Bearer <admin_jwt_token>`
  
    **URL Parameters:**
    
       -`userId`: ID of the user whose subscription is to be updated.
   
    **Request Body:**
    
   ```json
    {
      "planId": "67616c378c821544d3c5400b",
      "billingCycle": "monthly"
    }
   ```
   
    
    **Response:**
  
      -Status Code: 200 OK or any relevant success code
       -This endpoint does not return any data in the response body upon successful plan update.

### Subscription Management

#### get Plans

Retrieves a list of subscription plans, with options for filtering.
    
    **Endpoint:**
    ```
    GET /api/v1/admin/subscription/plans
   ```
    **Headers:**
   
    - `Authorization: Bearer <admin_jwt_token>`
      
   **Query Parameters (optional):**
   
   -   `category`: Filter by plan category (e.g., "enterprise").
   -   `status`: Filter by plan status (e.g., "active").
   -  `name`: Filter by plan name (e.g., "premium").

  **Response:**
   
    -Status Code: 200 OK
    - Response body contains list of plan objects.
 
#### Get Plans by id

Retrieves a subscription plan by its ID.
    
    **Endpoint:**
    ```
    GET /api/admin/subscription/plans/{planId}
    ```
  
    **Headers:**
       
    - `Content-Type: application/json`
       
    **URL Parameters:**
    
       -`planId`: ID of the subscription plan to be retrieved.
       
   **Response:**
  
     - Status Code: 200 OK
     - Response body contains plan information.

#### Update custom features
    
Updates the custom features of a subscription plan.
    
    **Endpoint:**
    ```
    PATCH /api/admin/subscription/plans/{planId}/features
    ```
     **Headers:**
   
       - `Content-Type: application/json`
       - `Authorization: Bearer <admin_jwt_token>`
     
    **URL Parameters:**
    
      -`planId`: ID of the subscription plan to update.
    
   **Request Body:**
    
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
   
    **Response:**
      -Status Code: 200 OK or any relevant success code
       - This endpoint does not return any data in the response body upon successful  custom feature update.

#### create plan

Creates a new subscription plan.
  **Endpoint:**
  ```
    POST /api/admin/subscription/plans
  ```
    
    **Headers:**

      -`Content-Type: application/json`
      -`Authorization: Bearer <admin_jwt_token>`
    **Request Body:**

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

  **Response:**
  
     - Status Code: 201 Created or any relevant success code
     - This endpoint does not return any data in the response body upon successful plan creation.

#### update plan
   
Updates an existing subscription plan.
   
   **Endpoint:**
   ```
    PUT /api/admin/subscription/plans/{planId}
   ```
   
  **Headers:**
        
   - `Content-Type: application/json`
   - `Authorization: Bearer <admin_jwt_token>`
         
  **URL Parameters:**
       
  -`planId`: ID of the subscription plan to be updated.
       
  **Request Body:**
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
  **Response:**
   
     - Status Code: 200 OK or any relevant success code
       - This endpoint does not return any data in the response body upon successful plan update.

#### update plan status
    
Updates the status of a given subscription plan (e.g., active/inactive).
    
    **Endpoint:**
    ```
    POST /api/subscription/admin/plans/{planId}/status
    ```
   **Headers:**
   
    - `Authorization: Bearer <admin_jwt_token>`
    -   `Content-Type: application/json`

    **URL Parameters:**
      
      -`planId`: ID of the plan for which status is to be updated.
    
    **Request Body:**
   
   ```json
    {
       "status": "active"
    }
   ```

   **Response:**
   
      - Status Code: 200 OK or any relevant success code
      - This endpoint does not return any data in the response body upon successful status update.

#### delete plan
    
Deletes a subscription plan by its ID.
    
  **Endpoint:**
  ```
   DELETE /api/subscription/admin/plans/{planId}
  ```
  
   **Headers:**
       
   -`Authorization: Bearer <admin_jwt_token>`
   -`Content-Type: application/json`
      
  **URL Parameters:**
   
  -`planId`: ID of the plan to be deleted.
  
  **Request Body:**
    
  ```json
   {
      "status": "inactive"
   }
  ```

   **Response:**
  
      - Status Code: 200 or 204 No content. No response body on success.

### update both features

Updates both standard and custom features of a subscription plan.
  
  **Endpoint:**
   ```
    PUT /api/subscriptions/plan-features/{planId}
   ```
     
   **Headers:**
    
   -  `Content-Type: application/json`
   - `Authorization: Bearer <admin_jwt_token>`
        
  **URL Parameters:**
       
   -   `planId`: The ID of the subscription plan to update.
       
   **Request Body:**
  
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

   **Response:**
  
      -Status Code: 200 OK or any relevant success code
       - This endpoint does not return any data in the response body after update.
      
### update standard feature
    
Updates only the standard features of a subscription plan.
        
  **Endpoint:**
  ```
   PUT /api/subscriptions/plan-features/{planId}
  ```
    
  **Headers:**
  
      - `Content-Type: application/json`
      - `Authorization: Bearer <admin_jwt_token>`
        
  **URL Parameters:**
       
    - `planId`: The ID of the subscription plan to update.

  **Request Body:**
    
 ```json
  {
    "features": {
        "teamMembers": 15,
        "support": "24/7"
      }
  }
 ```
   
  **Response:**
  
     -Status Code: 200 OK or any relevant success code
       -This endpoint does not return any data in the response body after update.

#### GET PLAN BY CATEGORIES

this feature was not tested properly.
  
**Endpoint:**
```
    GET  /api/subscriptions/plan-features
```

### User Management

#### Reactivate user
    
Reactivates a deactivated user.
   
    **Endpoint:**
   ```
    GET /api/admin/users/{userId}/reactivate
   ```
  **Headers:**

       - `Authorization: Bearer <admin_jwt_token>`
     
  **URL Parameters:**
  
     -`userId`:  ID of the user to reactivate.

    **Response:**
  
      - Status Code: 200 OK or any relevant success code
        - This endpoint does not return any data in the response body upon successful reactivation.

#### Get List of users
    
Retrieves a list of all users.
  
 **Endpoint:**
  ```
   GET /api/v1/admin/users
  ```
    
   **Headers:**
        
    - `Authorization: Bearer <admin_jwt_token>`
         
   **Response:**
 
       -Status Code: 200 OK
       -Response body contains a list of all users

#### User delete
    
Initiates the deletion process of a user
    
    **Endpoint:**
    ```
    DELETE /api/admin/users/{userId}
    ```
    
   **Headers:**
   
      - `Authorization: Bearer <admin_jwt_token>`
 
   **URL Parameters:**
        
     -`userId`: ID of the user to delete
         
     **Response:**
 
     -Status Code: 200 OK or any relevant success code
       -This endpoint does not return any data in the response body upon successful user delete request.

#### Deactivate User

Deactivates a user.
    
    **Endpoint:**
    ```
     GET /api/admin/users/{userId}/deactivate
    ```
    
   **Headers:**
        
      - `Authorization: Bearer <admin_jwt_token>`
        
  **URL Parameters:**
     
  - `userId`: ID of the user to deactivate
         
   **Response:**
  
     - Status Code: 200 OK or any relevant success code
       - This endpoint does not return any data in the response body upon successful deactivation.

#### Complete user details by id
   
Retrieves complete details of a user.
    
    **Endpoint:**
    ```
    GET /api/admin/users/{userId}/details
    ```
  
  **Headers:**
     
     - `Authorization: Bearer <admin_jwt_token>`
 
  **URL Parameters:**
       
    - `userId`: ID of the user to retrieve details.

   **Response:**
  
      - Status Code: 200 OK
      - Response body contains complete user details.

#### Send reset password link
  
Sends a reset password link to the user (admin initiated).
    
  **Endpoint:**
  ```
   POST /api/admin/users/sendPasswordResetLink
  ```

   **Headers:**

       -`Authorization: Bearer <admin_jwt_token>`

     **Request Body:**

```json
   {
       "email": "user@example.com"
   }
```
  **Response:**
     - Status Code: 200 OK or any relevant success code
        - This endpoint does not return any data in the response body upon successful password reset request.

#### reset user password
   
Resets a user's password with provided token.
   
    **Endpoint:**
   ```
     POST /api/admin/users/reset-password
   ```
  **Headers:**
       
    -`Authorization: Bearer <admin_jwt_token>`
        
  **Request Body:**
    
  ```json
      {
          "token": "valid_reset_token",
          "newPassword": "new_secure_password"
      }
  ```
   **Response:**
  
       - Status Code: 200 OK or any relevant success code
         - This endpoint does not return any data in the response body upon successful password reset.

### Admin Management

#### Admin Login
    
Authenticates an admin user and returns a JWT token.
   
   **Endpoint:**
   ```
    POST /api/v1/admin/login
   ```
   
  **Headers:**

      - `Content-Type: application/json`

  **Request Body:**

  ```json
   {
       "email": "admin@example.com",
       "password": "adminpassword123"
   }
  ```
   
   **Response:**
   
     -Status Code: 200 and returns JWT in response header.

#### Create admin by superadmin
      
Creates a new admin user by super admin.
  
   **Endpoint:**
  ```
   POST /api/v1/admin/create-admin
  ```
   
   **Headers:**

        -`Authorization: Bearer <super_admin_jwt_token>`
        -`Content-Type: application/json`
     
  **Request Body:**

  ```json    
     {
        "email": "newadmin@example.com",
        "password": "securePassword123!",
       "name": "New Admin",
       "permissions": [
        "manage_users",
       "view_user_details",
       "manage_content"
        ]
    }
```
     
  **Response:**
  
     -Status Code: 201 or any other relevant success code
       -  This endpoint does not return any data in the response body upon successful admin creation.

#### get-all-admins
    
Retrieves a list of all admin users.
    
    **Endpoint:**
   ```
    GET /api/v1/admin/get-all-admins
   ```
  
    **Headers:**
  
     - `Authorization: Bearer <super_admin_jwt_token>`
 
   **Response:**
         -Status Code: 200 OK and returns list of admin users.
         
#### delete admins
    
Deletes an admin user by their ID.
    
    **Endpoint:**
   ```
   DELETE /api/v1/admin/delete-admin/{adminId}
   ```
   
    **Headers:**
    
     -`Authorization: Bearer <super_admin_jwt_token>`
        
  **URL Parameters:**
   
    -   `adminId`: ID of the admin to be deleted.
        
   **Response:**
 
      - Status Code : 200 OK or 204 No content, no response body on success.

#### get-admin-details
   
Retrieves details of a specific admin user.
    
  **Endpoint:**
   ```
   GET /api/v1/admin/get-admin-details/{adminId}
   ```
   
    **Headers:**
    
     -`Authorization: Bearer <super_admin_jwt_token>`
         
  **URL Parameters:**
  
    -   `adminId`: The ID of the admin user to get the details of.
        
  **Response:**
  
    - Status Code : 200 OK and returns the admin details.

#### update admin permission
    
Updates the permissions of a specific admin user.
    
    **Endpoint:**
    ```
     GET /api/v1/admin/get-admin-details/{adminId}
    ```
     **Headers:**
   
     -  `Authorization: Bearer <super_admin_jwt_token>`
          
  **URL Parameters:**
      
     - `adminId`: The ID of the admin user to update.
        
    **Response:**
  
      - Status code: 200 Ok and returns the admin details.
        
## user

### Subscribe

#### Get current plan

Retrieves the details of a user's current subscription plan.

    **Endpoint:**
   ```
      GET /api/v1/users/subscription
   ```
    
  **Headers:**

   -`Authorization: Bearer  <user_jwt_token>`

   **Response:**
     - Status code: 200 OK and returns current plan details.

####  cancel subs
    
Cancels the user's current subscription.

    **Endpoint:**
   ```
    POST /api/v1/users/cancel-subscription
   ```
         
    **Headers:**
       
      - `Content-Type: application/json`
      - `Authorization: Bearer <user_jwt_token>`
    
    **Request Body:**
    
  ```json
  {
        "reason": "Cancellation reason"
    }
  ```
  
    **Response:**

      -Status code: 200 OK or any relevant success code and does not return anything in response body.

#### subscribe a plan

Subscribes the user to a new plan.
    
    **Endpoint:**
    ```
    POST /api/v1/users/subscribe
    ```
    
    **Headers:**

      - `Content-Type: application/json`
      -`Authorization: Bearer <user_jwt_token>`

    **Request Body:**
  
  ```json
    {
      "planId": "6763d06487f004a49970fd5a",
        "billingCycle": "monthly"
    }
  ```
  
    **Response:**
  
        -Status Code: 200 OK or any relevant success code and does not return anything in response body.

#### update plan
    
Updates the user's current subscription plan.
    
   **Endpoint:**
  ```
  PUT /api/v1/users/subscription/update
  ```
   
    **Headers:**

    -`Content-Type: application/json`
   -`Authorization:  Bearer <user_jwt_token>`

    **Request Body:**
    
  ```json
    {
      "planId": "6763d06487f004a49970fd5a",
        "billingCycle": "monthly"
    }
  ```
 
    **Response:**
    -Status Code: 200 OK or any relevant success code and does not return anything in response body.

### USER OPERATION

#### user details
    
Retrieves the details of the authenticated user.
    
    **Endpoint:**
  ```
    GET /api/users/details
  ```
     **Headers:**
      
     -`Authorization: Bearer <user_jwt_token>`

    **Response:**
     -Status Code: 200 OK and returns the user info object

#### delete User
    
Initiates the process of deleting user account .
    
    
**Endpoint:**
```
    POST  /api/v1/users/delete
```
   
   **Headers:**
       
    - `Authorization: Bearer <user_jwt_token>`
    
    **Response**
   
     -Status Code : 200 Ok or any relevant success code and doesn't return anything in the response body.

#### confim delete user
    
Confirms the deletion of a user account using token.
    
    **Endpoint:**
   ```
    POST /api/users/confirm-delete
   ```
    
    **Headers:**
   
    - `Authorization: Bearer <user_jwt_token>`
        
  **Request Body:**
    
  ```json
    {
        "token": "deletion_confirmation_token"
    }
  ```

   **Response:**

         - Status Code: 200 OK or any relevant success code and doesn't return anything in the response body upon successful confirmation.
