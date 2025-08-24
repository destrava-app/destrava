import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <div className="card center">
        <h1 style={{fontSize:28, fontWeight:900}}>Destrava</h1>
        <p className="small">Use o próprio celular a seu favor</p>
        <Link href="/start" className="btn-green" style={{display:'block', fontSize:22, marginTop:12}}>INICIAR TAREFA</Link>
        <div style={{marginTop:10, display:'flex', gap:8, justifyContent:'center'}}>
          <Link href="/painel" className="btn-ghost">Painel</Link>
          <Link href="/config" className="btn-ghost">Config</Link>
        </div>
      </div>
    </main>
  );
}
