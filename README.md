# ⚡ FitLog — Workout & Fitness Tracker

A modern and responsive fitness application built with **Next.js** and **TypeScript**. FitLog helps users explore workouts, manage their workout plans, save favorite exercises, and track their fitness activities through a clean and user-friendly interface.

## 🌐 Live Demo

🔗 **Live Website:** [Add Your Live Website URL Here](#)

## 📸 Project Overview

FitLog is designed to make workout planning simple and organized. Users can browse different exercises, view workout details, create a personal workout plan, and save workouts for later.

## ✨ Features

- **🏋️ Browse Workouts:** Explore a collection of workouts with useful information.
- **🔍 Workout Details:** View exercise descriptions, instructions, muscle groups, equipment, difficulty levels, and other details.
- **➕ Create Workout Plans:** Add workouts to a personal plan for easy access.
- **🔖 Save for Later:** Save favorite workouts and access them whenever needed.
- **✅ Mark Workouts as Done:** Mark planned workouts as completed.
- **🗑️ Manage Your Plan:** Remove workouts from your plan or saved list.
- **↕️ Sort Workouts:** Organize workouts based on duration.
- **📊 Track Workout Information:** View workout duration and estimated calories burned.
- **🔔 Toast Notifications:** Get feedback when adding, saving, completing, or removing workouts.
- **📱 Responsive Design:** Enjoy a user-friendly experience on mobile, tablet, and desktop.
- **🚫 Custom 404 Page:** Display a custom error page for unavailable routes.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and application routing |
| React | Building reusable UI components |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and UI design |
| Lucide React | Icons |
| React Toastify | Toast notifications |
| Next.js Image | Image optimization |
| REST API | Fetching workout data |

## 📂 Project Structure

```text
fit-log/
├── app/
│   ├── workouts/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── my-plan/
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   └── WorkoutActions.tsx
├── context/
│   └── Fit-LogContext.tsx
├── app/types/
│   └── workout.data.ts
├── public/
├── next.config.ts
├── package.json
└── README.md
```

## 🚀 Getting Started

Follow these steps to run FitLog locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd fit-log
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Open in Your Browser

Visit [http://localhost:3000](http://localhost:3000).

## 🔗 API Information

FitLog fetches workout data from the following API:

**API Endpoint:**  
https://openapi.programming-hero.com/api/fitlog

The API provides workout information such as names, images, muscle groups, equipment, difficulty, duration, calories burned, ratings, and instructions.

## 🎯 Learning Objectives

This project helps demonstrate practical experience with:

- Next.js App Router and dynamic routing
- Server Components and Client Components
- Asynchronous data fetching
- TypeScript interfaces and type safety
- React Context API for shared state
- Responsive UI development with Tailwind CSS
- Reusable components and conditional rendering
- Loading, error, and not-found handling

## 🔮 Future Improvements

- User authentication and personal accounts
- Persistent workout plans using a database
- Workout history and progress tracking
- Search and filtering by muscle group or difficulty
- Charts for weekly activity and fitness progress

## 👨‍💻 Author

**Nazmul Hosen**

- GitHub: [@nazmul-07](https://github.com/nazmul-07)

---

⭐ If you find this project interesting, consider giving it a star!

**FitLog — Keep Moving, Keep Improving.**