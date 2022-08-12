CHAUFFESEUR USER MANUAL:
1) To set-up can run 'npm install' or 'yarn' to download all dependency using Node Package Manager.
2) Open two seperate Code Editor to run 'Chauffeseur' as front-end and 'chauffeseur-backend' as backend,
both must be on different ports.
3) If unable to connect the Backend Node Js Server to Front End Expo React Native, kindly run 'lt --port 5000',
on Command Prompt to open a LocalTunnel for the connection. Next, change the URLs.js file in front-end config
to the port provided by localtunnel.
4) If local tunnel server is down, kindly register and open a local connection using Ngrok (download ngrok on
desktop and run 'ngrok http 5000'), then update the URLs to the ones provided.
5) The application has 3 users:
- Passenger (the employees to book ride)
- Chauffeur (the professional drivers)
- Corporate (manage payments)
6) Kindly register for passenger and test it out. The chauffeur and corporate register screens are not provided.