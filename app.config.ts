import 'dotenv/config';

export default {
    expo: {
      name: "polecards",
      slug: "polecards",
      extra: {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      },
      ios: {
        bundleIdentifier: "com.polecards.app",
      },
    },
  };