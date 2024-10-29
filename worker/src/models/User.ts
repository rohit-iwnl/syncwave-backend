import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model<User>('User', userSchema);
