# Dating app 
This is a project for my backend assesment and Project Tech. It it is a dynamic website using Git, Express, Node.js and MongoDB / Mongoose. This dating app is for users who support one of the 18 Eredivisie football clubs in the season 2019/2020.

In this app you can sign-up, login, view other users who signed-up, view your own profile and delete your profile. The app is only for mobile devices 📱.

![index](https://i.imgur.com/jtd5APq.png) 
![sign-up](https://i.imgur.com/tykUlFb.png)
![login](https://i.imgur.com/xj67b0E.png)

## Table of contents
1. [to-do](#to-do)
2. [Install](#install)
3. [Code](#code)
4. [Packages](#packages)
5. [Sources](#sources)
6. [License](#license)

## To-do
This is a list I want to have done in this project : 
- [X] User sign-up and data stored in the database.
- [X] User can login with email and password.
- [X] User can see other users.
- [X] User can see his own profile.
- [ ] User can edit his own profile.
- [X] User can delete his own profile.
- [ ] User can only see user who support the same football club.
- [ ] User can view detail page from other user.
- [ ] User can use filters to change dashboard view.
- [ ] User can chat with other users.

## Install
To install this project you have to clone it first. 
*Use your terminal and go to your folder where you want this project.*
Then you have to do this. 
```
git clone https://github.com/Roene/Dating-app.git
cd Dating-app
```
Now you have the project local. Next step is to get all the npm packages you can do this with this command.
```
npm install 
```
Now you have to create your own database. You can follow installation instructions [here](https://www.mongodb.com/cloud/atlas). If you have created your database you have to create a file called **.env** in here you put the following thins
```
MONGODB_URI=<url to database>
DB_NAME=<database name>
JWT_KEY=<random string>
```
Now you can run the project using the following command. 
```
npm start
```

## Code

## Packages
In this project I used packages from **NPM** : 
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [body-parser](https://www.npmjs.com/package/body-parser-json)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [ejs](https://www.npmjs.com/package/ejs)
* [express](https://www.npmjs.com/package/express)
* [jwt](https://www.npmjs.com/package/jsonwebtoken)
* [multer](https://www.npmjs.com/package/multer)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [nodemon](https://www.npmjs.com/package/nodemon)

## Sources
In this project I used the following sources:
* [JWT Authentication & Authorization in NodeJs/Express & MongoDB REST APIs(2019)](https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122)
* [Loc Nguyen](https://github.com/LaupWing/Project-Tech/blob/master/App/middleware/auth.js)

## License
MIT © [Roene Verbeek](https://github.com/Roene)