# JuSense - Real-time Polling Application

A React-based polling application with real-time updates using Socket.io.

## Features

- User authentication (signup/login)
- Create and manage polls
- Real-time voting with live updates
- View poll results with charts
- Responsive design

## Tech Stack

- **Frontend**: React, Vite, React Router
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB
- **Styling**: CSS

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env` file and update `VITE_API_BASE_URL` if needed
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend Deployment

The backend needs to be deployed separately since Vercel is primarily for frontend applications. You can deploy it to:

- **Railway**: Recommended for Node.js apps with MongoDB
- **Heroku**: Traditional choice for Node.js applications
- **Vercel Serverless Functions**: Convert Express routes to serverless functions

For Railway deployment:
1. Create a Railway account
2. Connect your GitHub repository
3. Add environment variables (MONGO_URI, PORT, etc.)
4. Deploy

### Frontend Deployment to Vercel

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Set environment variable: `VITE_API_BASE_URL=https://your-backend-url.vercel.app/api`
   - Deploy

3. **Update backend URL**:
   - After deploying the backend, update the `VITE_API_BASE_URL` in Vercel environment variables
   - The `.env.production` file contains a placeholder that should be replaced

### Environment Variables

- **Development**: Uses `.env` file
- **Production**: Set in Vercel dashboard or `.env.production`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
JuSense/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── styles/
│   └── constants.js
├── public/
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
