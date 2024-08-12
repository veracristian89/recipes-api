import { Router } from "express";
import { token } from "../services/jwt.js";
import { recipesController } from "../controller/recipes.controller.js";

export const router = Router();

router.get('/', recipesController.getAll);

router.get('/S', recipesController.getByTitle);

router.get('/:id', recipesController.getById);

router.post('/',token.verifyToken, recipesController.createRecipe);

router.patch('/:id',token.verifyToken, recipesController.updateRecipe);

router.delete('/:id',token.verifyToken, recipesController.deleteOne);

