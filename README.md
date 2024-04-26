# Ecommerce Node.js Admin Portal Project

## Overview

This eCommerce solution, developed using Node.js, Express, and PostgreSQL, acts as a backend server tailored for vendors operating within an online store setting. Its main objective is to improve the vendor experience by providing effortless product browsing and management capabilities.

## Code Strucutre

The project is structured as follow:

```shell
restfuljs-client-src/
│
├── config/            # Configuration files
│   ├── db.config.ts   # Database configuration
│   └── ...
│
├── common/                 # Common files
│   ├── executequery.ts     # Database configuration
│   └── ...
│
├── core/
│   ├── authMiddleware  # Authentication middleware
│   ├── logger          # Logger configuration
│   ├── middleware      # middleware (request middleware, response middleware ....)
│   ├── validation      # Validation configuration
│   └── ...
│
├── feature/            # Group of API feature
│   ├── User            # User model
│   ├── product         # Product model
│   └── ...
│
├── tests/             # Test files
│   ├── integration/
│       ├── login-integration.spec.ts
│   ├── unit/
│       ├── login-unit.spec.ts
│   ├── e2e
│
├── utils/             # Utility functions
│   ├── jwtUtils.js     # JWT utility functions
│   ├── validation.js   # Request validation functions
│   └── ...
│
├── index.ts            # Entry point of the application
└── routes.ts           # Collection of API routes.
```

## Feature

- User Authentication: Secure user authentication and authorization using JSON Web Tokens (JWT).
- Product Management: CRUD operations for managing products, including adding, updating, deleting, and retrieving product information.
- Order Management: Ability to create and manage orders, including order processing and fulfillement.
- Testing: Unit and Integration testing using [Jest](https://facebook.github.io/jest/) to ensure code reliability and correctness.

## Installation

1. Clone the repository:

```shell
git clone https://github.com/kajisaab/restfuljs-admin.git
```

2. Install dependencies:

```shell
cd restfuljs-admin
npm install
```

3. Set up ProstgreSQL database.
   - Create a PostgreSQL database for the project named ###ecommerce.
   - Update the env file with the database credential.

```shell
    # Create the db configuration as following key
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASSWORD=
    DB_DATABASE=ecommerce
```

4. Start the server:

```shell
# To run the server
npm start
```

6. Access the API endpoints at `http://localhost:3000`.

## Testing

Run tests using jest:

```shell
# To run backend test.
npm test

# To run a specific backend test
npm test login-integration.spec.ts
```

## Technologies Used.

- Node.js
- Express.js
- Typescript
- PostgreSQL
- TypeORM
- Swagger
- Jest

## Contributors

- [Aman Khadka](https://github.com/kajisaab/)

## License

This project is licensed under the [MIT License](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)
