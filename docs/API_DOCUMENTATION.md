# SocioX

# SocioX API Documentation

## Overview
This document provides comprehensive details about the SocioX API, including authentication, and various endpoints. The API allows for user registration, login, subscription management, admin functionalities, and user operations.

## Authentication
The SocioX API primarily uses **JWT (JSON Web Token) Bearer authentication.** Most protected endpoints require a valid JWT token to be included in the `Authorization` header as follows:

   ```
   Authorization: Bearer <your_jwt_token>
   ```
   
Some API also required Admin JWT Token as follows:

   ```
   Authorization: Bearer <your_admin_jwt_token>
   ```

## Endpoints

### Auth API

#### Register Parent Email
**Overview:** Registers a new parent user

**Method:** `POST`

**URL:** `http://localhost:5000/api/v1/auth/register`

**Request Headers:**
   - `Content-Type: application/json`

**Request Body:**

   ```json
   {
        "email": "parent@example.com",
        "password": "yoursecurepassword123",
        "name": "Test User"
   }
   ```

**Response:**

 *   Successful Registration 201: Returns user details
    ```json
   {
     "userId": "676601f4c1921cff857d586f",
     "email": "parent@example.com",
      "userType": "parent"
   }
   ```

*   Error Response 400: Returns an error if the user already exists(email already in use).
     ```json
   {
     "message": "User already exist",
     "status": 400,
     "data": null
    }
   ```
*   Error response 500: Returns an error occurs during registration process..
   ```json
    {
      "message": "Internal Server Error",
      "status": 500,
      "data": null
    }
   ```
**Notes:**
    * This method is used for creating parent users only.    

#### Register Child Email
**Overview:** Registers a new child user under a parent account.

**Method:** `POST`

**URL:** `http://localhost:5000/api/v1/users/child-users`

**Authentication:** Bearer JWT token of the parent user in the header, needed to create a child account.

**Request Headers:**
   - `Content-Type: application/json`
   - `Authorization: Bearer <parent_jwt_token>`

**Request Body:**
   ```json
   {
     "email": "child@example.com",
     "password": "childpassword123",
     "name": "Child User"
   }
   ```

**Response:**
 *   Successful Registration 201: Returns user details
    ```json
    {
     "userId": "676601f4c1921cff857d586f",
      "userType": "child",
      "email": "child@example.com",
      "parentId": "676601f4c1921cff857d522f"
      }
   ```

*   Error Response 400: Returns an error if the child user already exists.
     ```json
    {
      "message": "User already exist",
      "status": 400,
        "data": null
    }
   ```
*   Error response 500: Returns an error occurs during registration process.
   ```json
    {
      "message": "Internal Server Error",
      "status": 500,
      "data": null
    }
   ```
**Notes:**
    *  This method is used for creating child users under parent account.
    *  The parent user's JWT token must be included in the Authorization header.

#### Login Email
**Overview:** Logs in an existing user

**Method:** `POST`

**URL:** `http://localhost:5000/api/v1/auth/login`

**Request Headers:**
   - `Content-Type: application/json`

**Request Body:**
   ```json
   {
     "email": "user@example.com",
     "password": "userpassword123"
   }
   ```

**Response:**
   * Successfull login 200: Returns jwt token and user details.
   ```json
   {
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY2NDc4ZGIyNWM1ZDdjZGIzN2YyYmUiLCJlbWFpbCI6Im5pa3VuamFkdTVAZ21haWwuY29tIiwidXNlclR5cGUiOiJwYXJlbnQiLCJwZXJtaXNzaW9ucyI6W10sImlhdCI6MTczNDc2MDU0OSwiZXhwIjoxNzM0ODQ2OTQ5fQ.eQ0q-Jtx5L925P8gD_F7h7u-78Q19-Q5e9xOzhwUoY",
    "user": {
            "userId": "6766478db25c5d7cdb37f2be",
            "email": "nikunjadu5@gmail.com",
            "userType": "parent"
       }
     }

   ```

     *   Error Response 400: Returns an error on wrong credentials.
          ```json
              {
                "message": "Invalid credentials",
                "status": 400,
                "data": null
            }
         ```
     * Error response 500: Returns an error occurs during login process.
          ```json
           {
            "message": "Internal Server Error",
             "status": 500,
            "data": null
          }
         ```
