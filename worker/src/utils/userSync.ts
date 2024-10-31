import UserModel from "@/models/supabase/UserProfile";

export async function handleUserCreated(userData: any) {
    await UserModel.create({
        supabase_id: userData.id,
        username: userData.username,
        email: userData.email,
        full_name: userData.full_name || null,
        avatar_url: userData.avatar_url || null,
        website: userData.website || null,
        has_completed_preferences: userData.has_completed_preferences || false,
        updated_at: new Date(userData.updated_at)
    });
}

export async function handleUserUpdated(userData: any) {
    await UserModel.updateOne(
        { supabase_id: userData.id },
        {
            $set: {
                username: userData.username,
                email: userData.email,
                full_name: userData.full_name || null,
                avatar_url: userData.avatar_url || null,
                website: userData.website || null,
                has_completed_preferences: userData.has_completed_preferences || false,
                updated_at: new Date(userData.updated_at)
            }
        }
    );
}

export async function handleUserDeleted(userData: any) {
    await UserModel.deleteOne({ supabase_id: userData.id });
} 