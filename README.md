# 🌐 - Tweeter Backend - 🌐

## Demo 📸

<p align='center'> <img src='.github/assets/Tweeter-swagger.png'/></p>

<hr/>

## Application deploy with Railway and documented with Swagger: :dash:

> https://tweeter-backend.up.railway.app/docs/

## 📖 About the Project

Tweeter-API - This API is a backend of the a social network (Tweeter) with authentication flux, interact with tweets, user and comment. This was make with TypeScript how language programming, PostgreSQL how database, typeORM how ORM and Jest to unitary/integration tests.

## 📗 Features

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| SignIn. | &#10004; | Ability to signIn in application. |
| Create User. | &#10004; | Ability to create a account. |
| Show all users. | &#10004; | Ability to show all users. |
| Show user by id. | &#10004; | Ability to show a user by id.  |
| Show followings. | &#10004; | Ability to show all followings from a user. |
| Show followers. | &#10004; | Ability to show all followers from a user.  |
| Show bookmarks. | &#10004; | Ability to show bookmarks from a user. |
| Show who follow. | &#10004; | Ability to recommend users to follow. |
| Edit informations and image about user. | &#10004; | Ability to edit informations and images about user. |
| Following a user. | &#10004; | Ability to follow a user. |
| Unfollow a user. | &#10004; | Ability to unfollow a user.  |
| Create a tweet with image. (optional) | &#10004; | Ability to create a image with or no image. |
| Show all tweets. | &#10004; | Ability to show all tweets. |
| Show tweets by user. | &#10004; | Ability to show tweets by user. |
| Show tweets private only if follow this user. | &#10004; | Ability to show tweets private only if follow this user. |
| Show trends for you. | &#10004; | Ability to show main trends. |
| Save tweet how bookmark. | &#10004; | Ability to save a tweet how bookmark. |
| Remove tweet from bookmark. | &#10004; | Ability to remove a tweet from bookmark. |
| Like a tweet. | &#10004; | Ability to like a tweet.  |
| Remove like from tweet. | &#10004; | Ability to remove a like from tweet. |
| Delete tweet. | &#10004; | Ability to delete tweet. |
| Create a comment for a tweet with image. (optional) | &#10004; | Ability to create a comment for a tweet with or no image. |
| Like a comment. | &#10004; | Ability to like a comment. |
| Remove like from comment. | &#10004; | Ability to remove like from comment. |
| Delete comment. | &#10004; | Ability to delete a comment.  |

## 🛠 Technologies

<li><a href="https://www.typescriptlang.org">Typescript</a></li>
<li><a href="https://nodejs.org/en/">Node.js</a></li>
<li><a href="https://expressjs.com">Express.js</a></li>
<li><a href="https://typeorm.io">TypeORM</a></li>
<li><a href="https://www.postgresql.org">PostgreSQL</a></li>
<li><a href="https://www.npmjs.com/package/multer">Multer</a></li>
<li><a href="https://github.com/arb/celebrate">Celebrate</a></li>
<li><a href="https://cloudinary.com">Cloudinary</a></li>
<li><a href="https://jestjs.io">Jest</a></li>
<li><a href="https://www.npmjs.com/package/ts-node-dev">ts-node-dev</a></li>
<li><a href="https://www.npmjs.com/package/bcryptjs">Bcryptjs</a></li>
<li><a href="https://jwt.io">JWT</a></li>
<li><a href="https://swagger.io">Swagger</a></li>
<li><a href="https://www.docker.com">Docker</a></li>
<li><a href="https://editorconfig.org">EditorConfig</a></li>
<li><a href="https://prettier.io">Prettier</a></li>
<li><a href="https://eslint.org">Eslint</a></li>

## 💻 How to run the application

#### Pre-requisites:
You must have the tools installed:  <a href="https://git-scm.com">Git</a>, <a href="https://nodejs.org/en/">Node.js</a>. And create a new file called: .env, that follow .env.example credentials example.

You also have to create a database with PostgreSQL in your machine and put URI in .env or only use the docker to run database with command ```docker-compose up``` in this directory in terminal (for it you must have docker and docker-compose installed) and put your database uri in the file .env Besides another credentials required informed in file.

DATABASE_URI to docker-compose: postgresql://postgres:admin@localhost:8080/tweeter

<pre>
# In the terminal, clone the project:
$ git clone https://github.com/Wesley-wsl/Tweeter-backend.git

# Enter the project folder:
$ cd Tweeter-backend

# Install dependencies:
$ yarn
or
$ npm install

# Run migrations
$ yarn typeorm migration:run -d src/api/database/index.ts

# Run the application:
$ yarn dev
or
$ npm run dev
</pre>

Okay, now you can access the application from the route:  <a href="https://localhost:3333/api/v1/docs">https://localhost:3333/api/v1/docs</a>


## 🧪 Alright, but and the tests ?

This application was highly tested with unitary/integration tests using jest to get 100% coveraged. To run the tests you need only execute ```yarn test:coverage``` in the terminal in this directory.

<img src='.github/assets/Tweeter-tests.png'/>


## Then is this... Thank you for stay and Enjoy. :-)

<img src='.github/assets/End.gif'/>