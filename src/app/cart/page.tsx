'use client'

import React from 'react'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { state, dispatch } = useCart()

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: productId })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
    }
  }

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">カートが空です</h1>
          <p className="text-gray-600 mb-6">商品を追加してからカートをご確認ください</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            商品一覧を見る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ショッピングカート</h1>
          <p className="text-lg text-gray-600">カート内の商品を確認し、決済に進んでください</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* カート内商品一覧 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">カート内の商品 ({state.items.length}件)</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {state.items.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* 商品画像 */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.product.image_url ? (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-gray-400 text-2xl">
                            {item.product.category === 'food' ? '🍱' : '🥤'}
                          </div>
                        )}
                      </div>

                      {/* 商品情報 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.description}</p>
                        <p className="text-lg font-semibold text-blue-600 mt-1">¥{item.product.price}</p>
                      </div>

                      {/* 数量調整 */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* 小計 */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">¥{item.product.price * item.quantity}</p>
                      </div>

                      {/* 削除ボタン */}
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 注文サマリー */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">注文サマリー</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>商品数</span>
                  <span>{state.items.length}件</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>小計</span>
                  <span>¥{state.total}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>合計</span>
                    <span>¥{state.total}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors text-center block"
              >
                決済に進む
              </Link>

              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="w-full mt-3 bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
              >
                カートを空にする
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
