# HIT_NodeJS_Final_Project_2025

## Description

This project is a RESTful web service developed using Node.js, Express.js, and MongoDB. It enables users to manage their personal expenses efficiently by adding cost entries, retrieving monthly reports, and managing user data.

## Features

- Add cost entries with description, category, amount, and date.
- Generate monthly reports per user, categorized by expense type.
- Input validation and error handling for all routes.
- MongoDB integration for data persistence.
- `/api/about` endpoint to get project team info.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB Atlas

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/HIT_NodeJS_Final_Project_2025.git
   ```
2. Navigate to the project directory:
   ```bash
   cd HIT_NodeJS_Final_Project_2025
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create an `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://<your_mongodb_uri>
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Usage

### Add a Cost Entry

**POST** `/api/costs`

Send a JSON body with the following fields:
```json
{
  "description": "Grocery shopping",
  "category": "food",
  "userid": "123123",
  "sum": 150,
  "year": "2025",
  "month": "5",
  "day": "7"
}
```

### Get Monthly Report

**GET** `/api/report?id=123123&year=2025&month=5`

Returns a categorized report of the user's expenses for the given month.

### Get User Details

**GET** `/api/users/123123`

Returns the user's first name, last name, and total expenses.

### Get Developer Info

**GET** `/api/about`

Returns an array of the developers' first and last names using the same field names as in the users collection:
```json
[
  { "first_name": "Oriya", "last_name": "Even Chen" },
  { "first_name": "Maor", "last_name": "Levin" }
]
```

## Authors

- **Oriya Even Chen**
- **Maor Levin**
