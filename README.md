# Cook-Sync

## 📌 概要

料理のレシピを登録しつつ、




---

## 🧱 技術スタック（Tech Stack）

- **フロントエンド**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **状態管理**: useState / useContext
- **UI ライブラリ**: Radix UI
- **バリデーション**: Zod
- **バックエンド**: API Routes (Next.js), Node.js
- **データベース**: MySQL (Docker), Drizzle ORM

---

## 🛠 実装機能と今後の予定（Features & Roadmap）

> 🗓 **開発開始日：2025年7月14日**

### ✅ 実装済み機能

- 料理の登録・編集・削除
- 材料の登録と分量設定（料理と連携）
- 手順（ステップ）の登録・並び替え
- お気に入りフラグの設定
- モーダルUIでフォーム管理
- バリデーション（Zod）でのデータチェック

### 🚧 今後実装したい機能

- 画像アップロード機能
- モバイル対応（レスポンシブ対応）
- ユーザー認証とログイン状態の管理
- 材料・単位のマスターデータの管理画面

---

## 🔍 学習ログと課題（Challenges & Learnings）

### 🌱 苦労した点と解決策

- **`$returningId()` の使用**
  - Drizzle ORM の MySQL 対応方法が公式と異なり、型エラーに苦戦
  - `$returningId()` を使って `insert` の戻り値を明示的に取得して解決

- **TypeScript の条件型による props の制御**
  - `isEditMode: true/false` によって props の型定義を分岐
  - 型推論の限界を理解し、構造の整理に時間を使った

- **Zod の safeParse**
  - POST時とPUT時で `dishId` の有無が異なる → スキーマを分けて対応

### 📚 学んだこと

- バリデーションの段階でのエラー分岐の重要性
- トランザクションによるデータ整合性確保の流れ
- useRef, モーダルスクロール管理、再レンダリング制御 など

---

## ✅ 今後追加予定（Nice to Have）

- モーダルの多重表示・閉じる順番の制御
- リファクタリングとパフォーマンス最適化
- README の多言語対応（英語 / 日本語）

---

## 📂 ディレクトリ構成（任意）

```bash
├── app/
│   ├── dishes/
│   └── api/
├── components/
│   └── modal/
├── context/
├── db/
├── schemas/
├── types/
└── utils/
