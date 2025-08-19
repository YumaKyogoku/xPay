'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { supabase, Product } from '@/lib/supabase'

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  if (state.items.length === 0) {
    router.push('/cart')
    return null
  }

  const total = state.items.reduce((sum, item) => sum + (item.product.sell_price * item.quantity), 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // 在庫更新のAPIコールをSupabase RPCに置き換え
      for (const item of state.items) {
        const { error } = await supabase.rpc('decrement_stock', {
          p_item_id: item.product.id,
          p_quantity: item.quantity,
        })
        if (error) {
          console.error(`在庫更新に失敗しました (商品ID: ${item.product.id}):`, error)
          // エラーが発生しても処理を続行するか、ここで中断するかは要件による
          // 今回は続行し、最終的に決済完了ページへ遷移させる
        }
      }

      // 注文完了処理
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CART' })
        router.push('/checkout/success')
      }, 2000)
    } catch (error) {
      console.error('決済処理に失敗しました:', error)
      setIsProcessing(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">チェックアウト</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 注文サマリー */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">注文サマリー</h2>
              
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 py-3 border-b border-gray-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-gray-400 text-sm">
                        📦
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">数量: {item.quantity}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">¥{item.product.sell_price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">合計:</span>
                  <span className="text-2xl font-bold text-blue-600">¥{total}</span>
                </div>
              </div>
            </div>

            {/* 決済フォーム */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">決済情報</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    カード番号
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                      有効期限
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    カード名義人
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="TARO YAMADA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isProcessing ? '処理中...' : `¥${total} で決済する`}
                </button>
              </form>
              
              {isProcessing && (
                <div className="mt-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">決済処理中です...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
