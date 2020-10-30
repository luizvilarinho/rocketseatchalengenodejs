const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const objResponse = {
    id:uuid(),
    likes:0,
    title:request.body.title,
    url:request.body.url, // link do repositorio girhub
    techs:request.body.techs
  }
    repositories.push(objResponse);
    response.json(objResponse);

});


app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title, url, techs} = request.body;
  
  const idx = repositories.findIndex((repo)=>repo.id === id);
  
  if (idx === -1){
    response.status(400).json({error: "repositorie not found"});
  }
  
  repositories[idx].title = title;
  repositories[idx].url = url;
  repositories[idx].techs = techs;
  
  response.json(repositories[idx]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const idx = repositories.findIndex((repo)=>repo.id === id);
  
  if (idx === -1){
    response.status(400).json({error: "repositorie not found"});
  }
  
  repositories.splice(idx, 1);
  response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;
  const idx = repositories.findIndex((repo)=>repo.id === id);

  if (idx === -1){
    response.status(400).json({error: "repositorie not found"});
  }

  repositories[idx].likes += 1;
  
  response.json(repositories[idx]);

});

module.exports = app;
