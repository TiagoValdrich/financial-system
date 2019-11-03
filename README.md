#  Financial System - *Front-end*

This project, is a simple system for college, that has as purpose make easy to people management their cash flow.

> This is only the front-end of the application, the back-end is on another repository on GitHub. [Click here](https://github.com/TiagoValdrich/financial-system-backend) to check.

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

After installing the front-end dependencies, it's time to clone the back-end. Go to the [Financial System Backend repository](https://github.com/TiagoValdrich/financial-system-backend) and clone that on the same folder of front-end or another folder of your preference.

> You'll need to have the back-end running to run the front-end, so ensure that you have this repo cloned.

After following these steps you'll be able to run the application on your machine. =D

## How to run the application

The application is divided in two parts:

- **Front-end**: Which is this repository.
- **Back-end**: That is on [financial-system-backend](https://github.com/TiagoValdrich/financial-system-backend) and you need to have the backend cloned to run the application.

> Before running the front-end, ensure to put the back-end to run on `http://localhost:3000`, or the front-end will not work! The tutorial to run back-end is on it's own repository.

For running the Front-end you must execute the following command:

```
ng serve
```

And that's it, you made it! So now, if you access `http://localhost:4200` you'll see a beautiful application running on your browser.
