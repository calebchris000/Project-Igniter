# Project Igniter Application Documentation

## Overview

This document provides a comprehensive guide to the Projet Igniter Application built using SvelteKit. The application is designed to facilitate real-time communication between users, offering features such as user authentication, profile management, chat functionality, notifications, and more. This README outlines the application's architecture, key features, and how to set it up and run it locally.

## Table of Contents

- [Getting Started](#getting-started)
- [Application Architecture](#application-architecture)
- [Key Features](#key-features)
- [Response Data Model](#response-data-model)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/chat-application.git
   ```
2. Navigate to the project directory:
   ```
   cd Project-Igniter
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

The application will be available at `http://localhost:5173` (or another port if 5000 is already in use).

## Application Architecture

Project Igniter Application is built using SvelteKit, a framework for building web applications. The project is structured as follows:

- `src`: Contains the source code of the application.
 - `components`: Reusable UI components.
 - `lib`: Additional libraries and utilities.
 - `routes`: Different routes of the application including authentication and main routes.
- `static`: Contains static assets like images and favicon.
- Configuration files for Git, npm, PostCSS, Svelte, Tailwind CSS, and Vite.

## Key Features

- **User Authentication**: Secure login and registration with JWT tokens.
- **User Profiles**: Manage user profiles, including profile pictures and personal information.
- **Real-time Chat**: Send and receive messages in real-time using Socket.io.
- **Notifications**: Receive notifications for new messages, friend requests, and more.

## Response Data Model

The application uses a consistent response data model across all endpoints. A typical response object looks like this:

```json
{
 "status": 200,
 "message": "Success",
 "data": {
    // Data specific to the endpoint if the response is successfuul
 }
}
```

- `status`: HTTP status code of the response.
- `message`: A human-readable message describing the result of the operation.
- `data`: The actual data returned by the endpoint. The structure of this object varies depending on the endpoint.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README provides a high-level overview of the Projet Igniter Application. For more detailed information on specific features or components, please refer to the documentation within the codebase or the individual component files.
