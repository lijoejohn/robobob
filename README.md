# Robo bob
Children's Mathematics Robot Web Application

A simple react web application.

## Demo
https://robo-bob-app.web.app

API Data set - https://frozen-sea-84259-a7779bc76c91.herokuapp.com/threads

To add new question use the following request 

POST - https://frozen-sea-84259-a7779bc76c91.herokuapp.com/threads

Payload as json 
{
    "id": "11",
    "threadSet": [
      {
        "thread": "Sample Question",
        "threadKey": "samplequestion"
      }
    ],
    "answer": "Sample answer"
}

Note : id and thread Key need to be unique

## Tech Stack
1. Front End - React & Typescript
2. Back End - JSON Server (express[https://www.npmjs.com/package/json-server])
3. Tooling - yarn workspace  [https://classic.yarnpkg.com/lang/en/docs/workspaces/]
4. Front End build tool - Vite [https://vitejs.dev/]
5. Styling - Tailwindcss [https://tailwindcss.com]
6. State Management - React Context
7. Unit testing - Jest & RTL

   ### Demo Deployment
   1. Front end - Google firebase
   2. Back end - Heroku

## Prerequisites
1. Nodejs v16.16.0 +
2. Yarn globally

## Run the application in your local
Clone the code in local

1. `yarn install-dependencies`
2. `yarn start-all`

- The local dev server will be available on 3000 port

- If you want to access it in mobile with the same network http://192.168.0.3:3000

## Other commands
1. To run the application in production mode in dev
   `yarn build`
   `yarn preview`

   The vite preview command will boot up local static web server that serves the files from dist at http://localhost:4173. It's an easy way to check if the production build looks OK in your local environment. (https://stackoverflow.com/questions/71703933/what-is-the-difference-between-vite-and-vite-preview)

2. To run the unit test cases
   `yarn test`

3. To get the test coverage
   `yarn test-coverage`

## Assumptions
Currently back end is loaded with some pre defined questions , nonetheless, it may be expanded by including new sets of questions in the DB file.

## External libraries
1. react-test-renderer - This package provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
2. jest-axe - for testing accessibility
3. simplebar-react - custom scroll
4. usehooks-ts - hook for store global context data in sessionstorage



