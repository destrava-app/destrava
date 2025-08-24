'use client';
import Link from 'next/link';
import { useState } from 'react';
import { get, set, pushEvent } from '../../src/storage';
import type { Plan } from '../../src/storage';

export default function Checkout(){
  const plan: Plan | null = get('currentPlan', null);
  const [status, setStatus] = useState<'ok'|'parcial'|'travou'|'none'>('none');
  const [nextStep, setNextStep] = useState('');

  function concluir(){
    const logs = get<any[]>('logs', []);
    logs.push({ when: Date.now(), status, nextStep });
    set('logs', logs);
    pushEvent({ when: Date.now(), type: 'session', payload: { status, nextStep } });
    window.location.href = '/painel';
  }

  return (
    <main>
      <div className="card">
        <h1>Check-out</h1>
        <p><strong>Tarefa:</strong> {plan?.task || '—'}</p>
        <div className="row">
          <button onClick={()=>setStatus('ok')} className="btn btn-green" style={{flex:1, opacity: status==='ok'?1:0.85}}>Concluí</button>
          <button onClick={()=>setStatus('parcial')} className="btn" style={{flex:1, background:'#f1f5f9', opacity: status==='parcial'?1:0.85}}>Parcial</button>
          <button onClick={()=>setStatus('travou')} className="btn" style={{flex:1, background:'#fee2e2', opacity: status==='travou'?1:0.85}}>Travou</button>
        </div>
        <label style={{marginTop:12}}>Próximo passo sugerido</label>
        <input value={nextStep} onChange={(e)=>setNextStep(e.target.value)} placeholder="Ex.: revisar bullets amanhã cedo" />
        <div className="row" style={{marginTop:12}}>
          <Link href="/" className="btn btn-red" style={{flex:1}}>Cancelar</Link>
          <button onClick={concluir} className="btn btn-green" style={{flex:1}} disabled={status==='none'}>Salvar</button>
        </div>
      </div>
    </main>
  );
}
