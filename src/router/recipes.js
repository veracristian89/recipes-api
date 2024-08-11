import { Router } from "express";
import { recipesController } from "../controller/recipes.controller.js";

export const router = Router();

//getAll
router.get('/', recipesController.getAll);

//getByTitle
router.get('/S', (req, res) => {
    const { title } = req.query;
    res.send(`receta por titulo: ${req.query.title}`)
});

//getbyid
router.get('/:id', recipesController.getById);

//create
router.post('/', recipesController.create);

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`modifico una receta por id: ${id}`)
});

router.delete('/:id', recipesController.delete);

