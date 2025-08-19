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
      users: {
        Row: {
          id: string
          name: string
          role: 'admin' | 'member'
          password: string
          email: string
          total_deposit: number
          total_withdraw: number
          balance: number
          created_at: string
          created_by?: string | null
        }
        Insert: {
          id?: string
          name: string
          role: 'admin' | 'member'
          password: string
          email: string
          total_deposit?: number
          total_withdraw?: number
          balance?: number
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string
          role?: 'admin' | 'member'
          password?: string
          email?: string
          total_deposit?: number
          total_withdraw?: number
          balance?: number
          created_at?: string
          created_by?: string | null
        }
      }
      items: {
        Row: {
          id: string
          name: string
          buy_price: number
          sell_price: number
          stock: number
          bought_count: number
          sold_count: number
          created_by?: string | null
          image: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          buy_price: number
          sell_price: number
          stock?: number
          bought_count?: number
          sold_count?: number
          created_by?: string | null
          image?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          buy_price?: number
          sell_price?: number
          stock?: number
          bought_count?: number
          sold_count?: number
          created_by?: string | null
          image?: string | null
          created_at?: string
        }
      }
      money_table: {
        Row: {
          id: string
          user_id: string
          deposit: number
          withdraw: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          deposit?: number
          withdraw?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          deposit?: number
          withdraw?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_stock: {
        Args: {
          p_item_id: string
          p_quantity: number
        }
        Returns: void
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
