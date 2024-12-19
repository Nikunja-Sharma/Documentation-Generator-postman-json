# SocioX

# SocioX API Documentation

## Overview
This document provides a comprehensive guide to the SocioX API, covering authentication, user management, subscription services, and admin functionalities. It includes descriptions of each endpoint, request and response examples, and important notes to ensure smooth integration.

### Authentication
Authentication for this API is primarily done using JSON Web Tokens (JWT). You'll typically receive a JWT upon successful login, and this token must be included in the `Authorization` header of protected endpoints as a `Bearer` token.

### Endpoints

---
## Auth

### 1. Register Parent Email
#### Description
Registers a new parent user with the system.

#### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/auth/register`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Body**:

```json
{
  "email": "xnikunjadu@gmail.com",
  "password": "yourpassword123",
  "name": "Test User"
}
```

*   **Curl Command**:
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "xnikunjadu@gmail.com",
        "password": "yourpassword123",
        "name": "Test User"
      }' \
    http://localhost:5000/api/v1/auth/register
    ```

#### Response
*   **Status Code**: `201 Created` (Successful)  
*   **Body**: (This might vary based on your actual backend setup)

### 2. Register Child Email
#### Description
Registers a new child user associated with a parent account. Requires valid parent auth token.

#### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/users/child-users`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYyYjdiZDQzZTFiNjgzZDZhYTlkMmEiLCJlbWFpbCI6ImNoaWxkQGV4YW1wbGUuY29tIiwidXNlclR5cGUiOiJjaGlsZCIsInBlcm1pc3Npb25zIjpbImNyZWF0ZV9wb3N0cyIsInZpZXdfYW5hbHl0aWNzIl0sInBhcmVudElkIjoiNjc2MTQ0M2VmYmNlZmZhMjgxMGJlNGJlIiwiaWF0IjoxNzM0NTIyODE0LCJleHAiOjE3MzQ2MDkyMTR9.E6aWLfK0ar0MSpAd6vDyhXPF9gYbG9y5UbsApb-JFMM`
*   **Body**:

```json
{
  "email": "child@example.com",
  "password": "childewqepassword123",
  "name": "Child User",
  "permissions": ["create_posts", "view_analytics"]
}
```

*   **Curl Command**:
   ```bash
   curl -X POST \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYyYjdiZDQzZTFiNjgzZDZhYTlkMmEiLCJlbWFpbCI6ImNoaWxkQGV4YW1wbGUuY29tIiwidXNlclR5cGUiOiJjaGlsZCIsInBlcm1pc3Npb25zIjpbImNyZWF0ZV9wb3N0cyIsInZpZXdfYW5hbHl0aWNzIl0sInBhcmVudElkIjoiNjc2MTQ0M2VmYmNlZmZhMjgxMGJlNGJlIiwiaWF0IjoxNzM0NTIyODE0LCJleHAiOjE3MzQ2MDkyMTR9.E6aWLfK0ar0MSpAd6vDyhXPF9gYbG9y5UbsApb-JFMM" \
   -d '{
       "email": "child@example.com",
       "password": "childewqepassword123",
       "name": "Child User",
       "permissions": ["create_posts", "view_analytics"]
     }' \
   http://localhost:5000/api/users/child-users
   ```

#### Response
*   **Status Code**: `201 Created` (Successful)

### 3. Login Email
#### Description
Logs in an existing user using their email and password.

#### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/auth/login`
*  **Headers**:
      * `Content-Type: application/json`
*   **Body**:
```json
{
  "email": "john@example.com",
  "password": "childewqepassword123"
}
```

*   **Curl Command**:
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "john@example.com",
        "password": "childewqepassword123"
      }' \
      http://localhost:5000/api/v1/auth/login
    ```

#### Response
*   **Status Code**: `200 OK` (Successful)
*   **Body**: *Typically returns a JWT in the successful case.*

### 4. Forgot Password
#### Description
Initiates the password reset process by sending an OTP to the provided email.

#### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/auth/forgot-password`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Body**:
```json
{
  "email": "xnikunjadu2@gmail.com"
}
```

*  **Curl Command**:
     ```bash
      curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "email": "xnikunjadu2@gmail.com"
        }' \
        http://localhost:5000/api/auth/forgot-password
     ```
#### Response
*   **Status Code**: `200 OK` (Successful)

### 5. Reset Email Password
#### Description
Resets the user password after verifying the provided OTP.

