const express = require("express");
const https = require('https');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const {
    adminRouter,
    authRouter,
    supervisorRouter,
    messageRouter
} = require('./routers/router');

require('dotenv').config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})


const projects = [
    { name: 'TTS', id: 1 },
    { name: 'Stress Detection', id: 2 },
    { name: 'Fall Detection', id: 3 }
]

// app.use('/admins', adminRouter);
// app.use('/supervisors', supervisorRouter);
app.use('/auth', authRouter);
app.use('/message', messageRouter);

app.get("/", (req, res) => {
    res.send('Team Alpha');
});

app.get('/api/projects', (req, res) => {
    res.send(projects);
});

app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(c => c.id === parseInt(req.params.id));
    if (!project) res.status(404).send('Ooops... Cant find what you are looking for!');
    res.send(project);
});

app.post('/api/projects', (req, res) => {
    console.log(req.body);
    const project = {
        id: projects.length + 1,
        name: req.body.name
    };
    projects.push(project);
    res.send(project);
});

app.put('/api/projects/:id', (req, res) => {
    const project = projects.find(c => c.id === parseInt(req.params.id));

    if (!project) res.status(404).send('<h2>Not Found!! </h2>');

    project.name = req.body.name;
    res.send(project);
});

app.delete('/api/projects/:id', (req, res) => {

    const project = projects.find(c => c.id === parseInt(req.params.id));
    if (!project) res.status(404).send('<h2> Not Found!! </h2>');

    const index = projects.indexOf(project);
    projects.splice(index, 1);

    res.send(project);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
