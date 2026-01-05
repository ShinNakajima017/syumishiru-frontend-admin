/**
 * MUI テーマ定義ファイル
 *
 * ## なぜこのファイルが必要か
 * - アプリ全体で一貫したデザイン（色、フォント、余白等）を適用するため
 * - デザイン変更時にこのファイルだけ修正すれば全体に反映される
 * - MUIコンポーネントのデフォルトスタイルをカスタマイズできる
 *
 * ブランドカラーやフォントが決まったら、createTheme() に設定を追加する
 */
'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export default theme;
