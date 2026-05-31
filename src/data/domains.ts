import type { Domain } from '../types/quiz'

// 2026年1月改定版（スタディガイド 2026-02-19更新）
// 参照: https://learn.microsoft.com/ja-jp/credentials/certifications/resources/study-guides/gh-900
export const DOMAINS: Domain[] = [
  { id: 'D1', name: 'Git と GitHub の基本を理解する',              ratio: 28 },
  { id: 'D2', name: 'GitHub リポジトリを操作する',                 ratio: 13 },
  { id: 'D3', name: 'GitHub を使用した共同作業',                   ratio: 13 },
  { id: 'D4', name: '最新の開発プラクティスを適用する',            ratio: 13 },
  { id: 'D5', name: 'GitHub を使用してプロジェクトを管理する',     ratio: 8  },
  { id: 'D6', name: 'プライバシー、セキュリティ、管理について理解する', ratio: 13 },
  { id: 'D7', name: 'GitHub コミュニティを探索する',               ratio: 8  },
]
