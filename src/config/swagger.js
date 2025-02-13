import swaggerJSDoc from "swagger-jsdoc";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Obtener el directorio actual
const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RECIPES-API Swagger",
      version: "1.0.0",
      description: "Api para CRUD de recetas, registro y login de usuarios",
    },
    servers: [
      {
        url: "https://recipes-api-gubg.onrender.com/", // Cambia según tu entorno
      },
    ],
  },
  // Rutas donde se encuentran tus endpoints
  apis: ["./src/router/*.router.js"], // Ajusta la ruta a tu estructura
};
// Generar documentación Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
