# GH-900 GitHub Foundations 対策アプリ 要件定義書

**対象システム:** GH-900 GitHub Foundations Trainer  
**想定公開先:** GitHub Pages  
**作成日:** 2026年5月30日  
**作成者:** Manus AI

## 1. 背景と目的

GH-900、すなわちGitHub Foundationsは、GitHub上での協働、貢献、作業に関する基礎的なトピック、製品、概念の理解を検証する認定試験である。GitHub Learnの公式ページでは、この試験はGitHubユーザーがGitHubの基礎的な理解を検証するためのBeginnerレベルの試験として説明されており、試験時間は100分、受験方法はPearson VUEのテストセンターまたはオンライン試験、対応言語には日本語も含まれる。[1]

本システムの目的は、GH-900の試験範囲に沿って、学習者が**4択問題を解きながら知識を整理し、弱点を把握し、公式ドキュメントに戻って復習できる静的Webアプリ**を提供することである。App Storeで配布するネイティブアプリではなく、GitHub Pagesで公開できるWebアプリとして設計することで、開発、公開、更新、共有のコストを低く抑える。

> GitHub Pagesは、GitHub公式ドキュメントで「GitHub上のリポジトリからHTML、CSS、JavaScriptファイルを直接取得し、必要に応じてビルドプロセスを実行してWebサイトとして公開する静的サイトホスティングサービス」と説明されている。[2]

## 2. 前提条件

本システムは、サーバーサイド処理やデータベースを使わず、ブラウザ内で完結する静的アプリとして設計する。GitHub Pagesは静的ファイルの公開に適している一方で、PHP、Ruby、Pythonなどのサーバーサイド言語はサポートしていないため、学習履歴、回答結果、苦手分野などの個人データはブラウザのLocalStorageまたはIndexedDBに保存する。[3]

| 区分 | 前提 |
|---|---|
| 公開方式 | GitHub Pagesによる静的サイト公開 |
| アプリ形態 | SPA、または静的HTML/CSS/JavaScriptで構成されるWebアプリ |
| 問題形式 | 原則として4択の単一選択問題を標準形式とする |
| データベース | 使用しない |
| ユーザー認証 | MVPでは実装しない |
| 学習履歴 | ブラウザローカルに保存する |
| 問題データ | JSONまたはMarkdownからビルド時に生成される静的データとして同梱する |
| 出題内容 | 実際の試験問題の転載ではなく、公式Study GuideとGitHub Docsに基づくオリジナル問題とする |

## 3. 対象ユーザー

本システムの主な対象は、GitHubを業務や学習で利用しており、GH-900の受験に向けて知識を体系的に整理したいユーザーである。特に、日常的にPull RequestやIssueを使っているものの、GitHub Actions、Codespaces、Copilot、Projects、Organization管理、InnerSourceなどの周辺機能を体系的に復習したいユーザーを想定する。

| ユーザー像 | ニーズ |
|---|---|
| 業務でGitHubを使う開発者 | 普段使っている機能を公式用語で整理し、試験形式に慣れたい |
| Engineering Manager | チーム運用、権限、Projects、開発者体験の観点からGitHub全体を棚卸ししたい |
| DevOps Engineer | Actions、branch protection、security、repository managementを重点的に復習したい |
| 学習者・学生 | GitとGitHubの基本概念を段階的に学びたい |
| GitHub導入支援者 | OrganizationやRepository運用の基礎を説明できるようにしたい |

## 4. スコープ

MVPでは、GH-900の試験範囲を7つのドメインに分け、4択クイズ、解説、公式リファレンス、進捗保存、ドメイン別正答率、間違えた問題の復習を提供する。Microsoft LearnのGitHub Foundations認定ページでは、試験範囲としてIntroduction to Git and GitHub、Working with GitHub Repositories、Collaboration Features、Modern Development、Project Management、Privacy, Security, and Administration、Benefits of the GitHub Communityの7ドメインが示されている。[4]