**Notes:**
    * A valid email id and password required for login.

#### Forgot Password

**Overview:** Request a password reset link via email.

**Method:** `POST`

**URL:** `http://localhost:5000/api/auth/forgot-password`

**Request Headers:**
   - `Content-Type: application/json`

**Request Body:**
   ```json
   {
     "email": "user@example.com"
   }
   ```

**Response:**
   *   Successfull request 200: Returns a success message that reset link has been sent.
        ```json
             {
            "message": "A reset link has been sent to your email address.",
            "status": 200,
             "data": null
            }
        ```
*   Error Response 400: Returns  an error if email id does not exists.
  ```json
   {
       "message":"User not found",
       "status":400,
       "data":null
   }
   ```
*   Error response 500: Returns an error occurs during request process.
    ```json
        {
          "message": "Internal Server Error",
        "status": 500,
          "data": null
         }
     ```
**Notes:**
    *  The email used here should register in user database.

#### Reset Email Password
**Overview:** Resets the user's password using an email and OTP.

**Method:** `POST`

**URL:** `http://localhost:5000/api/auth/reset-password`

**Request Headers:**
  - `Content-Type: application/json`
**Request Body:**
   ```json
   {
     "email": "user@example.com",
     "otp": "123456",
     "newPassword": "newsecurepass123"
   }
   ```

**Response:**
    * Successfull password changed 200: Returns success message that password has been updated.
          ```json
           {
               "message": "Password updated successfully",
               "status": 200,
               "data": null
           }
        ```
    * Error Response 400: Returns an error if email and otp does not match.
     ```json
    {
      "message":"Invalid email or OTP",
      "status":400,
      "data":null
    }
   ```
   *   Error response 500: Returns an error occurs during request process.
           ```json
            {
              "message": "Internal Server Error",
              "status": 500,
            "data": null
            }
        ```
**Notes:** 
    *  A valid email, otp and new password required here for update password.

### Admin API

#### User Subscription Management

##### Subscribe User Plan
**Overview:** Subscribes a user to a specific plan.
**Method:** `POST`
**URL:** `http://localhost:5000/api/v1/admin/users/{userId}/subscription`
**Authentication:** Bearer JWT  Token of the parent or super admin

**Request Headers:**
   - `Content-Type: application/json`
  -`Authorization: Bearer <admin_jwt_token>`

**Request Body:**
   ```json
   {
      "planId": "67616c378c821544d3c5400b",
     "billingCycle": "monthly" 
   }
   ```

**Response:**
   * Succesfully subscription 200 : Returns success message and  subscription details.
   ```json
  {
    "message": "User subscription is updated.",
    "status": 200,
    "data": {
        "subscriptionId": "67665e597cd2cd7c47cc26af",
        "planId": "67616c378c821544d3c5400b",
        "userId": "6761443efbceffa2810be4be",
        "billingCycle": "monthly",
            }
    }
   ```
  
  *   Error Response 400: Returns an error if user or plan id doesnot exists.
  ```json
  {
        "message": "Invalid User or Plan ID",
       "status": 400,
       "data": null
    }
   ```
  *   Error response 500: Returns an error occurs during request process.
   ```json
    {
    "message": "Internal Server Error",
        "status": 500,
        "data": null
    }
   ```
**Notes:**
    *  The `userId`  in the url  should belong to a user.
    *   The user id and plan id should be valid
    
##### Cancel User Plan
**Overview:** Cancels a user's current subscription plan.

**Method:** `POST`

**URL:** `http://localhost:5000/api/v1/admin/users/{userId}/subscription/cancel`

**Authentication:** Bearer JWT token of the super_admin or parent user.

**Request Headers:**
   - `Content-Type: application/json`
   -  `Authorization: Bearer <admin_jwt_token>`

