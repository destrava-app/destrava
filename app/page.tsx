import Link from 'next/link';

export default function Page() {
  const msg = encodeURIComponent('Testando o Destrava: plano de foco em 2 min.');
  const wa = `https://wa.me/?text=${msg}`;

  return (
    <main>
      <div className="card" style={{textAlign:'center'}}>
        <h1>Destrava</h1>
        <p>Seu porquê: <strong>"Criar liberdade para minha família"</strong></p>
        <div style={{display:'grid', gap:12}}>
          <button className="btn-red">Procrastinei agora</button>
          <button className="btn-green">Iniciar foco (25 min)</button>
        </div>
        <p className="small" style={{marginTop:12}}>Streak: 0 dias • Picos às 15h</p>
      </div>

      <div className="card">
        <h2>Testes de links</h2>
        <ul>
          <li>Interno (Next): <Link href="/sobre">/sobre</Link></li>
          <li>WhatsApp (externo): <a href={wa} target="_blank" rel="noopener noreferrer">Abrir wa.me</a></li>
          <li>Trello (externo): <a href="https://trello.com" target="_blank" rel="noopener noreferrer">Abrir Trello</a></li>
        </ul>
        <p className="small">Em iOS PWA, use <code>target="_blank"</code> para abrir fora do app.</p>
      </div>
    </main>
  );
}
