# microcms-webhook-lint-integration

## 必要なもの

- Bun
  - Node.js といったランタイム環境でも良いですが、本プロジェクトでは TypeScript のコードを扱う都合上、Bun だと実行が簡単なのでおすすめです。
  - バージョンは `.tool-versions` を参照してください。
- microCMS 記事を管理するサービス
- GitHub アカウント

## 準備

1. リポジトリをクローン
2. `bun install`
3. ご自身のリポジトリにて、GitHub Actions で利用する変数を設定
   - Repository secrets
     - `APP_ID` ※1
     - `APP_PRIVATE_KEY` ※1
   - Repository variables
     - `MICROCMS_API_KEY` ※2
     - `MICROCMS_SERVICE_DOMAIN`

※1: 自身で作成した GitHub App の値を入れてください。 https://docs.github.com/ja/apps/using-github-apps/about-using-github-apps

※2: 下書きを取得できる権限が設定された API キーを入れてください。

> [!CAUTION]
> 自身でリポジトリを作られる際は、プライベートリポジトリで作成してください。

### ローカルでコードの実行確認をしたい場合

`.env` ファイル、または `.env.local` ファイルを作成し、環境変数に値を入力してください。
入力内容は、microCMS のサービス管理画面で確認できます。

```bash
cp .env.example .env.local

# 値を入力して保存
vi .env.local
```

## リポジトリの概要

### `main.ts`

エントリーポイントとなるコードです。実行方法は次のようになります。

```bash
bun run main.ts <api> <content-id> <draft-key>
```

### `.textlintrc.json`

`textlint` のルール等を設定するファイルです。

### `reviews` ディレクトリ

GitHub Actions で生成するファイルを格納するディレクトリです。
基本的に、手作業でファイルを入れることはありません。

### `modules` ディレクトリ

microCMS のサービスからデータを取得するコードなどが格納されています。

Workspaces 機能を用いて、モジュール単位で依存ライブラリやコードを管理しています。

ご自身が作成した microCMS の任意のサービスに合ったデータスキーマを扱いたい場合は、 `modules/microcms` 配下のコードを編集してください。

[prh](https://github.com/prh/prh) (_proofreading-helper_) のルールをカスタマイズしたい場合は、 `modules/linter/prh-dict` 配下にある YAML ファイルを編集してください。

### `.github/workflows/open-pr-draft-content.yml`

microCMS から Webhook を受けて、コンテンツの校正対象のフィールドの内容を `reviews` ディレクトリに保存し、プルリクエストを自動生成するワークフローです。

プルリクエストのタイトルやブランチ名をカスタマイズしたい場合は、このファイルを編集してください。

### `.github/workflows/review-draft-content.yml`

プルリクエストが自動生成された時をトリガーに、そのプルリクエストに含むファイルについて `textlint` でチェックし、指摘箇所をコメントしてくれるワークフローです。

[action-textlint](https://github.com/tsuyoshicho/action-textlint)を用いて、実現しています。
プルリクエスト中でコメントされている場合の例が、[action-textlint](https://github.com/tsuyoshicho/action-textlint)の `README.md` に載っていますので、参考までにご覧ください。
