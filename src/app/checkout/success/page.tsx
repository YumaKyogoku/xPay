'use client'

import React from 'react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* 成功アイコン */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* 成功メッセージ */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">決済が完了しました！</h1>
          <p className="text-gray-600 mb-6">
            ご注文ありがとうございます。商品は研究室で受け取りください。
          </p>

          {/* 注文詳細 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-sm font-medium text-gray-900 mb-2">注文番号</h2>
            <p className="text-lg font-mono text-gray-700">
              {new Date().getTime().toString().slice(-8)}
            </p>
          </div>

          {/* 注意事項 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-blue-900 mb-2">受け取りについて</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 商品は研究室の指定場所で受け取ってください</li>
              <li>• 受け取り時にお支払いをお願いします</li>
              <li>• 商品の品質に問題がある場合は研究室スタッフまで</li>
            </ul>
          </div>

          {/* アクションボタン */}
          <div className="space-y-3">
            <Link
              href="/products"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors block"
            >
              他の商品を見る
            </Link>
            <Link
              href="/"
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors block"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
