import './globals.css';
import SWRegister from './sw-register';

export const metadata = {
  title: 'Destrava',
  description: 'PWA do Destrava',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SWRegister />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
