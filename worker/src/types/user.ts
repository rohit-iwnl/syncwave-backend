export interface UserProfile {
    id: string;  // uuid
    email: string;
    updated_at: Date;
    username: string;
    full_name: string | null;
    avatar_url: string | null;
    website: string | null;
    has_completed_preferences: boolean;
} 