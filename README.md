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

- **料理の入力項目：材料**

  - 料理登録時に必要な材料情報は、[材料ページ](#材料ページingredients)であらかじめ登録されたデータをもとに取得します。
  - `SWR` を使って API から材料データを取得し、それを `map()` で整形して `select` 要素の `option` に渡しています。
  - 登録された料理材料は、`dish_ingredients` テーブルで管理されます。
  - 処理は料理と同じ API エンドポイントで行われます。
  - API 側では `Zod` を用いてデータのバリデーションを実施し、`Drizzle ORM` を使って `MySQL` の `dishes` テーブルに `insert`（編集時は `delete` および `insert`）しています。
  - データの不整合を防ぐため、`dishes` / `dish_ingredients` / `dish_recipes` の 3 テーブルを `transaction` によって同時に処理しています。

- **料理の入力項目：手順**

  - 登録された料理手順は、`dish_recipes` テーブルで管理されます。
  - 処理は料理と同じ API エンドポイントで行われます。
  - API 側では `Zod` を用いてデータのバリデーションを実施し、`Drizzle ORM` を使って `MySQL` の `dish_recipes` テーブルに `insert`（編集時は `delete` および `insert`）しています。
  - データの不整合を防ぐため、`dishes` / `dish_ingredients` / `dish_recipes` の 3 テーブルを `transaction` によって同時に処理しています。

- **既存の料理の削除**
  - 削除ボタンの `onClick` 時に、確認用モーダルを表示し、「OK」が押された場合のみ API エンドポイントへ `DELETE` リクエストを送信します。
  - API 側では `Drizzle ORM` を使用して、`MySQL` のテーブル`dishes`から該当レコードを `delete` します。

#### データベース

- **Drizzle ORM を使用したテーブル定義・接続（ローカル DB）**
  - `Docker` で作成した `MySQL` に対し、テーブル定義および接続処理を `Drizzle ORM` を使って実装しています。
- **料理・材料用テーブルの作成**
  - 作成済みのテーブルは[テーブル構成](#テーブル構成)を参照ください。

#### UI

- **モーダルコンポーネントの実装**

  - `ModalContext` を `context` で作成し、どのコンポーネントからでもモーダルを開閉できるようにしました。

- **form の各要素をコンポーネント化（input、textarea、select）**
  - よく使う form 要素をコンポーネント化し、再利用できるようにしました。
  - `select` には `Radix UI` を使用し、オプション表示時の見た目をカスタマイズするとともに、セレクト内でのオプション検索機能を実装しました。

### 未実装の機能

#### 材料ページ（/ingredients）

- 検索・ソート機能
- 材料の登録項目の精査
- 料理に使っている材料は削除できないよう設定

#### 料理ページ（/dishes）

- 画像アップロード（jpeg, png 対応）機能
- 検索・ソート機能
- 他ユーザーの料理を自分用に登録できる機能

#### 在庫ページ（/pantry）

- 在庫の新規登録
- 既存の在庫の編集・削除
- 在庫の一括登録・削除
- 検索・ソート機能

#### 献立ページ（/plan）

- 献立の新規登録
- 既存の献立の編集・削除
- 献立に対応した在庫の不足分の表示
- 買い物リストの作成
- 日付ごとに献立を登録できる機能
- カレンダーの表示

#### ホーム（/）

- 買い物リストの表示
- 献立の表示

#### データベース

- 在庫ページ、献立ページに必要なテーブルの新規追加
- 既存のテーブルにユーザー情報カラムを追加

#### UI

- ユーザー認証とログイン状態の管理
- モバイル対応（レスポンシブ対応）

#### その他

- アプリのデプロイ
- 本番環境での動作確認

## 相談・協力を得た箇所

### 有識者に相談・協力を得た箇所

#### 技術設計

- **使用ライブラリの提案・確認**
  - 実装内容をレビューしてもらった際、ライブラリの使用が推奨される箇所について指摘を受けました（例：`clsx`、`SWR`）。
  - ライブラリ使用にあたっては、機能面・保守面の観点から適切かどうかの意見をもらいました（例：`Radix UI`、`Zod`）。

#### 実装補助

- **知識面でのサポート**
  - Next.js の開発経験がなかったため、ページ遷移や API ルート機能の実装方法について助言をもらいました。
- React の Hooks や TypeScript の型定義について、理解が不十分だった点を中心に説明を受けました。

- **エラー発生時の調査**

  - エラーが発生した際に、原因の特定や解決方法を一緒に調査してもらうことがありました。

- **レビュー**
  - GitHub のプルリクエストにおいてレビューを受け、以下の点についてフィードバックをもらいました。
    - `package.json` の `dependencies` の `exactVersion` 指定
    - `tsx` を用いた `seed.ts` の実行方法
    - エンドポイントでの `Response` オブジェクト設計
    - `clsx` や `SWR` の適切な使用
    - コンポーネントにおける `variant` の活用
    - `onChange` イベントの型定義

### AI を活用した箇所

#### 技術設計

- **モーダル機能の実装**
  - `context` を利用した効率的なモーダルの実装方法に悩んだため、AI に相談し、モーダルの制御を Hooks で行う設計を提案してもらいました。

#### 実装補助

- **バックエンドの実装**

  - フロントエンドの実装を優先していたため、バックエンド側は AI によって雛形を生成してもらいました。以下のような要素を含みます：
    - `route.ts` など、`drizzle` を用いたエンドポイント実装
    - `Zod` によるスキーマ設計とバリデーション
    - `SWR` を使ったデータ取得用 Hooks の設計

- **各ライブラリの使用方法の調査**

  - ライブラリごとの用途や構文について、目的に応じた実装例を交えて説明を受けました。

- **UI の提案**

  - `select` コンポーネントに検索ボックスを設ける UI 改善案を提案してもらいました。
  - `Tailwind CSS` による視覚的な調整方法（幅・padding・レスポンシブ対応など）についてもアドバイスを受けました。

- **命名補助**

  - 関数名、ファイル名、フォルダ名、テーブル名などについて、意味や構造に合った命名案を提案してもらいました。

- **エラー発生箇所の調査**

  - 実装時に発生したエラーの原因について相談し、構文ミスや型の不一致を特定してもらいました。

- **seed データの作成**
  - テーブル構成に基づいて、開発用の仮データ（seed）を適切な形式で作成してもらいました。

## 開発中に発生した主なエラーと対処法

### `Radix UI`の`<Select>`について

`Radix UI` の `<Select>` を使用し、`value` を `props` で制御していたにもかかわらず、`value` が空文字のまま変更されないという事象が発生しました。

```ts
//エラー時のコード
<Select.Root
  value={value}
  onValueChange={(val) => {
    onChange(Number(val));
  }}
>
//...省略...
```
**原因の調査**

`console.log` で挙動を調べたところ、
レンダリング時に `props` の値が渡され`value`はいちど変更されるのですが、 その直後に`onValueChange` が呼ばれ、それによって `value` が空文字にされていることが確認できました。

同様の現象は Radix UI の GitHub Issue にも報告されており、
`<Select>` をフォーム内で使用した際、`value` を変更した直後に `onValueChange` が空文字で発火する問題として共有されていました。

🔗 https://github.com/radix-ui/primitives/issues/3135

**解決方法**

この問題については、渡された値が空文字かどうかを判定して処理をスキップすることで回避できるとされています。
完全な根本解決ではないようですが、今回はその方法を採用し、以下のようにして対応しました。

```ts
<Select.Root
  value={value}
  onValueChange={(val) => {
    if (val === "") return;
    onChange(Number(val));
  }}
>
//...省略...
```

---

### SWR の Suspense について

SWR を利用し、Hooks でデータ取得を行っていたところ、以下のようなエラーが発生しました。

```ts
//use-dishes.ts
const useDishes = () => {
  const { data, mutate } = useSWR<Dish[]>("api/dishes", fetcher, {
    suspense: true,
  });

//...省略...
```

発生したエラー

```
on-recoverable-error.js:28 Uncaught Error: Switched to client rendering because the server rendering errored:

Fallback data is required when using Suspense in SSR.
    at useSWRHandler (webpack-internal:///…ex/index.mjs:602:19)

..省略...   
```

**原因の調査**

`SWR`の公式ドキュメントには以下のような記述があります：
>「（Next.js のプリレンダリングを含む）サーバーサイドで Suspense モードを使用する場合、fallbackData を介してデータを提供する必要がある。つまり、サスペンスを使用してサーバーサイドでデータを取得することはできず、クライアントサイドで完全にデータを取得する必要がある。」

🔗 https://swr.vercel.app/docs/suspense

**解決方法**

`fallbackData` を使う方法も検討しましたが、`<Suspense>` の `fallback` が動作しなくなるため別の方法を採用しました。

以下の記事を参考に、`Suspense` を含むコンポーネントを `SSR` させない対応を行うことで解決しました：

🔗 https://zenn.dev/key5n/articles/06cd789d30b98c

具体的には、`useEffect()` を用いて `isClient === true` になったタイミング（= クライアント側）でのみ `<Suspense>` を有効にするように実装しました。

```ts
//layout.tsx
"use client";

//...省略...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (

//...省略...

      <html>
        <body>
        {isClient && (
          <ModalProvider>
            <Header />
            <Container>{children}</Container>
            <Modal />
            <Footer />
          </ModalProvider>
        )}
      </body>
    </html>
  );
}
```



---

### エンドポイントの `params` の扱いについて

```ts
//エラー時のコード
export const PUT = async (
  req: Request,
  { params }: { params: {id: string } }
) => {
  try {
    const id = Number(params.id); //エラー発生

//...省略...
```

HTTP リクエストを送信する際、以下のエラーが発生していました。

```
「Error: Route "/api/ingredients/[id]" used params.id. params should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
```
**原因の調査**

公式ドキュメントを確認したところ、Next.js の App Router においては params が 非同期で解決される仕様であるにもかかわらず、同期的に扱おうとしたためにエラーが発生していたことがわかりました。

これは、私自身の「同期処理と非同期処理」の理解が浅かったことに起因していました。

**解決方法**

params を Promise<{ id: string }> として受け取り、await してからアクセスするように修正することで解決しました。

```ts
export const PUT = async (
  req: Request,
  { params }: { params: Promise<{id: string }> }
) => {
  try {
    const id = Number((await params).id);

//...省略...
```

---

### Radix UI の

## テーブル構成

### `ingredients` テーブル（材料）

| カラム名            | 型      | 必須 | 説明                                |
| ------------------- | ------- | ---- | ----------------------------------- |
| `id`                | int     | ✅   | 主キー、自動採番                    |
| `name`              | varchar | ✅   | 材料名                              |
| `ingredientGroupId` | int     | ✅   | `ingredient_groups.id` への外部キー |
| `unitId`            | int     | ✅   | `units.id` への外部キー             |
| `pricePerUnit`      | int     | ✅   | 単価（1 単位あたりの価格）          |

### `units` テーブル（単位）

| カラム名        | 型      | 必須 | 説明                     |
| --------------- | ------- | ---- | ------------------------ |
| `id`            | int     | ✅   | 主キー、自動採番         |
| `name`          | varchar | ✅   | 単位名（g、ml、本 など） |
| `amountPerUnit` | int     | ✅   | 単位あたりの数量         |

---

### `ingredient_groups` テーブル（材料グループ）

| カラム名 | 型      | 必須 | 説明                       |
| -------- | ------- | ---- | -------------------------- |
| `id`     | int     | ✅   | 主キー、自動採番           |
| `name`   | varchar | ✅   | グループ名（例：野菜など） |

### `ingredient_group_colors` テーブル（グループの色設定）

| カラム名            | 型      | 必須 | 説明                                |
| ------------------- | ------- | ---- | ----------------------------------- |
| `id`                | int     | ✅   | 主キー、自動採番                    |
| `ingredientGroupId` | int     | ✅   | `ingredient_groups.id` への外部キー |
| `bgColorCode`       | varchar | ✅   | 背景色コード（例: `#FFFFFF`）       |
| `textColorCode`     | varchar | ✅   | テキスト色コード（例: `#000000`）   |

### `dishes` テーブル（料理）

| カラム名      | 型      | 必須 | 説明                                 |
| ------------- | ------- | ---- | ------------------------------------ |
| `id`          | int     | ✅   | 主キー、自動採番                     |
| `name`        | varchar | ✅   | 料理名                               |
| `timeMinutes` | int     | ✅   | 調理時間（分）                       |
| `servings`    | int     | ✅   | 何人分か                             |
| `isFavorite`  | boolean | ✅   | お気に入りフラグ（デフォルト false） |
| `imageUrl`    | varchar |      | 料理画像の URL（任意）               |

---

### `dish_ingredients` テーブル（料理に含まれる材料）

| カラム名       | 型      | 必須 | 説明                                   |
| -------------- | ------- | ---- | -------------------------------------- |
| `id`           | int     | ✅   | 主キー、自動採番                       |
| `dishId`       | int     | ✅   | `dishes.id` への外部キー（削除時連鎖） |
| `ingredientId` | int     | ✅   | `ingredients.id` への外部キー          |
| `quantity`     | decimal | ✅   | 使用量（例：100.00）                   |

### `dish_recipes` テーブル（料理の手順）

| カラム名      | 型      | 必須 | 説明                                   |
| ------------- | ------- | ---- | -------------------------------------- |
| `id`          | int     | ✅   | 主キー、自動採番                       |
| `dishId`      | int     | ✅   | `dishes.id` への外部キー（削除時連鎖） |
| `stepNumber`  | int     | ✅   | 手順番号                               |
| `description` | varchar | ✅   | 手順の説明                             |
