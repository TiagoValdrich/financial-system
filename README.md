#  Financial System 

A simple system to make easy people management their cash flow.

## Requirements to run the application

- NodeJS

## Installation

If you already have NodeJS installed in your computer, you need to install the project dependencies. In project root, run: 

```
npm install
```

Now that you have downloaded Front-end dependencies, it's time to download Angular globally:

```
npm install -g @angular/cli
```

After installing the front-end dependencies, it's time to install the server dependencies. Get into server folder and run the same command again.

```
npm install
``` 

And it's done, after that you're abble to run the application.

## How to run the application

The application is divided in two parts:

- **Front-end**: Located in project root
- **Back-end**: Located in server folder

For running the Front-end you must execute the following command:

```
ng serve
```

After running the code above, you'll be able to open the front-end application on `localhost:8000`.

For running the Back-end you need to install `nodemon` globally on your computer:

```
npm install -g nodemon
```

After installing nodemon, access the root of folder `server` and run:

```
nodemon .
```

This code above will start application back-end, and it will be running on `localhost:3000`.

After this you'll be able to run the application =D.
