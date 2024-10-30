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
    },
    preferences: {
        type: Object,
        required: true,
        default: undefined,
        lease_sublease_property: {
            type: Boolean,
            required: true
        },
        find_roomate: {
            type: Boolean,
            required: true
        },
        sell_buy_product: {
            type: Boolean,
            required: true
        },
        here_to_explore: {
            type: Boolean,
            required: true
        }
    }
});

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model<User>('User', userSchema);
