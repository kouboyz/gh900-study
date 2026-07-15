// ============================================================
// アプリ設定ファイル
// このファイルを書き換えることで別の学習アプリに転用できます
// ============================================================

import type { OfficialLink } from '../data/officialLinks'

export const APP_CONFIG = {
  // ナビゲーションバーに表示する短縮名（英数字推奨）
  appShortName: 'gh-900',

  // ページタイトル・OGP に使うアプリ名
  appName: 'GH-900 Study',

  // 試験・学習対象の名称（ホーム画面上部に表示）
  examLabel: 'GitHub Foundations',

  // ホーム画面の説明文
  description: 'GitHub Foundations 認定試験（GH-900）の学習アプリです。7つのドメインから問題を選んで学習できます。学習履歴はブラウザに保存されます。',

  // 対応するスタディガイドの改定バージョン（表示用）
  studyGuideVersion: '2026年1月改定版',

  // 問題の最終更新日（YYYY-MM-DD 形式）
  lastUpdated: '2026-07-16',

  // LocalStorage キー（アプリを変更した場合は必ず変更すること）
  storageKey: 'gh900-history-v1',

  // シェアテキストのテンプレート
  // {answered}・{total}・{pct} が実際の数値に置換される
  shareTextTemplate: '{appName} で学習中！\n{answered}/{total}問回答済み、正答率 {pct}%',

  // 参考リンク（空配列にすると「Official Resources」セクションが非表示になる）
  officialLinks: [
    {
      category: '試験情報',
      title: 'GitHub Foundations Certification',
      url: 'https://learn.github.com/certification/GHF',
      note: '試験概要・受験方法・試験時間・対応言語',
    },
    {
      category: 'Study Guide',
      title: '試験 GH-900 の学習ガイド: GitHub Foundations',
      url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/resources/study-guides/gh-900',
      note: 'ドメイン構成・出題比率・学習トピック一覧（2026-02-19 更新）',
    },
    {
      category: '認定ページ',
      title: 'Microsoft Learn — GitHub Foundations Certification',
      url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/github-foundations/',
      note: '取得バッジ・スキル測定の概要',
    },
    {
      category: '公式学習パス',
      title: 'GitHub Foundations Learning Path (Part 1)',
      url: 'https://learn.microsoft.com/ja-jp/training/paths/github-foundations/',
      note: 'Microsoft Learn 無料学習コース',
    },
    {
      category: '公式学習パス',
      title: 'GitHub Foundations Learning Path (Part 2)',
      url: 'https://learn.microsoft.com/ja-jp/training/paths/github-foundations-2/',
      note: 'Microsoft Learn 無料学習コース',
    },
    {
      category: 'GitHub Docs',
      title: 'GitHub ドキュメント',
      url: 'https://docs.github.com/ja',
      note: '各問題の解説リンク先となる公式ドキュメント',
    },
  ] satisfies OfficialLink[],
}

export function buildShareText(answered: number, total: number, pct: number): string {
  return APP_CONFIG.shareTextTemplate
    .replace('{appName}', APP_CONFIG.appName)
    .replace('{answered}', String(answered))
    .replace('{total}', String(total))
    .replace('{pct}', String(pct))
}
