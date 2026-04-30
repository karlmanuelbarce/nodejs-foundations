Create a file called status-codes.md (markdown, not code). For each scenario below, write the HTTP status code you'd return and a one-sentence explanation:

  1. User successfully logged in (200) - The request succeeded and the 
  user was successfully authenticated.                                 
  2. User tried to access a page without being logged in (401) -       
  Authentication is required but no valid credentials were provided.   
  3. User is logged in but tried to access another user's private data 
  (403) - The user is authenticated but lacks permission to access this
   resource.                                     
  4. User requested a blog post that doesn't exist (404) - The
  requested resource could not be found on the server.
  5. User successfully created a new task (201) - A new resource was
  successfully created.
  6. User sent a POST request with invalid JSON (400) - The server
  cannot process the request due to malformed or invalid data.
  7. User deleted a task successfully (no data to return) (204) - The
  request succeeded but there is no content to return.
  8. Database is down and the server can't handle the request (500) -
  The server encountered an unexpected error and cannot fulfill the
  request.
  9. User exceeded the rate limit (429) - The user has sent too many
  requests in a given time period.
  10. User requested data and got it successfully (200) - The request
  succeeded and the server returned the requested data.
