# SocioX

```markdown
# SocioX API Documentation

This document provides detailed information about the SocioX API endpoints.

## Authentication (`/auth`)

### 1. Register Parent Email (`POST /api/v1/auth/register`)
This endpoint allows a parent user to register with an email and password.

**Description**: Creates a new parent user account.

**Request Body**
```json
{
    "email": "xnikunjadu@gmail.com",
    "password": "yourpassword123",
    "name": "Test User"
}
```

**Response**:
A successful registration will return a success status with a token. Any error will return a corresponding error.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "xnikunjadu@gmail.com",
    "password": "yourpassword123",
    "name": "Test User"
  }'
```

---

### 2. Register Child Email (`POST /api/users/child-users`)
This endpoint allows a parent user to register a child user with an email, password, and permissions.  
**Description**: Creates a new child user account associated with a parent.

**Headers**:
- `Content-Type`: `application/json`
- `Authorization`: `Bearer <parent_jwt_token>`

**Request Body**:
```json
{
  "email": "child@example.com",
  "password": "childewqepassword123",
  "name": "Child User",
  "permissions": ["create_posts", "view_analytics"]
}
```

**Response**:
A successful registration will return a success status with a token. Any error will return a corresponding error.

**Curl Command**:
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

---

### 3. Login Email (`POST /api/v1/auth/login`)
This endpoint allows a user to log in with their email and password.

**Description**: Logs in a user and returns an authentication token.

**Request Body**:
```json
{
    "email": "john@example.com",
    "password": "childewqepassword123"
}
```

**Response**: A successful login returns a JWT token. Failed login will return error with appropriate message.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "john@example.com",
    "password": "childewqepassword123"
  }'
```

---
### 4. Forgot Password (`POST /api/auth/forgot-password`)
This endpoint initiates the 'forgot password' flow by sending a reset password link to the provided email.

**Description**: Sends a password reset link to the user's email.

**Request Body**:
```json
{
    "email": "xnikunjadu2@gmail.com"
}
```

**Response**: A successful request will return a success message. An invalid or non-registered email will result in an error.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/auth/forgot-password \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "xnikunjadu2@gmail.com"
  }'
```

---
### 5. Reset Email Password (`POST /api/auth/reset-password`)
This endpoint completes the reset password process by verifying the OTP and setting the new password.

**Description**: Resets the user's password after verifying the OTP sent to their email.

**Request Body**:
```json
{
  "email": "xnikunjadu2@gmail.com",
  "otp": "360892",
  "newPassword": "your-new-password"
}
```

**Response**: A successful reset returns a success message. An invalid or expired OTP or mismatch email results in an error message.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/auth/reset-password \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "xnikunjadu2@gmail.com",
  "otp": "360892",
  "newPassword": "your-new-password"
}'
```

---
## Admin (`/admin`)

### User Subscription (`/admin/users/{userId}/subscription`)

#### 1. Subscribe User to a Plan (`POST /api/v1/admin/users/{userId}/subscription`)

**Description**: Subscribes a specified user to a plan.

**Headers**:
- `Content-Type`: `application/json`
- `Authorization`: `Bearer <admin_jwt_token>`

**Path Parameters**:
  -  `userId`: The ID of the user to subscribe. Example: `6761443efbceffa2810be4be`
    
**Request Body**:
```json
{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
}
```

**Response**: A successful request will return a success message along with current subscription data.  Error returns a corresponding error message.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/v1/admin/users/6761443efbceffa2810be4be/subscription \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
  -d '{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
  }'
```

---

#### 2. Cancel User Subscription (`POST /api/v1/admin/users/{userId}/subscription/cancel`)

**Description**: Cancels a specified user's subscription.

**Headers**:
- `Content-Type`: `application/json`
- `Authorization`: `Bearer <admin_jwt_token>`

**Path Parameters**:
  - `userId`:  The ID of the user whose subscription to cancel. Example: `6761443efbceffa2810be4be`

**Request Body**:
```json
{
    "reason":"i dont really know the reason"
}
```

**Response**: A successful request will return a success message and will set the subscription status as `cancelled`. Error returns a corresponding error message.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/v1/admin/users/6761443efbceffa2810be4be/subscription/cancel \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
  -d '{
    "reason":"i dont really know the reason"
  }'
