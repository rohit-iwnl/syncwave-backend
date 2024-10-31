import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    supabase_id: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: null,
    },
    last_sign_in_at: {
        type: Date,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        required: true,
    },
    deleted_at: {
        type: Date,
        default: null,
    },
    preferences: {
        type: {
            find_roommate: {
                type: Boolean,
                required: true,
                default: false,
            },
            here_to_explore: {
                type: Boolean,
                required: true,
                default: false,
            },
            lease_property: {
                type: Boolean,
                required: true,
                default: false,
            },
            sell_buy_product: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
        required: false,
        default: null,
    },
    personal_details: {
        type : {
            country: {
                type: String,
                required: false,
                default: null,
            },
            state: {
                type: String,
                required: false,
                default: null,
            },
            gender: {
                type: String,
                required: false,
                default: null,
            },
            field: {
                type: String,
                required: false,
                default: null,
            },
            pronouns: {
                type: String,
                required: false,
                default: null,
            },
        },
        required: false,
        default: null,
    },
});

const UserModel = mongoose.model("UserProfile", userProfileSchema);

export default UserModel;