#### Request
*   **Method**: `POST`
*    **URL**: `http://localhost:5000/api/auth/reset-password`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Body**:
```json
{
  "email": "xnikunjadu2@gmail.com",
  "otp": "360892",
  "newPassword": "your-new-password"
}
```
*   **Curl Command**:
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "xnikunjadu2@gmail.com",
        "otp": "360892",
        "newPassword": "your-new-password"
      }' \
      http://localhost:5000/api/auth/reset-password
    ```
#### Response
*   **Status Code**: `200 OK` (Successful)

---
## Admin

### 1. User Subscription
#### 1.1. Subscribe User to a Plan
##### Description
Allows an admin to subscribe a specific user to a subscription plan.

##### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/admin/users/6761443efbceffa2810be4be/subscription`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_ADMIN_TOKEN`
*   **Body**:
```json
{
  "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
}
```
*  **Curl Command**:
   ```bash
   curl -X POST \
   -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
   -d '{
        "planId": "67616c378c821544d3c5400b",
         "billingCycle": "monthly"
      }' \
     http://localhost:5000/api/v1/admin/users/6761443efbceffa2810be4be/subscription
   ```
##### Response
*   **Status Code**: `201 Created` (Successful)

#### 1.2. Cancel User Subscription
##### Description
Allows an admin to cancel a user’s subscription.

##### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/v1/admin/users/6761443efbceffa2810be4be/subscription/cancel`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_ADMIN_TOKEN`
*  **Body**:
```json
{
  "reason":"i dont really know the reason"
}
```
 * **Curl Command**:
    ```bash
   curl -X POST \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
    -d '{
       "reason":"i dont really know the reason"
      }' \
    http://localhost:5000/api/v1/admin/users/6761443efbceffa2810be4be/subscription/cancel
   ```
##### Response
*   **Status Code**: `200 OK` (Successful)

#### 1.3. Get Subscription by User ID
##### Description
Fetches subscription details for a user via their ID.

##### Request
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription`
*   **Headers**:
    *    `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_ADMIN_TOKEN`

* **Curl Command**:
  ```bash
   curl -X GET \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
   http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription

   ```
##### Response
*   **Status Code**: `200 OK` (Successful)
*   **Body**:
    ```
       {
         "subscription": {
            "planId": "67616c378c821544d3c5400b",
            "billingCycle": "monthly",
            "startDate": "2024-01-18T19:48:32.064Z",
           "status": "active",
             "isTrial": false,
             "nextBillingDate": "2024-02-18T19:48:32.064Z"
         },
         "user": {
            "_id": "6761443efbceffa2810be4be"
         }
    }
    ```

#### 1.4. Update Subscription by User ID
##### Description
Updates an existing user subscription's detail.

##### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription/update`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_ADMIN_TOKEN`
*   **Body**:
    ```json
    {
        "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
     }
    ```
*  **Curl Command**:
   ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
    -d '{
         "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly"
       }' \
    http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription/update
   ```

##### Response
*   **Status Code**: `200 OK` (Successful)

### 2. Subscription Management
#### 2.1. Get Plans
##### Description
Retrieves a list of subscription plans, optionally filtered by `category`, `status`, and `name`.

##### Request
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/v1/admin/subscription/plans?category=enterprise&status=active&name=premium`
*   **Headers**:
    *   `Authorization: Bearer YOUR_JWT_TOKEN`
*  **Curl Command**:

    ```bash
    curl -X GET \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    "http://localhost:5000/api/v1/admin/subscription/plans?category=enterprise&status=active&name=premium"
    ```

##### Response
*   **Status Code**: `200 OK` (Successful)
*   **Body**:
    ```json
    [
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
            "status": "active"
          }
    ]
    ```

#### 2.2. Get Plan by ID
##### Description
Retrieves a specific subscription plan using its ID.

##### Request
*   **Method**: `GET`
*    **URL**: `http://localhost:5000/api/admin/subscription/plans/67616c378c821544d3c5400b`
*   **Headers**:
    *   `Content-Type: application/json`
*  **Curl Command**:

    ```bash
     curl -X GET \
      -H "Content-Type: application/json" \
       http://localhost:5000/api/admin/subscription/plans/67616c378c821544d3c5400b
    ```

##### Response
*   **Status Code**: `200 OK` (Successful)
*   **Body**:
   ```json
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
            "status": "active"
      }
   ```

#### 2.3. Update Custom Features
##### Description
Updates the custom features of a subscription plan.

##### Request
*   **Method**: `PATCH`
*   **URL**: `http://localhost:5000/api/admin/subscription/plans/67616c378c821544d3c5400b/features`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_ADMIN_TOKEN`
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
*   **Curl Command**:
    ```bash
        curl -X PATCH \
       -H "Content-Type: application/json" \
        -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
       -d '{
              "customFeatures": [
                "White label reports",
                "Custom URL shortener",
               "Advanced team permissions",
                "API rate limit increase"
             ]
           }' \
        http://localhost:5000/api/admin/subscription/plans/67616c378c821544d3c5400b/features
    ```
##### Response
*   **Status Code**: `200 OK` (Successful)

#### 2.4. Create Plan
##### Description
Creates a new subscription plan.

##### Request
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/api/admin/subscription/plans`
*   **Headers**:
    *   `Content-Type: application/json`
