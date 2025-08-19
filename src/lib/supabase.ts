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
  buy_price: number
  sell_price: number
  stock: number
  bought_count: number
  sold_count: number
  created_by?: string | null
  image: string | null
  created_at: string
}

export interface User {
  id: string
  name: string
  role: 'admin' | 'member'
  password: string
  email: string
  total_deposit: number
  total_withdraw: number
  balance: number
  created_at: string
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
