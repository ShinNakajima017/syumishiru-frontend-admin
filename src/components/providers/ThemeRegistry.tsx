/**
 * MUIのProviderをまとめたコンポーネント
 *
 * ## なぜこのファイルが必要か
 * - MUI を Next.js App Router で使うには複数の Provider が必要
 * - それらを1つのコンポーネントにまとめることで layout.tsx の可読性が上がる
 * - 将来 Provider が増えても（React Query 等）、ここで一元管理できる
 */
'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import theme from '@/lib/theme';

type ThemeRegistryProps = {
  children: React.ReactNode;
};

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    /**
     * AppRouterCacheProvider
     * - Emotion（MUI が内部で使う CSS-in-JS ライブラリ）のキャッシュを管理
     * - MUI 公式が Next.js App Router で推奨している構成
     */
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      {/**
       * ThemeProvider
       * - 定義したテーマを全ての子コンポーネントに適用
       * - MUI コンポーネントがテーマの色やフォントを参照できるようになる
       */}
      <ThemeProvider theme={theme}>
        {/**
         * CssBaseline
         * - ブラウザ間のスタイル差異をリセット
         * - MUI 推奨のベーススタイルを適用
         */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
