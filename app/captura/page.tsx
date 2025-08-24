import Link from 'next/link';

export default function Captura() {
  return (
    <main>
      <div className="card">
        <h1>Procrastinei agora</h1>
        <label>Tarefa evitada</label>
        <input placeholder="Ex.: finalizar proposta do cliente" style={{width:'100%', padding:12, borderRadius:12, border:'1px solid #e2e8f0', margin:'8px 0 16px'}} />
        <div style={{display:'flex', gap:8, flexWrap:'wrap', marginBottom:16}}>
          {['Medo da falha','Julgamento','Perfeccionismo','Tédio','Sobrecarga'].map(t => (
            <span key={t} style={{background:'#e2e8f0', padding:'6px 10px', borderRadius:999, fontSize:12}}>{t}</span>
          ))}
        </div>
        <div style={{display:'flex', gap:12}}>
          <Link href="/" className="btn-red" style={{textDecoration:'none', textAlign:'center', flex:1}}>Cancelar</Link>
          <Link href="/foco" className="btn-green" style={{textDecoration:'none', textAlign:'center', flex:1}}>Gerar plano (mock)</Link>
        </div>
      </div>
    </main>
  );
}