```

---
#### 3. Get Subscription Details by User ID(`GET /api/admin/users/{userId}/subscription`)

**Description**: Retrieves the subscription details of a specific user.

**Headers**:
-  `Content-Type`: `application/json`
-   `Authorization`: `Bearer <admin_jwt_token>`

**Path Parameters**:
- `userId`:  The ID of the user. Example: `6761443efbceffa2810be4be`

**Request Body**:
```json
{
    "reason":"i dont really know the reason"
}
```

**Response**: A successful request will return current subscription data of the user. Error returns a corresponding error message.

**Curl Command**:
```bash
curl -X GET \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```

---

#### 4. Update User Subscription (`POST /api/admin/users/{userId}/subscription/update`)

**Description**: Updates the subscription plan of a user.

**Headers**:
-   `Content-Type`: `application/json`
-   `Authorization`: `Bearer <admin_jwt_token>`

**Path Parameters**:
- `userId`:  The ID of the user whose subscription will be updated. Example: `6761443efbceffa2810be4be`

**Request Body**:
```json
{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
}
```

**Response**: A successful request will return an updated subscription data. Error returns a corresponding error message.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription/update \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
  -d '{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
  }'
```
---

### Subscription Management (`/admin/subscription`)

#### 1. Get Subscription Plans (`GET /api/v1/admin/subscription/plans`)
  
**Description**: Retrieves a list of subscription plans based on filter parameters.

**Headers**:
  - `Authorization`: `Bearer <admin_jwt_token>`

**Query Parameters**:
- `category`: (Optional) Filter plans by category e.g. `enterprise`.
- `status`: (Optional) Filter plans by status e.g.  `active`.
- `name`: (Optional) Filter plans by name e.g. `premium`.

**Response**: Returns a list of plans according to the query parameters, otherwise all plans.

**Curl Command**:
```bash
curl -X GET \
  "http://localhost:5000/api/v1/admin/subscription/plans?category=enterprise&status=active&name=premium" \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

---

#### 2. Get Subscription Plan by ID (`GET /api/admin/subscription/plans/{planId}`)

**Description**: Retrieves details of a specific subscription plan by ID.

**Headers**:
- `Content-Type`: `application/json`
-   `Authorization`: `Bearer <admin_jwt_token>`

**Path Parameters**:
- `planId`: The ID of the plan. Example: `67616c378c821544d3c5400b`

**Response**: Returns the detailed information of the plan. Error returns a corresponding error message.

**Curl Command**:
```bash
curl -X GET \
  http://localhost:5000/api/admin/subscription/plans/67616c378c821544d3c5400b \
  -H 'Content-Type: application/json' \
```
---

#### 3. Update Custom Features (`PATCH /api/admin/subscription/plans/{planId}/features`)

**Description**: Updates the custom features of a specific subscription plan.

**Headers**:
- `Content-Type`: `application/json`
- `Authorization`: `Bearer <admin_jwt_token>`

**Path Parameters**:
- `planId`: The id of the plan you want to update. Example: `67616c378c821544d3c5400b`

**Request Body**:
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

**Response**: Returns the updated plan with new custom features.  Error returns a corresponding error message.

**Curl Command**:
```bash
curl -X PATCH \
  http://localhost:5000/api/admin/subscription/plans/67616c378c821544d3c5400b/features \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
  -d '{
    "customFeatures": [
      "White label reports",
      "Custom URL shortener",
      "Advanced team permissions",
      "API rate limit increase"
    ]
  }'

```

---

#### 4. Create a Subscription Plan (`POST /api/admin/subscription/plans`)

**Description**: Creates a new subscription plan.

**Headers**:
- `Content-Type`: `application/json`
- `Authorization`: `Bearer <admin_jwt_token>`

**Request Body**:
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

**Response**: Returns the created plan data. Error returns a corresponding error message.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/admin/subscription/plans \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
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
}'

```
---

#### 5. Update a Subscription Plan (`PUT /api/admin/subscription/plans/{planId}`)

**Description**: Updates an existing subscription plan.

**Headers**:
-   `Content-Type`: `application/json`
-   `Authorization`: `Bearer <admin_jwt_token>`

