/**
 * エラーページ（error.tsx）
 *
 * ## なぜこのファイルが必要か
 * Next.js App Router では、ページやコンポーネントで発生したランタイムエラーを
 * このファイルでキャッチし、ユーザーにエラー画面を表示する。
 * これにより、エラーが発生しても画面全体が真っ白になることを防げる。
 * layout.tsx以外のエラーをキャッチしているイメージ
 *
 * ## いつ表示されるか
 * - ページ内で throw された例外
 * - null.map() のような実行時エラー
 * - API呼び出し失敗で意図的に throw したエラー
 *
 * ## 注意点
 * - 'use client' が必須（エラーコンポーネントは Client Component である必要がある）
 * - reset() を呼ぶと、エラー状態をリセットして再レンダリングを試みる
 */
'use client';

import { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// このPropsはパッケージから提供されていないので自作するしかない
type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;　// このリセット関数が実行されたことを外部のコンポーネントで検知する手段は現状ない...らしい
};

export default function Error({ error, reset }: ErrorProps) {
  // エラー発生時にログを出力（本番では Sentry 等に送信する想定）
  useEffect(() => {
    console.error('error.tsxでエラーを検知しました：', error);
  }, [error]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 4,
        textAlign: 'center',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
      <Typography variant="h5" component="h1" gutterBottom>
        問題が発生しました
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        申し訳ございません。予期しないエラーが発生しました。
      </Typography>
      {/* 開発環境ではエラー詳細を表示（デバッグ用） */}
      {process.env.NODE_ENV === 'development' && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mb: 2, fontFamily: 'monospace', maxWidth: '600px' }}
        >
          {error.message}
        </Typography>
      )}
      <Button variant="contained" onClick={reset}>
        再試行
      </Button>
    </Box>
  );
}