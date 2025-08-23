# 🚌 Bus Tracker Admin Panel

A comprehensive web-based administration panel for managing school bus tracking systems. Built with React, TypeScript, and modern web technologies to provide real-time monitoring and management capabilities for school transportation.


## ✨ Features

### 🎯 Core Management Features

- **Dashboard Overview**: Real-time statistics and system health monitoring
- **Bus Management**: Add, edit, delete, and track school buses
- **Driver Management**: Manage driver profiles, assignments, and contact information
- **Route Management**: Create and manage bus routes with interactive maps
- **Parent Management**: Handle parent accounts and student assignments
- **Student Management**: Organize students by routes and manage pickup/drop-off locations


## 🛠️ Tech Stack

### Frontend Framework

- **React 19.1.0** 
- **TypeScript** 
- **Vite** 

### UI & Styling

- **Tailwind CSS 4.1.11** 
- **Lucide React** 
- **React Hot Toast** 

### State Management & Data Fetching

- **TanStack React Query 5.83.0** - Powerful data synchronization
- **Axios** - HTTP client for API communication
- **React Router DOM 7.6.2** - Client-side routing

### Maps & Location

- **Leaflet 1.9.4** - Interactive maps
- **React Leaflet 5.0.0** - React components for Leaflet
- **Leaflet Geosearch** - Location search functionality

### Backend Integration

- **Firebase 11.10.0** - Real-time database and authentication
- **Custom REST API** - Node.js/Express backend integration

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control

### System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for map services and API communication

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bustracker-admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (see [Environment Setup](#environment-setup))

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id

# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

```

###  Script to run the server

```bash
# Start development server with hot reload
npm run dev

```


