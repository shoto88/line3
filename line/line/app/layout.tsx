import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <title>LINE予約システム 管理者ダッシュボード</title>
      </head>
      <body>{children}</body>
    </html>
  );
}