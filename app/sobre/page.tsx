import Link from 'next/link';
export default function Sobre(){
  return (
    <main>
      <div className="card">
        <h1>Sobre</h1>
        <p>Destrava — versão beta. PWA simples para combater a procrastinação.</p>
        <Link href="/">← Voltar</Link>
      </div>
    </main>
  );
}
