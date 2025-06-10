# Task Management Application

A full-stack task management application built with React, TypeScript, Node.js, Express, and PostgreSQL. This application allows users to create, update, delete, and organize tasks with features like priority levels, due dates, filtering, and sorting.

## 🚀 Features

- **Task Management**: Create, read, update, and delete tasks
- **Task Status**: Toggle between pending and completed states
- **Priority Levels**: Set task priorities (Low, Medium, High)
- **Due Dates**: Assign and track task due dates with overdue notifications
- **Filtering & Sorting**: Filter by status/priority and sort by various criteria
- **Statistics Dashboard**: View task statistics and metrics
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **Real-time Updates**: Optimistic UI updates for better user experience

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **date-fns** for date formatting

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma ORM** for database management
- **PostgreSQL** database
- **CORS** for cross-origin requests

## 📁 Project Structure

```
project/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── routes/
│   │   │   └── tasks.ts    # Task API routes
│   │   └── index.ts        # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   └── package.json
└── README.md              # This file
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/task_management"
   PORT=3001
   FRONTEND_URL="https://todo-red-six-73.vercel.app"
   ```

4. **Set up the database:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate deploy
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   The backend API will be available at `https://todo-dfzw.onrender.com`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional):**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=https://todo-dfzw.onrender.com/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend application will be available at `https://todo-red-six-73.vercel.app`

## 📡 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks with optional filtering and sorting
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/toggle` - Toggle task status
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/stats/overview` - Get task statistics

### Health Check
- `GET /api/health` - API health check

## 🎯 Usage

### Creating Tasks
1. Click the "Add Task" button in the header
2. Fill in the task details:
   - **Title** (required): Brief description of the task
   - **Description** (optional): Detailed task information
   - **Priority**: Low, Medium, or High
   - **Due Date** (optional): When the task should be completed
3. Click "Create Task" to save

### Managing Tasks
- **Toggle Status**: Click the circle icon to mark tasks as complete/incomplete
- **Edit Task**: Click the edit icon to modify task details
- **Delete Task**: Click the trash icon to remove a task

### Filtering and Sorting
Use the filters panel to:
- Filter by task status (All, Pending, Completed)
- Filter by priority level (All, Low, Medium, High)
- Sort by different criteria (Created Date, Updated Date, Due Date, Priority, Title)
- Toggle between ascending and descending order

### Task Statistics
The dashboard displays:
- **Total Tasks**: Overall number of tasks
- **Completed**: Number of finished tasks
- **Pending**: Number of incomplete tasks
- **Overdue**: Number of tasks past their due date

## 🚀 Deployment

### Backend Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy using the production command:
   ```bash
   npm run deploy
   ```

### Frontend Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

## 🧪 Development Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run deploy` - Deploy with database migrations

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🗃 Database Schema

### Task Model
```prisma
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(PENDING)
  priority    Priority @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum TaskStatus {
  PENDING
  COMPLETED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Verify database credentials

2. **CORS Error**
   - Check FRONTEND_URL in backend .env
   - Ensure both servers are running on correct ports

3. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility

### Support

If you encounter any issues, please check the existing issues in the repository or create a new issue with detailed information about the problem.