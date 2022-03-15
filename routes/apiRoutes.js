const app = require('express').Router();
const fs = require('fs')
let db = require('../db/db.json')

app.get('/api/notes', function(req,res){
    db = JSON.parse(fs.readFileSync("db/db.json")) || []
    console.log(db)
    res.json(db)
})

app.post('/api/notes', function(req,res){
    let newNote = {
        id: Math.floor(Math.random()*367),
        title: req.body.title,
        text: req.body.text
    }
    db.push(newNote)
    fs.writeFileSync('db/db.json',JSON.stringify(db),function(err){
        if(err) throw err;
    })
    console.log(db)
    res.json(db)
})

app.delete('/api/notes/:id', function(req,res){
    let notes = []
    for(let i=0; i<db.length; i++){
        if(db[i].id != req.params.id){
            notes.push(db[i])
        }
    }
    db = notes
    fs.writeFileSync('db/db.json',JSON.stringify(db),function(err){
        if(err) throw err;
    })
    console.log(db)
    res.json(db)
})

module.exports = app