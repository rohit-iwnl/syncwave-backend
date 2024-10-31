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
    phone: {
        type: String,
        default: null
    },
    last_sign_in_at: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true
    },
    deleted_at: {
        type: Date,
        default: null
    }
})

const UserModel = mongoose.model('UserProfile', userProfileSchema)

export default UserModel
