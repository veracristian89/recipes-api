import { Router } from "express";
import userController from "../controller/users.controller.js";
import { token } from "../services/jwt.js";

export const router = Router();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener información de un usuario por su ID
 *     description: Retorna los detalles del usuario con el ID proporcionado. Requiere autenticación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del usuario obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 email:
 *                   type: string
 *                 fecha_creacion:
 *                   type: string
 *       401:
 *         description: No autorizado, se requiere token válido.
 *       404:
 *         description: No se encontró el usuario con el ID proporcionado.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/:id", token.verifyToken, userController.getById);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un nuevo usuario proporcionando sus datos. No requiere autenticación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente.
 *       400:
 *         description: Datos inválidos proporcionados para el registro.
 *       500:
 *         description: Error en el servidor.
 */
router.post("/register", userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     description: Permite a un usuario iniciar sesión con sus credenciales y obtener un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, se devuelve el token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error en el servidor.
 */
router.post("/login", userController.loginUser);
