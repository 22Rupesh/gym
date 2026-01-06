 GymBuddy — Your AI Fitness Partner

GymBuddy is a full-stack AI-powered fitness platform that helps users find compatible gym partners, stay consistent with workouts, and follow personalized AI-generated workout and diet plans.
It combines social accountability, AI personalization, and real-time communication to solve real-world fitness motivation problems.

🌐 Live Website:
 https://gym-five-coral.vercel.app/

 Key Features

 Smart Gym Partner Matching
Match users based on location, fitness level, goals, interests, and workout time.

 AI Workout & Diet Plans
Personalized plans generated using AI based on height, weight, fitness level, and goals.

 Streaks & Gamification
Daily workout check-ins, streak tracking, and badges to improve consistency.

 Connection Requests & Notifications
Send, receive, accept, or reject gym partner requests.

 Real-Time Chat (Socket.io)
One-to-one real-time messaging between connected gym partners with chat history.

 Profile Setup (One-Time)
Users complete their fitness profile only once; future logins go directly to dashboard.

 Tech Stack
Frontend

React.js (Create React App)

Tailwind CSS

Axios

Socket.io Client

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Socket.io (Real-time chat)

AI Integration (LLM via API)

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

 Project Structure
GYM/
 ├── client/        # React Frontend
 └── server/        # Node + Express Backend

 How to Run GymBuddy on Another System (Local Setup)
1️ Prerequisites

Make sure you have installed:

Node.js (v18+ recommended)

npm

MongoDB Atlas account (or local MongoDB)

Git

2️ Clone the Repository
git clone https://github.com/your-username/gymbuddy.git
cd gymbuddy

3️ Backend Setup
cd server
npm install


Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_ai_api_key


Run backend:

npm run dev


Backend will run at:

http://localhost:5000

4️ Frontend Setup

Open a new terminal:

cd client
npm install
npm start


Frontend will run at:

http://localhost:3000

5️ Test the Application

Register a new user

Complete profile setup

Explore dashboard

Find gym partners

Connect and chat in real time

View AI workout & diet plans

 Environment & Security Notes

.env files should never be committed to GitHub

API keys and database credentials are managed via environment variables

JWT is used for authentication

Socket.io rooms are used for secure one-to-one chats

 Future Enhancements

Online / offline user status

Typing indicators in chat

Push notifications

Progress analytics & charts

Mobile app version

 Why GymBuddy?

GymBuddy solves real-world fitness problems:

Lack of motivation

Inconsistent gym routines

No accountability partner

Generic workout plans

By combining AI + social fitness + real-time communication, GymBuddy creates a smarter and more engaging fitness experience.

 Author

Rupesh
Full Stack Developer (MERN)
Project built as a real-world, production-ready application.
