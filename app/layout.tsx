import './globals.css';
import SWRegister from './sw-register';

export const metadata = {
  title: 'Destrava',
  description: 'Rounds crescentes e foco total.',
  manifest: '/manifest.json',
};

function ThemeScript() {
  // read theme from localStorage and add class to <html>
  return (
    <script dangerouslySetInnerHTML={{__html: `
      (function(){
        try{
          var t = localStorage.getItem('theme') || 'dark';
          if(t==='dark') document.documentElement.classList.remove('light');
          else document.documentElement.classList.add('light');
        }catch(e){}
      })();
    `}} />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeScript />
        <SWRegister />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
