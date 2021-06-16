Scripts:
1. npm run start - starts the application
2. npm run test - starts unit tests
3. npm run cypress:open - opens cypress tab with start tests button

Decisions:
1. I created only one component with form and submit button, I was thinkng about separating form to another component and register logic to another but I would have to use Output which is ok but then Input to tell form it can be cleared after http succeed so I decided to keep it simple (KISS).
2. I created interceptor for handling http errors, however i was not able to produce any error so I couldn't see how the error response is structured so probably displaying of error will fail.
3. I used viewChild on a submit button to get stream from clicks so i could apply exhaustMap in case user clicks many times on button therefore creating many http requests instead of one.
4. I wasn't sure should i send password in Post because in example there was no password field so I followed the example - no password in payload.
