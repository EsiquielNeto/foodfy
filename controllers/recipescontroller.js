const fs = require('fs');

const dataJson = require('../data.json');
const data = require('../data.js');

exports.redirectPage = function (req, res) {
    res.render('common/index', { recipes: data })
}

exports.index = function (req, res) {
    res.render('common/index', { recipes: data })
};

exports.showAbout = function (req, res) {
    res.render('common/about');
};

exports.showRecipes = function (req, res) {
    res.render('common/recipes', { recipes: data })
};

exports.showRecipeDetails = function (req, res) {
    const index = req.params.index;
    const recipe = data[index];

    res.render('common/recipe-detail', { recipe });
};


// ADMIN
exports.listRecipes = function (req, res) {
    const recipes = dataJson.recipes;

    return res.render('admin/list-recipes', { recipes });
}

exports.showRecipe = function (req, res) {
    const { id } = req.params;

    const recipe = dataJson.recipes.find(function (rec) {
        return rec.id == id;
    });

    if (!recipe) {
        return res.json({ 'message': 'Receita não encontrada' });
    }

    return res.render('admin/show-recipe', { recipe });
}

exports.formCreate = function (req, res) {
    return res.render('admin/create-recipe')
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == '') {
            return res.json({ 'message': 'Por favor, preeencha todos os campos' })
        }
    }

    let { image, ingredients, preparation, information } = req.body;
    const id = Number(dataJson.recipes.length + 1);

    dataJson.recipes.push({
        id,
        image,
        ingredients,
        preparation,
        information
    });

    fs.writeFile('data.json', JSON.stringify(dataJson, null, 4), function (err) {
        if (err) {
            return res.json({ 'message': 'Erro ao salvar arquivo json' })
        }

        return res.redirect('recipes');
    });

}


exports.formEdit = function (req, res) {
    const { id } = req.params;

    const recipe = dataJson.recipes.find(function (rec) {
        return id == rec.id;
    });

    if (!recipe) {
        return res.json({ 'message': 'Receita não encontrada!' });
    }

    return res.render('admin/edit-recipes', { recipe });
}

exports.put = function (req, res) {
    const { id } = req.body;
    let index = 0;

    const foundRecipe = dataJson.recipes.find(function (rec, foundIndex) {
        if (id == rec.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundRecipe) {
        res.json({ 'message': 'Receita não encontrada!' })
    }


    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id),
    }

    dataJson.recipes[index] = recipe;

    fs.writeFile('data.json', JSON.stringify(dataJson, null, 4), function (err) {
        if (err) {
            return res.json({ 'message': 'Erro ao salvar arquivo json' })
        }

        return res.redirect(`admin/recipes/${id}`);
    });
}

exports.delete = function (req, res) {
    console.log('delete')
    const { id } = req.body;

    const filteredRecipes = dataJson.recipes.filter(function (recipe) {
        return recipe.id != id;
    });

    console.log(filteredRecipes.id);

    dataJson.recipes = filteredRecipes;

    fs.writeFile('data.json', JSON.stringify(dataJson, null, 4), function (err) {
        if (err) {
            return res.json({ 'message': 'Erro ao deletar arquivo json' })
        }

        return res.redirect('/recipes');
    });

}