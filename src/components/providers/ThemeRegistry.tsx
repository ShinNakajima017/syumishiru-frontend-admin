/**
 * アプリ全体の Provider をまとめたコンポーネント
 *
 * ## なぜこのファイルが必要か
 * - MUI、React Query など複数の Provider が必要
 * - それらを1つのコンポーネントにまとめることで layout.tsx の可読性が上がる
 * - Provider の追加・削除がここで一元管理できる
 */
'use client';

import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import theme from '@/lib/theme';
import { makeQueryClient } from '@/lib/query-client';

type ThemeRegistryProps = {
  children: React.ReactNode;
};

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  /**
   * QueryClient を useState で保持する理由:
   * - コンポーネントの再レンダリングで新しいインスタンスが作られるのを防ぐ
   * - 1つのインスタンスをアプリ全体で共有することでキャッシュが効く
   */
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      {/**
       * QueryClientProvider
       * - React Query の機能を全コンポーネントで使えるようにする
       * - useQuery, useMutation などのフックがどこでも使えるようになる
       */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}
