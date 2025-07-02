import { PrismaClient, Property, PropertyType, PropertyPlan } from "@prisma/client";
import prisma from "@/db/db";

// Type definitions for creating/updating properties
export interface CreatePropertyData {
  supabaseId: string;
  description: string;
  location: string;
  monthlyBaseRent: number;
  perPersonRent: number;
  squareFootage: number;
  type: PropertyType;
  plan: PropertyPlan;
  startDate: Date;
  endDate?: Date;
  bedrooms: string[];
  bathrooms: string[];
  preferredRoommates: string[];
  furnishing: string[];
  amenities: string[];
  latitude: number;
  longitude: number;
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {}

// Property service class with CRUD operations
export class PropertyService {
  // Create a new property
  static async create(data: CreatePropertyData): Promise<Property> {
    return await prisma.property.create({
      data: {
        supabaseId: data.supabaseId,
        description: data.description,
        location: data.location,
        monthlyBaseRent: data.monthlyBaseRent,
        perPersonRent: data.perPersonRent,
        squareFootage: data.squareFootage,
        type: data.type,
        plan: data.plan,
        startDate: data.startDate,
        endDate: data.endDate,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        preferredRoommates: data.preferredRoommates,
        furnishing: data.furnishing,
        amenities: data.amenities,
        latitude: data.latitude,
        longitude: data.longitude,
      },
      include: {
        userProfile: true,
      },
    });
  }

  // Find property by ID
  static async findById(id: string): Promise<Property | null> {
    return await prisma.property.findUnique({
      where: { id },
      include: {
        userProfile: true,
      },
    });
  }

  // Find all properties by supabase user ID
  static async findBySupabaseId(supabaseId: string): Promise<Property[]> {
    return await prisma.property.findMany({
      where: { supabaseId },
      include: {
        userProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Find all properties with optional filters
  static async findMany(filters?: {
    type?: PropertyType;
    plan?: PropertyPlan;
    minRent?: number;
    maxRent?: number;
    location?: string;
  }): Promise<Property[]> {
    const where: any = {};

    if (filters?.type) where.type = filters.type;
    if (filters?.plan) where.plan = filters.plan;
    if (filters?.minRent || filters?.maxRent) {
      where.monthlyBaseRent = {};
      if (filters.minRent) where.monthlyBaseRent.gte = filters.minRent;
      if (filters.maxRent) where.monthlyBaseRent.lte = filters.maxRent;
    }
    if (filters?.location) {
      where.location = {
        contains: filters.location,
        mode: 'insensitive',
      };
    }

    return await prisma.property.findMany({
      where,
      include: {
        userProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Update property by ID
  static async update(id: string, data: UpdatePropertyData): Promise<Property> {
    return await prisma.property.update({
      where: { id },
      data,
      include: {
        userProfile: true,
      },
    });
  }

  // Delete property by ID
  static async delete(id: string): Promise<Property> {
    return await prisma.property.delete({
      where: { id },
    });
  }

  // Find properties within a radius (basic implementation)
  static async findNearby(
    latitude: number,
    longitude: number,
    radiusKm: number = 10
  ): Promise<Property[]> {
    // Simple bounding box calculation (for more precise radius search, use PostGIS)
    const latDiff = radiusKm / 111; // Rough conversion
    const lonDiff = radiusKm / (111 * Math.cos(latitude * Math.PI / 180));

    return await prisma.property.findMany({
      where: {
        latitude: {
          gte: latitude - latDiff,
          lte: latitude + latDiff,
        },
        longitude: {
          gte: longitude - lonDiff,
          lte: longitude + lonDiff,
        },
      },
      include: {
        userProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

// Export the service as default for backward compatibility
export default PropertyService;
