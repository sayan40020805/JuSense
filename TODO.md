# TODO: Ensure JuSense Project Works After Vercel Deployment

## Information Gathered
- Frontend is a React app using Vite, with hardcoded API_BASE_URL pointing to 'http://localhost:5000/api'
- Backend is a separate Express.js server with Socket.io, connecting to MongoDB, listening on port 5001
- No environment variable setup for API URL switching between development and production
- No Vercel configuration files present
- Frontend uses API_BASE_URL for all API calls in AuthContext and PollContext

## Plan
1. ✅ Implement environment variable based API URL switching in frontend
2. ✅ Create .env files for development and production environments
3. ✅ Update constants.js to use environment variables
4. ✅ Provide guidance on deploying backend separately (since Vercel is primarily for frontend)
5. ✅ Provide guidance on deploying frontend to Vercel
6. ✅ Update README with deployment instructions

## Dependent Files to be edited
- ✅ JuSense/src/constants.js: Update to use environment variables
- ✅ JuSense/.env: Create for development environment
- ✅ JuSense/.env.production: Create for production environment
- ✅ JuSense/README.md: Add deployment instructions

## Followup steps
- ✅ Test local development with environment variables (Development server running successfully on port 5175)
- Deploy backend to a cloud provider (e.g., Railway, Heroku, or Vercel serverless)
- Deploy frontend to Vercel with production environment variables
- Verify deployed frontend can connect to deployed backend
- Test all features (auth, poll creation, voting) in deployed environment

## Deployment Summary

### What has been implemented:
1. ✅ Environment variable based API URL switching
2. ✅ Development environment (.env) with localhost:5001/api
3. ✅ Production environment setup (.env.production) with placeholder URL
4. ✅ Updated constants.js to use VITE_API_BASE_URL
5. ✅ Comprehensive README with deployment instructions

### Next steps for deployment:
1. **Deploy Backend First**: Deploy your backend to Railway, Heroku, or similar platform
2. **Get Backend URL**: Note the deployed backend URL (e.g., https://your-backend-app.railway.app)
3. **Update Production Environment**: Replace the placeholder in .env.production with your actual backend URL
4. **Deploy Frontend**: Connect your GitHub repo to Vercel and set VITE_API_BASE_URL environment variable
5. **Test**: Verify all features work in the deployed environment

### Important Notes:
- Backend must be deployed separately from frontend
- Update VITE_API_BASE_URL in Vercel environment variables after backend deployment
- Ensure CORS is properly configured in your backend for the Vercel domain
- Test authentication, poll creation, and voting features after deployment
