'use client';
import Link from 'next/link';
import { useState } from 'react';
import { get, set } from '../../src/storage';
import type { Plan } from '../../src/storage';

export default function Checkout(){
  const plan: Plan | null = get('currentPlan', null);
  const [status, setStatus] = useState<'ok'|'parcial'|'travou'|'none'>('none');
  const [nextStep, setNextStep] = useState('');

  function concluir(){
    const logs = get<any[]>('logs', []);
    logs.push({ when: Date.now(), status, nextStep });
    set('logs', logs);
    window.location.href = '/painel';
  }

  return (
    <main>
      <div className="card">
        <h1 style={{fontSize:24, fontWeight:900}}>Check-out</h1>
        <p><strong>Tarefa:</strong> {plan?.task || '—'}</p>
        <div className="grid2">
          <button className={status==='ok'?'btn-green':'btn-ghost'} onClick={()=>setStatus('ok')}>Concluí</button>
          <button className={status==='parcial'?'btn-green':'btn-ghost'} onClick={()=>setStatus('parcial')}>Parcial</button>
          <button className={status==='travou'?'btn-ghost btn-danger':'btn-ghost'} onClick={()=>setStatus('travou')}>Travou</button>
        </div>
        <label className="small" style={{display:'block', marginTop:10}}>Próximo passo</label>
        <input className="input" placeholder="ex.: revisar 3 bullets amanhã cedo" value={nextStep} onChange={e=>setNextStep(e.target.value)} />
        <div className="row" style={{marginTop:12}}>
          <Link href="/" className="btn-ghost" style={{flex:1, textAlign:'center'}}>Cancelar</Link>
          <button className="btn-green" style={{flex:1}} onClick={concluir} disabled={status==='none'}>Salvar</button>
        </div>
      </div>
    </main>
  );
}