| スコープ区分 | MVPに含める | MVPでは含めない |
|---|---|---|
| 問題演習 | 4択問題、即時採点、解説表示 | 実試験問題の再現、問題販売、試験保証 |
| 学習管理 | LocalStorageによる進捗保存、正答率、復習リスト | アカウント作成、複数端末同期、ランキング |
| コンテンツ | 公式範囲に沿ったオリジナル問題、公式リンク | 非公式dump問題、著作権リスクのある転載 |
| 公開 | GitHub Pages | App Store配布、サーバー運用 |
| 端末対応 | PC、タブレット、スマートフォンのブラウザ | ネイティブアプリ固有機能 |
| オフライン | PWA化による限定的なオフライン利用を検討 | 完全な同期型オフライン学習サービス |

## 5. 試験ドメイン設計

問題は、公式の7ドメインに紐づけて管理する。各問題には、ドメイン、難易度、解説、公式参照URL、最終確認日を持たせる。これにより、試験範囲が更新された場合でも、問題単位でメンテナンスしやすくなる。

| ドメインID | ドメイン名 | 公式比率 | アプリ内の扱い |
|---|---|---:|---|
| D1 | Introduction to Git and GitHub | 22% | Git、GitHub、repository、commit、branch、GitHub Flowを扱う |
| D2 | Working with GitHub Repositories | 8% | README、LICENSE、CONTRIBUTING、CODEOWNERS、SECURITY、Insightsを扱う |
| D3 | Collaboration Features | 30% | Issues、Pull Requests、Discussions、Notifications、Gists、Wikis、Pagesを重点的に扱う |
| D4 | Modern Development | 13% | Actions、Copilot、Codespaces、github.dev、dev containersを扱う |
| D5 | Project Management | 7% | Projects、labels、milestones、workflows、insightsを扱う |
| D6 | Privacy, Security, and Administration | 10% | 2FA、passkeys、permissions、roles、branch protection、Organization管理を扱う |
| D7 | Benefits of the GitHub Community | 10% | OSS、Sponsors、Marketplace、InnerSource、fork、templateを扱う |

## 6. 機能要件

### 6.1 ホーム画面

ホーム画面では、学習者が現在の進捗、全体正答率、未回答問題数、復習対象問題数、直近の学習状態を確認できるようにする。単に「問題を解く」だけではなく、試験範囲全体に対してどこまで準備できているかを一目で把握できることを重視する。

| 要件ID | 要件 | 優先度 |
|---|---|---|
| FR-001 | 全体の学習進捗を表示する | Must |
| FR-002 | 全体正答率を表示する | Must |
| FR-003 | ドメイン別の正答率を表示する | Must |
| FR-004 | 最後に学習した日時を表示する | Should |
| FR-005 | 「続きから学習」を開始できる | Should |

### 6.2 ドメイン別学習

ドメイン別学習では、公式試験範囲に沿って問題を分類し、特定ドメインだけを集中的に解けるようにする。特にCollaboration Featuresは公式比率が高いため、問題数も多めに配分する。

| 要件ID | 要件 | 優先度 |
|---|---|---|
| FR-010 | 7ドメインから学習対象を選択できる | Must |
| FR-011 | 選択したドメインの問題だけを出題できる | Must |
| FR-012 | 各ドメインの問題数、回答済み数、正答率を表示する | Must |
| FR-013 | 苦手なドメインを自動的に強調表示する | Should |

### 6.3 4択クイズ演習

クイズ演習は、本システムの中心機能である。標準形式は、1つの設問に対して4つの選択肢を提示し、1つの正解を選ぶ単一選択問題とする。ただし、将来的に複数選択問題やシナリオ問題へ拡張できるよう、データモデルにはquestionTypeを持たせる。

| 要件ID | 要件 | 優先度 |
|---|---|---|
| FR-020 | 1問につき4つの選択肢を表示する | Must |
| FR-021 | ユーザーが1つの選択肢を選んで回答できる | Must |
| FR-022 | 回答後に正誤を即時表示する | Must |
| FR-023 | 正解、解説、公式参照リンクを表示する | Must |
| FR-024 | 次の問題へ進める | Must |
| FR-025 | 選択肢の表示順をランダム化できる | Should |
| FR-026 | 問題の出題順をランダム化できる | Should |
| FR-027 | 回答前に解説が見えないようにする | Must |

### 6.4 模擬試験モード

