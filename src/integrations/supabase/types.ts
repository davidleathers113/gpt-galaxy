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
      archives: {
        Row: {
          created_at: string
          file_path: string
          file_size: number
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_path: string
          file_size: number
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_path?: string
          file_size?: number
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "archives_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          days_active: number | null
          display_name: string
          export_date: string
          first_timestamp: string | null
          id: string
          last_timestamp: string | null
          message_count: number | null
          metadata_json: string | null
        }
        Insert: {
          days_active?: number | null
          display_name: string
          export_date: string
          first_timestamp?: string | null
          id: string
          last_timestamp?: string | null
          message_count?: number | null
          metadata_json?: string | null
        }
        Update: {
          days_active?: number | null
          display_name?: string
          export_date?: string
          first_timestamp?: string | null
          id?: string
          last_timestamp?: string | null
          message_count?: number | null
          metadata_json?: string | null
        }
        Relationships: []
      }
      export_metadata: {
        Row: {
          duration_seconds: number | null
          export_date: string
          format: string | null
          id: number
          metadata_json: string | null
          total_conversations: number | null
          total_messages: number | null
          user_display_name: string | null
          user_id: string | null
        }
        Insert: {
          duration_seconds?: number | null
          export_date: string
          format?: string | null
          id?: number
          metadata_json?: string | null
          total_conversations?: number | null
          total_messages?: number | null
          user_display_name?: string | null
          user_id?: string | null
        }
        Update: {
          duration_seconds?: number | null
          export_date?: string
          format?: string | null
          id?: number
          metadata_json?: string | null
          total_conversations?: number | null
          total_messages?: number | null
          user_display_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          status: string
          updated_at: string
        }
        Insert: {
          created_at: string
          id: string
          metadata: Json
          status: string
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          conversation_id: string
          edited: boolean | null
          id: string
          message_type: string
          metadata_json: string | null
          sender_display_name: string | null
          sender_id: string
          timestamp: string
        }
        Insert: {
          content?: string | null
          conversation_id: string
          edited?: boolean | null
          id: string
          message_type: string
          metadata_json?: string | null
          sender_display_name?: string | null
          sender_id: string
          timestamp: string
        }
        Update: {
          content?: string | null
          conversation_id?: string
          edited?: boolean | null
          id?: string
          message_type?: string
          metadata_json?: string | null
          sender_display_name?: string | null
          sender_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          conversation_id: string
          display_name: string | null
          id: number
          user_id: string
        }
        Insert: {
          conversation_id: string
          display_name?: string | null
          id?: number
          user_id: string
        }
        Update: {
          conversation_id?: string
          display_name?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_plan: string
          subscription_status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_plan?: string
          subscription_status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_plan?: string
          subscription_status?: string
          updated_at?: string
        }
        Relationships: []
      }
      prompt_reactions: {
        Row: {
          count: number
          id: string
          prompt_id: string
          reaction_type: string
          updated_at: string
        }
        Insert: {
          count?: number
          id?: string
          prompt_id: string
          reaction_type: string
          updated_at?: string
        }
        Update: {
          count?: number
          id?: string
          prompt_id?: string
          reaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_reactions_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      prompts: {
        Row: {
          category: string
          code: string
          copy_count: number
          created_at: string
          description: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          code: string
          copy_count?: number
          created_at?: string
          description: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          code?: string
          copy_count?: number
          created_at?: string
          description?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_latest_jobs: {
        Args: {
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          created_at: string
          id: string
          metadata: Json
          status: string
          updated_at: string
        }[]
      }
      update_job_status: {
        Args: {
          p_job_id: string
          p_status: string
          p_metadata?: Json
        }
        Returns: {
          created_at: string
          id: string
          metadata: Json
          status: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
