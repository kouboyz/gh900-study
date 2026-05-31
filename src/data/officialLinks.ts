export interface OfficialLink {
  category: string
  title: string
  url: string
  note?: string
}

export const OFFICIAL_LINKS: OfficialLink[] = [
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
]
