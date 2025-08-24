import Link from 'next/link';

export default function Foco() {
  return (
    <main>
      <div className="card" style={{textAlign:'center'}}>
        <h1>Plano do Agora</h1>

        <ul style={{textAlign:'left', lineHeight:1.7}}>

          <li><strong>1º passo (2 min):</strong> Abrir o doc e escrever 3 bullets</li>

          <li><strong>Prazo artificial:</strong> 25 min agora</li>

          <li><strong>Distrator fora:</strong> Celular em outro cômodo</li>

          <li><strong>Recompensa:</strong> 1 episódio curto</li>

        </ul>

        <div style={{display:'flex', gap:12, marginTop:16}}>

          <Link href="/" className="btn-red" style={{textDecoration:'none', textAlign:'center', flex:1}}>Voltar</Link>

          <Link href="/sobre" className="btn-green" style={{textDecoration:'none', textAlign:'center', flex:1}}>Continuar 25 min</Link>

        </div>

        <p className="small" style={{marginTop:12}}>Sem perfeição. Só movimento.</p>

      </div>

    </main>

  );

}