**Request Body:**
   ```json
   {
     "reason": "User does not wish to continue with the plan."
   }
   ```

**Response:**
    * Successful Cancellation 200: Return success message and subscription id.
                ```json
                 {
                     "message": "User subscription is cancelled.",
                     "status": 200,
                     "data": {
                       "subscriptionId" : "676665812cf47edc02011a5e"
                   }
                 }
              ```
*   Error Response 400: Returns invalid user id
  ```json
  {
      "message":"Invalid User ID",
      "status":400,
      "data":null
  }
   ```
*  Error response 500: Returns an error occurs during request process.
   ```json        
 {
            "message": "Internal Server Error",
            "status": 500,
            "data": null
      }
        ```
**Notes:**
    *  The `userId` in url should belong to a user.

##### Get Subscription by User ID
**Overview:** Retrieves a  subscription details of a user.

**Method:** `GET`

**URL:** `http://localhost:5000/api/admin/users/{userId}/subscription`

**Authentication:** Admin JWT token is required for this endpoint.

**Request Headers:**
   - `Content-Type: application/json`
  - `Authorization: Bearer <admin_jwt_token>`

**Response:**
    * Successful retrieval 200: Returns user subscription details.
     ```json
  {
    "message": "User subscription found.",
     "status": 200,
     "data": {
     "subscriptionId": "67665e597cd2cd7c47cc26af",
      "planId": "67616c378c821544d3c5400b",
       "userId": "6761443efbceffa2810be4be",
         "billingCycle": "monthly",
       "status": "active"
        }
    }
  ```

* Error Response 400: Returns an error if the user does not exists.
  ```json
 {
 "message": "No subscription found for this user.",
  "status": 400,
  "data": null
}
  ```

* Error response 500: Returns an error occurs during request process.
   ```json
    {
         "message": "Internal Server Error",
        "status": 500,
        "data": null
    }
   ```
**Notes:**
    *  The `userId` in url should belong to a user.
    *  Admin JWT token needed to access this route.

##### Update Subscription by User ID
**Overview:** Updates a user's current subscription details.
**Method:** `POST`
**URL:** `http://localhost:5000/api/admin/users/{userId}/subscription/update`

**Authentication:** Bearer JWT token of the super_admin or parent user.

**Request Headers:**
  - `Content-Type: application/json`
  -  `Authorization: Bearer <admin_jwt_token>`

**Request Body:**
 ```json
  {
     "planId": "67616c378c821544d3c5400b",
     "billingCycle": "monthly"
  }
 ```
**Response:**
   * Succesfully updated 200 Return success message and update subscription details.
       ```json
      {
        "message": "User subscription is updated.",
         "status": 200,
        "data": {
             "subscriptionId": "6766671e7cd2cd7c47cc26b0",
             "planId": "67616c378c821544d3c5400b",
             "userId": "6761443efbceffa2810be4be",
             "billingCycle": "monthly",
              "status":"active"
         }
      }
      ```
   * Error Response 400: Returns an error if user id or plan id does not exist..
       ```json
         {
         "message": "Invalid User or Plan ID",
         "status": 400,
         "data": null
         }
    ```
  *   Error response 500: Returns an error occurs during request process.
        ```json
        {
           "message": "Internal Server Error",
           "status": 500,
            "data": null
        }
       ```
**Notes:**
    *  The `userId` in url should belong to a user.
    *  The user id and plan id should be valid
    * Admin  JWT token needed to access this route.

#### Subscription Management

##### Get Plans
**Overview:** Fetches a list of subscription plans based on optional query parameters.
**Method:** `GET`

**URL:** `http://localhost:5000/api/v1/admin/subscription/plans?category={category}&status={status}&name={name}`

**Authentication:** Admin JWT needed to access this route.

**Request Headers:**
      -  `Authorization: Bearer <admin_jwt_token>`

**Query Parameters:**
   - `category`: (Optional) Filters plans by category (e.g., "enterprise").
    - `status`: (Optional) Filters plans by status (e.g., "active").
    - `name`: (Optional) Filters plans by name (e.g., "premium").

