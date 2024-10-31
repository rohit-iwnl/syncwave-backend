export interface UserProfile {
    id: string;  // uuid as supabase_id
    email: string;
    phone: string | null;
    last_sign_in_at: Date | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
} 