import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        userName: { type: String, required: true, trim: true, unique: true },
        emil: { type: String, required: true, trim: true, unique: true },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true }
    },
    {
        timestamps: true
    }
);

userSchema.set("toJSON", {
    transform(doc,ret){
        ret.id = ret._id
        delete ret.password
        delete ret._id
        delete ret.__v
    }
})
userSchema.index({titulo:"text"});
const User = mongoose.model("User",userSchema);

export default User;