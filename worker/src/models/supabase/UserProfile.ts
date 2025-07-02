import { PrismaClient, UserProfile } from "@prisma/client";
import prisma from "@/db/db";

// Type definitions for user preferences (matching your original structure)
export interface UserPreferences {
  find_roommate?: boolean;
  here_to_explore?: boolean;
  lease_property?: boolean;
  sell_buy_product?: boolean;
}

export interface PersonalDetails {
  country?: string;
  state?: string;
  gender?: string;
  field?: string;
  pronouns?: string;
}

export interface HousingPreferences {
  property_types?: string[];
  rent_range?: {
    min: number;
    max: number;
  };
  property_size?: {
    min: number;
    max: number;
  };
  bedrooms?: string[];
  bathrooms?: string[];
  preferred_roommates?: string[];
  furnishing?: string[];
  amenities?: string[];
}

export interface FindRoomPreferences {
  need_room?: boolean;
  need_roommate?: boolean;
  looking_for_both?: boolean;
}

// Type for creating/updating user profiles
export interface CreateUserProfileData {
  supabaseId: string;
  email: string;
  phone?: string;
  lastSignInAt?: Date;
  preferences?: UserPreferences;
  personalDetails?: PersonalDetails;
  housingPreferences?: HousingPreferences;
  findRoomPreferences?: FindRoomPreferences;
}

export interface UpdateUserProfileData extends Partial<CreateUserProfileData> {}

// UserProfile service class with CRUD operations
export class UserProfileService {
  // Create a new user profile
  static async create(data: CreateUserProfileData): Promise<UserProfile> {
    return await prisma.userProfile.create({
      data: {
        supabaseId: data.supabaseId,
        email: data.email,
        phone: data.phone,
        lastSignInAt: data.lastSignInAt,
        preferences: data.preferences as any,
        personalDetails: data.personalDetails as any,
        housingPreferences: data.housingPreferences as any,
        findRoomPreferences: data.findRoomPreferences as any,
      },
      include: {
        properties: true,
      },
    });
  }

  // Find user profile by ID
  static async findById(id: string): Promise<UserProfile | null> {
    return await prisma.userProfile.findUnique({
      where: { id },
      include: {
        properties: true,
      },
    });
  }

  // Find user profile by Supabase ID
  static async findBySupabaseId(supabaseId: string): Promise<UserProfile | null> {
    return await prisma.userProfile.findUnique({
      where: { supabaseId },
      include: {
        properties: true,
      },
    });
  }

  // Find user profile by email
  static async findByEmail(email: string): Promise<UserProfile | null> {
    return await prisma.userProfile.findFirst({
      where: { email },
      include: {
        properties: true,
      },
    });
  }

  // Update user profile by Supabase ID
  static async updateBySupabaseId(
    supabaseId: string,
    data: UpdateUserProfileData
  ): Promise<UserProfile> {
    return await prisma.userProfile.update({
      where: { supabaseId },
      data: {
        email: data.email,
        phone: data.phone,
        lastSignInAt: data.lastSignInAt,
        preferences: data.preferences as any,
        personalDetails: data.personalDetails as any,
        housingPreferences: data.housingPreferences as any,
        findRoomPreferences: data.findRoomPreferences as any,
      },
      include: {
        properties: true,
      },
    });
  }

  // Update user profile by ID
  static async update(id: string, data: UpdateUserProfileData): Promise<UserProfile> {
    return await prisma.userProfile.update({
      where: { id },
      data: {
        email: data.email,
        phone: data.phone,
        lastSignInAt: data.lastSignInAt,
        preferences: data.preferences as any,
        personalDetails: data.personalDetails as any,
        housingPreferences: data.housingPreferences as any,
        findRoomPreferences: data.findRoomPreferences as any,
      },
      include: {
        properties: true,
      },
    });
  }

  // Soft delete user profile
  static async softDelete(supabaseId: string): Promise<UserProfile> {
    return await prisma.userProfile.update({
      where: { supabaseId },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  // Hard delete user profile
  static async delete(id: string): Promise<UserProfile> {
    return await prisma.userProfile.delete({
      where: { id },
    });
  }

  // Find all active user profiles (not soft deleted)
  static async findMany(includeDeleted: boolean = false): Promise<UserProfile[]> {
    return await prisma.userProfile.findMany({
      where: includeDeleted ? {} : { deletedAt: null },
      include: {
        properties: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Update last sign in time
  static async updateLastSignIn(supabaseId: string): Promise<UserProfile> {
    return await prisma.userProfile.update({
      where: { supabaseId },
      data: {
        lastSignInAt: new Date(),
      },
    });
  }

  // Find users with specific preferences
  static async findByPreferences(preferences: Partial<UserPreferences>): Promise<UserProfile[]> {
    // Note: This is a simplified query. For complex JSON queries, you might need raw SQL
    return await prisma.userProfile.findMany({
      where: {
        deletedAt: null,
        // You can add more complex JSON filtering here if needed
      },
      include: {
        properties: true,
      },
    });
  }
}

// Export the service as default for backward compatibility
export default UserProfileService;