'use client'

import React, { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  if (state.items.length === 0) {
    router.push('/cart')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // 在庫更新のAPIコール
      for (const item of state.items) {
        await fetch(`/api/products/${item.product.id}/stock`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: item.quantity }),
        })
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">決済</h1>
          <p className="text-lg text-gray-600">注文内容を確認し、決済方法を選択してください</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 注文内容確認 */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">注文内容</h2>
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.product.image_url ? (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-gray-400 text-sm">
                            {item.product.category === 'food' ? '🍱' : '🥤'}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-500">数量: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">¥{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>合計</span>
                  <span>¥{state.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 決済フォーム */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">決済情報</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* お客様情報 */}
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                    お名前 *
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス *
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                {/* 決済方法選択 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    決済方法 *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card')}
                        className="mr-2"
                      />
                      <span>現金支払い</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card')}
                        className="mr-2"
                      />
                      <span>クレジットカード</span>
                    </label>
                  </div>
                </div>

                {/* 注意事項 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">注意事項</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>研究室の在庫から商品が提供されます</li>
                          <li>決済完了後、商品は研究室で受け取りください</li>
                          <li>返品・交換はできません</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 決済ボタン */}
                <button
                  type="submit"
                  disabled={isProcessing || !userName || !userEmail}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    isProcessing || !userName || !userEmail
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                  }`}
                >
                  {isProcessing ? '処理中...' : `¥${state.total} で決済する`}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="text-center mt-8">
          <Link
            href="/cart"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            カートに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
