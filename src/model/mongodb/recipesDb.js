import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim : true
        },
        descripcion: {
            type: String,
            required: true,
            trim : true
        },
        dificultad: {
            type: Number,
            default:3,
            min:[1,'dificultad minima 1'],
            max:[5,'dificultad maxima 5'],
            trim : true
        },
        categoria: {
            type: String,
            required: true,
            trim : true
        },
        tags: [String],
        url_img: {
            type: String,
            required: true,
            trim : true
        }
    },
    {timestamps:true}
);

recipeSchema.set("toJSON", {
    transform(doc,ret){
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})
recipeSchema.index({titulo:"text"});
export const Recipe = mongoose.model("Recipe",recipeSchema);