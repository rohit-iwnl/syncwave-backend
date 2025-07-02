import UserProfileService from "@/models/supabase/UserProfile";

export async function handleUserCreated(userData: any) {
  await UserProfileService.create({
    supabaseId: userData.id,
    email: userData.email,
    phone: userData.phone || undefined,
    lastSignInAt: userData.last_sign_in_at ? new Date(userData.last_sign_in_at) : undefined,
  });
}

export async function handleUserUpdated(userData: any) {
  await UserProfileService.updateBySupabaseId(
    userData.id,
    {
      email: userData.email,
      phone: userData.phone || undefined,
      lastSignInAt: userData.last_sign_in_at ? new Date(userData.last_sign_in_at) : undefined,
    }
  );
}

export async function handleUserDeleted(userData: any) {
  await UserProfileService.softDelete(userData.id);
}

export async function checkIfUserExists(supabase_id: string) {
  const user = await UserProfileService.findBySupabaseId(supabase_id);

  if (user) {
    return user;
  }
  
  return null;
}
