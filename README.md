# xPay - 研究室の在庫管理システム

研究室内の食べ物や飲み物の在庫を管理し、簡単に購入できるWebアプリケーションです。

## 機能

- **在庫管理**: 研究室内の商品在庫をリアルタイムで管理
- **商品購入**: カート機能で商品を選択し、決済までスムーズに進められる
- **在庫状況**: 在庫の状況を視覚的に確認し、適切なタイミングで補充可能

## 技術スタック

- **フレームワーク**: Next.js 15.4.2（App Router）
- **フロントエンド**: React 19.1.0
- **スタイリング**: Tailwind CSS 4
- **データベース**: Supabase（認証・データ管理）
- **言語**: TypeScript
- **モック**: MSW（Mock Service Worker）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の内容を設定してください：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# その他の設定
NODE_ENV=development
```

### 3. Supabaseプロジェクトの設定

1. [Supabase](https://supabase.com/)でアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトのURLとanon keyを取得
4. 上記の環境変数に設定

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 使用方法

### 商品一覧ページ (`/products`)
- 研究室内で利用できる商品を閲覧
- カテゴリー別のフィルタリング
- 検索機能
- カートへの商品追加

### カートページ (`/cart`)
- 選択した商品の確認
- 数量の調整
- 商品の削除
- 決済への進出

### 決済ページ (`/checkout`)
- 注文内容の確認
- お客様情報の入力
- 決済方法の選択
- 決済の実行

### 在庫管理ページ (`/inventory`)
- 商品の追加・編集
- 在庫状況の確認
- 在庫サマリーの表示

## 開発

### ディレクトリ構造

```
src/
├── app/                 # Next.js App Router
│   ├── products/       # 商品一覧ページ
│   ├── cart/          # カートページ
│   ├── checkout/      # 決済ページ
│   └── inventory/     # 在庫管理ページ
├── components/         # 再利用可能なコンポーネント
├── contexts/          # Reactコンテキスト
├── lib/               # ユーティリティとライブラリ
└── mocks/             # MSWモック設定
```

### モックデータ

開発環境では、MSWを使用してモックAPIを提供しています。本番環境では、実際のSupabase APIを使用します。

### ビルド

```bash
npm run build
```

### 本番環境での実行

```bash
npm start
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 貢献

プルリクエストやイシューの報告を歓迎します。
