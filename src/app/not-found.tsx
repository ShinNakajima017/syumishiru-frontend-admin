/**
 * 404 ページ（not-found.tsx）
 *
 * ## なぜこのファイルが必要か
 * ユーザーが存在しないURLにアクセスした時や、
 * コード内で notFound() を呼び出した時に表示されるページ。
 * 適切な404ページがあることで、ユーザーは「ページが見つからない」ことを理解し、
 * 次のアクションを取れる。
 *
 * ## いつ表示されるか
 * - /hogehoge のような存在しないURLへのアクセス
 * - notFound() 関数を呼び出した時（例：APIで該当データが見つからない場合）
 */
import { Box, Button, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Link from 'next/link';

export default function NotFound() {
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
      <SearchOffIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h4" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        ページが見つかりません
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        お探しのページは存在しないか、移動した可能性があります。
      </Typography>
      <Button variant="contained" component={Link} href="/">
        トップページへ戻る
      </Button>
    </Box>
  );
}