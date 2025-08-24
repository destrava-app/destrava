'use client';
import Link from 'next/link';
import { useState } from 'react';
import { get, set } from '../../src/storage';
import { generatePlan } from '../../src/plan';

const OPTIONS = [30,60,90,120];

export default function Start(){
  const [task, setTask] = useState('');
  const [why, setWhy] = useState(get('why','Criar liberdade para minha família'));
  const [total, setTotal] = useState<number | ''>('');

  function iniciar(){
    if(!task.trim()){ alert('Informe a tarefa'); return; }
    const reward = get('rewardDefault','1 episódio curto');
    const plan = generatePlan({ task: task.trim(), feeling:'Perfeccionismo', distractor:'Celular', why, reward, totalMinutes: (typeof total==='number'? total: undefined) });
    set('currentPlan', plan);
    set('why', why);
    window.location.href = '/plano';
  }

  return (
    <main>
      <div className="card">
        <h1 style={{fontSize:24, fontWeight:900}}>Iniciar Tarefa</h1>

        <label className="small">Tarefa</label>
        <input className="input" placeholder="ex.: finalizar proposta do cliente" value={task} onChange={e=>setTask(e.target.value)} />

        <div className="row" style={{marginTop:10}}>
          <div style={{flex:1}}>
            <label className="small">Seu porquê</label>
            <input className="input" placeholder="ex.: criar liberdade para minha família" value={why} onChange={e=>setWhy(e.target.value)} />
          </div>
        </div>

        <div style={{marginTop:10}}>
          <p className="small" style={{fontWeight:700}}>Tempo total (opcional)</p>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {OPTIONS.map(m => (
              <button key={m} onClick={()=>setTotal(m)} className="btn-ghost" style={{border:'1px solid rgba(148,163,184,.25)'}}>{m} min</button>
            ))}
            <input className="input" placeholder="custom (min)" value={total===''?'':String(total)} onChange={e=>{
              const v = e.target.value.trim();
              setTotal(v? Math.max(1, parseInt(v,10)||0) : '');
            }} style={{width:140}} />
          </div>
          <p className="small" style={{marginTop:6}}>Rounds: 2 → 15 → 25 → 45 → Final (resto).</p>
        </div>

        <div className="row" style={{marginTop:12}}>
          <Link href="/" className="btn-ghost" style={{flex:1, textAlign:'center'}}>Cancelar</Link>
          <button onClick={iniciar} className="btn-green" style={{flex:1, fontSize:18}}>Gerar plano</button>
        </div>
      </div>
    </main>
  );
}
