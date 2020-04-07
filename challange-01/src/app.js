const express = require("express");
const { uuid } = require('uuidv4');

const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());

const repositories = [];

function loanMethod(request, response, next){
  const { method, url } = request;

  const loglabel = `${method.toUpperCase()}`;

  switch(loglabel){
    case 'GET':
      console.log('should be able to list the repositories');
      break;
    case 'POST': 
      console.log('should be able to create a new repository');
      break;
    case 'DELETE':
      console.log('should be able to delete the repository');
      break;
    case 'PUT':
      console.log('should not be able to update repository likes manually');
  }

  return next();
}

app.get("/repositories", loanMethod, (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", loanMethod, (request, response) => {
  const { title, url, techs } = request.body;

  const respositorie = { id: uuid(), title, url, techs };

  repositories.push(respositorie);

  return response.json(respositorie);
});

app.put("/repositories/:id", loanMethod, (request, response) => {
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
  };

  repositories[respositorieIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", loanMethod, (request, response) => {
  const { id } = request.params;

  const respositorieIndex = repositories.findIndex(repositorie => repositorie.id ===id);

  if(respositorieIndex < 0){
    return response.status(400).json({error: 'Repositorie not found'})
  }

  repositories.splice(respositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", loanMethod, (request, response) => {
  const { id } = request.params;

  const respositorieIndex = repositories.findIndex(repositorie => repositorie.id ===id);

  if(respositorieIndex < 0){
    return response.status(400).json({error: 'Repositorie not found'})
  }

   console.count(`Like`);
   return response.status(200).send();
});

module.exports = app;
