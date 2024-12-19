# SocioX

```markdown
# SocioX API Documentation

This document provides detailed information about the SocioX API endpoints.

## Authentication (`/api/auth`)

### 1. Register Parent Email
**Description:** Registers a new parent user with an email and password.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
    "email": "xnikunjadu2@gmail.com",
    "password": "yourpassword123",
    "name": "Test User"
}
```

**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "xnikunjadu2@gmail.com",
    "password": "yourpassword123",
    "name": "Test User"
  }'
```

**Response:**
- 201 - User Created Success

**Notes:**
-  The user is created with parent role, on successful registration an email is sent to verify the user email.

---
### 2. Register Child Email
**Description:** Registers a new child user with an email and password.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
    "email": "xnikunjadu2@gmail.com",
    "password": "yourpassword123",
    "name": "Test User"
}
```
**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "xnikunjadu2@gmail.com",
    "password": "yourpassword123",
    "name": "Test User"
  }'
```

**Response:**
- 201 - User Created Success

**Notes:**
- The user is created with child role , on successful registration an email is sent to verify the user email.

---

### 3. Login Email
**Description:** Logs in an existing user with email and password and returns JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
    "email": "xnikunjadu2@gmail.com",
    "password": "123456"
}
```

**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "xnikunjadu2@gmail.com",
    "password": "123456"
  }'
```

**Response:**
- 200 - Successful login.

**Notes:**
-  Returns a JWT (JSON Web Token) upon successful authentication.
---
### 4. Forgot Password
**Description:** Initiates the forgot password process sending an OTP to provided email.

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**
```json
{
    "email": "xnikunja@gmail.com"
}
```

**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/auth/forgot-password \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "xnikunja@gmail.com"
  }'
```
**Response:**
   - 200 - OTP Sent Successfully

**Notes:**
- An OTP will be sent to the email provided to confirm password reset request.

---
### 5. Reset Email Password
**Description:** Resets a user's password using an OTP sent to the user's email and a new password.

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**
```json
{
  "email": "xnikunja@gmail.com",
  "otp": "840907",
  "newPassword": "your-new-password"
}
```
**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/auth/reset-password \
   -H 'Content-Type: application/json' \
  -d '{
  "email": "xnikunja@gmail.com",
  "otp": "840907",
  "newPassword": "your-new-password"
}'
```
**Response:**
- 200 - Password reset successful.

**Notes:**
- Use the OTP received by the user for password reset.

---

## Admin (`/api/admin`)

### 1. User Subscription Management (`/api/admin/users/{userId}/subscription`)

#### 1.1. Subscribe User to a Plan
**Description:** Subscribes a user to a specific plan.

**Endpoint:** `POST /api/admin/users/{userId}/subscription`

**Request Body:**
```json
{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
}
```

**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
  -d '{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
  }'
```

**Response:**
   - 200 - User Subscribed to plan

**Notes:**
- Requires a valid admin token in the `Authorization` header.
-  Replace `{userId}` with the actual User ID and `YOUR_ADMIN_TOKEN` with admin token.
---
#### 1.2. Cancel Subscription
**Description:** Cancels a user's current subscription.

**Endpoint:** `POST /api/admin/users/{userId}/subscription/cancel`

**Request Body:**
```json
{
    "reason": "i dont really know the reason"
}
```

**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription/cancel \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
  -d '{
    "reason":"i dont really know the reason"
  }'
```

**Response:**
   - 200 - User Subscription canceled.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
-  Replace `{userId}` with the actual User ID and `YOUR_ADMIN_TOKEN` with admin token.
---

#### 1.3. Get Subscription by User ID
**Description:** Retrieves a user's current subscription details.

**Endpoint:** `GET /api/admin/users/{userId}/subscription`

**cURL Example:**

```bash
curl -X GET \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/subscription \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```

**Response:**
   -  200 - returns current plan details.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{userId}` with the actual User ID and `YOUR_ADMIN_TOKEN` with admin token.
