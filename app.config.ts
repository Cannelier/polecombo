import 'dotenv/config';

export default {
    expo: {
      name: "polecards",
      slug: "polecards",
      extra: {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        apiUrl: process.env.API_URL,
        eas: {
          projectId: "ad827691-d137-4527-b784-dc32ae66060b",
        },
      },
      ios: {
        bundleIdentifier: "com.polecards.app",
      },
      android: {
        "package": "com.polecards.app",
        "versionCode": 1,
      }
    },
  };