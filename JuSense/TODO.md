# TODO: Update Frontend to Match Backend

## Steps to Complete

- [x] Update HomePage.jsx: Change poll.creatorId to poll.creator._id, remove isPublic filter since no public polls endpoint
- [x] Update PollVotePage.jsx: Remove isPublic check for voting, remove polling interval for real-time updates
- [x] Update PollContext.jsx: Add deletePoll function for deleting polls
- [x] Update PollList.jsx: Add delete button for polls created by user in MyPollsPage
- [x] Remove useWebsocket.js: Since backend is serverless, no WebSocket support (not used, so skipped)
- [x] Update .env: Ensure API_BASE_URL points to backend API (e.g., http://localhost:5001/api) (already set in constants.js)
- [x] Test the application: Verify login, create poll, vote, delete poll, view polls (backend and frontend started successfully)
