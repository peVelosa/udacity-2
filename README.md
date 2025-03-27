# Pool Project - Udcatiy

This project is a web application called **Pool**, developed by Udcatiy. It enables users to navigate through several routes, perform login, and access protected content based on authentication.

## Features

- **Login**: User authentication page.
- **Home (`/`)**: The main landing page presenting an overview of the application.
- **New (`/new`)**: A page for creating new questions.
- **Question Detail (`/question/:questionId`)**: Displays details for a specific question identified by `questionId`.
- **Leaderboard (`/leaderboard`)**: Shows the ranking of users based on points or participation.

> **Note:** For all protected routes (every route except login), if the user is not authenticated, a different component will be rendered to indicate that access is restricted.

## Technologies Used

- **Frontend Framework**: (e.g., React, Vue, Angular – select what suits your project)
- **Routing Library**: (e.g., React Router, Vue Router, etc.)
- **Unit Testing**: Tools like Jest, Mocha, etc.
- **Authentication**: Implementation to secure routes and manage user sessions.

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

   or, if you prefer:

   ```bash
   yarn install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

## Running the Tests

The project includes at least 10 unit tests to ensure code quality and reliability. To run the tests, execute:

```bash
npm test
```