模擬試験モードでは、試験本番に近い緊張感で問題を解けるようにする。公式ページに記載された試験時間は100分であるため、模擬試験モードにも100分タイマーを設定する。[1] 問題数はMVPでは設定可能とし、初期値は本番風の固定セットではなく、ドメイン比率に基づくランダム抽出とする。

| 要件ID | 要件 | 優先度 |
|---|---|---|
| FR-030 | 100分タイマーを表示する | Must |
| FR-031 | ドメイン比率に基づいて問題を抽出する | Must |
| FR-032 | 試験中は正解と解説を表示しない | Must |
| FR-033 | 最後にスコア、正答率、ドメイン別結果を表示する | Must |
| FR-034 | 試験結果をLocalStorageに保存する | Should |
| FR-035 | 中断時に再開できる | Could |

### 6.5 復習モード

復習モードでは、間違えた問題、未回答問題、お気に入り問題、正答率の低いドメインの問題を再出題する。データベースを使わないため、これらの状態はLocalStorageに保存する。

| 要件ID | 要件 | 優先度 |
|---|---|---|
| FR-040 | 間違えた問題だけを出題できる | Must |
| FR-041 | 未回答問題だけを出題できる | Should |
| FR-042 | お気に入り登録した問題だけを出題できる | Should |
| FR-043 | 連続正解した問題を復習対象から外せる | Could |
| FR-044 | ドメイン別の苦手問題を優先出題できる | Should |

### 6.6 学習履歴と進捗管理

学習履歴は、ブラウザ内に保存する。ユーザー認証やサーバー同期は行わないため、別端末や別ブラウザでは履歴が共有されない。この制約は、初回利用時または設定画面で明示する。

| 要件ID | 要件 | 優先度 |
|---|---|---|
| FR-050 | 回答履歴をLocalStorageに保存する | Must |
| FR-051 | 問題ごとの回答回数、正答回数、最終回答日時を保存する | Must |
| FR-052 | ドメイン別正答率を算出する | Must |
| FR-053 | 学習履歴をリセットできる | Must |
| FR-054 | 学習履歴をJSONとしてエクスポートできる | Could |
| FR-055 | JSONから学習履歴をインポートできる | Could |

### 6.7 公式リファレンス連携

各問題には、解説だけでなく公式ドキュメントへのリンクを付与する。これにより、単なる暗記ではなく、間違えた箇所を公式情報に戻って確認する学習導線を提供する。

| 要件ID | 要件 | 優先度 |
|---|---|---|
| FR-060 | 各問題に1つ以上の公式参照URLを設定できる | Must |
| FR-061 | 解説画面から公式ページを開ける | Must |
| FR-062 | ドメイン別の公式リンク集を表示する | Should |
| FR-063 | 参照URLの最終確認日を表示する | Should |

### 6.8 設定画面

設定画面では、学習体験に関わる設定と、静的アプリであることによる制約を明示する。特に、学習履歴が端末内に保存されること、ブラウザデータ削除で履歴が消えることは分かりやすく伝える。

| 要件ID | 要件 | 優先度 |
|---|---|---|
| FR-070 | 学習履歴の保存場所を説明する | Must |
| FR-071 | 学習履歴をリセットできる | Must |
| FR-072 | 選択肢ランダム化のON/OFFを設定できる | Should |
| FR-073 | ダークモードを切り替えられる | Could |
| FR-074 | アプリのバージョンと問題データの更新日を表示する | Should |

## 7. 非機能要件

GitHub Pages上で動作するため、システムは静的ファイルとして配信される。サーバーサイド処理に依存しないこと、スマートフォンでも使いやすいこと、学習中の操作が軽快であることを重視する。

