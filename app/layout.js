import './globals.css';

export const metadata = {
  title: '상품 리스트',
  description: '모바일 상품 리스트 페이지'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