*   **Body**:
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
*   **Curl Command**:
    ```bash
   curl -X POST \
   -H "Content-Type: application/json" \
   -d '{
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
      }' \
      http://localhost:5000/api/admin/subscription/plans
    ```
##### Response
*   **Status Code**: `201 Created` (Successful)

#### 2.5. Update Plan
##### Description
Updates an existing subscription plan.

##### Request
*   **Method**: `PUT`
*   **URL**: `http://localhost:5000/api/admin/subscription/plans/67615fa882f14b0d21c065a3`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_JWT_TOKEN`
*   **Body**:
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
*   **Curl Command**:
    ```bash
     curl -X PUT \
     -H "Content-Type: application/json" \
      -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
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
        }' \
     http://localhost:5000/api/admin/subscription/plans/67615fa882f14b0d21c065a3
   ```

##### Response
*   **Status Code**: `200 OK` (Successful)

#### 2.6. Update Plan Status
##### Description
Updates the status of a subscription plan (e.g., active or inactive).

##### Request
*  **Method**: `POST`
*  **URL**: `http://localhost:5000/api/subscription/admin/plans/67615fa882f14b0d21c065a3/status`
*   **Headers**:
    *   `Authorization: Bearer YOUR_ADMIN_JWT_TOKEN`
    *   `Content-Type: application/json`
*  **Body**:
```json
     {
         "status": "active"
      }
```
*   **Curl Command**:
    ```bash
       curl -X POST \
       -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
       -H "Content-Type: application/json" \
       -d '{
            "status": "active"
            }' \
        http://localhost:5000/api/subscription/admin/plans/67615fa882f14b0d21c065a3/status
    ```

##### Response
*   **Status Code**: `200 OK` (Successful)

#### 2.7. Delete Plan
##### Description
Deletes a subscription plan. Note: Ensure the correct plan ID is used.

##### Request
*   **Method**: `DELETE`
*   **URL**: `http://localhost:5000/api/subscription/admin/plans/67615fa882f14b0d21c065a3`
*   **Headers**:
    *   `Authorization: Bearer YOUR_ADMIN_JWT_TOKEN`
    *  `Content-Type: application/json`

*   **Curl Command**:
    ```bash
    curl -X DELETE \
    -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
    -H "Content-Type: application/json" \
    http://localhost:5000/api/subscription/admin/plans/67615fa882f14b0d21c065a3
    ```
##### Response
*   **Status Code**: `200 OK` (Successful)

#### 2.8. Update both Features
##### Description
Updates both standard and custom features of a subscription plan.

##### Request
*   **Method**: `PUT`
*   **URL**: `http://localhost:3000/api/subscriptions/plan-features/64f5a7b1c25a`
*   **Headers**:
    *   `Content-Type: application/json`
    *   `Authorization: Bearer YOUR_ADMIN_TOKEN`

*   **Body**:
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
*   **Curl Command**:
     ```bash
      curl -X PUT \
       -H "Content-Type: application/json" \
      -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
       -d '{
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
         }'\
      http://localhost:3000/api/subscriptions/plan-features/64f5a7b1c25a
    ```

##### Response
*   **Status Code**: `200 OK` (Successful)

#### 2.9. Update Standard Features
##### Description
Updates only the standard features of a subscription plan.

##### Request
*   **Method**: `PUT`
*   **URL**: `http://localhost:3000/api/subscriptions/plan-features/64f5a7b1c25a`
*   **Headers**:
    * `Content-Type: application/json`
     *   `Authorization: Bearer YOUR_ADMIN_TOKEN`
*   **Body**:
```json
{
  "features": {
    "teamMembers": 15,
    "support": "24/7"
  }
}
```
*   **Curl Command**:
    ```bash
      curl -X PUT \
       -H "Content-Type: application/json" \
        -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
       -d '{
              "features": {
                "teamMembers": 15,
               "support": "24/7"
              }
           }' \
       http://localhost:3000/api/subscriptions/plan-features/64f5a7b1c25a
    ```

##### Response
* **Status Code**: `200 OK` (Successful)

#### 2.10. Get Plan by Categories
##### Description
This endpoint is not clearly defined in the Postman documentation. More details will be provided once available.

##### Request
*   **Method**: `GET`
*   **URL**: Not specified
*   **Headers**: None
*   **Body**: None

##### Response
*   **Status Code**: Not specified

### 3. User Management
#### 3.1. Reactivate User
##### Description
Reactivates a previously deactivated user.

##### Request
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/reactivate`
*   **Headers**: None
*   **Body**:
```json
{
  "name":"Nikunja",
  "email":"xnikunja@gmail.com",
  "picture":"dsafsd"
}
```
*   **Curl Command**:
    ```bash
       curl -X GET \
       http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/reactivate
    ```

##### Response
*   **Status Code**: `200 OK` (Successful)

#### 3.2. Get List of Users
##### Description
Retrieves a list of all users in the system.

##### Request
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/api/v1/admin/users`
*   **Headers**:
    