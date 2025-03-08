import mongoose, { Document, Schema } from "mongoose";

interface IBasicInfo {
    preferred_age_range: string;
    preferred_gender: "male" | "female" | "any";
    smoking_preference: "yes" | "no" | "occasionally";
    drinking_preference: "yes" | "no" | "occasionally";
    noise_tolerance: "quiet" | "regular" | "moderate" | "loud";
    cleanliness: "tidy" | "weekend clean" | "casual" | "messy";
    food_preference: "veg" | "non-veg" | "any";
}

export interface IUserTraits extends Document {
    supabase_id: string;
    basicInfo?: IBasicInfo;
    interests: string[];
}

const basicInfoSchema = new Schema<IBasicInfo>({
    preferred_age_range: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                const ageRangePattern = /^(any|\d{1,2}-\d{1,2})$/;
                return ageRangePattern.test(value);
            },
            message:
                "Age range must be in the format 'min-max' (e.g., '18-22') or 'any'",
        },
    },
    preferred_gender: {
        type: String,
        enum: ["male", "female", "any"],
        required: true,
    },
    smoking_preference: {
        type: String,
        enum: ["yes", "no", "occasionally"],
        required: true,
    },
    drinking_preference: {
        type: String,
        enum: ["yes", "no", "occasionally"],
        required: true,
    },
    noise_tolerance: {
        type: String,
        enum: ["quiet", "regular", "moderate", "loud"],
        required: true,
    },
    cleanliness: {
        type: String,
        enum: ["tidy", "weekend clean", "casual", "messy"],
        required: true,
    },
    food_preference: {
        type: String,
        enum: ["veg", "non-veg", "any"],
        required: true,
    },
});

const userTraitsSchema = new Schema<IUserTraits>({
    supabase_id: {
        type: String,
        required: true,
        unique: true,
        ref: "UserProfile", // Reference to the UserProfile model
    },
    basicInfo: {
        type: basicInfoSchema,
        required: false,
        default: null,
    },
    interests: {
        type: [String],
        required: false,
        default: null,
    },
});

const UserTraits = mongoose.model<IUserTraits>("UserTraits", userTraitsSchema);

export default UserTraits;
