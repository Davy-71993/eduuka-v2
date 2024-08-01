import { APP_URL } from "@/lib/defaults";

export const siteConfig = {
  name: "uDuuka",
  title: "uDuuka",
  url: APP_URL,
  ogImage: `${APP_URL}/og.jpg`,
  description:
    "A dynamic online marketplace connecting buyers and sellers in a thriving community, fostering economic growth and consumer satisfaction.",
  links: {
    twitter: "https://twitter.com/uDuuka",
    facebook: "https://facebook.com/uDuuka"
  },
};
  
export type SiteConfig = typeof siteConfig;