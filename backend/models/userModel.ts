import mongoose, { Document, Model, model } from "mongoose";

export interface IUser  extends Document {
    username: string;
    email: string;
    password?: string;
    isAvatarImageSet: boolean;
    avatarImage: string;
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        unique: true,
        require: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        unique: true,
        max: 50
    }, 
    password: {
        type: String,
        unique: true,
        max: 20
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ''
    }
})

export const User: Model<IUser>  = model<IUser>('User', userSchema);