# SocioX

# SocioX API Documentation

This document provides comprehensive documentation for the SocioX API, outlining available endpoints, request methods, request/response formats, and important notes.

## Authentication Endpoints

### 1. Register Parent Email

**Description:**
Registers a new parent user with an email, password, and name.

**Endpoint:**
`POST http://localhost:5000/api/auth/register`

**Request Headers:**

| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |

**Request Body:**
```json
{
    "email": "xnikunjadu2@gmail.com",
    "password": "yourpassword123",
    "name": "Test User"
}
```

**Response:**
*   A successful registration does not return any content itself (201 Status Code on successful new creation). However, it may include a token in response headers, and this token needs to be used in the following endpoints that require authentication. 

**Important Notes:**

*   Replace `xnikunjadu2@gmail.com`, `yourpassword123`, and `Test User` with actual parent user data.
*   This endpoint registers parent users. The system will detect the role from backend.

### 2. Register Child Email

**Description:**
Registers a new child user with an email, password, and name.

**Endpoint:**
`POST http://localhost:5000/api/auth/register`

 **Request Headers:**
 
| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |

**Request Body:**
```json
{
    "email": "xnikunjadu2@gmail.com",
    "password": "yourpassword123",
    "name": "Test User"
}
```

**Response:**
*   A successful registration does not return any content itself (201 Status Code on successful new creation). However, it may include a token in response headers, and this token needs to be used in the following endpoints that require authentication.

**Important Notes:**

*   Replace `xnikunjadu2@gmail.com`, `yourpassword123`, and `Test User` with actual child user data.
*   This endpoint registers child users. The system will detect the role from backend.

### 3. Login Email

**Description:**
Logs in an existing user using their registered email and password.

**Endpoint:**
`POST http://localhost:5000/api/auth/login`

**Request Headers:**

| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |

**Request Body:**
```json
{
    "email": "xnikunjadu2@gmail.com",
    "password": "123456"
}
```

**Response:**

*   A successful login will have a status code of 200 and return a JWT token for authentication which you have to use in subsequent requests.

**Important Notes:**

*   Replace `xnikunjadu2@gmail.com` and `123456` with the user's actual email and password.

### 4. Forgot Password

**Description:**
Initiates the forgot password process by sending an OTP to a registered email.

**Endpoint:**
`POST http://localhost:5000/api/auth/forgot-password`

**Request Headers:**

| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |

**Request Body:**
```json
{
    "email": "xnikunja@gmail.com"
}
```

**Response:**
*   A successful forgot password request does not return any content itself. The status code of 200 indicated successful process.

**Important Notes:**

*   Replace `xnikunja@gmail.com` with the user's actual registered email.

### 5. Reset Email Password

**Description:**
Resets a user's password using the email, OTP, and new password.

**Endpoint:**
`POST http://localhost:5000/api/auth/reset-password`

**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |

**Request Body:**
```json
{
  "email": "xnikunja@gmail.com",
  "otp": "840907",
  "newPassword": "your-new-password"
}
```

**Response:**
*   A successful password reset does not return any content itself. However, it will return a status code of 200 and indicates successful processing.

**Important Notes:**

*   Replace `xnikunja@gmail.com`, `840907`, and `your-new-password` with the actual data.

## Admin Endpoints

### User Subscription Management

#### 1. Subscribe User Plan

**Description:**
Subscribes a user to a specific plan.

**Endpoint:**
`POST http://localhost:5000/api/admin/users/{userId}/subscription`

**Request Headers:**

| Header        | Value                  |
|---------------|------------------------|
| Content-Type  | application/json       |
| Authorization | Bearer `ADMIN_TOKEN` |

**Request Body:**
```json
{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
}
```
**Response:**

*   Successful plan subscription status code is 201.

**Important Notes:**

*   Replace `6761443efbceffa2810be4be` with the actual user ID.
*   Replace `ADMIN_TOKEN` with a valid admin JWT token.
*  `planId` is the ID of one of the available plan. You can get the list of all available plans via, `GET http://localhost:5000/api/subscription/admin/plans`
*   `billingCycle` can be `monthly` or `yearly`.

#### 2. Cancel User Plan

**Description:**
Cancels a user's current subscription plan.

