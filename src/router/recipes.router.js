import { Router } from "express";
import { recipesController } from "../controller/recipes.controller.js";

export const router = Router();

//getAll
router.get('/', recipesController.getAll);

//getByTitle
router.get('/S', recipesController.getByTitle);

//getbyid
router.get('/:id', recipesController.getById);

//create
router.post('/', recipesController.createRecipe);

router.patch('/:id', recipesController.updateRecipe);

router.delete('/:id', recipesController.deleteOne);

