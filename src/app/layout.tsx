import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Dolphin · Engineer Your Flow',
  description:
    'A science-backed system to measure your wellbeing and improve your habits across Body, Mind, Lifestyle, and Purpose.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
