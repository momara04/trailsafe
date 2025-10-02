export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged_at: string | null
          alert_type: string
          created_at: string | null
          hike_id: string
          id: string
          location: Json | null
          metadata: Json | null
          status: string | null
          user_id: string
        }
        Insert: {
          acknowledged_at?: string | null
          alert_type: string
          created_at?: string | null
          hike_id: string
          id?: string
          location?: Json | null
          metadata?: Json | null
          status?: string | null
          user_id: string
        }
        Update: {
          acknowledged_at?: string | null
          alert_type?: string
          created_at?: string | null
          hike_id?: string
          id?: string
          location?: Json | null
          metadata?: Json | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_hike_id_fkey"
            columns: ["hike_id"]
            isOneToOne: false
            referencedRelation: "hikes"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string | null
          id: string
          name: string
          phone_number: string
          priority: number | null
          relationship: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          phone_number: string
          priority?: number | null
          relationship?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          phone_number?: string
          priority?: number | null
          relationship?: string | null
          user_id?: string
        }
        Relationships: []
      }
      hikes: {
        Row: {
          area: Json | null
          completed_at: string | null
          created_at: string | null
          distance: number | null
          elevation_gain: number | null
          estimated_duration: number | null
          id: string
          name: string
          route: Json | null
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          area?: Json | null
          completed_at?: string | null
          created_at?: string | null
          distance?: number | null
          elevation_gain?: number | null
          estimated_duration?: number | null
          id?: string
          name: string
          route?: Json | null
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          area?: Json | null
          completed_at?: string | null
          created_at?: string | null
          distance?: number | null
          elevation_gain?: number | null
          estimated_duration?: number | null
          id?: string
          name?: string
          route?: Json | null
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      location_tracking: {
        Row: {
          accuracy: number | null
          altitude: number | null
          heading: number | null
          hike_id: string
          id: string
          latitude: number
          longitude: number
          speed: number | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          altitude?: number | null
          heading?: number | null
          hike_id: string
          id?: string
          latitude: number
          longitude: number
          speed?: number | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          accuracy?: number | null
          altitude?: number | null
          heading?: number | null
          hike_id?: string
          id?: string
          latitude?: number
          longitude?: number
          speed?: number | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_tracking_hike_id_fkey"
            columns: ["hike_id"]
            isOneToOne: false
            referencedRelation: "hikes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          anomaly_detection_enabled: boolean | null
          auto_check_in_enabled: boolean | null
          check_in_interval: number | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          anomaly_detection_enabled?: boolean | null
          auto_check_in_enabled?: boolean | null
          check_in_interval?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          anomaly_detection_enabled?: boolean | null
          auto_check_in_enabled?: boolean | null
          check_in_interval?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
