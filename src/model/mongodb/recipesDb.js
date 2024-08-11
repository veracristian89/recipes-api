import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        dificultad: {
            type: Number,
            default:3,
            min:[1,'dificultad minima 1'],
            max:[5,'dificultad maxima 5']
        },
        categoria: {
            type: String,
            required: true,
        },
        tags: [String],
        url_img: {
            type: String,
            required: true,
        }
    }
);

export const Recipe = mongoose.model("Recipe",recipeSchema);