| 要件ID | 分類 | 要件 | 優先度 |
|---|---|---|---|
| NFR-001 | 可用性 | GitHub Pagesの配信に依存し、独自サーバーを運用しない | Must |
| NFR-002 | 性能 | 初回ロード後、クイズ画面の遷移は体感上即時に行える | Must |
| NFR-003 | レスポンシブ | スマートフォン、タブレット、PCで利用できる | Must |
| NFR-004 | アクセシビリティ | キーボード操作、十分なコントラスト、適切なラベルを提供する | Should |
| NFR-005 | 保守性 | 問題データとアプリロジックを分離する | Must |
| NFR-006 | セキュリティ | 実行時に外部から任意コードを読み込まない | Must |
| NFR-007 | プライバシー | 個人の学習履歴を外部送信しない | Must |
| NFR-008 | オフライン | PWA化により主要画面と問題データをキャッシュできる | Could |
| NFR-009 | 更新容易性 | 問題データの追加・修正をPull Requestでレビューできる | Should |

## 8. データ設計

問題データは、静的JSONとして管理する。問題本文、選択肢、正解、解説、ドメイン、難易度、参照URLを持たせる。将来の拡張に備え、4択単一選択以外の形式も表現できるようにするが、MVPのUIは4択単一選択に最適化する。

### 8.1 問題データ構造

```json
{
  "id": "D3-PR-001",
  "domainId": "D3",
  "domainName": "Collaboration Features",
  "questionType": "single-choice",
  "difficulty": "basic",
  "question": "Pull Requestの主な目的として最も適切なものはどれですか？",
  "choices": [
    { "id": "A", "text": "変更を提案し、レビューと議論を経てマージするため" },
    { "id": "B", "text": "リポジトリの請求情報を管理するため" },
    { "id": "C", "text": "GitHub Pagesの独自ドメインを購入するため" },
    { "id": "D", "text": "Organizationの所有者を自動変更するため" }
  ],
  "correctChoiceIds": ["A"],
  "explanation": "Pull Requestは、プロジェクトに変更を取り込む前に、変更内容を議論しレビューするためのGitHubの中心的な協働機能です。",
  "references": [
    {
      "title": "About pull requests",
      "url": "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
      "source": "GitHub Docs",
      "checkedAt": "2026-05-30"
    }
  ],
  "tags": ["pull-request", "review", "collaboration"],
  "createdAt": "2026-05-30",
  "updatedAt": "2026-05-30"
}
```

| フィールド | 必須 | 説明 |
|---|---|---|
| id | Yes | 問題を一意に識別するID |
| domainId | Yes | D1からD7までのドメインID |
| questionType | Yes | MVPではsingle-choiceを使用する |
| difficulty | Yes | basic、standard、advancedなどの難易度 |
| question | Yes | 設問本文 |
| choices | Yes | 4つの選択肢 |
| correctChoiceIds | Yes | 正解選択肢ID。MVPでは1つだけを想定する |
| explanation | Yes | 回答後に表示する解説 |
| references | Yes | 公式ドキュメントまたは公式学習リソースへの参照 |
| tags | No | 検索、分類、復習に利用するタグ |
| updatedAt | Yes | 問題の最終更新日 |

### 8.2 学習履歴データ構造

学習履歴はLocalStorageに保存する。ブラウザ内保存であるため、ユーザーがブラウザデータを削除した場合、履歴は失われる。この制約は仕様として明記する。

```json
{
  "version": "1.0.0",
  "lastStudiedAt": "2026-05-30T12:00:00+09:00",
  "answers": {
    "D3-PR-001": {
      "attempts": 2,
      "correctCount": 1,
      "lastAnswerChoiceIds": ["A"],
      "lastAnsweredAt": "2026-05-30T12:00:00+09:00",
      "bookmarked": true
    }
  },
  "examSessions": [
    {
      "id": "session-001",
      "startedAt": "2026-05-30T11:00:00+09:00",
      "finishedAt": "2026-05-30T12:00:00+09:00",
      "score": 82,
      "domainScores": {
        "D1": 80,
        "D2": 75,
        "D3": 90
      }
    }
  ]
}
```

## 9. 画面構成

画面は、学習者が迷わず「解く」「復習する」「弱点を見る」に進める構成にする。GitHub Pagesでの静的配信を前提にするため、初期表示時に問題データを読み込み、以降はクライアントサイドで状態を管理する。

