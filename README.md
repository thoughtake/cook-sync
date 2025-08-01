# Cook-Sync

## 概要

食材の在庫管理とオリジナルレシピの登録ができる Web アプリケーションです。
在庫情報をもとに、献立を考えることができます。



## 技術スタック

- **フロントエンド**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS, clsx, SWR
- **UI ライブラリ**: Radix UI
- **バリデーション**: Zod
- **バックエンド**: API Routes (Next.js), Node.js
- **データベース**: MySQL (Docker), Drizzle ORM





## 実装済みの機能と未実装の機能

### 実装済みの機能

#### 材料ページ（/ingredients）

- **材料のリスト表示**
  - `SWR`を使って API から材料データを取得し、取得したデータを`map()` で一覧表示しています。
  - API 側では`Drizzle ORM`を使って`MySQL`のテーブル`ingredients`からデータを取得しています。
  - 材料のグループ（例：`野菜`）、グループの色（例：`#388E3C`）、材料の単位（例：`g`）もそれぞれテーブル`ingredient_groups`/`ingredient_group_colors`/`units`で管理しています。

- **材料の新規登録**
  - 新規登録画面と編集画面は、同じフォームコンポーネントで管理しています。
  - `isEditMode: boolean` を `useState` で管理し、その値によって新規登録か編集かを判定しています。
  - `form` 要素の各値は `useState` で管理しています。
  - `onSubmit` 時に、それらの値を API エンドポイントへ `POST` リクエストとして送信します。
  - API 側では `Zod` を用いてデータのバリデーションを行い、`Drizzle ORM` を使って `MySQL` のテーブル`ingredients`に `insert` しています。

- **既存の材料の編集**
  - `onSubmit` 時に、`useState` で管理している各値を API エンドポイントへ `PUT` リクエストとして送信します。
  - API 側では `Zod` を用いてデータのバリデーションを行い、`Drizzle ORM` を使って `MySQL` のテーブル`ingredients`を `update` しています。


- **既存の材料の削除**
  - 削除ボタンの `onClick` 時に、確認用モーダルを表示し、「OK」が押された場合のみ API エンドポイントへ `DELETE` リクエストを送信します。
  - API 側では `Drizzle ORM` を使用して、`MySQL` のテーブル`ingredients`から該当レコードを `delete` します。

#### 料理ページ（/dishes）
- **料理のリスト表示**
  - `SWR`を使って API から料理データを取得し、取得したデータを`map()` で一覧表示しています。
  - API 側では`Drizzle ORM`を使って`MySQL`のテーブル`dishes`からデータを取得しています。

- **料理の新規登録**
  - 新規登録画面と編集画面は、同じフォームコンポーネントで管理しています。
  - `isEditMode: boolean` を `useState` で管理し、その値によって新規登録か編集かを判定しています。
  - `form` 要素の各値は `useState` で管理しています。
  - `onSubmit` 時に、それらの値を API エンドポイントへ `POST` リクエストとして送信します。
  - API 側では `Zod` を用いてデータのバリデーションを行い、`Drizzle ORM` を使って `MySQL` のテーブル`dishes`に `insert` しています。

- **既存の料理の編集**
  - `onSubmit` 時に、`useState` で管理している各値を API エンドポイントへ `PUT` リクエストとして送信します。
  - API 側では `Zod` を用いてデータのバリデーションを行い、`Drizzle ORM` を使って `MySQL` のテーブル`dishes`を `update` しています。


- **料理材料の登録**
    - 料理登録時に必要な材料情報は、材料ページであらかじめ登録されたデータをもとに取得します。  
    - `SWR` を使って API から材料データを取得し、それを `map()` で整形して `select` 要素の `option` に渡しています。  
    - 登録された料理材料は、`dish_ingredients` テーブルで管理されます。  
    - 処理は料理の登録と同じ API エンドポイントで行われます。  
    - API 側では `Zod` を用いてデータのバリデーションを実施し、`Drizzle ORM` を使って `MySQL` の `dishes` テーブルに `insert`（編集時は `delete` および `insert`）しています。  
    - データの不整合を防ぐため、`dishes` / `dish_ingredients` / `dish_recipes` の3テーブルを `transaction` によって同時に処理しています。

- **料理手順の登録**
    - 登録された料理手順は、`dish_recipes` テーブルで管理されます。  
    - 処理は料理の登録と同じ API エンドポイントで行われます。  
    - API 側では `Zod` を用いてデータのバリデーションを実施し、`Drizzle ORM` を使って `MySQL` の `dish_recipes` テーブルに `insert`（編集時は `delete` および `insert`）しています。  
    - データの不整合を防ぐため、`dishes` / `dish_ingredients` / `dish_recipes` の3テーブルを `transaction` によって同時に処理しています。
  

- **既存の料理の削除**
  - 削除ボタンの `onClick` 時に、確認用モーダルを表示し、「OK」が押された場合のみ API エンドポイントへ `DELETE` リクエストを送信します。
  - API 側では `Drizzle ORM` を使用して、`MySQL` のテーブル`dishes`から該当レコードを `delete` します。




### データベース
- Drizzle ORMを使用したDB接続（ローカルDB）
- 料理用・材料用テーブルの実装

