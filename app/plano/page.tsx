'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { get, set } from '../../src/storage';
import type { Plan, Round } from '../../src/storage';

export default function Plano(){
  const [plan, setPlan] = useState<Plan | null>(null);
  const [leve, setLeve] = useState(false);
  const [profundo, setProfundo] = useState(false);

  useEffect(()=>{ setPlan(get<Plan>('currentPlan', null)); },[]);

  if(!plan){
    return (<main><div className="card"><h1>Plano</h1><p>Nenhum plano encontrado.</p><Link href="/start" className="btn-ghost">Iniciar tarefa</Link></div></main>);
  }

  const rounds = plan.rounds || [];
  const canStart = leve || profundo;

  const wa = `https://wa.me/?text=${encodeURIComponent(
    `Plano – ${new Date(plan.createdAt).toLocaleString()}\n` +
    `Tarefa: ${plan.task}\n` +
    `1º passo: ${plan.firstStep}\n` +
    (plan.totalMinutes? `Tempo total: ${plan.totalMinutes} min\n`:'') +
    (rounds.length? `Rounds: ${rounds.map(r=>r.minutes).join(' + ')} min\n`:'') +
    `Distrator fora: ${plan.distractor}\nRecompensa: ${plan.reward}\nPorquê: ${plan.why}`
  )}`;

  return (
    <main>
      <div className="card">
        <h1 style={{fontSize:24, fontWeight:900}}>Plano do agora</h1>
        <ul style={{lineHeight:1.8}}>
          <li><strong>1º passo (2 min):</strong> {plan.firstStep}</li>
          {rounds.length ? <li><strong>Rounds:</strong> {rounds.map(r=>`${r.label} ${r.minutes}m`).join(' → ')}</li> : <li><strong>Rounds:</strong> Start (2m) apenas</li>}
          <li><strong>Distrator fora:</strong> {plan.distractor}</li>
          <li><strong>Recompensa:</strong> {plan.reward}</li>
          <li><strong>Porquê:</strong> {plan.why}</li>
        </ul>

        <div className="card" style={{marginTop:10}}>
          <p style={{fontWeight:800, marginBottom:6}}>Pacote Foco (obrigatório)</p>
          <div className="row">
            <button className={leve?'btn-green':'btn-ghost'} style={{flex:1}} onClick={()=>{setLeve(!leve); if(profundo) setProfundo(false);}}>Foco Leve</button>
            <button className={profundo?'btn-green':'btn-ghost'} style={{flex:1}} onClick={()=>{setProfundo(!profundo); if(leve) setLeve(false);}}>Foco Profundo</button>
          </div>
          <div style={{marginTop:8}}>
            {leve && (
              <ul style={{lineHeight:1.6}}>
                <li>🔕 Ative Não Perturbe</li>
                <li>📵 Silencie apps distraidores</li>
              </ul>
            )}
            {profundo && (
              <ul style={{lineHeight:1.6}}>
                <li>✈️ Modo Avião + Wi‑Fi ligado</li>
                <li>🔕 Não Perturbe (sem exceções)</li>
                <li>🛑 Auto‑bloqueio: Nunca/5 min</li>
              </ul>
            )}
          </div>
        </div>

        <div className="grid2" style={{marginTop:12}}>
          <Link href={canStart? (rounds.length? '/timer?mode=rounds':'/timer?stage=2') : '#'} aria-disabled={!canStart} className={canStart?'btn-green':'btn-ghost'}>
            {canStart? 'Iniciar rounds' : 'Selecione um Pacote Foco'}
          </Link>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost">Compartilhar</a>
        </div>
      </div>
    </main>
  );
}