**Endpoint:**
`POST http://localhost:5000/api/admin/users/{userId}/subscription/cancel`

**Request Headers:**

| Header        | Value                  |
|---------------|------------------------|
| Content-Type  | application/json       |
| Authorization | Bearer `ADMIN_TOKEN` |

**Request Body:**
```json
{
    "reason":"i dont really know the reason"
}
```
**Response:**
*   Status code of 200 indicates a successful cancellation. 

**Important Notes:**

*   Replace `6761443efbceffa2810be4be` with the actual user ID.
*   Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   `reason` is the explanation for cancellation

#### 3. Get Subscription by User ID

**Description:**
Retrieves the subscription details of a specific user.

**Endpoint:**
`GET http://localhost:5000/api/admin/users/{userId}/subscription`

**Request Headers:**

| Header        | Value                  |
|---------------|------------------------|
| Content-Type  | application/json       |
| Authorization | Bearer `ADMIN_TOKEN` |

**Response:**
```json
{
    "subscription": {
      "_id": "6761730c591c87f6c40056c2",
      "userId": "6761443efbceffa2810be4be",
      "planId": "67616c378c821544d3c5400b",
      "billingCycle": "monthly",
      "startDate": "2024-06-06T16:19:24.485Z",
      "status": "active",
      "createdAt": "2024-06-06T16:19:24.488Z",
        "updatedAt": "2024-06-06T16:19:24.488Z",
      
    },
    "plan": {
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
    "status": "active",
   "createdAt": "2024-05-25T09:10:55.302Z",
    "updatedAt": "2024-05-25T09:10:55.302Z"
}
}
```

**Important Notes:**
*   Replace `6761443efbceffa2810be4be` with the actual user ID.
*   Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   The response includes both subscription and plan details.

#### 4. Update Subscription by User ID

**Description:**
Updates a user's current subscription plan.

**Endpoint:**
`POST http://localhost:5000/api/admin/users/{userId}/subscription/update`

**Request Headers:**

| Header        | Value              |
|---------------|--------------------|
| Content-Type  | application/json   |
| Authorization | Bearer `ADMIN_TOKEN` |

**Request Body:**
```json
{
    "planId": "67616c378c821544d3c5400b",
    "billingCycle": "monthly"
}
```

**Response:**
*   A successful update provides the status code of 200

**Important Notes:**

*   Replace `6761443efbceffa2810be4be` with the actual user ID.
*   Replace `ADMIN_TOKEN` with a valid admin JWT token.
*  `planId` is the ID of one of the available plan. You can get the list of all available plans via, `GET http://localhost:5000/api/subscription/admin/plans`
*   `billingCycle` can be `monthly` or `yearly`.

### Subscription Management

#### 1. Get Plans

**Description:**
Retrieves a list of all available subscription plans.

**Endpoint:**
`GET http://localhost:5000/api/subscription/admin/plans`

**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Content-Type | application/json  |
| Authorization | Bearer `ADMIN_TOKEN`|

**Response Example:**
```json
[
    {
        "_id": "67615c96f1b0dd4f39fd05b3",
        "name": "basic",
        "displayName": "Basic Plan",
        "price": {
            "monthly": {
                "amount": 19.99,
                "currency": "USD"
            },
            "yearly": {
                "amount": 199.99,
                "currency": "USD",
                "savings": 40
            }
        },
        "features": {
            "socialAccounts": {
                "total": 2,
                "perPlatform": {
                    "facebook": 1,
                    "instagram": 1,
                    "twitter": 0
                }
            },
            "teamMembers": 1,
            "posting": {
                "postsPerDay": 5,
                "bulkScheduling": true,
                "autoScheduling": false
            },
            "analytics": {
                "reportTypes": [
                    "basic"
                ],
                "exportFormats": [
                    "pdf"
                ],
                "retentionDays": 30
            },
            "support": "email",
            "additional": {
                "customBranding": false,
                "apiAccess": false,
                "contentCalendar": true,
                "hashtagManager": false
            }
        },
        "recommended": false,
        "category": "basic"
    },
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
        "category": "enterprise"
    }
]
```
**Important Notes:**
*  Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   The response is an array of plan objects.

#### 2. Get Plan by ID

**Description:**
Retrieves a specific subscription plan by its ID.

