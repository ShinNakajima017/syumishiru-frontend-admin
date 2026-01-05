/**
 * TanStack Query (React Query) のクライアント設定
 *
 * ## なぜこのファイルが必要か
 * - QueryClient はキャッシュやリトライの設定を持つ
 * - 設定を1箇所にまとめることで、全体の挙動を統一できる
 * - 将来設定を変えたいときにここだけ修正すればいい
 */
import { QueryClient } from '@tanstack/react-query';

/**
 * QueryClient のインスタンスを生成する関数
 *
 * なぜ関数にしているか:
 * - Next.js ではリクエストごとに新しいインスタンスが必要な場合がある
 * - 関数にしておくと、必要に応じて新しいインスタンスを作れる
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * staleTime: データが「古い」とみなされるまでの時間（ミリ秒）
         * - この時間内は再フェッチしない（キャッシュを使う）
         * - 60秒に設定: 管理画面なので頻繁な更新は不要
         */
        staleTime: 60 * 1000,
        retry: 1, // APIリクエストが失敗したとき、1回だけ自動で再試行する
      },
    },
  });
}
