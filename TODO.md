# Frontend Modifications for Vercel Serverless Backend

- Update API Base URL:
  - Set environment variable `VITE_API_BASE_URL` to your Vercel deployment URL, e.g.:
    ```
    VITE_API_BASE_URL=https://your-app.vercel.app/api
    ```
  - This will update all API calls to use the correct backend URL instead of localhost.

- Remove WebSocket Usage:
  - No socket.io or WebSocket usage found in frontend code.
  - No action needed here.

- Authentication Headers:
  - Auth headers are already included in API calls via PollContext.

- Real-Time Updates:
  - Added polling in `PollVotePage.jsx` to fetch poll data every 5 seconds for real-time vote updates.

- CORS:
  - Backend handles CORS preflight requests; no frontend changes needed.

# Testing

- Run frontend dev server:
  ```
  npm run dev
  ```
- Ensure `.env` file or environment variables include `VITE_API_BASE_URL` set to your deployed backend URL.
- Test all API routes (signup, login, create poll, get polls, vote, delete poll) work correctly.
- Verify real-time updates on poll voting via polling.

# Notes

- The backend no longer supports WebSocket/socket.io; frontend polling replaces real-time updates.
- Make sure to redeploy frontend with updated environment variables for production.