**Path Parameters**:
  - `planId` : The ID of the plan to be updated. Example `67615fa882f14b0d21c065a3`

**Request Body**:
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

**Response**: Returns an updated plan. Error returns a corresponding error message.

**Curl Command**:
```bash
curl -X PUT \
  http://localhost:5000/api/admin/subscription/plans/67615fa882f14b0d21c065a3 \
  -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
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
  }'
```
---
  
#### 6. Update Subscription Plan Status (`POST /api/subscription/admin/plans/{planId}/status`)

**Description**: Updates the status of a subscription plan.

**Headers**:
  -  `Authorization`: `Bearer <admin_jwt_token>`
  -  `Content-Type`: `application/json`

**Path Parameters**:
- `planId`: The ID of the plan for which  the status is to be updated.  Example: `67615fa882f14b0d21c065a3`

**Request Body**:
```json
{
    "status": "active"
}
```

**Response**:  A successful request will update plan status and returns the current status of the plan. Error returns a corresponding error message.

**Curl Command**:
    ```bash
curl -X POST \
  http://localhost:5000/api/subscription/admin/plans/67615fa882f14b0d21c065a3/status \
  -H 'Authorization: Bearer YOUR_ADMIN_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
   -d '{
    "status": "active"
  }'
```

---

#### 7. Delete a Subscription Plan (`DELETE /api/subscription/admin/plans/{planId}`)
  
**Description**: Deletes a subscription plan by its ID. Use this endpoint very carefully.

**Headers**:
  -   `Authorization`: `Bearer <admin_jwt_token>`
    - `Content-Type`: `application/json`

**Path Parameters**:
   -`planId`:  The ID of plan, which is to be deleted. Example:`67615fa882f14b0d21c065a3`
    
**Response**: A successful request returns the deletion of plan from DB, otherwise, error with corresponding message.

**Curl Command**:
```bash
curl -X DELETE \
  http://localhost:5000/api/subscription/admin/plans/67615fa882f14b0d21c065a3 \
  -H 'Authorization: Bearer YOUR_ADMIN_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "status": "inactive"
  }'
```
---

#### 8. Update Both Features (`PUT /api/subscriptions/plan-features/{planId}`)

**Description**: Updates both standard and custom features of a plan by given ID

**Headers**:
-  `Content-Type`: `application/json`
-   `Authorization`: `Bearer <admin_jwt_token>`

**Path Parameters**:
 -`planId`:  The ID of the plan which features is to be updated. Example:`64f5a7b1c25a`

**Request Body**:
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

**Response**:  Successful request will return updated features details, otherwise error with corresponding message.

**Curl Command**:
```bash
curl -X PUT \
  http://localhost:3000/api/subscriptions/plan-features/64f5a7b1c25a \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
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
  }'
```
---

#### 9. Update Standard Features (`PUT /api/subscriptions/plan-features/{planId}`)
  
**Description**: Updates standard features of a plan by given ID

**Headers**:
  -`Content-Type`: `application/json`
  - `Authorization`: `Bearer <admin_jwt_token>`
  
**Path Parameters**:
  - `planId`: The ID of plan, whose features is to be updated. Example:`64f5a7b1c25a`

**Request Body**:
```json
{
    "features": {
      "teamMembers": 15,
      "support": "24/7"
    }
  }
```

**Response**:  Successful request will return updated features details.

**Curl Command**:
```bash
curl -X PUT \
  http://localhost:3000/api/subscriptions/plan-features/64f5a7b1c25a \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
-d '{
    "features": {
      "teamMembers": 15,
      "support": "24/7"
    }
  }'
```
---

### User Management (`/admin/users`)
  
#### 1. Reactivate User (`GET /api/admin/users/{userId}/reactivate`)
  
**Description**: Reactivates a user.

**Headers**:
  -  `Authorization`:`Bearer <admin_jwt_token>`

**Path Parameter**:
-  `userId`: The id of the user to be reactivated. Example:`6761443efbceffa2810be4be`

**Response**: A successful request will return a success message with reactivation complete, other wise an error message.

**Curl Command**:
```bash
curl -X GET \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/reactivate \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```

---

#### 2. Get List of Users (`GET /api/v1/admin/users`)
  
**Description**: Retrieves a list of all users.

