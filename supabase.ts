export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ad_images: {
        Row: {
          ad_id: number
          created_at: string
          deleted_at: string | null
          id: number
          trashed_at: string | null
          url: string
        }
        Insert: {
          ad_id: number
          created_at?: string
          deleted_at?: string | null
          id?: number
          trashed_at?: string | null
          url: string
        }
        Update: {
          ad_id?: number
          created_at?: string
          deleted_at?: string | null
          id?: number
          trashed_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_images_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_promotions: {
        Row: {
          ammount: number | null
          created_at: string
          expiry: string
          id: number
          start: string
          status: string
        }
        Insert: {
          ammount?: number | null
          created_at?: string
          expiry: string
          id: number
          start: string
          status: string
        }
        Update: {
          ammount?: number | null
          created_at?: string
          expiry?: string
          id?: number
          start?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_promotions_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_ratings: {
        Row: {
          ad_id: number
          client_id: string
          created_at: string
          id: number
          value: number
        }
        Insert: {
          ad_id: number
          client_id?: string
          created_at?: string
          id?: number
          value: number
        }
        Update: {
          ad_id?: number
          client_id?: string
          created_at?: string
          id?: number
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "ratings_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          ad_details: string
          address: string | null
          brand: string | null
          created_at: string
          deleted_at: string | null
          description: string
          id: number
          location: string | null
          max_price: number | null
          min_price: number | null
          name: string
          price: number
          pricing_period: string | null
          pricing_scheme: string | null
          seller_id: string
          status: string
          store_id: number | null
          sub_category_id: number
          trashed_at: string | null
          views: number
        }
        Insert: {
          ad_details?: string
          address?: string | null
          brand?: string | null
          created_at?: string
          deleted_at?: string | null
          description: string
          id?: number
          location?: string | null
          max_price?: number | null
          min_price?: number | null
          name: string
          price: number
          pricing_period?: string | null
          pricing_scheme?: string | null
          seller_id?: string
          status?: string
          store_id?: number | null
          sub_category_id: number
          trashed_at?: string | null
          views?: number
        }
        Update: {
          ad_details?: string
          address?: string | null
          brand?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string
          id?: number
          location?: string | null
          max_price?: number | null
          min_price?: number | null
          name?: string
          price?: number
          pricing_period?: string | null
          pricing_scheme?: string | null
          seller_id?: string
          status?: string
          store_id?: number | null
          sub_category_id?: number
          trashed_at?: string | null
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "ads_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ads_seller_id_fkey1"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ads_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ads_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          image: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          image: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          image?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          dob: string | null
          first_name: string | null
          id: string
          image: string | null
          last_name: string | null
          sex: string | null
        }
        Insert: {
          address?: string | null
          dob?: string | null
          first_name?: string | null
          id: string
          image?: string | null
          last_name?: string | null
          sex?: string | null
        }
        Update: {
          address?: string | null
          dob?: string | null
          first_name?: string | null
          id?: string
          image?: string | null
          last_name?: string | null
          sex?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          address: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: number
          keeper_id: string
          location: string | null
          logo: string | null
          name: string
          trashed_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          keeper_id?: string
          location?: string | null
          logo?: string | null
          name: string
          trashed_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          keeper_id?: string
          location?: string | null
          logo?: string | null
          name?: string
          trashed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stores_keeper_id_fkey"
            columns: ["keeper_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_categories: {
        Row: {
          category_id: number
          created_at: string
          deleted_at: string | null
          extra_fields: string | null
          id: number
          image: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          category_id: number
          created_at?: string
          deleted_at?: string | null
          extra_fields?: string | null
          id?: number
          image: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          category_id?: number
          created_at?: string
          deleted_at?: string | null
          extra_fields?: string | null
          id?: number
          image?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
