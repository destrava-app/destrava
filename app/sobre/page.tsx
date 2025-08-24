import Link from 'next/link';

export default function Sobre() {
  return (
    <main>
      <div className="card">
        <h1>Sobre</h1>
        <p>Rota interna de teste. Se você chegou aqui, a navegação interna está ok.</p>
        <Link href="/">← Voltar</Link>
      </div>
    </main>
  );
}