---
#### 1.4. Update Subscription
**Description:** Updates a user's current subscription plan.

**Endpoint:** `POST /api/admin/users/{userId}/subscription/update`

**Request Body:**
```json
{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle":"monthly"
}
```

**cURL Example:**
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
**Response:**
   - 200 - Users Subscription updated.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{userId}` with the actual User ID and `YOUR_ADMIN_TOKEN` with admin token.
---
### 2. Subscription Management (`/api/subscription/admin/plans`)
#### 2.1. Get All Plans
**Description:** Retrieves all subscription plans.

**Endpoint:** `GET /api/subscription/admin/plans`

**cURL Example:**
```bash
curl -X GET \
  http://localhost:5000/api/subscription/admin/plans \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```

**Response:**
- 200 - List of all plans.

**Notes:**

- Requires a valid admin token in the `Authorization` header.
    - Replace `YOUR_ADMIN_TOKEN` with admin token.

---
#### 2.2. Get Plan by ID
**Description:** Retrieves a specific subscription plan by its ID.

**Endpoint:** `GET /api/subscription/admin/plans/{planId}`

**cURL Example:**
```bash
curl -X GET \
  http://localhost:5000/api/subscription/admin/plans/67616c378c821544d3c5400b \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```
**Response:**
 - 200 - Plan details.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{planId}` with the actual Plan ID. and `YOUR_ADMIN_TOKEN` with admin token.

---
#### 2.3. Update Custom Features
**Description:** Updates the custom features of a subscription plan by its ID.

**Endpoint:** `PATCH /api/subscription/admin/plans/{planId}/features`

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

**cURL Example:**
```bash
curl -X PATCH \
  http://localhost:5000/api/subscription/admin/plans/67616c378c821544d3c5400b/features \
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

**Response:**
  -  200 - Custom features Updated.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{planId}` with the actual Plan ID. and `YOUR_ADMIN_TOKEN` with admin token.
---
#### 2.4. Create a New Plan
**Description:** Creates a new subscription plan.

**Endpoint:** `POST /api/subscription/admin/plans`

**Request Body:**
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

**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/subscription/admin/plans \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
  -d '{
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
  }'
```

**Response:**
 - 201 - Plan Created.

**Notes:**
-Requires a valid admin token in the `Authorization` header.
 - Replace `YOUR_ADMIN_TOKEN` with admin token.

---
#### 2.5. Update a Plan
**Description:** Updates an existing subscription plan by its ID.

**Endpoint:** `PUT /api/subscription/admin/plans/{planId}`

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

**cURL Example:**
```bash
curl -X PUT \
  http://localhost:5000/api/subscription/admin/plans/67615fa882f14b0d21c065a3 \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
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

**Response:**
   - 200 - Plan Updated.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{planId}` with the actual Plan ID and `YOUR_ADMIN_TOKEN` with admin token.
---
#### 2.6. Update Plan Status
**Description:** Updates the status of a subscription plan by its ID example "active" or "inactive".

**Endpoint:** `POST /api/subscription/admin/plans/{planId}/status`

**Request Body:**
```json
{
    "status": "active"
  }
```

**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/subscription/admin/plans/67615fa882f14b0d21c065a3/status \
   -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_JWT_TOKEN' \
  -d '{
    "status": "active"
  }'
```
**Response:**
- 200 - Plan status updated.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{planId}` with the actual Plan ID and `YOUR_ADMIN_JWT_TOKEN` with admin token.
---
#### 2.7. Delete a Plan
**Description:** Deletes a subscription plan by its ID.

**Endpoint:** `DELETE /api/subscription/admin/plans/{planId}`



