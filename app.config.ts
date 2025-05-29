import 'dotenv/config';

export default {
    expo: {
      name: "polecombo",
      slug: "polecombo",
      extra: {
        clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      },
    },
  };