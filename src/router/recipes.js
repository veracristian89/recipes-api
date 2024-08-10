import { Router } from "express";
import { recipesController } from "../controller/recipes.controller.js";

export const router = Router();

//getAll
router.get('/', recipesController.getAll);

router.get('/S', (req, res) => {
    const { title } = req.query;
    res.send(`receta por titulo: ${req.query.title}`)
});

//getbyid
router.get('/:id', recipesController.getById);

router.post('/', (req, res) => res.send('agrego una receta'));

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`modifico una receta por id: ${id}`)
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`borro una receta por id: ${id}`)
});

