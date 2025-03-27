export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          type: string
          name: string
          email: string
          message: string
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          type: string
          name: string
          email: string
          message: string
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          type?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
          status?: string
        }
      }
      glossary: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          content: string
          icon: string
          color: string
          created_at: string
          updated_at: string
          published_at: string | null
          status: 'draft' | 'published' | 'archived'
          seo_title: string
          seo_description: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          content: string
          icon: string
          color: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
          status?: 'draft' | 'published' | 'archived'
          seo_title?: string
          seo_description?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          content?: string
          icon?: string
          color?: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
          status?: 'draft' | 'published' | 'archived'
          seo_title?: string
          seo_description?: string
        }
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
  }
}