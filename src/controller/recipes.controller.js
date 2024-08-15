import { Recipe } from "../model/mongodb/recipesDb.js";
import logger from "../services/winstonLogger.js";

export const recipesController = {

    async getAll(req, res) {

        const result = await Recipe.find();

        result? logger.info('Obteniendo todas las recetas'):
        logger.warn('error al obtener al obtener todas las recetas');

        result ?
            res.status(200).json({ status: 'success', message: 'todas las recetas', data: result }) :
            res.status(404).json({ status: 'usuccess', message: 'no data found' })
    },

    async getById(req, res) {
        const { id } = req.params;
        let receta = await Recipe.findById(id);
        receta ? logger.info(`mostrando receta id: ${id}, titulo: ${receta.titulo}`):
        logger.warn(`sin resultados para receta id: ${id}`); 
        receta ?
            res.status(200).json({ status: 'success', message: 'receta por id', data: receta }) :
            res.status(404).json({ status: 'usuccess', message: 'no se encontraron datos' })
    },

    async getByTitle(req, res) {
        const { title } = req.query;

        if (!title) {
            res.status(400).json({ status: 'usuccess', message: 'sin query param' });
        } else {
            try {
                const receta = await Recipe.find({ titulo: { $regex: title, $options: "i" } });
                receta.length > 0 ?
                res.status(200).json({ status: 'success', message: 'receta por id', data: receta }) :
                res.status(404).json({ status: 'usuccess', message: `no se encontraron resultados para: ${title}` })
            } catch (error) {
                res.status(500).json({ status: 'usuccess', message: `Error del servidor ${error}` })
            }
        }
    },

    async createRecipe(req, res) {

        const { titulo, descripcion, dificultad, categoria, tags, url_img } = req.body;
        const newRecipe = new Recipe({ titulo, descripcion, dificultad, categoria, tags, url_img });

        try {
            const savedRecipe = await newRecipe.save();
            res.status(200).json({ status: 'success', message: 'registro cargado', data: savedRecipe })
        } catch (error) {
            res.status(500).json({ status: 'usuccess', message: `Error en el servidor: ${error}` })
        }


    },

    async deleteOne(req, res) {
        const { id } = req.params;
        const result = await Recipe.findByIdAndDelete(id);
        result ?
            res.status(200).json({ status: 'success', message: `se elimino el registro id: ${id}` }) :
            res.status(500).json({ status: 'unsuccess', message: `Error al intentar eliminar el registro id: ${id}` })
    },

    async updateRecipe(req,res){
        const { id } = req.params;

        try{
            const result = await Recipe.findByIdAndUpdate(id,req.body,{new:true});
            result?
            res.status(200).json({ status: 'success', message: `se actualizó el registro id: ${id}`,data:result }) :
            res.status(404).json({ status: 'usuccess', message: `no se encontraron datos para el id: ${id}` })
        } catch(err){
            res.status(500).json({ status: 'usuccess', message: `Error en el servidor: ${err}` })
        }

    }

} 