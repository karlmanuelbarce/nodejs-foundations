const express = require('express');
const app = express();
 
app.use(express.json());

let projects = [
    { id: 1, name: 'Website Redesign', tasks: [
      { id: 1, title: 'Mockups', done: true },
      { id: 2, title: 'Build homepage', done: false }
    ]},
    { id: 2, name: 'API Migration', tasks: [] }
  ];
  

app.get('/projects', (req,res) => {
 res.json(projects);
});

app.get('/projects/:id/tasks', (req,res) => {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id);
    if(!project) {
        res.status(404).json({error: "project not found"});
    } else {
        res.json(project.tasks);
    }
});

app.post('/projects/:id/tasks', (req,res) => {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id);
    const taskId = project.tasks.length + 1;
    if(!project) {
        res.status(404).json({error: "project not found"});
    } else {
        const {title} = req.body;
        if(!title) {
            res.status(400).json({error: "title is required"});
        } else {
            const newTask = {id: taskId, title: title, done: false};
            project.tasks.push(newTask);
            res.status(201).json(newTask);
        }
    }
});

const port = 3000;
app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
})