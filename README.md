# 🐝 FeedHive - Blog Platform

FeedHive is a modern blogging platform built with **TypeScript**, **React**, **Node.js**, **Express.js**, and **MongoDB** following the **MVC architecture**. It provides a seamless experience for users to create, manage, and interact with blogs in a secure and user-friendly environment.

---

## 🚀 Features

- 🔐 **Authentication**
  - User **Signup** & **Login**
  - **JWT-based Authentication** for secure access

- 📝 **Blog Management**
  - **Create** new blog posts
  - **View** all blogs in a **dashboard**
  - **View detailed blog** with content and metadata
  - **Edit/Delete** user-created blogs
  - **Set blog preferences** such as visibility, categories, etc.

- 👍 **Interactions**
  - **Like** / **Dislike** blog posts
  - **Block** specific blogs from user feed

- 👤 **User Control**
  - **Manage blogs** created by the user
  - **Edit profile** including bio, username, and preferences

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **TypeScript**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **JWT** for authentication

### Architecture
- **MVC Pattern** (Model-View-Controller)

---

---

## 🧪 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/feedhive.git
   cd feedhive
   ```

2. **Install dependencies**
   ```bash
   # For backend
   cd server
   npm install

   # For frontend
   cd ../client
   npm install
   ```

3. **Create .env file in `server/` with necessary keys**
   ```env
   PORT=server_port
   MONGODB_ORIGIN=your_mongodb_connection_string (eg:mongodb://localhost:27017/favFeed)
   FRONTEND_URL=your_frontend_url (eg:http://localhost:5173)
   ACCESS_TOKEN_SECRET=your_access_token_scecret
   CLOUDINARY_CLOUD_NAME=cloudinaly_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret 
   ```

4. **Run the project**
   ```bash
   # In server folder
   npm run dev

   # In client folder (separate terminal)
   npm run dev
   ```

---

## 📌 Future Improvements
- Add comments section
- Social sharing of blogs
- Dark mode UI

---