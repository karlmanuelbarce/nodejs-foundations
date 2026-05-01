const express = require('express');
const app = express();
 
app.use(express.json());

let users = [
  { id: 1, name: 'Ana', email: 'ana@example.com', createdAt: new Date().toISOString() },
  { id: 2, name: 'Bruno', email: 'bruno@example.com', createdAt: new Date().toISOString() }
];
let nextId = 3;

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if(!user) {
        res.status(404).json({error: "user not found"});
    } else {
        res.json(user);
    }
});

app.post ('/users', (req, res) =>{
    const {name, email} = req.body;
    if(!name || !email) {
        res.status(400).json({error: "name and email are required"});
    }
const newuser = {id: nextId++ , name: name, email: email, createdAt: new Date().toISOString()};
users.push(newuser);
res.status(201).json(newuser);
})

app.delete('/users/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if(!user) {
        res.status(404).json({error: "user not found"})
    } else {
        users.splice(user, 1);
        res.status(204).send();
    }
}); 

const Port = 3000;
app.listen(Port, () => {
    console.log(`Server is now running on http://localhost:${Port}`);
});