import { APP_URL } from "@/lib/defaults";

export default function robots() {
    
    return {
      rules: {
        userAgent: "*",
        allow: ["/", "/find", "/find/*", "/categories", "/categories/*", "/map", "/stores", "/stores/*"],
        disallow: ["/me", "/me/*", "/admin"],
      },
      sitemap: `${APP_URL}/sitemap.xml`,
    };
  }