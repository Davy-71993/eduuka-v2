
{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
  ];
  env = {
    NEXT_PUBLIC_SUPABASE_URL = "https://sqcidocbglgivrlysuhq.supabase.co";
    NEXT_PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2lkb2NiZ2xnaXZybHlzdWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5ODMwODMsImV4cCI6MjAyMjU1OTA4M30.XeNd2mZiexnISYKXKh8vzq3QRIsdL6QbV1dTHACfXpQ";
  };
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}