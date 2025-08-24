export default function Page() {
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
        <h2>Este é um starter PWA</h2>
        <ul>

          <li>Manifest + Service Worker já configurados</li>

          <li>Instale no celular: Adicionar à Tela de Início</li>

          <li>Edite o conteúdo em <code>app/page.tsx</code></li>

        </ul>
      </div>

    </main>

  );

}

