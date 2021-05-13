# Task Tracker Senti Server

Server for the Task Tracker Senti

## Technologies

- Node.js
- Expressjs
- cors
- jsonwebtoken
- mongoose

## Installation

To use/try out this website, you can download the code and run

```bash
npm install
```

or

```bash
npm i
```

if you have [Node](https://nodejs.org/en/download/) installed on your system, of course.
And to run the project on localhost,

```bash
nodemon index.js
```

since I have used nodemon. Alternatively,

```bash
node index.js
```

can also be used to run the code

Also, you will have to create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) or any other NoSQL Service and **add the ATLAS URI as an environment var**

## Usage

The database is hosted for free at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

Note: jsonwebtoken auth is used. Also, make sure to set the **ACCESS_TOKEN_JWT_KEY and REFRESH_TOKEN_JWT_KEY** as environment vars.

## Contributing

For major changes, please open an issue first to discuss what you would like to change.


Contributions of any kind are welcome 😄✨✨

For further communication, you can contact the authors: