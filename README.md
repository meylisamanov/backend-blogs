<h1 align="center">
🌐 Server
</h1>
<p align="center">
MongoDB, Expressjs, Nodejs
</p>


## clone or download
```terminal
$ git clone https://github.com/ladyhand/backend-blogs.git
$ npm i
```


## Server-side usage(PORT: 5000)

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
// in the root level
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> ./server/src/.env
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run dev // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```

## Deploy Server to [Heroku](https://dashboard.heroku.com/)
```terminal
$ npm i -g heroku
$ heroku login
...
$ heroku create
$ npm run heroku:add backend-api-blogs
// remember to run this command in the root level, not the server level, so if you follow the documentation along, you may need to do `cd ..`
$ npm run deploy:heroku
```
