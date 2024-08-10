import recetas from "../model/data.json" assert {type:"json"};
export const recipesController = {

    getAll(req,res){
        recetas.length?
        res.status(200).json({status:'success',message:'todas las recetas',data:recetas}):
        res.status(404).json({status:'usuccess',message:'no data found'})
    },

    getById(req,res){
        const { id } = req.params;
        let receta = recetas.find(receta => receta.id === parseInt(id));

        receta?
        res.status(200).json({status:'success',message:'receta por id',data:receta}):
        res.status(404).json({status:'usuccess',message:'no data found'})

    }

} 