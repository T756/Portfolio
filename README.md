# Project Name

## Overview

Provide a brief overview of the project, its purpose, and any key features.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/project-name.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd project-name
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```
    Dependencies listed below.

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following configuration variables to the `.env` file:

   ```plaintext
   MONGODB_URI=mongodb+srv://admin:<password>@cluster0.iepihto.mongodb.net/your-project-name
   EMAIL=your-email@example.com
   EMAIL_PASS=your-email-password

Replace your-email@example.com and your-email-password with your email address and password.
3. Create a database in MongoDB Atlas through your IP-address, then through the link above you can access database.

## Usage
Starting the Server
To start the server, run the following command:
    ```bash
    npm start
    ```
### Accessing the Application
Once the server is running, you can access the application by navigating to http://localhost:3000 in your web browser.

## API Usage
In this project 2 API's were used which are:
1. GitHub API - for accessing my GitHub profile and displaying repositories.
2. bacon ipsum - for generation of fill-in text for easier publication of posts.
Both were accessed through links and did not require tokens.

## Key Design Decisions
Design of the project was intended to be simple and yet informational which i was inspired by Notion website design with its just black and white.
But, I added pink tone color and the wallpaper which just thought looked pretty cool.

## Admin Access
To access the admin panel, you can register and login(any registered user can have Admin Access):
Username: your-name
Password: your-password

### Dependencies:
 "dependencies": {
    "axios": "^1.6.7",
    "bcrypt": "^5.1.1",
    "connect-mongo": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-ejs-layouts": "^2.5.1",
    "express-session": "^1.18.0",
    "github-profile": "^1.0.1",
    "jsonwebtoken": "^9.0.2",
    "method-override": "^3.0.0",
    "mongoose": "^8.1.3",
    "nodemailer": "^6.9.9",
    "nodemon": "^3.0.3"
  }
