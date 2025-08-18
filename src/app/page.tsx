'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function HomePage() {
  const { state } = useCart()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              研究室の在庫管理を
              <br />
              簡単に
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              研究室内の食べ物や飲み物の在庫を管理し、簡単に購入できるWebアプリケーション
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                商品を見る
              </Link>
              <Link
                href="/inventory"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                在庫管理
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 機能紹介セクション */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">主な機能</h2>
            <p className="text-lg text-gray-600">研究室の在庫管理に必要な機能を提供します</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 在庫管理 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">在庫管理</h3>
              <p className="text-gray-600">
                研究室内の商品在庫をリアルタイムで管理し、在庫不足の商品を素早く把握できます
              </p>
            </div>

            {/* 商品購入 */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">簡単購入</h3>
              <p className="text-gray-600">
                カート機能で商品を選択し、決済までスムーズに進められます
              </p>
            </div>

            {/* 在庫状況 */}
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">在庫状況</h3>
              <p className="text-gray-600">
                在庫の状況を視覚的に確認し、適切なタイミングで補充できます
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* カート状況セクション */}
      {state.items.length > 0 && (
        <div className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">カートに商品があります</h2>
                <p className="text-gray-600">決済を完了して商品を受け取りましょう</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/cart"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  カートを確認 ({state.items.length}件)
                </Link>
                <Link
                  href="/checkout"
                  className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
                >
                  決済に進む
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 研究室について */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">研究室の在庫管理を効率化</h2>
              <p className="text-lg text-gray-600 mb-6">
                研究室内での食べ物や飲み物の在庫管理は、従来は手作業で行われていました。
                xPayを使用することで、在庫の状況をリアルタイムで把握し、
                適切なタイミングで補充することができます。
              </p>
              <p className="text-lg text-gray-600 mb-8">
                また、研究室メンバーが簡単に商品を購入できるため、
                在庫の回転率も向上し、より効率的な管理が可能になります。
              </p>
              <Link
                href="/inventory"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                在庫管理を始める
              </Link>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">研究室向け</h3>
                <p className="text-gray-600">
                  研究室内の利用に最適化されたシンプルで使いやすいインターフェース
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">x</span>
              </div>
              <span className="text-xl font-bold">xPay</span>
            </div>
            <p className="text-gray-400 mb-4">
              研究室内の在庫管理を簡単に
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                商品一覧
              </Link>
              <Link href="/inventory" className="text-gray-400 hover:text-white transition-colors">
                在庫管理
              </Link>
              <Link href="/cart" className="text-gray-400 hover:text-white transition-colors">
                カート
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
