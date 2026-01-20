# Chess Clone Project

A full-stack chess application featuring a **Spring Boot** backend with real-time WebSocket communication and a modern **React** frontend.

## 📂 Project Structure



```text
CHESS-CLONE-MAIN/
├── chessbackend/          # Java Spring Boot Application
│   ├── src/
│   └── pom.xml
├── indichessfrontend/     # React.js Application
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md              # Project Documentation

This README.md is designed to live in the root of your project. It provides a professional overview, clear installation instructions for both the Spring Boot backend and React frontend, and a visual guide to your project structure.

README.md
Markdown

# Chess Clone Project

A full-stack chess application featuring a **Spring Boot** backend with real-time WebSocket communication and a modern **React** frontend.

## 📂 Project Structure



```text
CHESS-CLONE-MAIN/
├── chessbackend/          # Java Spring Boot Application
│   ├── src/
│   └── pom.xml
├── indichessfrontend/     # React.js Application
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md              # Project Documentation
🚀 Getting Started
Prerequisites
Java 17+ (for the Backend)

Maven (to build the Backend)

Node.js & npm (for the Frontend)

🛠️ Backend Setup (chessbackend)
Navigate to the directory:

Bash

cd chessbackend
Install dependencies:

Bash

mvn clean install
Run the application:

Bash

mvn spring-boot:run
The server will start on http://localhost:8080

💻 Frontend Setup (indichessfrontend)
Navigate to the directory:

Bash

cd indichessfrontend
Install dependencies:

Bash

npm install
Run the application:

Bash

npm start
The frontend will start on http://localhost:3000

🔑 Features
Real-time Gameplay: Powered by @stomp/stompjs and SockJS for instant move updates.

Authentication: Traditional Login/Signup and OAuth2 (Google) integration.

Chess Engine Logic: Handles legal moves and game state tracking on the backend.

Modern UI: Glassmorphic design with a responsive chessboard interface.

🌐 API & Endpoints
WebSocket: ws://localhost:8080/ws

REST API: http://localhost:8080/game/{matchId}

OAuth: http://localhost:8080/oauth2/authorization/google
