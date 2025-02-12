import { Router } from "express";
import { token } from "../services/jwt.js";
import { recipesController } from "../controller/recipes.controller.js";

export const router = Router();

/**
 * @swagger
 * /api/recetas:
 *   get:
 *     summary: Obtener todas las recetas
 *     description: Retorna una lista con todas las recetas disponibles en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de recetas obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   dificultad:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   url_img:
 *                     type: string
 *       404:
 *         description: No se encontraron recetas.
 */
router.get('/', recipesController.getAll);

/**
 * @swagger
 * /api/recetas/S:
 *   get:
 *     summary: Buscar recetas por título
 *     description: Permite buscar recetas utilizando el parámetro de título.
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         description: El título de la receta que deseas buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recetas encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   dificultad:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   url_img:
 *                     type: string
 *       404:
 *         description: No se encontraron recetas con el título dado.
 *       400:
 *         description: El parámetro de título es requerido.
 */
router.get('/S', recipesController.getByTitle);

/**
 * @swagger
 * /api/recetas/{id}:
 *   get:
 *     summary: Obtener una receta por su ID
 *     description: Retorna los detalles de una receta específica utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la receta a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Receta encontrada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 titulo:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 dificultad:
 *                   type: string
 *                 categoria:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 url_img:
 *                   type: string
 *       404:
 *         description: No se encontró la receta con el ID proporcionado.
 */
router.get('/:id', recipesController.getById);

/**
 * @swagger
 * /api/recetas:
 *   post:
 *     summary: Crear una nueva receta
 *     description: Permite agregar una nueva receta a la base de datos, requiere autenticación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               dificultad:
 *                 type: string
 *               categoria:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               url_img:
 *                 type: string
 *     responses:
 *       200:
 *         description: Receta creada correctamente.
 *       401:
 *         description: No autorizado, se requiere token válido.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/', token.verifyToken, recipesController.createRecipe);

/**
 * @swagger
 * /api/recetas/{id}:
 *   patch:
 *     summary: Actualizar una receta por su ID
 *     description: Actualiza una receta existente usando su ID. Requiere autenticación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la receta a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               dificultad:
 *                 type: string
 *               categoria:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               url_img:
 *                 type: string
 *     responses:
 *       200:
 *         description: Receta actualizada correctamente.
 *       401:
 *         description: No autorizado, se requiere token válido.
 *       404:
 *         description: No se encontró la receta con el ID proporcionado.
 *       500:
 *         description: Error en el servidor.
 */
router.patch('/:id', token.verifyToken, recipesController.updateRecipe);

/**
 * @swagger
 * /api/recetas/{id}:
 *   delete:
 *     summary: Eliminar una receta por su ID
 *     description: Elimina una receta usando su ID. Requiere autenticación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la receta a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Receta eliminada correctamente.
 *       401:
 *         description: No autorizado, se requiere token válido.
 *       404:
 *         description: No se encontró la receta con el ID proporcionado.
 *       500:
 *         description: Error en el servidor.
 */
router.delete('/:id', token.verifyToken, recipesController.deleteOne);

