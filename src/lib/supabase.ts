import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// データベースの型定義
export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: 'food' | 'drink'
  image_url?: string
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product_id: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'completed' | 'cancelled'
  items: CartItem[]
  created_at: string
}
