/**
 * グローバルエラーページ（global-error.tsx）
 *
 * ## なぜこのファイルが必要か
 * ルートレイアウト（layout.tsx）自体でエラーが発生した場合、
 * 通常の error.tsx ではキャッチできない。
 * なぜなら error.tsx は layout.tsx の「中」にラップされる構造だから。
 * global-error.tsx は layout.tsx の「外側」でエラーをキャッチする。
 *
 * ## いつ表示されるか
 * - layout.tsx 内でエラーが発生した時
 * - ThemeRegistry や Provider の初期化に失敗した時
 *
 * ## 注意点
 * - html タグと body タグを自分で定義する必要がある
 *   （layout.tsx がエラーで動かないため）
 * - MUI等のProviderが使えないため、インラインスタイルで記述
 * - 本番環境でほぼ発生しない想定だが、保険として用意しておく
 */
'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html lang="ja">
      <body>
        {/*
          MUI の ThemeProvider が使えないため、インラインスタイルで記述。
          layout.tsx が壊れている状況なので、最低限の表示だけ行う。
        */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '32px',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>
            システムエラーが発生しました
          </h1>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            申し訳ございません。システムに問題が発生しました。
            <br />
            しばらく時間をおいてから再度お試しください。
          </p>
          {process.env.NODE_ENV === 'development' && (
            <p
              style={{
                color: '#d32f2f',
                fontFamily: 'monospace',
                marginBottom: '16px',
                maxWidth: '600px',
              }}
            >
              {error.message}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            再試行
          </button>
        </div>
      </body>
    </html>
  );
}