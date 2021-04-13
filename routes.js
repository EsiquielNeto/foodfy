const express = require('express');
const routes = express.Router();

const recipes = require('./controllers/recipescontroller');

routes.get('/', recipes.index);
routes.get('/about', recipes.showAbout);
routes.get('/recipes', recipes.showRecipes);
routes.get('/recipes/:index', recipes.showRecipeDetails);

routes.get('/admin/recipes', recipes.listRecipes);
routes.get('/admin/recipes/create', recipes.formCreate);
routes.get('/admin/recipes/:id', recipes.showRecipe)
routes.get('/admin/recipes/:id/edit', recipes.formEdit)

routes.post('/admin/recipes', recipes.post);
routes.put('/admin/recipes', recipes.put);
routes.delete('/admin/recipes', recipes.delete);

module.exports = routes;
