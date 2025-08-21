import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 環境変数のデバッグ出力
console.log('Supabase設定:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length
})

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase環境変数が設定されていません')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// データベースの型定義
export interface Product {
  id: string
  name: string
  description?: string | null
  buy_price: number
  sell_price: number
  stock: number
  bought_count: number
  sold_count: number
  category?: string | null
  image_url?: string | null
  created_by?: string | null
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'member'
  total_deposit: number
  total_withdraw: number
  balance: number
  created_by?: string | null
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
  payment_method?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  item_id: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: 'deposit' | 'withdraw' | 'purchase'
  amount: number
  description?: string | null
  related_order_id?: string | null
  created_at: string
}
