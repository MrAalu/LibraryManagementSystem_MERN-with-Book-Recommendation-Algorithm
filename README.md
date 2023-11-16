# Library Management System 📚

Its a Project related to Books management for a Libraries 📜.

**_NOTE : This isn't an Ecommerce Website (There is no Payment System here)_**

FrontEnd is divided into two parts (ADMIN && CLIENT)

ADMIN can do -  
`1.manage books i.e. add/remove/update/delete books.`

`2.Check user' details i.e. name/id/borrowed book/etc`

`3.Confirm user's book request && Confirm book Return`

`4.Manage Book Charges(Extra fee's for not returing book in time)`

CLIENT can do -  
`1.Basic book surfing's and checking availablities`

`2.Request for a book`

`3.Viewing/CRUD Operations on Profile || Dashboard`

## Version Specifications :

1. NodeJS : v18.16.0
2. Express : v4.18.2
3. ReactJS : v18.2.0
4. Using MongoDB: v6.0.6
   Using Mongosh: v2.0.2

## Demo

[Showcase Demo Coming Soon!](https://www.github.com/MrAalu)

![](https://s11.gifyu.com/images/SQEuf.gif)

## Documentation

[Documentation Coming Soon!](https://www.github.com/MrAalu)

## How to run Project locally :

1. Clone the project

```bash
  git clone git@github.com:MrAalu/LibraryManagementSystem_MERN.git
```

2. Goto Both 'Frontend' and 'Backend' folder

```bash
  cd frontend , cd backend
```

3. Install dependencies on Both Frontend & Backend

```bash
  npm install
```

**NOTE : In 'backend' make sure to create a '.env' file and copy paste the values of '.env.example' into newly created '.env' file**

4. Start the Frontend and Backend

```bash
  npm run dev
```

5. Once you Run Backend(Server), database will be created automatically on Mongodb & You just have to Import the TABLE Data which is Stored in folder 'mongoDatabase'

```bash
Import respective .JSON file into database Collection
```

## How to run Project using Docker :

- Populate localhost mongodb database (explained in Step5 above).
- goto .env and make sure to use correct 'CONNECTION_URL'
- then, goto main folder location i.e. cd LIBRARYMANAGEMENTSYSTEM_MERN/ and use command :

```
docker-compose up
```

## Login Credentials

Starter Login Credentials :

ADMIN :

```
 Email : admin@gmail.com , Password : admin
```

## Lessons Learned

1. Code Comments are Loveletter's you leave behind for your future self.
2. If you cant Solve it, address it for your Future Self. He sure can!

## Feedback && Queries

If you have any feedback, feel free to reach out :)  
Email : amit.kc240@gmail.com

## Tech Stack

**Frontend :** React, Bootstrap

**Backend :** Node, Express, MongoDB

#### Developed By :- [@MrAalu](https://www.github.com/MrAalu)