**Headers**:
-  `Content-Type`: `application/json`
-   `Authorization`: `Bearer <admin_jwt_token>`

**Response**: Responds with a list of users and their details.

**Curl Command**:
```bash
curl -X GET \
  http://localhost:5000/api/v1/admin/users \
  -H 'Content-Type: application/json' \
   -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```
---
  
#### 3. Delete User (`DELETE /api/admin/users/{userId}`)
  
**Description**: Deletes a user by their ID. Use caution.

**Headers**:
- `Authorization`:`Bearer <admin_jwt_token>`
	
**Path Parameter**:
- `userId`:  The ID of user, to be deleted. Example:`675bd3220bfee16d58204fe8`

**Response**: A successful deletion will return a success message otherwise error with corresponding message.

**Curl Command**:
```bash
curl -X DELETE \
  http://localhost:5000/api/admin/users/675bd3220bfee16d58204fe8 \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```
---

#### 4. Deactivate User (`GET /api/admin/users/{userId}/deactivate`)
  
**Description**: Deactivates a user by their ID.

**Headers**:
- `Authorization`:`Bearer <admin_jwt_token>`

**Path Parameters**:
- `userId`:  The ID of user, to be deactivated. Example:`6761443efbceffa2810be4be`

**Response**: A successful request will return message with deactivation complete, otherwise error with corresponding message.

**Curl Command**:
```bash
curl -X GET \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/deactivate \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```
---

#### 5. Get Complete User Details by ID (`GET /api/admin/users/{userId}/details`)
  
**Description**: Retrieves complete details of a user by their ID.

**Headers**:
-	`Authorization`:`Bearer <admin_jwt_token>`

**Path Parameters**:
- `userId`:  The ID of user, for which full details to be fetched. Example:`6761443efbceffa2810be4be`

**Response**: A successful request will return a user with detailed information other wise returns a error.

**Curl Command**:
```bash
curl -X GET \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/details \
   -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```
---

#### 6. Send Reset Password Link (`POST /api/admin/users/sendPasswordResetLink`)
  
**Description**: Sends password reset link to given user email address

**Headers**:
-	`Authorization`:`Bearer <admin_jwt_token>`

**Request Body**:
```json
{
    "email":"xnikunjadu2@gmail.com"
}
```

**Response**: A successful request will send the reset link to the user email provided.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/admin/users/sendPasswordResetLink \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' 
-d '{
    "email":"xnikunjadu2@gmail.com"
}'
```
---
  
#### 7. Reset User Password (`POST /api/admin/users/reset-password`)
  
**Description**: Resets user password by verifying the token.

**Headers**:
-	`Authorization`:`Bearer <admin_jwt_token>`

**Request Body**:
```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDQzZWZiY2VmZmEyODEwYmU0YmUiLCJpYXQiOjE3MzQ1MDg1ODgsImV4cCI6MTczNDUxMjE4OH0.e17UzfnRrBCAqXkWfP9LWmN3UZyaSFaQtEz7keJDrhY",
    "newPassword":"123456"
}
```

**Response**: Responds with status of reset password process.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/admin/users/reset-password \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
-d '{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDQzZWZiY2VmZmEyODEwYmU0YmUiLCJpYXQiOjE3MzQ1MDg1ODgsImV4cCI6MTczNDUxMjE4OH0.e17UzfnRrBCAqXkWfP9LWmN3UZyaSFaQtEz7keJDrhY",
    "newPassword":"123456"
  }'
```
---
  
### Admin Management  (`/admin`)
   
#### 1. Admin Login (`POST /api/v1/admin/login`)
  
**Description**:  Logs in an admin user.
    
**Headers**:
 - `Content-Type`: `application/json`

**Request Body**:
```json
{  
    "email": "nikunjadu2@gmail.com",
    "password": "nikunjadu2"
}
```
  
**Response**: Successfull login attempt will return a JWT for the admin, upon failure it will return error.

**Curl Command**:
```bash
curl -X POST \
  http://localhost:5000/api/v1/admin/login \
  -H 'Content-Type: application/json' \
  -d '{  
    "email": "nikunjadu2@gmail.com",
    "password": "nikunjadu2"
  }'
```
---
   
#### 2. Create Admin (`POST /api/v1