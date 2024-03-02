# expense-tracker
Welcome to the Expense Tracker application documentation. This document provides information on setting up the project and relevant details

This project is buillt using MongoDB, React 18, Node.js, Express and Redis


# Setup Instructions 

# Installation Steps
1. Clone the repository:
    git clone https://github.com/Nkululeko1999/expense-tracker.git

2. Navigate to the project directory:
    cd expense-tracker

3. Install dependencies:
    npm install

4. Set up environment variables:
    Create a .env file in the root directory
    Add the following variables:
        PORT=5000
        MONGODB_URI=set you atlas url or run mongodb local
        JWT_SECERT=your_jwt_secret
        NODEMAILER_USER=your_nodemailer_username e.g email
        NODEMAILER_PASS=your_nodemailer_password

5. Start the server:
    npm run dev