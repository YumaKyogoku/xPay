'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { supabase, User } from '@/lib/supabase'

export default function BalanceManagementPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [chargeAmount, setChargeAmount] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)

  // 管理者以外はアクセス不可
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">アクセス拒否</h1>
          <p className="text-gray-600">このページには管理者のみアクセスできます。</p>
        </div>
      </div>
    )
  }

  // ユーザー一覧を取得
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('ユーザー取得エラー:', error)
        alert('ユーザー情報の取得に失敗しました。')
        return
      }

      setUsers(data || [])
    } catch (error) {
      console.error('ユーザー取得エラー:', error)
      alert('ユーザー情報の取得に失敗しました。')
    } finally {
      setLoading(false)
    }
  }

  const handleCharge = async () => {
    if (!chargeAmount || !selectedUserId) {
      alert('チャージ金額とユーザーを選択してください。')
      return
    }

    const amount = parseFloat(chargeAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('有効な金額を入力してください。')
      return
    }

    setIsProcessing(true)

    try {
      // 選択されたユーザーの現在の情報を取得
      const selectedUser = users.find(u => u.id === selectedUserId)
      if (!selectedUser) {
        alert('ユーザー情報が見つかりません。')
        return
      }

      // ユーザーの残高とtotal_depositを更新
      const newBalance = (selectedUser.balance || 0) + amount
      const newTotalDeposit = (selectedUser.total_deposit || 0) + amount

      const { error: updateError } = await supabase
        .from('users')
        .update({
          balance: newBalance,
          total_deposit: newTotalDeposit
        })
        .eq('id', selectedUserId)

      if (updateError) {
        console.error('残高更新エラー:', updateError)
        alert('残高の更新に失敗しました。')
        return
      }

      // 取引履歴を作成
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: selectedUserId,
          type: 'deposit',
          amount: amount,
          description: `管理者によるチャージ: ¥${amount}`
        })

      if (transactionError) {
        console.error('取引履歴作成エラー:', transactionError)
        // 取引履歴の作成に失敗してもチャージは完了とする
      }

      alert(`チャージが完了しました。新しい残高: ¥${newBalance}`)
      
      // フォームをリセット
      setChargeAmount('')
      setSelectedUserId('')
      
      // ユーザー一覧を再取得
      fetchUsers()

    } catch (error) {
      console.error('チャージ処理エラー:', error)
      alert('チャージ処理に失敗しました。')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleWithdraw = async (userId: string, amount: number) => {
    if (amount <= 0) {
      alert('有効な金額を入力してください。')
      return
    }

    setIsProcessing(true)

    try {
      // 選択されたユーザーの現在の情報を取得
      const selectedUser = users.find(u => u.id === userId)
      if (!selectedUser) {
        alert('ユーザー情報が見つかりません。')
        return
      }

      if ((selectedUser.balance || 0) < amount) {
        alert('残高が不足しています。')
        return
      }

      // ユーザーの残高とtotal_withdrawを更新
      const newBalance = (selectedUser.balance || 0) - amount
      const newTotalWithdraw = (selectedUser.total_withdraw || 0) + amount

      const { error: updateError } = await supabase
        .from('users')
        .update({
          balance: newBalance,
          total_withdraw: newTotalWithdraw
        })
        .eq('id', userId)

      if (updateError) {
        console.error('残高更新エラー:', updateError)
        alert('残高の更新に失敗しました。')
        return
      }

      // 取引履歴を作成
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          type: 'withdraw',
          amount: amount,
          description: `管理者による引き出し: ¥${amount}`
        })

      if (transactionError) {
        console.error('取引履歴作成エラー:', transactionError)
        // 取引履歴の作成に失敗しても引き出しは完了とする
      }

      alert(`引き出しが完了しました。新しい残高: ¥${newBalance}`)
      
      // ユーザー一覧を再取得
      fetchUsers()

    } catch (error) {
      console.error('引き出し処理エラー:', error)
      alert('引き出し処理に失敗しました。')
    } finally {
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">残高管理</h1>
            <p className="mt-2 text-gray-600">全ユーザーの残高を管理できます</p>
          </div>

          {/* チャージフォーム */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">残高チャージ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700 mb-2">
                  ユーザー選択
                </label>
                <select
                  id="userSelect"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">ユーザーを選択</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="chargeAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  チャージ金額
                </label>
                <input
                  type="number"
                  id="chargeAmount"
                  value={chargeAmount}
                  onChange={(e) => setChargeAmount(e.target.value)}
                  placeholder="1000"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleCharge}
                  disabled={isProcessing || !selectedUserId || !chargeAmount}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? '処理中...' : 'チャージ実行'}
                </button>
              </div>
            </div>
          </div>

          {/* ユーザー一覧 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">ユーザー一覧</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ユーザー
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      現在の残高
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      総入金額
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      総出金額
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((userItem) => (
                    <tr key={userItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{userItem.name}</div>
                          <div className="text-sm text-gray-500">{userItem.email}</div>
                          <div className="text-xs text-gray-400">
                            {userItem.role === 'admin' ? '管理者' : 'メンバー'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-lg font-semibold ${
                          (userItem.balance || 0) > 1000 ? 'text-green-600' : 
                          (userItem.balance || 0) > 100 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          ¥{userItem.balance || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{userItem.total_deposit || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{userItem.total_withdraw || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            const amount = prompt(`${userItem.name}の残高から引き出す金額を入力してください:`, '100')
                            if (amount && !isNaN(parseFloat(amount))) {
                              handleWithdraw(userItem.id, parseFloat(amount))
                            }
                          }}
                          disabled={isProcessing}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          引き出し
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
