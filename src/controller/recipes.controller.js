import recetas from "../model/fileSystem/data.json" assert {type: "json"};
import { Recipe } from "../model/mongodb/recipesDb.js";
export const recipesController = {

    async getAll(req, res) {
        const result = await Recipe.find();
        result?
            res.status(200).json({ status: 'success', message: 'todas las recetas', data: result }) :
            res.status(404).json({ status: 'usuccess', message: 'no data found' })
    }, 

    async getById(req, res) {
        const { id } = req.params;
        let receta = await Recipe.findById(id);
        receta?
            res.status(200).json({ status: 'success', message: 'receta por id', data: receta }) :
            res.status(404).json({ status: 'usuccess', message: 'no data found' })
    },

    async create(req, res) {
        const { titulo, descripcion, dificultad, categoria, tags, url_img } = req.body;
        const newRecipe = new Recipe({titulo, descripcion, dificultad, categoria, tags, url_img});
       try {
         await newRecipe.save();
         res.status(200).json({ status: 'success', message: 'registro cargado', data: newRecipe })
       } catch (error) {
        res.status(500).json({ status: 'usuccess', message: `Error en el servidor: ${error}` })
       }
    },

    async delete(req,res){
        const { id } = req.params;
        const result = await Recipe.findOneAndDelete(id);
        result?
        res.status(200).json({ status: 'success', message: `se elimino el registro id: ${id}` }):
        res.status(500).json({ status: 'unsuccess', message: `Error al intentar eliminar el registro id: ${id}` })
    },

} 