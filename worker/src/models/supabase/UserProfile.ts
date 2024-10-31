import mongoose from 'mongoose'

const userProfileSchema = new mongoose.Schema({
    supabase_id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        default: null
    },
    avatar_url: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    has_completed_preferences: {
        type: Boolean,
        default: false
    },
    updated_at: {
        type: Date,
        required: true
    }
})

const UserModel = mongoose.model('UserProfile', userProfileSchema)

export default UserModel
