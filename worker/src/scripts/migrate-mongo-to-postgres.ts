#!/usr/bin/env bun
import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';

// Define the MongoDB schemas for migration
const mongoUserProfileSchema = new mongoose.Schema({
  supabase_id: String,
  email: String,
  phone: String,
  last_sign_in_at: Date,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
  preferences: Object,
  personal_details: Object,
  housing_preferences: Object,
  find_room_preferences: Object,
});

const mongoPropertySchema = new mongoose.Schema({
  supabase_id: String,
  description: String,
  location: String,
  monthly_base_rent: Number,
  per_person_rent: Number,
  square_footage: Number,
  type: String,
  plan: String,
  startDate: Date,
  endDate: Date,
  bedrooms: [String],
  bathrooms: [String],
  preferred_roommates: [String],
  furnishing: [String],
  amenities: [String],
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  created_at: Date,
  updated_at: Date,
});

const MongoUserProfile = mongoose.model('UserProfile', mongoUserProfileSchema);
const MongoProperty = mongoose.model('Property', mongoPropertySchema);

const prisma = new PrismaClient();

async function migrateUserProfiles() {
  console.log('Starting UserProfile migration...');
  
  try {
    const mongoUsers = await MongoUserProfile.find({}).lean();
    console.log(`Found ${mongoUsers.length} user profiles in MongoDB`);

    for (const user of mongoUsers) {
      try {
        await prisma.userProfile.create({
          data: {
            supabaseId: user.supabase_id,
            email: user.email,
            phone: user.phone || null,
            lastSignInAt: user.last_sign_in_at || null,
            createdAt: user.created_at || new Date(),
            updatedAt: user.updated_at || new Date(),
            deletedAt: user.deleted_at || null,
            preferences: user.preferences || null,
            personalDetails: user.personal_details || null,
            housingPreferences: user.housing_preferences || null,
            findRoomPreferences: user.find_room_preferences || null,
          },
        });
        console.log(`Migrated user: ${user.email}`);
      } catch (error) {
        console.error(`Error migrating user ${user.email}:`, error);
      }
    }
    
    console.log('UserProfile migration completed');
  } catch (error) {
    console.error('Error during UserProfile migration:', error);
  }
}

async function migrateProperties() {
  console.log('Starting Property migration...');
  
  try {
    const mongoProperties = await MongoProperty.find({}).lean();
    console.log(`Found ${mongoProperties.length} properties in MongoDB`);

    for (const property of mongoProperties) {
      try {
        // Map MongoDB property types to Prisma enum values
        const propertyType = property.type?.toLowerCase();
        const validTypes = ['condo', 'duplex', 'apartment', 'studio'];
        const mappedType = validTypes.includes(propertyType) ? propertyType : 'apartment';

        // Map MongoDB property plans to Prisma enum values
        const planMapping: { [key: string]: string } = {
          'Sublease': 'Sublease',
          'Looking for roommate': 'LookingForRoommate',
          'Temporary Stay': 'TemporaryStay',
        };
        const mappedPlan = planMapping[property.plan] || 'Sublease';

        await prisma.property.create({
          data: {
            supabaseId: property.supabase_id,
            description: property.description,
            location: property.location,
            monthlyBaseRent: property.monthly_base_rent,
            perPersonRent: property.per_person_rent,
            squareFootage: property.square_footage,
            type: mappedType as any,
            plan: mappedPlan as any,
            startDate: property.startDate,
            endDate: property.endDate || null,
            bedrooms: property.bedrooms || [],
            bathrooms: property.bathrooms || [],
            preferredRoommates: property.preferred_roommates || [],
            furnishing: property.furnishing || [],
            amenities: property.amenities || [],
            latitude: property.coordinates?.latitude || 0,
            longitude: property.coordinates?.longitude || 0,
            createdAt: property.created_at || new Date(),
            updatedAt: property.updated_at || new Date(),
          },
        });
        console.log(`Migrated property: ${property.location}`);
      } catch (error) {
        console.error(`Error migrating property ${property.location}:`, error);
      }
    }
    
    console.log('Property migration completed');
  } catch (error) {
    console.error('Error during Property migration:', error);
  }
}

async function main() {
  // Connect to MongoDB
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI environment variable is required');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Connect to PostgreSQL via Prisma
    await prisma.$connect();
    console.log('Connected to PostgreSQL');

    // Run migrations
    await migrateUserProfiles();
    await migrateProperties();

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Cleanup connections
    await mongoose.disconnect();
    await prisma.$disconnect();
  }
}

// Run the migration if this script is called directly
if (import.meta.main) {
  main().catch(console.error);
}

export { main as migrateMongotoPostgres }; 