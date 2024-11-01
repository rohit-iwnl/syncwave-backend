import UserModel from "@/models/supabase/UserProfile";

export async function handleUserCreated(userData: any) {
  await UserModel.create({
    supabase_id: userData.id,
    email: userData.email,
    phone: userData.phone || null,
    last_sign_in_at: userData.last_sign_in_at ? new Date(userData.last_sign_in_at) : null,
    created_at: userData.created_at ? new Date(userData.created_at) : new Date(),
    updated_at: new Date(userData.updated_at),
    deleted_at: userData.deleted_at ? new Date(userData.deleted_at) : null
  });
}

export async function handleUserUpdated(userData: any) {
  await UserModel.updateOne(
    { supabase_id: userData.id },
    {
      $set: {
        email: userData.email,
        phone: userData.phone || null,
        last_sign_in_at: userData.last_sign_in_at ? new Date(userData.last_sign_in_at) : null,
        updated_at: new Date(userData.updated_at),
        deleted_at: userData.deleted_at ? new Date(userData.deleted_at) : null
      }
    }
  );
}

export async function handleUserDeleted(userData: any) {
  await UserModel.deleteOne({ supabase_id: userData.id });
}


export async function checkIfUserExists(supabase_id: string) {
  const user = await UserModel.findOne({ supabase_id: supabase_id });

  if (user) {
    return true;
  }
  return false;
}
