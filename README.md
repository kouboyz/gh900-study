# GH-900 GitHub Foundations Trainer

GH-900（GitHub Foundations）認定試験の学習Webアプリです。

**公開URL**: https://kouboyz.github.io/gh900-study/

## 機能

- **7ドメイン別演習** — 試験範囲に沿ったドメインごとの問題選択
- **4択クイズ** — 回答後に即時採点・解説・公式ドキュメントリンクを表示
- **復習モード** — 間違えた問題だけを再出題
- **進捗管理** — ドメイン別正答率・回答済み数をブラウザに保存（LocalStorage）

## 試験ドメイン構成（2026年1月改定版）

スタディガイド最終更新: 2026-02-19  
参照: https://learn.microsoft.com/ja-jp/credentials/certifications/resources/study-guides/gh-900

| ID | ドメイン | 比率 |
|---|---|---:|
| D1 | Git と GitHub の基本を理解する | 25–30% |
| D2 | GitHub リポジトリを操作する | 10–15% |
| D3 | GitHub を使用した共同作業 | 10–15% |
| D4 | 最新の開発プラクティスを適用する | 10–15% |
| D5 | GitHub を使用してプロジェクトを管理する | 5–10% |
| D6 | プライバシー、セキュリティ、管理について理解する | 10–15% |
| D7 | GitHub コミュニティを探索する | 5–10% |

> **注意**: 2026年1月の改定で、D7は「Benefits of the GitHub Community」から「GitHub コミュニティを探索する」に名称変更・スリム化されました。また GitHub Copilot（Agent Mode・マルチモデル対応）と EMU（Enterprise Managed Users）が出題範囲として強化されました。

## 技術スタック

| 領域 | 採用技術 |
|---|---|
| フロントエンド | React 19 + TypeScript 6 |
| ビルド | Vite 8 |
| スタイリング | Tailwind CSS 4 |
| データ保存 | LocalStorage |
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions |

## ローカル開発

```bash
npm install
npm run dev
```

`http://localhost:5173/gh900-study/` でアクセスできます。

## ビルド・バリデーション

```bash
npm run build     # 型チェック + Vite ビルド
npm run validate  # 問題 JSON のスキーマ・ID重複チェック
```

`dist/` ディレクトリに静的ファイルが生成されます。

## デプロイ

`main` ブランチへの push で GitHub Actions が自動的にビルド → GitHub Pages へデプロイします。

初回利用時は GitHub リポジトリの **Settings > Pages** で Source を `GitHub Actions` に設定してください。

## ファイル構成

```
src/
├── types/quiz.ts          # 型定義（Question, Domain, AnswerHistory など）
├── data/
│   ├── questions/         # 問題データ（ドメインごとの JSON ファイル）
│   │   ├── d1.json
│   │   ├── d2.json
│   │   └── ...
│   ├── loader.ts          # import.meta.glob で全 JSON をマージして QUESTIONS[] を提供
│   ├── domains.ts         # ドメインマスタ（7ドメイン・2026年改定版）
│   └── officialLinks.ts   # ホーム画面の公式リソースリンク
├── utils/shuffle.ts
├── hooks/
│   ├── useHistory.ts      # LocalStorage の読み書き
│   ├── useQuiz.ts         # クイズ進行ロジック
│   └── useQuizSessions.ts # クイズセッションの中断・再開
├── components/
└── screens/
```

## 問題データの追加・修正

`src/data/questions/d{1-7}.json` の該当ファイルに追記します。スキーマは `docs/schema/question.schema.json` で定義されており、追加後は `npm run validate` で検証できます。

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
      "title": "ページタイトル",
      "url": "https://docs.github.com/ja/...",
      "source": "GitHub Docs",
      "checkedAt": "2026-05-31"
    }
  ],
  "tags": ["タグ"],
  "updatedAt": "2026-05-31"
}
```

## ライセンス

問題コンテンツは GitHub 公式ドキュメントおよび Microsoft Learn Study Guide に基づくオリジナル問題です。実際の試験問題の転載ではありません。