**cURL Example:**
```bash
curl -X DELETE \
  http://localhost:5000/api/subscription/admin/plans/67615fa882f14b0d21c065a3 \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ADMIN_JWT_TOKEN'
```
**Response:**
   - 200 - Plan Deleted Successfully

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{planId}` with the actual Plan ID and `YOUR_ADMIN_JWT_TOKEN` with admin token.

---
#### 2.8. Update Both Features
**Description:** Updates both standard and custom features of a subscription plan.

**Endpoint:** `PUT http://localhost:3000/api/subscriptions/plan-features/{planId}`

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
**cURL Example:**

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

**Response:**
 - 200 - Features updated successfully.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{planId}` with the actual Plan ID and `YOUR_ADMIN_TOKEN` with admin token.

---

#### 2.9 Update  Standard Features
**Description:** Updates standard features of a subscription plan.

**Endpoint:** `PUT /api/subscriptions/plan-features/{planId}`

**Request Body:**
```json
{
    "features": {
      "teamMembers": 15,
      "support": "24/7"
    }
  }
```
**cURL Example:**
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

**Response:**
- 200 - Features updated successfully.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{planId}` with the actual Plan ID and `YOUR_ADMIN_TOKEN` with admin token.
---

### 3. User Management (`/api/admin/users`)

#### 3.1. Reactivate User
**Description:** Reactivates a deactivated user by ID.

**Endpoint:** `GET /api/admin/users/{userId}/reactivate`

**cURL Example:**
```bash
curl -X GET \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/reactivate \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```

**Response:**
   - 200 - User reactivated.

**Notes:**

- Requires a valid admin token in the `Authorization` header.
- Replace `{userId}` with the actual User ID and `YOUR_ADMIN_TOKEN` with admin token.
---
#### 3.2. Get List of Users
**Description:** Retrieves a list of all users.

**Endpoint:** `GET /api/admin/users`

**cURL Example:**
```bash
curl -X GET \
  http://localhost:5000/api/admin/users \
  -H 'Content-Type: application/json'
```

**Response:**
- 200 - List of all users

**Notes:**
- Requires a valid admin token in the `Authorization` header.
---
#### 3.3. Delete User
**Description:** Deletes a user by their ID.

**Endpoint:** `DELETE /api/admin/users/{userId}`


**cURL Example:**
```bash
curl -X DELETE \
  http://localhost:5000/api/admin/users/675bd3220bfee16d58204fe8 \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```

**Response:**
   - 200 - User deleted successfully.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{userId}` with the actual User ID and `YOUR_ADMIN_TOKEN` with admin token.
---
#### 3.4. Deactivate User
**Description:** Deactivates a user by their ID.

**Endpoint:** `GET /api/admin/users/{userId}/deactivate`

**cURL Example:**
```bash
 curl -X GET \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/deactivate \
   -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```

**Response:**
- 200 - User Deactivated Successfully

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{userId}` with the actual User ID and `YOUR_ADMIN_TOKEN` with admin token.
---
#### 3.5. Get Complete User Details
**Description:** Retrieves complete details of a user by their ID.

**Endpoint:** `GET /api/admin/users/{userId}/details`

**cURL Example:**
```bash
 curl -X GET \
  http://localhost:5000/api/admin/users/6761443efbceffa2810be4be/details \
   -H 'Authorization: Bearer YOUR_ADMIN_TOKEN'
```
**Response:**
  -200 - Returns complete user details.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `{userId}` with the actual User ID and `YOUR_ADMIN_TOKEN` with admin token.
---

#### 3.6. Send Password Reset Link
**Description:** Sends a password reset link to the provided user email.

**Endpoint:** `POST /api/admin/users/sendPasswordResetLink`

**Request Body:**
```json
{
    "email": "xnikunjadu2@gmail.com"
}
```

**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/admin/users/sendPasswordResetLink \
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
   -d '{
    "email": "xnikunjadu2@gmail.com"
  }'