**Endpoint:**
`GET  http://localhost:5000/api/subscription/admin/plans/{planId}`

**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Content-Type | application/json  |
| Authorization | Bearer `ADMIN_TOKEN`|

**Response Example:**
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
    "status": "active",
   "createdAt": "2024-05-25T09:10:55.302Z",
    "updatedAt": "2024-05-25T09:10:55.302Z"
}
```

**Important Notes:**

*   Replace `67616c378c821544d3c5400b` with the actual plan ID.
*    Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   The response includes the specific plan's details.

#### 3. Update Custom Features

**Description:**
Updates the custom features of a specific subscription plan.

**Endpoint:**
`PATCH http://localhost:5000/api/subscription/admin/plans/{planId}/features`

**Request Headers:**

| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |
| Authorization | Bearer `ADMIN_TOKEN` |

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
* The response for successful update is 200 status code.

**Important Notes:**

*   Replace `67616c378c821544d3c5400b` with the actual plan ID.
*   Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   This endpoint only updates custom features.

#### 4. Create Plan

**Description:**
Creates a new subscription plan.

**Endpoint:**
`POST http://localhost:5000/api/subscription/admin/plans`

**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |
| Authorization | Bearer `ADMIN_TOKEN` |

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
**Response:**

* Successful creation response is 201 status code.

**Important Notes:**
*   Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   The `id` field is used to generate the plan id.
* The created plan can be accessed by `GET http://localhost:5000/api/subscription/admin/plans/{planId}` with id provided in the creation parameters

#### 5. Update Plan

**Description:**
Updates an existing subscription plan.

**Endpoint:**
`PUT http://localhost:5000/api/subscription/admin/plans/{planId}`

**Request Headers:**

| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |
| Authorization | Bearer `ADMIN_TOKEN` |

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
**Response**
*   A successful plan update provides the status code of 200.

**Important Notes:**

*   Replace `67615fa882f14b0d21c065a3` with the actual plan ID.
*   Replace `ADMIN_TOKEN` with a valid admin JWT token.

#### 6. Update Plan Status
**Description:**
Updates the status of a specific plan.

**Endpoint:**
`POST http://localhost:5000/api/subscription/admin/plans/{planId}/status`

**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |
| Authorization | Bearer `ADMIN_TOKEN` |

**Request Body:**
```json
{
    "status": "active"
  }
```
**Response:**
*   A successful plan status update provides status code of 200.

**Important Notes:**
*  Replace `67615fa882f14b0d21c065a3` with the actual plan ID.
*  Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   The `status` can be `active` or `inactive`.

#### 7. Delete Plan
**Description:** Deletes a specific plan by its ID

**Endpoint:**
`DELETE http://localhost:5000/api/subscription/admin/plans/{planId}`

**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |
| Authorization | Bearer `ADMIN_TOKEN` |

**Request Body:**
```json
{
    "status": "inactive"
  }
```
**Response:**
*   A successful plan delete provides a status code of 200.

**Important Notes:**
*  Replace `67615fa882f14b0d21c065a3` with the actual plan ID.
*  Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   The `status` is optional to be sent and it does not matter.

#### 8. Update Both Features

**Description:**
Updates both features and custom features of a specific plan.

**Endpoint:**
`PUT http://localhost:3000/api/subscriptions/plan-features/{planId}`

**Request Headers:**

| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |
| Authorization | Bearer `ADMIN_TOKEN` |

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
* A successful plan feature update results in status code of 200.

**Important Notes:**

*   Replace `64f5a7b1c25a` with the actual plan ID.
*   Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   This endpoint updates both standard and custom features

#### 9. Update Standard Features

**Description:**
Updates the standard features of a specific plan.

**Endpoint:**
`PUT http://localhost:3000/api/subscriptions/plan-features/{planId}`

**Request Headers:**

| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |
| Authorization | Bearer `ADMIN_TOKEN` |

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
*  Update of plan provides status code of 200.

**Important Notes:**

*   Replace `64f5a7b1c25a` with the actual plan ID.
*       Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   This endpoint only updates the standard features.

### User Management

#### 1. Reactivate User

**Description:**
Reactivates a deactivated user.

**Endpoint:**
`GET http://localhost:5000/api/admin/users/{userId}/reactivate`

**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Authorization | Bearer `ADMIN_TOKEN` |