### UI
- モーダルコンポーネントの実装
- formの各要素をコンポーネント化（input, textarea, select）




### 未実装の機能
#### 料理ページ（/dishes）
- 画像アップロード（jpeg, png対応）機能
- 検索・ソート機能
- 他ユーザーの料理を登録できる機能

### 材料ページ（/ingredients）
- 検索・ソート機能
- 材料の登録項目の精査
- 料理に使っている材料は削除できないよう設定

### 在庫ページ（/pantry）
- 在庫の新規登録
- 既存の在庫の編集・削除
- 在庫の一括登録・削除
- 検索・ソート機能

### 献立ページ（/plan）
- 献立の新規登録
- 既存の献立の編集・削除
- 献立に対応した在庫の不足分の表示
- 買い物リストの作成
- 日付ごとに献立を登録できる機能
- カレンダーの表示

### ホーム（/）
- 買い物リストの表示
- 献立の表示

### UI
- モバイル対応（レスポンシブ対応）
- ユーザー認証とログイン状態の管理

---

## 🔍 学習ログと課題

### 苦労した点と解決策

- **`$returningId()` の使用**

  - Drizzle ORM の MySQL 対応方法が公式と異なり、型エラーに苦戦
  - `$returningId()` を使って `insert` の戻り値を明示的に取得して解決

- **TypeScript の条件型による props の制御**

  - `isEditMode: true/false` によって props の型定義を分岐
  - 型推論の限界を理解し、構造の整理に時間を使った

- **Zod の safeParse**
  - POST 時と PUT 時で `dishId` の有無が異なる → スキーマを分けて対応

### 📚 学んだこと

- バリデーションの段階でのエラー分岐の重要性
- トランザクションによるデータ整合性確保の流れ
- useRef, モーダルスクロール管理、再レンダリング制御 など


## テーブル構成

### `ingredients` テーブル（材料）

| カラム名            | 型        | 必須 | 説明                                |
|---------------------|-----------|------|-------------------------------------|
| `id`                | int       | ✅   | 主キー、自動採番                     |
| `name`              | varchar   | ✅   | 材料名                               |
| `ingredientGroupId` | int       | ✅   | `ingredient_groups.id` への外部キー |
| `unitId`            | int       | ✅   | `units.id` への外部キー              |
| `pricePerUnit`      | int       | ✅   | 単価（1単位あたりの価格）           |



### `units` テーブル（単位）

| カラム名         | 型      | 必須 | 説明                        |
|------------------|---------|------|-----------------------------|
| `id`             | int     | ✅   | 主キー、自動採番             |
| `name`           | varchar | ✅   | 単位名（g、ml、本 など）     |
| `amountPerUnit`  | int     | ✅   | 単位あたりの数量             |

---

### `ingredient_groups` テーブル（材料グループ）

| カラム名 | 型      | 必須 | 説明                    |
|----------|---------|------|-------------------------|
| `id`     | int     | ✅   | 主キー、自動採番         |
| `name`   | varchar | ✅   | グループ名（例：野菜など） |



### `ingredient_group_colors` テーブル（グループの色設定）

| カラム名            | 型      | 必須 | 説明                                 |
|---------------------|---------|------|--------------------------------------|
| `id`                | int     | ✅   | 主キー、自動採番                      |
| `ingredientGroupId` | int     | ✅   | `ingredient_groups.id` への外部キー  |
| `bgColorCode`       | varchar | ✅   | 背景色コード（例: `#FFFFFF`）         |
| `textColorCode`     | varchar | ✅   | テキスト色コード（例: `#000000`）     |



### `dishes` テーブル（料理）

| カラム名      | 型      | 必須 | 説明                                |
|---------------|---------|------|-------------------------------------|
| `id`          | int     | ✅   | 主キー、自動採番                     |
| `name`        | varchar | ✅   | 料理名                               |
| `timeMinutes` | int     | ✅   | 調理時間（分）                       |
| `servings`    | int     | ✅   | 何人分か                             |
| `isFavorite`  | boolean | ✅   | お気に入りフラグ（デフォルト false） |
| `imageUrl`    | varchar |      | 料理画像のURL（任意）                |

---

### `dish_ingredients` テーブル（料理に含まれる材料）

| カラム名       | 型      | 必須 | 説明                                  |
|----------------|---------|------|---------------------------------------|
| `id`           | int     | ✅   | 主キー、自動採番                       |
| `dishId`       | int     | ✅   | `dishes.id` への外部キー（削除時連鎖） |
| `ingredientId` | int     | ✅   | `ingredients.id` への外部キー         |
| `quantity`     | decimal | ✅   | 使用量（例：100.00）                  |



### `dish_recipes` テーブル（料理の手順）

| カラム名      | 型      | 必須 | 説明                                  |
|---------------|---------|------|---------------------------------------|
| `id`          | int     | ✅   | 主キー、自動採番                       |
| `dishId`      | int     | ✅   | `dishes.id` への外部キー（削除時連鎖） |
| `stepNumber`  | int     | ✅   | 手順番号                               |
| `description` | varchar | ✅   | 手順の説明                             |


