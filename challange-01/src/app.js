const express = require("express");
const { uuid } = require('uuidv4');

const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const respositorie = { id: uuid(), title, url, techs, likes:0 };

  repositories.push(respositorie);

  return response.json(respositorie);
});

app.put("/repositories/:id", (request, response) => {
  const{ id } = request.params;
  const { title, url, techs } = request.body;

  const respositorieIndex = repositories.findIndex(repositorie => repositorie.id ===id);

  if(respositorieIndex < 0){
    return response.status(400).json({error: 'should not be able to like a repository that does not exist'})
  }

  const repositorie = {
    id, 
    title,
    url,
    techs,
    likes: repositories[respositorieIndex].likes,
  };

  repositories[respositorieIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const respositorieIndex = repositories.findIndex(repositorie => repositorie.id ===id);

  if(respositorieIndex < 0){
    return response.status(400).json({error: 'Repositorie not found'})
  }else{
  repositories.splice(respositorieIndex, 1);
}
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const respositorieIndex = repositories.findIndex(repositorie => repositorie.id ===id);

  if(respositorieIndex < 0){
    return response.status(400).json({error: 'Repositorie not found'})
  }

  repositories[respositorieIndex].likes++;

   
   return response.json(repositories[respositorieIndex]);
});

module.exports = app;
