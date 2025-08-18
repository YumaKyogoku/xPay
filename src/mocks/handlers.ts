import { http, HttpResponse } from 'msw'
import { Product } from '@/lib/supabase'

// モックデータ
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'コーヒー',
    description: '研究室用の美味しいコーヒー',
    price: 150,
    stock: 20,
    category: 'drink',
    image_url: '/images/coffee.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'おにぎり',
    description: '具材たっぷりのおにぎり',
    price: 200,
    stock: 15,
    category: 'food',
    image_url: '/images/onigiri.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'お茶',
    description: 'リフレッシュできる緑茶',
    price: 100,
    stock: 30,
    category: 'drink',
    image_url: '/images/tea.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'サンドイッチ',
    description: '具材たっぷりのサンドイッチ',
    price: 300,
    stock: 10,
    category: 'food',
    image_url: '/images/sandwich.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const handlers = [
  // 商品一覧を取得
  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts)
  }),

  // 商品詳細を取得
  http.get('/api/products/:id', ({ params }) => {
    const product = mockProducts.find(p => p.id === params.id)
    if (!product) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(product)
  }),

  // 在庫を更新
  http.patch('/api/products/:id/stock', async ({ params, request }) => {
    const { quantity } = await request.json()
    const product = mockProducts.find(p => p.id === params.id)
    if (!product) {
      return new HttpResponse(null, { status: 404 })
    }
    product.stock = Math.max(0, product.stock - quantity)
    return HttpResponse.json(product)
  }),
]
