/**
 * ルートレイアウト
 *
 * ## このファイルの役割
 * - アプリ全体の共通レイアウトを定義
 * - 全ページ共通の Provider（テーマ等）をここでラップ
 */
import type { Metadata } from 'next';
import ThemeRegistry from '@/components/providers/ThemeRegistry';

/**
 * metadata
 * - ページのタイトルや説明文を定義
 */
export const metadata: Metadata = {
  title: 'シュミシル管理画面',
  description: 'シュミシルアプリケーションの管理画面',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/**
       * - MUI のテーマが全ページに適用
       * - CssBaseline によるスタイルリセットも適用
       */}
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
