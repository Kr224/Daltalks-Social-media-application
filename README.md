# Dal Talks

This project is a social media platform developed as a group project for CSCI 3130 at Dalhousie University. The application is designed to connect students and staff, providing a space for communication, collaboration, and community building.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Mandatory Features](#mandatory-features)
  - [Optional Features](#optional-features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Usage](#usage)
- [Deliverables](#deliverables)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Dal Talks is a social media platform developed as part of the CSCI 3130 group project at Dalhousie University. The application provides users with the ability to create accounts, manage their profiles, connect with others, and engage in discussions. The platform is inspired by existing social media applications, with features tailored to the needs of the Dalhousie University community.

## Features

### Mandatory Features

1. **User Accounts**:
   - **Sign-up**: Users can register using their Dalhousie email address and a secure password. Passwords must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character. Non-Dalhousie email addresses are restricted.
   - **Login**: Users can log in using their registered email address and password.
   - **Forgot Password**: Users can reset their password via email.

2. **User and Activity Management**:
   - Add friends or follow other users.
   - Update personal interests.
   - Delete or deactivate friends.
   - Create and manage groups (private or public).
   - Manage user profiles, including changing the status (e.g., Away, Busy, Available).

3. **Admin Features**:
   - Add or deactivate Dalhousie students and employees.
   - Approve requests to join the platform.

4. **Search and Filter**:
   - Search for users, groups, or topics.
   - Filter search results by name, group, or topic.

### Optional Features

1. **Analytics**: Display the number of active users currently engaged on the platform.
2. **Notifications and Alerts**: Send daily or group-specific activity summaries via email.
3. **Role-Based Access**: Implement roles like Faculty Administrator and System Administrator with specific privileges.
4. **Multimedia**: Include video, audio, or image content in posts, profiles, and feeds.

## Installation

### Prerequisites

- [Java JDK 11+](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/) (Database credentials provided by TAs)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dal-talks.git
   cd dal-talks/backend
   
2. Install dependencies and build the project:
   ```bash
   ./mvnw clean install

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run


### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the React application:
   ```bash
   npm start


### Database Setup
1. Create a database named daltalks in your SQL server.
2. Update the application.properties or application.yml file with your database connection details:
   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/daltalks
   spring.datasource.username=your-username
   spring.datasource.password=your-password


### Usage
Once the backend and frontend are running, access the application at http://localhost:3000

### Deliverables
Release-1: Data model, frontend and backend project setup – Due Friday, June 7, 2024.
Release-2: TDD for backend, features 1 and 2 – Due Friday, June 28, 2024.
Demo and Presentation: Live demonstration and presentation – Due Tuesday, July 23, 2024.
Release-3: CI pipeline, complete features 3 and 4, refactor project – Due Friday, July 26, 2024.

### Tech Stack
Frontend: React JS
Backend: Spring Boot with Java Persistence API (JPA)
Database: MySQL hosted on Dalhousie University servers
Hosting: Optional; DAL Virtual Machine

Contributing
Contributions are welcome! Please submit a pull request or open an issue if you have suggestions or find any bugs.