| 画面 | 主な役割 | 主な要素 |
|---|---|---|
| ホーム | 進捗確認と学習開始 | 全体正答率、ドメイン別進捗、続きから学習 |
| ドメイン選択 | 学習対象の選択 | 7ドメイン、問題数、正答率、弱点表示 |
| クイズ | 4択問題の演習 | 設問、選択肢、回答ボタン、解説、参照リンク |
| 模擬試験 | 本番形式の演習 | タイマー、問題一覧、回答状況、終了ボタン |
| 結果 | スコア確認 | 正答率、ドメイン別結果、復習導線 |
| 復習 | 苦手問題の再演習 | 間違えた問題、未回答問題、お気に入り問題 |
| リファレンス | 公式資料への導線 | ドメイン別公式リンク、Study Guide、GitHub Docs |
| 設定 | ローカル保存と表示設定 | 履歴リセット、エクスポート、インポート、テーマ設定 |

## 10. 推奨技術構成

実装は、GitHub Pagesで扱いやすい静的フロントエンドを前提とする。ReactやVueなどのSPAでも、Viteでビルドした静的ファイルをGitHub Pagesに配置すれば運用しやすい。より軽量に始める場合は、素のHTML、CSS、TypeScriptでもよい。

| 領域 | 推奨 | 理由 |
|---|---|---|
| フロントエンド | React + TypeScript + Vite | 状態管理、コンポーネント化、静的ビルドが容易 |
| スタイリング | Tailwind CSS または素のCSS | レスポンシブ対応とUI調整がしやすい |
| データ | questions.json | DBなしで問題を管理しやすい |
| 状態保存 | LocalStorage、将来的にIndexedDB | 小規模な履歴保存に十分 |
| デプロイ | GitHub Actions + GitHub Pages | Pull Requestベースで更新しやすい |
| PWA | Service Worker、manifest.json | ホーム画面追加と限定的オフライン利用が可能 |

## 11. コンテンツ作成方針

問題コンテンツは、実際の試験問題を再現するのではなく、公式Study GuideとGitHub Docsに基づいて独自に作成する。これは、著作権や試験ポリシー上のリスクを避けるためであり、同時に学習者が単なる暗記ではなく概念理解に進めるようにするためでもある。

| 方針 | 内容 |
|---|---|
| 出典重視 | 各問題に公式参照URLを付与する |
| オリジナル問題 | 実試験問題やdumpを使わない |
| 解説重視 | 正解理由だけでなく、不正解選択肢がなぜ違うかを説明する |
| 実務接続 | 可能な問題では「実務ではどう使うか」を補足する |
| 更新容易性 | 試験範囲変更時にドメイン単位・問題単位で更新できるようにする |

初期問題数は、MVPでは70問から100問程度が望ましい。公式比率に近づける場合、Collaboration FeaturesとIntroduction to Git and GitHubを厚めにし、Project Managementは少なめにする。将来的には200問程度まで拡張すると、復習やランダム出題の価値が高まる。

| ドメイン | 初期問題数の目安 | 拡張後の目安 |
|---|---:|---:|
| D1 Introduction to Git and GitHub | 18 | 45 |
| D2 Working with GitHub Repositories | 8 | 20 |
| D3 Collaboration Features | 24 | 60 |
| D4 Modern Development | 12 | 30 |
| D5 Project Management | 6 | 15 |
| D6 Privacy, Security, and Administration | 10 | 25 |
| D7 Benefits of the GitHub Community | 10 | 25 |
| 合計 | 88 | 220 |

## 12. 制約とリスク

最大の制約は、データベースを使わないため、学習履歴が端末・ブラウザ単位になることである。これはMVPでは許容し、必要になった段階でエクスポート・インポート機能や、別方式の同期を検討する。また、GitHub Pagesは静的サイトであるため、サーバー側での認証、採点、ランキング、不正対策は実装しない。

| リスク | 影響 | 対応方針 |
|---|---|---|
| 試験範囲の変更 | 問題が古くなる | 問題にupdatedAtと参照URLを持たせ、定期的に見直す |
| 実試験問題との混同 | 著作権・ポリシー上の懸念 | 公式資料ベースのオリジナル問題に限定する |
| LocalStorage消失 | 学習履歴が消える | リセット・エクスポート・インポート機能を検討する |
| 複数端末で履歴共有不可 | 利便性が下がる | MVPでは仕様として明示する |
| スマホUIが使いにくい | 学習継続率が下がる | モバイルファーストで設計する |
| 問題品質のばらつき | 学習効果が下がる | 問題レビュー観点を定義し、Pull Requestでレビューする |