**Response:**
   * Successful retrieval 200 : Returns list of plan data based on the filter.
   ```json
{
    "message": "Plans fetched successfully.",
    "status": 200,
    "data": [
        {
            "planId": "676163737d821544d3c5400d",
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
       "createdAt": "2024-06-22T17:56:03.325Z",
      "status": "active",
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
* Error Response 400: Returns an empty array of plan data if does not match the filter criteria.
   ```json
{
    "message": "Plans fetched successfully.",
    "status": 200,
    "data": []
}
   ```
  *   Error response 500: Returns an error occurs during request process.
         ```json
          {
            "message": "Internal Server Error",
            "status": 500,
           "data": null
          }
       ```
**Notes:**
    *  All the query parameters are optional.
    * Admin JWT token is needed to access this route.

##### Get Plans by ID
**Overview:** Retrieves plan details by plan ID.
**Method:** `GET`
**URL:** `http://localhost:5000/api/admin/subscription/plans/{planId}`

**Authentication:** Bearer JWT token of admin or super admin is required.

**Request Headers:**
   - `Content-Type: application/json`
   - `Authorization: Bearer <admin_jwt_token>`

**Response:**
 * Successfull retrieval 200: Returns plan data if found by plan id.
   ```json
   {
    "message": "Plan fetched successfully.",
     "status": 200,
      "data": {
        "planId": "676163737d821544d3c5400d",
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
       "createdAt": "2024-06-22T17:56:03.325Z",
       "status": "active",
       "customFeatures": [
            "White label reports",
          "Custom URL shortener",
           "Advanced team permissions",
         "API rate limit increase"
        ]
      }
}

   ```
* Error Response 400: Returns an error if plan does not exists.
  ```json
 {
  "message": "Plan not found.",
    "status": 400,
   "data": null
 }
  ```
  *   Error response 500: Returns an error occurs during request process.
         ```json
            {
             "message": "Internal Server Error",
              "status": 500,
            "data": null
           }
        ```
**Notes:**
    *  The `planId` in the URL should be valid.
    *  Admin JWT token needed to access this route.

##### Update Custom Features
**Overview:** Updates custom features for an existing plan.

**Method:** `PATCH`

**URL:** `http://localhost:5000/api/admin/subscription/plans/{planId}/features`

**Authentication:** Bearer JWT token of the admin or super admin is required.

**Request Headers:**
   - `Content-Type: application/json`
   -  `Authorization: Bearer <admin_jwt_token>`

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
* Successful update 200: Returns success message.
  ```json
   {
        "message": "Plan custom features updated successfully.",
        "status": 200,
        "data": null
    }
   ```
* Error Response 400: Returns an error if the plan or plan id does not exists
   ```json
  {
     "message": "Plan not found.",
     "status": 400,
      "data": null
    }
   ```
*  Error response 500: Returns an error occurs during request process.
  ```json
 {
     "message": "Internal Server Error",
    "status": 500,
     "data": null
 }
  ```
**Notes:**
    *  The `planId` in the URL should be valid and exist in plan db.
    * Only the `customFeatures` array will be updated.
    * Admin JWT token is needed to access this route.

##### Create Plan
**Overview:** Creates a new subscription plan.
**Method:** `POST`

**URL:** `http://localhost:5000/api/admin/subscription/plans`

**Authentication:** Bearer JWT token of the super admin.

