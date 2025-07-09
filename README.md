# 🎯 Job Tracker Application

A modern, full-stack job application tracking platform built with React, Node.js, and MongoDB. Keep track of your job applications, interviews, and career progress with an intuitive dashboard and powerful analytics.

![Job Tracker Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.17.0-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 📊 **Dashboard & Analytics**

- **Real-time Statistics**: Track application status, interview progress, and success rates
- **Interactive Charts**: Visualize your job search progress with Recharts
- **Status Overview**: Quick view of applications by status (Applied, Interviewed, Offer Received, etc.)
- **Recent Activity**: Monitor your latest job applications and updates

### 💼 **Job Management**

- **Add New Jobs**: Create job applications with company details, job URLs, and notes
- **Edit Applications**: Update job information, status, and notes anytime
- **Status Tracking**: 6 different statuses (Applied, Interview Scheduled, Interviewed, Offer Received, Rejected, Archived)
- **Resume Upload**: Upload and manage resumes (PDF/DOCX) with Cloudinary integration
- **Job URL Storage**: Store direct links to job postings for easy access

### 🔐 **Authentication & Security**

- **Secure Authentication**: Powered by Auth0 for enterprise-grade security
- **User Management**: Individual user accounts with personal job tracking
- **Protected Routes**: Secure access to personal job data
- **JWT Tokens**: Stateless authentication with secure token management

### 📱 **Modern UI/UX**

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Beautiful interface with Tailwind CSS
- **Real-time Updates**: Instant feedback on all actions
- **Loading States**: Smooth user experience with loading indicators
- **Toast Notifications**: User-friendly success and error messages

### 🚀 **Technical Features**

- **RESTful API**: Clean, scalable backend architecture
- **MongoDB Integration**: Flexible document-based data storage
- **File Upload**: Secure resume upload with Cloudinary
- **CORS Support**: Cross-origin resource sharing for frontend-backend communication
- **Error Handling**: Comprehensive error management and user feedback

## 🛠️ Tech Stack

### Frontend

- **React 19.1.0** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization library
- **Heroicons** - Beautiful SVG icons
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Auth0** - Authentication and authorization
- **Cloudinary** - Cloud file storage
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server with auto-restart
- **PostCSS** - CSS processing

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (for production)
- Auth0 account (for authentication)
- Cloudinary account (for file uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/job-tracker-app.git
cd job-tracker-app
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker

# Authentication (Auth0)
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=your-api-audience
AUTH0_CLIENT_SECRET=your-client-secret

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Create environment file
cp .env.example .env
```

Configure your frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-audience
```

### 4. Start Development Servers

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🚀 Deployment

### Backend Deployment

#### Option 1: Render (Recommended)

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Configure build command: `npm install`
4. Configure start command: `npm start`


### Frontend Deployment

#### Option 1: Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📚 API Documentation

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile

### Job Endpoints

- `GET /jobs` - Get all jobs for user
- `POST /jobs` - Create new job
- `PUT /jobs/:id` - Update job
- `DELETE /jobs/:id` - Delete job
- `GET /jobs/stats` - Get job statistics

### File Upload Endpoints

- `POST /upload/resume` - Upload resume file

## 🎨 Usage Guide

### Getting Started

1. **Sign Up/Login**: Create an account or sign in with Auth0
2. **Add Your First Job**: Click "Add Job" to create your first application
3. **Track Progress**: Update job status as you progress through the hiring process
4. **Monitor Analytics**: View your dashboard for insights and progress tracking

### Job Status Workflow

1. **Applied** → Initial application submitted
2. **Interview Scheduled** → Interview confirmed
3. **Interviewed** → Interview completed
4. **Offer Received** → Job offer received
5. **Rejected** → Application rejected
6. **Archived** → Application archived for reference

### Resume Management

- Upload resumes in PDF or DOCX format
- Resumes are securely stored in Cloudinary
- Each job can have an associated resume
- Easy access to uploaded resumes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**

- Check if MongoDB connection string is correct
- Verify all environment variables are set
- Ensure port 5000 is available

**Frontend can't connect to backend:**

- Verify backend is running on port 5000
- Check CORS configuration
- Ensure API URL is correct in frontend environment

**Authentication issues:**

- Verify Auth0 configuration
- Check domain and client ID settings
- Ensure audience is correctly configured

**File upload fails:**

- Verify Cloudinary credentials
- Check file size limits
- Ensure file type is supported (PDF/DOCX)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Auth0](https://auth0.com/) for authentication services
- [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting
- [Cloudinary](https://cloudinary.com/) for file storage
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Heroicons](https://heroicons.com/) for beautiful icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/job-tracker-app/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Made with ❤️ for job seekers everywhere**