```

**Response:**
- 200 - Sends Password reset link to the email.

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `YOUR_ADMIN_TOKEN` with admin token.

---
#### 3.7. Reset User Password
**Description:** Resets user password using the reset token and new password.

**Endpoint:** `POST /api/admin/users/reset-password`

**Request Body:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDQzZWZiY2VmZmEyODEwYmU0YmUiLCJpYXQiOjE3MzQ1MDg1ODgsImV4cCI6MTczNDUxMjE4OH0.e17UzfnRrBCAqXkWfP9LWmN3UZyaSFaQtEz7keJDrhY",
    "newPassword": "123456"
}
```
**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/admin/users/reset-password \
   -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
  -d '{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxNDQzZWZiY2VmZmEyODEwYmU0YmUiLCJpYXQiOjE3MzQ1MDg1ODgsImV4cCI6MTczNDUxMjE4OH0.e17UzfnRrBCAqXkWfP9LWmN3UZyaSFaQtEz7keJDrhY",
    "newPassword":"123456"
  }'
```
**Response:**
 -200 - Reset the user password

**Notes:**
- Requires a valid admin token in the `Authorization` header.
- Replace `YOUR_ADMIN_TOKEN` with admin token.
---
### 4. Admin Login (`/api/admin/login`)

**Description:** Admin login to get admin access.
**Endpoint:** `POST /api/admin/login`

**Request Body:**

```json
{
 "email":"your.email@example.com",
 "password":"your_secure_password"
}
```
**cURL Example:**
```bash
curl -X POST \
http://localhost:5000/api/admin/login \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \
-d '{
"email":"your.email@example.com", "password":"your_secure_password"
}'
```
**Response:**
- 200 - Returns admin JWT

**Notes:**
- Replace `YOUR_ADMIN_TOKEN` with admin token.

---
## User (`/api/users`)

### 1. Subscription (`/api/users/subscription`)

#### 1.1. Get Current Plan
**Description:** Retrieves the user's current subscription plan.

**Endpoint:** `GET /api/users/subscription`

**cURL Example:**
```bash
curl -X GET \
  http://localhost:5000/api/users/subscription \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

**Response:**
  - 200 - Returns user's current plan.

**Notes:**
- Requires a valid user token in the `Authorization` header.
- Replace `YOUR_JWT_TOKEN` with user token.
---
#### 1.2. Cancel User Subscription
**Description:** Cancels the user's current subscription.

**Endpoint:** `POST /api/users/cancel-subscription`

**Request Body:**
```json
{
  "reason": "Switching to a different service"
}
```
**cURL Example:**
```bash
curl -X POST \
  http://localhost:5000/api/users/cancel-subscription \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -d '{
    "reason": "Switching to a different service"
  }'
```
**Response:**
 - 200 - Subscription Cancelled

**Notes:**
- Requires a valid user token in the `Authorization` header.
 -Replace `YOUR_JWT_TOKEN` with user token.
---
#### 1.3. Subscribe to a Plan
**Description:** Subscribes the user to a specific subscription plan.

**Endpoint:** `POST /api/users/subscribe`

**Request Body:**
```json
{
  "planId": "67616c378c821544d3c5400b",
  "billingCycle": "monthly"
}
```

**cURL Example:**

```bash
curl -X POST \
  http://localhost:5000/api/users/subscribe \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -d '{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle":"monthly"
  }'
```

**Response:**
- 200 - Subscribed to the plan.

**Notes:**
- Requires a valid user token in the `Authorization` header.
 -Replace `YOUR_JWT_TOKEN` with user token.
---
#### 1.4. Update Subscription Plan
**Description:** Updates the user's current subscription plan.

**Endpoint:** `PUT /api/users/subscription/update`

**Request Body:**
```json
{
  "planId": "67616c378c821544d3c5400b",
  "billingCycle": "monthly"
}
```

**cURL Example:**
```bash
curl -X PUT \
  http://localhost:5000/api/users/subscription/update \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -d '{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle":"monthly"
  }'