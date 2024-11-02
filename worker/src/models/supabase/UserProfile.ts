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
    housing_preferences: {
        type: {
            property_types: [{
                type: String,
                enum: ['condo', 'duplex', 'apartment', 'studio']
            }],
            rent_range: {
                min: {
                    type: Number,
                    min: 200,
                    max: 4000,
                    required: true
                },
                max: {
                    type: Number,
                    min: 200,
                    max: 4000,
                    required: true
                }
            },
            property_size: {
                min: {
                    type: Number,
                    min: 500,
                    max: 3000,
                    required: true
                },
                max: {
                    type: Number,
                    min: 500,
                    max: 3000,
                    required: true
                }
            },
            bedrooms: [String],
            bathrooms: [String],
            preferred_roommates: [String],
            furnishing: [String],
            amenities: [String]
        },
        required: false,
        default: null
    },
    find_room_preferences: {
        type : {
            need_room : {
                type: Boolean,
                required: false,
                default: false,
            },
            need_roommate: {
                type: Boolean,
                required: false,
                default: null,
            },
            looking_for_both: {
                type: Boolean,
                required: false,
                default: false,
            }
        }
    },
});

const UserModel = mongoose.model("UserProfile", userProfileSchema);

export default UserModel;
