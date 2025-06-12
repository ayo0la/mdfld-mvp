# MDFLD Server

A simple Node.js backend service that provides authentication and real-time chat functionality between buyers and sellers.

## Features

- **Authentication**
  - User signup with role selection (buyer/seller)
  - Email verification sent on signup
  - User login with JWT
- **Chat System**
  - Only buyers can initiate conversations with sellers
  - Real-time messaging

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- MongoDB (local or Atlas)

### Installation

1. Unzip the project files:

   ```bash
   unzip mdfld-server
   cd mdfld-server
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:
   .env file is already give with the zip.

### Starting the Server

To start the development server with hot reloading:

```bash
yarn dev
```

To start the production server:

```bash
yarn start
```

## Project Structure

mdfld-server/
├── src/
│ ├── config/ # Configuration files
│ ├── constants/ # Constant values
│ ├── controllers/ # Request handlers
│ ├── databases/ # Database connections
│ ├── middlewares/ # Custom middleware
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Helper functions
│ ├── validators/ # Validation schemas
│ └── index.ts # Express app entry point
├── .env # Environment variables
├── .prettierignore # Prettier configuration
├── .prettierrc # Prettier configuration
├── .gitignore # Git ignore file
├── package.json # Project dependencies
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

## How It Works

1. **User Registration**:

   - Users sign up with email, password, and role (buyer/seller)
   - A verification email is sent to complete registration

2. **Authentication**:

   - Users log in with email and password
   - JWT token is provided for authenticated requests

3. **Chat Functionality**:
   - Only buyers can initiate conversations with sellers
   - Real-time messaging using WebSockets
   - Chat history is stored for each conversation
