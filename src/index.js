const express = require("express");
const https = require('https');
var bodyParser = require('body-parser');
const {
    adminRouter,
    authRouter,
    supervisorRouter
} = require('./routers/router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const projects = [
    { name: 'TTS', id: 1 },
    { name: 'Stress Detection', id: 2 },
    { name: 'Fall Detection', id: 3 }
]

app.use('/admins', adminRouter);
app.use('/supervisors', supervisorRouter);
app.use('/auth', authRouter);

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