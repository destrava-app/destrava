import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <div className="card" style={{textAlign:'center'}}>
        <h1>Destrava</h1>
        <p>Seu porquê: <strong id="why">"Criar liberdade para minha família"</strong></p>
        <div style={{display:'grid', gap:12}}>
          <Link href="/captura" className="btn btn-red">Procrastinei agora</Link>
          <Link href="/foco" className="btn btn-green">Iniciar foco (25 min)</Link>
        </div>
        <p className="small" style={{marginTop:12}}>Streak: 0 dias • Picos às 15h</p>
      </div>

      <div className="card">
        <h2>Atalhos</h2>
        <div className="grid2">
          <Link href="/painel" className="btn" style={{background:'#f1f5f9', borderRadius:16, padding:14}}>Ver Painel</Link>
          <Link href="/config" className="btn" style={{background:'#f1f5f9', borderRadius:16, padding:14}}>Configurar Porquê & Recompensas</Link>
        </div>
      </div>
    </main>
  );
}