**Request Headers:**
   - `Content-Type: application/json`
    - `Authorization: Bearer <admin_jwt_token>`

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
   "category": "enterprise"
}
  ```

**Response:**
*  Successful plan creation 201: Returns the newly created plan details.
  ```json
   {
    "message": "Subscription plan created successfully.",
    "status": 201,
     "data": {
        "planId": "6766a18351be246c3a275f5c",
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
     "createdAt": "2024-06-22T20:23:32.672Z",
       "status": "inactive",
      "customFeatures": []
      }
 }

  ```
 * Error Response 400: Returns an error if the plan already exists
 ```json
{
   "message": "Plan with this name already exists.",
  "status": 400,
  "data": null
}
 ```
*  Error Response 500: Server error if something occurs while creating plan.
  ```json
 {
    "message": "Internal Server Error",
     "status": 500,
      "data": null
 }
 ```
**Notes:**
    *  The structure of requested body should be accurate according to instruction.
    * Admin JWT token is needed to access this route.

##### Update Plan
**Overview:** Updates an existing subscription plan.
**Method:** `PUT`
**URL:** `http://localhost:5000/api/admin/subscription/plans/{planId}`

**Authentication:** Admin JWT token is required to access this route.

**Request Headers:**
    - `Content-Type: application/json`
    - `Authorization: Bearer <admin_jwt_token>`

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
             "reportTypes": [
              "basic",
              "advanced"
             ],
           "exportFormats": [
              "pdf",
           "csv"
           ],
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
  * Successfull update 200: Returns a success message.
    ```json
{
    "message": "Subscription plan updated successfully.",
    "status": 200,
    "data": null
}
    ```
* Error Response 400:  Returns an error if plan id does not exists.
     ```json
{
   "message": "Plan not found.",
   "status": 400,
  "data": null
}
   ```
 *  Error Response 500: Return server error while updating a plan.
    ```json
{
"message": "Internal Server Error",
  "status": 500,
    "data": null
}
    ```
**Notes:**
  * The `planId` in the URL should be valid and exists in plan database.
    * All the fields present in body will be updated including plan id.
    * Admin JWT token is needed to access this route.


##### Update Plan Status
**Overview:** Updates the status of a subscription plan.
**Method:** `POST`
**URL:** `http://localhost:5000/api/subscription/admin/plans/{planId}/status`

**Authentication:** Admin JWT token is required to access this route.

**Request Headers:**
      - `Content-Type: application/json`
     - `Authorization: Bearer <admin_jwt_token>`

**Request Body:**
  ```json
  {
    "status": "active"
  }
  ```

**Response:**
   * Successful update 200: Return an success message.
   ```json
{
"message": "Plan status updated successfully.",
    "status": 200,
  "data": null
  }
   ```

*  Error Response 400: Returns an error if plan id does not exists.
          ```json
{
    "message": "Plan not found.",
     "status": 400,
     "data": null
  }
  ```

*   Error Response 500: Returns server error while updating a plan status.
          ```json
          {
            "message": "Internal Server Error",
              "status": 500,
            "data": null
          }
        ```
**Notes:**
    *   The `planId` in the URL should be valid.
    *   Only  plan status  field will be updated.
    * Admin JWT token is needed to access this route.

##### Delete Plan
**Overview:** Deletes a subscription plan.
**Method:** `DELETE`

**URL:** `http://localhost:5000/api/subscription/admin/plans/{planId}`
**Authentication:** Admin JWT token of the super admin needed to access this route

**Request Headers:**
 -  `Authorization: Bearer <admin_jwt_token>`
    -`Content-Type: application/json`
**Request Body**
```json
 {
    "status": "inactive"
  }
```
**Response:**
    * Successful plan delete 200:  Returns success message.
        ```json
        {
          "message": "Plan deleted successfully.",
          "status": 200,
            "data": null
         }
        ```
   * Error Response 400: Returns an error if plan does not exist..
```json
{
   "message": "Plan not found.",
     "status": 400,
   "data": null
}
   ```
  *  Error Response 500: Returns internal server error occurs while deleting plan.
        ```json
        {
          "message": "Internal Server Error",
          "status": 500,
            "data": null
       }
       ```
**Notes:**
    * The `planId` in the URL should be valid.
    * Admin JWT token is required for this route.

##### Update Both Features
**Overview:** Updates both standard and custom features for a plan.
**Method:** `PUT`
**URL:** `http://localhost:3000/api/subscriptions/plan-features/{planId}`

**Authentication:** Bearer JWT token of the super admin needed to perform the operation

**Request Headers:**
     - `