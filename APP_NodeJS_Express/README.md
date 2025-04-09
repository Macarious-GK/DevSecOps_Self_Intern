# 🌐 NodeJS Express MongoDB Web App

This is a **Node.js** web application built with **Express** and **MongoDB**. It includes full **CRUD operations** for two primary collections: `users` and `posts`. The app also includes an **authentication system** with support for environment-based configuration.

---

## 🚀 Features

- ✅ Full CRUD operations for **Users** and **Posts**
- 🔐 **Authentication** system using JWT
- 🌱 Uses **MongoDB** as the database
- 📦 Clean project structure using Express
- 🔧 Environment variable support

---

## 📁 Collections

- **Users**  
  For managing authentication and user-related data.

- **Posts**  
  For creating, updating, deleting, and listing content.

---


## API Endpoints

| **Method** | **Endpoint**         | **Description**                          | **Authentication**  |
|------------|----------------------|------------------------------------------|---------------------|
| GET        | `/admin`             | Admin Login Page                         | None                |
| POST       | `/admin`             | Check Admin Login                        | None                |
| GET        | `/dashboard`         | Admin Dashboard                          | Requires JWT        |
| GET        | `/add-post`          | Admin Page to Add New Post               | Requires JWT        |
| POST       | `/add-post`          | Create a New Post                        | Requires JWT        |
| GET        | `/edit-post/:id`     | Admin Page to Edit a Post                | Requires JWT        |
| PUT        | `/edit-post/:id`     | Update a Post                            | Requires JWT        |
| DELETE     | `/delete-post/:id`   | Delete a Post                            | Requires JWT        |
| GET        | `/logout`            | Logout Admin                             | Requires JWT        |
| POST       | `/register`          | Register a New User                      | None                |
| GET        | `/` (Home)           | Display Home Page with Posts             | None                |
| GET        | `/post/:id`          | View a Single Post                       | None                |
| POST       | `/search`            | Search Posts                             | None                |
| GET        | `/about`             | About Page                               | None                |

---

### Notes:
- **JWT Authentication** is required for most endpoints that interact with the admin dashboard or modify posts.
- **Admin Login**: The `POST /admin` endpoint checks user credentials and logs them in by setting a JWT token in a cookie.

## How to Run the Node.js Application

Follow the steps below to set up and run this Node.js application locally:

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. If not, you can download it from the [official Node.js website](https://nodejs.org/).
- **MongoDB**: You need a MongoDB instance running. You can either use a local MongoDB installation or a hosted service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Step 1: Clone the Repository & Install Dependencies

Clone this repository to your local machine:

```bash
git clone <repository_url>
cd <repository_folder>
npm install

```

## Step 2: ⚙️ Environment Variables

To run this app, create a `.env` file in the root directory and set the following variables:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb://localhost:27017/your-db-name
```
## Step 3: Start the Application

Run the following command to start the server:

```bash
npm run dev
npm start
```