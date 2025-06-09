import 'dotenv/config';

export default {
    expo: {
      name: "polecombo",
      slug: "polecombo",
      extra: {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      },
    },
  };