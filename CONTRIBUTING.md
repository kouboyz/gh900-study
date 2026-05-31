# Contributing Guide

GH-900 GitHub Foundations Trainer への貢献に興味を持っていただきありがとうございます。  
このガイドでは、**問題データの追加・修正** と **アプリ本体の改善** に関するルールを説明します。

## 問題データの追加・修正

### 基本方針

- 実際の試験問題の転載は行いません。GitHub 公式ドキュメントおよび Microsoft Learn Study Guide に基づくオリジナル問題のみを収録します。
- 各問題には必ず公式参照 URL を付与します。
- 参照 URL は GitHub Docs（`docs.github.com/ja`）または Microsoft Learn（`learn.microsoft.com/ja-jp`）の日本語ページを優先します。

### 問題データの形式

`src/data/questions/d{1-7}.json` の該当ドメインのファイルに追記します。スキーマは `docs/schema/question.schema.json` で定義されています。追加後は `npm run validate` でエラーがないことを確認してください。

```json
{
  "id": "D3-004",
  "domainId": "D3",
  "questionType": "single-choice",
  "difficulty": "basic",
  "question": "問題文",
  "choices": [
    { "id": "A", "text": "選択肢A" },
    { "id": "B", "text": "選択肢B" },
    { "id": "C", "text": "選択肢C" },
    { "id": "D", "text": "選択肢D" }
  ],
  "correctChoiceIds": ["A"],
  "explanation": "解説文",
  "references": [
    {
      "title": "ページタイトル（日本語版があれば日本語）",
      "url": "https://docs.github.com/ja/...",
      "source": "GitHub Docs",
      "checkedAt": "YYYY-MM-DD"
    }
  ],
  "tags": ["タグ"],
  "updatedAt": "YYYY-MM-DD"
}
```

### 問題品質チェックリスト

PR を出す前に以下を確認してください。

**問題文**
- [ ] 問いが一つに絞られている（複数のことを同時に問わない）
- [ ] 「最も適切なものはどれですか？」など、何を選ぶべきかが明確
- [ ] 試験で問われる概念・機能の理解を測る内容になっている

**選択肢**
- [ ] 4 つの選択肢がある
- [ ] 正解は 1 つ（`correctChoiceIds` に 1 件のみ）
- [ ] 不正解の選択肢が紛らわしすぎず、かつ明確に誤りであることが説明できる

**解説**
- [ ] 正解の理由を説明している
- [ ] 公式ドキュメントの内容と矛盾していない
- [ ] 「D7廃止に伴い〜」など、過去の経緯に言及した記述が含まれていない

**参照 URL**
- [ ] リンク先が 404 や Whoops になっていない（ブラウザで実際に確認）
- [ ] 日本語版 URL（`/ja/`）が存在する場合は日本語版を使用している
- [ ] `checkedAt` に確認した日付が入っている

**バリデーション**
- [ ] `npm run validate` がエラーなく通ること

### ドメイン構成（2026年1月改定版）

参照: [試験 GH-900 の学習ガイド](https://learn.microsoft.com/ja-jp/credentials/certifications/resources/study-guides/gh-900)

| ID | ドメイン | 比率 |
|---|---|---:|
| D1 | Git と GitHub の基本を理解する | 25–30% |
| D2 | GitHub リポジトリを操作する | 10–15% |
| D3 | GitHub を使用した共同作業 | 10–15% |
| D4 | 最新の開発プラクティスを適用する | 10–15% |
| D5 | GitHub を使用してプロジェクトを管理する | 5–10% |
| D6 | プライバシー、セキュリティ、管理について理解する | 10–15% |
| D7 | GitHub コミュニティを探索する | 5–10% |

## アプリ本体の改善

### 開発環境のセットアップ

```bash
npm install
npm run dev
```

`http://localhost:5173/gh900/` でアクセスできます。

### PR を出す前に

- [ ] `npm run build` がエラーなく通ること
- [ ] 追加・変更した機能を実際にブラウザで動作確認していること
- [ ] 既存の画面（ホーム・クイズ・結果）が壊れていないこと

## 問題の誤りを報告する

問題の内容・解説・参照 URL に誤りを見つけた場合は、GitHub Issues でご報告ください。  
報告の際は以下を含めていただけると対応しやすくなります。

- 問題 ID（例: `D3-001`）
- 誤りの内容
- 正しいと思われる内容と根拠（公式ドキュメントの URL など）
