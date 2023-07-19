# Todo app with TypeScript and Node.js, MongoDB

This is a simple todo app that is built with TypeScript and Node.js. It uses MongoDB as the database.

## To run the API

1. Install the dependencies:

```
npm i -y
```

2. Watch the TypeScript files and compile them to JavaScript files:

```
npx tsc --watch
```

3. Start the nodemon process, which will watch the JavaScript files and restart the app when they change:

```
npx nodemon dist/app.js
```

The app will be running on port 3000. You can access it in postman at http://localhost:4000.

## Features

* Create, read, update, and delete todos.
* Filter todos by title, description, and completed status.
* Sort todos by title, description, and completed status.

## To-do

* Add more features, such as the ability to add tags to todos.
* Improve the user interface.
* Add unit tests.