**Response:**
*  A successful plan user reactivation results in a status code of of 200

**Important Notes:**

*   Replace `6761443efbceffa2810be4be` with the actual user ID.
*  Replace `ADMIN_TOKEN` with a valid admin JWT token.

#### 2. Get List of Users

**Description:**
Retrieves a list of all users.

**Endpoint:**
`GET http://localhost:5000/api/admin/users`

**Request Headers:**

| Header        | Value             |
|---------------|-------------------|
| Content-Type  | application/json  |
| Authorization | Bearer `ADMIN_TOKEN` |

**Response Example:**
``` json
[
    {
        "_id": "675bd3220bfee16d58204fe8",
        "name": "Nikunja",
        "email": "xnikunja@gmail.com",
        "picture": "dsafsd",
         "isDeactivated":false
    },
    {
        "_id": "6761443efbceffa2810be4be",
        "name": "Test User",
        "email": "xnikunjadu2@gmail.com",
        "picture": null,
         "isDeactivated":true
    }
]
```
**Important Notes:**

*  Replace `ADMIN_TOKEN` with a valid admin JWT token.
*   The response is an array of user objects.
*   `isDeactivated` is used to determine if user is deactivated or not.

#### 3. Delete User

**Description:**
Deletes a user by ID.

**Endpoint:**
`DELETE http://localhost:5000/api/admin/users/{userId}`

**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Authorization | Bearer `ADMIN_TOKEN` |

**Response:**
* Successful deletion of user provides a status code of 200

**Important Notes:**

*   Replace `675bd3220bfee16d58204fe8` with the actual user ID.
*  Replace `ADMIN_TOKEN` with a valid admin JWT token.

#### 4. Deactivate User

**Description:**
Deactivates a user by ID.

**Endpoint:**
`GET http://localhost:5000/api/admin/users/{userId}/deactivate`
**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Authorization | Bearer `ADMIN_TOKEN` |

**Response:**
*  A suucessful user deactivation result in a status code of 200.

**Important Notes:**

*   Replace `6761443efbceffa2810be4be` with the actual user ID.
*  Replace `ADMIN_TOKEN` with a valid admin JWT token.

#### 5. Get Complete User Details by ID

**Description:**
Retrieves detailed information about a user by ID.

**Endpoint:**
`GET http://localhost:5000/api/admin/users/{userId}/details`

**Request Headers:**
| Header        | Value             |
|---------------|-------------------|
| Authorization | Bearer `ADMIN_TOKEN` |

**Response Example:**
``` json
{
    "_id": "6761443efbceffa2810be4be",
    "name": "Test User",
    "email": "xnikunjadu2@gmail.com",
    "picture": null,
    "role": "parent",
 "isDeactivated":true,
    "subscription":{
       "_id": "6761730c591c87f6c40056c2",
      "userId": "6761443efbceffa2810be4be",
      "planId": "67616c378c821544d3c5400b",
        "billingCycle": "monthly",
        "startDate": "2024-06-06T16:19:24.485Z",
       "status": "active",
      "createdAt": "2024-06-06T16:19:24.488Z",
        "updatedAt": "2024-06-06T16:19:24.488Z"
    },
      "plan": {
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
    "status": "active",
   "createdAt": "2024-05-25T09:10:55.302Z",
    "updatedAt": "2024-05-25T09:10:55.302Z"
}
}
```
**Important Notes:**

*   Replace `6761443efbceffa2810be4be` with the actual user ID.
* Replace `ADMIN_TOKEN` with a valid admin JWT token
*   The response includes complete user details with subscription and plan details

#### 6. Send Reset Password Link
**Description:**
Sends a reset password link to the registered email of a given user.

**Endpoint:**
`POST http://localhost:5000/api/admin/users/sendPasswordResetLink`

**Request Headers:**
| Header        | Value              |
|---------------|--------------------|
| Authorization | Bearer `ADMIN_TOKEN` |

**Request Body:**
```json
{
    "email":"xnikunjadu2@gmail.com"
}
```
**Response:**
*  A successful reset link generation results in a status code of 200.

**Important Notes:**
*  Replace `ADMIN_TOKEN` with a valid admin JWT token.
* Replace `xnikunjadu2@gmail.com` with the