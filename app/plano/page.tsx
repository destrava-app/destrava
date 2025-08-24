'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { get } from '../../src/storage';
import type { Plan } from '../../src/storage';

export default function Plano() {
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(()=>{
    setPlan(get<Plan>('currentPlan', null));
  },[]);

  if(!plan){
    return (<main><div className="card"><h1>Plano</h1><p>Nenhum plano encontrado. Gere um plano na captura.</p><Link href="/captura">Ir para Captura</Link></div></main>)
  }

  const wa = `https://wa.me/?text=${encodeURIComponent(
    `Plano de foco – ${new Date(plan.createdAt).toLocaleString()}
` +
    `Tarefa: ${plan.task}
` +
    `1º passo (2 min): ${plan.firstStep}
` +
    `Bloco: ${plan.blockMinutes} min
` +
    `Distrator fora: ${plan.distractor}
` +
    `Recompensa: ${plan.reward}
` +
    `Porquê: ${plan.why}`
  )}`;

  return (
    <main>
      <div className="card">
        <h1>Plano do Agora</h1>
        <ul style={{lineHeight:1.8}}>
          <li><strong>1º passo (2 min):</strong> {plan.firstStep}</li>
          <li><strong>Prazo artificial:</strong> {plan.blockMinutes} min</li>
          <li><strong>Distrator fora:</strong> {plan.distractor}</li>
          <li><strong>Recompensa:</strong> {plan.reward}</li>
          <li><strong>Medo da inação:</strong> {plan.phrase}</li>
        </ul>
        <div className="grid2" style={{marginTop:16}}>
          <Link href="/timer?stage=2" className="btn btn-green">Iniciar 2 min</Link>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn" style={{background:'#f1f5f9'}}>Compartilhar WhatsApp</a>
        </div>
      </div>
    </main>
  );
}
