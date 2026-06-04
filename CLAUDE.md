# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

```bash
npm run dev        # 開発サーバー起動 → http://localhost:5173/gh900-study/
npm run build      # 型チェック + Vite ビルド（dist/ に出力）
npm run validate   # 問題 JSON のバリデーション（スキーマ・ID重複・ファイル名整合性）
npm run test       # Vitest 単発実行
npm run test:watch # Vitest ウォッチモード
```

## アーキテクチャ

### 画面遷移

SPA だがルーターは使わず、`App.tsx` の `screen` state（`'home' | 'quiz' | 'summary'`）で切り替える。画面コンポーネントは `src/screens/` に配置し、`App.tsx` がすべての状態とイベントハンドラを保持して各画面に props で渡す。

### 問題データの流れ

```
src/data/questions/d*.json
  └─ src/data/loader.ts（import.meta.glob で全 JSON をマージ → QUESTIONS[]）
       └─ App.tsx / HomeScreen.tsx で参照
```

問題の追加・修正は `src/data/questions/d{1-7}.json` のみ触れば完結する。`loader.ts` と `domains.ts` は問題追加では変更不要。

### 学習履歴とセッション

- `useHistory.ts` — LocalStorage（キー: `gh900-history-v1`）の読み書きを隔離。`AnswerHistory` は `Record<questionId, AnswerRecord>` の形式で正解数・回答回数を蓄積する
- `useQuizSession.ts` — クイズ中断時のセッション（キー: `gh900-quiz-session-v1`）を保持。`App.tsx` の `useEffect` が問題進行のたびに `saveSession` を呼び出し、ホーム画面に戻った際に「再開」ボタンを表示する

### クイズ進行ロジック

`useQuiz.ts` がクイズの状態（問題リスト・現在インデックス・回答済みリスト）を管理する。`start(questions[])` で初期化、`resume(questions, index, answers)` で中断再開、`answer(selectedIds, saveAnswer)` で回答記録と `useHistory` への保存を同時に行う。`QuizScreen` は `key={index-questionId}` で問題が変わるたびにコンポーネントを再マウントし、選択肢シャッフルの state をリセットしている。

### アプリ設定

`src/config/app.ts` の `APP_CONFIG` がアプリ名・試験ラベル・LocalStorage キー・官方リンク・シェアテキストテンプレートを一元管理している。別の試験向けに転用する場合はこのファイルのみ変更すればよい。

## 問題データの制約

- ファイル名は `d1.json`〜`d7.json` 固定。ファイル名の `d*` 部分を大文字にした値が `domainId` と一致しなければならない
- ID は `D{1-7}-{3桁連番}` 形式（例: `D3-004`）。全ファイル横断でユニークであること
- `questionType` は `single-choice`（現行）または `multiple-choice`（複数正解）を指定できる。`correctChoiceIds` が複数の場合は `multiple-choice` にすること
- 参照 URL は GitHub Docs（`docs.github.com/ja`）または Microsoft Learn（`learn.microsoft.com/ja-jp`）の日本語版を優先する
- `checkedAt` は `YYYY-MM-DD` 形式で参照 URL を確認した日付を記載する
- `npm run validate` を実行してエラーがないことを確認してから PR を出す

## ドメイン構成（2026年1月改定版）

スタディガイド: https://learn.microsoft.com/ja-jp/credentials/certifications/resources/study-guides/gh-900

| ID | ドメイン | 比率 |
|---|---|---:|
| D1 | Git と GitHub の基本を理解する | 25–30% |
| D2 | GitHub リポジトリを操作する | 10–15% |
| D3 | GitHub を使用した共同作業 | 10–15% |
| D4 | 最新の開発プラクティスを適用する | 10–15% |
| D5 | GitHub を使用してプロジェクトを管理する | 5–10% |
| D6 | プライバシー、セキュリティ、管理について理解する | 10–15% |
| D7 | GitHub コミュニティを探索する | 5–10% |

## デプロイ

`main` ブランチへの push で `.github/workflows/deploy.yml` が自動実行され GitHub Pages に公開される。`dist/` はコミット不要（`.gitignore` 済み）。

`vite.config.ts` の `base: '/gh900-study/'` は GitHub Pages のリポジトリ名に合わせた設定。リポジトリ名が変わる場合はここと `APP_CONFIG.storageKey`（データ移行が必要な場合）を変更する。
 