## 13. MVPの受け入れ基準

MVPは、GitHub Pages上で公開され、学習者がスマートフォンまたはPCからアクセスして、4択問題を解き、解説を読み、進捗を保存し、弱点を確認できる状態を完了条件とする。

| 観点 | 受け入れ基準 |
|---|---|
| 公開 | GitHub PagesのURLでアクセスできる |
| 問題演習 | 4択問題を回答し、正誤と解説を確認できる |
| ドメイン分類 | 7ドメインごとに問題を選択できる |
| 進捗保存 | ブラウザを閉じても回答履歴が残る |
| 結果確認 | 全体およびドメイン別の正答率を確認できる |
| 復習 | 間違えた問題を再出題できる |
| 参照 | 各問題から公式ドキュメントを開ける |
| レスポンシブ | スマートフォン幅でも主要操作が破綻しない |
| コンテンツ | 初期問題が70問以上登録されている |

## 14. 段階的な開発ロードマップ

最初から高機能な学習サービスを目指すより、静的アプリとして成立する最小構成を早く公開し、問題データと学習体験を改善していく進め方が適している。

| フェーズ | 期間目安 | 内容 |
|---|---:|---|
| Phase 1 | 1〜2日 | 要件定義、データモデル、画面設計、初期UIプロトタイプ |
| Phase 2 | 2〜3日 | 4択クイズ、ドメイン別出題、LocalStorage保存、解説表示 |
| Phase 3 | 1〜2日 | 模擬試験モード、結果画面、復習モード |
| Phase 4 | 1〜2日 | GitHub Pages公開、PWA対応、レスポンシブ調整 |
| Phase 5 | 継続 | 問題追加、解説改善、試験範囲更新への追随 |

## 15. 将来拡張

MVPの価値が確認できた後は、PWAとしての使い勝手、問題品質、学習分析を強化する。DBを使わない前提でも、エクスポート・インポート、問題データのバージョニング、GitHub Actionsによる問題JSON検証などで、かなり実用的な運用が可能である。

| 拡張案 | 価値 | 実装難易度 |
|---|---|---:|
| PWA対応 | スマホアプリ風に使える | 中 |
| 問題JSONスキーマ検証 | 問題データの品質を保つ | 低 |
| 学習履歴エクスポート・インポート | 端末変更に対応できる | 中 |
| 間隔反復 | 苦手問題を効率的に復習できる | 中 |
| Markdownから問題生成 | コンテンツ作成が楽になる | 中 |
| 多言語対応 | 日本語・英語の切り替えができる | 中〜高 |
| GitHub Actionsで自動デプロイ | 更新フローを安定化できる | 低〜中 |

## 16. まとめ

GH-900対策アプリは、GitHub Pages上の静的Webアプリとして十分に実現可能である。データベースを使わない制約はあるが、問題データを静的JSONとして同梱し、学習履歴をLocalStorageに保存することで、4択演習、模擬試験、弱点分析、復習リスト、公式リファレンス連携まで実装できる。まずはMVPとして、7ドメイン対応、70問以上のオリジナル問題、即時採点、解説、進捗保存、ドメイン別正答率、間違えた問題の復習を実現するのが現実的である。

このシステムの差別化ポイントは、単なる暗記アプリではなく、**GitHubの機能を開発者体験、チーム運用、InnerSource、AI駆動開発の文脈に接続して理解できる学習体験**にすることである。特にEngineering Managerや開発生産性に関心を持つユーザーにとっては、試験対策と実務上の知識整理を同時に進められるアプリになる。

## References

[1]: https://learn.github.com/certification/GHF "GitHub Learn - GitHub Foundations Certification Details"  
[2]: https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages "GitHub Docs - About GitHub Pages"  
[3]: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site "GitHub Docs - Creating a GitHub Pages site"  
[4]: https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/ "Microsoft Learn - GitHub Foundations Certification"  
[5]: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-900 "Microsoft Learn - Study guide for Exam GH-900: GitHub Foundations"  
