# Dating app 
This is a project for my backend assesment and Project Tech. It it is a dynamic website using Git, Express, Node.js and MongoDB / Mongoose. This dating app is for users who support one of the 18 Eredivisie football clubs in the season 2019/2020.

In this app you can sign-up, login, view other users who signed-up, view your own profile and delete your profile. The app is only for mobile devices 📱.

![index](https://i.imgur.com/jtd5APq.png) 
![sign-up](https://i.imgur.com/tykUlFb.png)
![login](https://i.imgur.com/xj67b0E.png)
![profile](https://i.imgur.com/PgH238k.png)

## Table of contents
1. [To-do](#to-do)
2. [Install](#install)
3. [Database](#database-structure)
4. [Code](#code)
5. [Data](#render-data)
6. [Packages](#packages)
7. [Sources](#sources)
8. [License](#license)

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
Then you have to do this:
```
git clone https://github.com/Roene/Dating-app.git
cd Dating-app
```
Now you have the project local. Next step is to get all the npm packages you can do this with this command:
```
npm install 
```
Now you have to create your own database. You can follow installation instructions [here](https://www.mongodb.com/cloud/atlas). If you have created your database you have to create a file named `.env` in here you put the following things:
```
MONGODB_URI=<url to database>
DB_NAME=<database name>
JWT_KEY=<random string>
```
Now you can run the project using the following command:
```
npm start
```
You can visit the app in:
```
localhost:3400
``` 
and not in local👻

## Database structure
To send data to the MongoDB database I made a Mongoose schema, here you can see how the schema works. You can find it in **model/user.js**. 
```js
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    }, 
    surname: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    }, 
    gender: {
        type: String,
        required: true
    }, 
    club: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    searchGender: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: false
    }, 
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})
```
![Database](https://i.imgur.com/ZM7PV2j.png)

## Code
I tried to split up the code, in the *views folder* page you can find all the ejs pages and partials. In the *db folder* you can find the connection to the database. In the *middleware folder* you can find the auth.js file, this file is for the authentication when a user is loggedin or not. In the *routes folder* you can find user.js file this handles the routes when a user goes for example to `localhost:3400/login` or other routes that is connected with user functions. In the root of the project you can find index.js, this is the server file where I tell where the server runs and what the template engine is. 

## Render data
To render data from the database I have chosen for the ejs template engine. This is an example in my project. You can find it in **views/pages/dashboard.ejs**. 
In this file I render data from the database in my ejs template. First I get the data from backend see **routes/user.js**
```js
    .get('/dashboard', auth, async (req, res) =>  {
        try {
            const users = await User.find({ _id: {$ne: req.user._id} }).lean()
            res.render('pages/dashboard', { users })
        } catch (err) {
            res.status(500).send(err)
        }
    })
``` 
The data from the database is saved in users expect the logged-in user and send with the response to the frontend where you can access it. 
```js
<body>
<%- include ('../partials/header') %>
    <section>
        <% users.forEach((user, index) => { %>
        <article style="background-image: url('/static/upload/<%= user.image %>'); background-repeat: no-repeat; background-size: cover;">
            <p><%= user.firstname + " " + user.surname + " " + user.age%></p>
            <p><%= user.club %></p>
            <p><%= user.description %></p>
        </article>
        <% }) %>
    </section>
<%- include ('../partials/nav') %>
</body>
```
Now you get the dashboard with all the data you asked. It wil render article with uploaded image as background and three paragraphs.

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
* [Faster Mongoose Queries With Lean](https://mongoosejs.com/docs/tutorials/lean.html)

## License
MIT © [Roene Verbeek](https://github.com/Roene)