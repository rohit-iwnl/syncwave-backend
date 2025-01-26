import { Schema, model } from 'mongoose';

const PropertySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true  // MongoDB will auto-generate this
  },
  supabase_id: {
    type: String,
    required: true,
    ref: 'UserProfile'  // References the UserProfile collection
  },
  description: {
    type: String,
    required: true,
    default: null
  },
  location: {
    type: String,
    required: true
  },
  monthly_base_rent: {
    type: Number,
    required: true
  },
  per_person_rent: {
    type: Number,
    required: true
  },
  square_footage: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['condo', 'duplex', 'apartment', 'studio'],
    required: true
  },
  bedrooms: [{
    type: String,
    required: true
  }],
  bathrooms: [{
    type: String,
    required: true
  }],
  preferred_roommates: [{
    type: String,
    required: true
  }],
  furnishing: [{
    type: String,
    required: true
  }],
  amenities: [{
    type: String,
    required: true
  }],
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the timestamps before saving
PropertySchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

export const PropertyModel = model('Property', PropertySchema);
