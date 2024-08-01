//app/sitemap.js

import { APP_URL } from "@/lib/defaults";
import { createClient } from "@/lib/supabase/client";
import { Ad, Category, SubCategory } from "@/lib/types";

const fetch = async(table: string, fields: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from(table).select(fields)
    if(error) return []

    return data
}
 
export default async function sitemap() {
  const products = (await fetch('ads', 'id')) as Ad[];
  const categories = (await fetch('categories', 'slug')) as Category[];
  const sub_categories = (await fetch('sub_categories', 'slug')) as SubCategory[];
  const productUrls = products.map((product: Ad) => {
    return {
      url: `${APP_URL}/find/${product.id}`,
      lastModified: new Date(),
    };
  });
  const categoryUrls = categories.map((category: Category) => {
    return {
      url: `${APP_URL}/categories/${category.slug}`,
      lastModified: new Date(),
    };
  });
  const sub_categoryUrls = sub_categories.map((sub_category: Category) => {
    return {
      url: `${APP_URL}/categories/${sub_category.slug}`,
      lastModified: new Date(),
    };
  });
 
  return [
    {
        url: APP_URL,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/find`,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/map`,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/me`,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/me/chats`,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/alerts`,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/me/creat-profile`,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/me/ads`,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/me/stores`,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/about`,
        lastModified: new Date(),
    },
    {
        url: `${APP_URL}/support`,
        lastModified: new Date(),
    },
    ...productUrls,
    ...categoryUrls,
    ...sub_categoryUrls,
  ];
}