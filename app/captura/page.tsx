'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { set, get, pushEvent } from '../../src/storage';
import { generatePlan } from '../../src/plan';

const FEELINGS = ['Medo da falha','Julgamento','Perfeccionismo','Tédio','Sobrecarga'];
const DISTRACTORS = ['Celular','Redes','Notificações','Abas abertas'];

export default function Captura() {
  const [task, setTask] = useState('');
  const [feeling, setFeeling] = useState(FEELINGS[0]);
  const [distractor, setDistractor] = useState(DISTRACTORS[0]);
  const [obs, setObs] = useState('');
  const [why, setWhy] = useState(get('why', 'Família'));
  const [reward, setReward] = useState(get('rewardDefault', '1 episódio curto'));

  useEffect(()=>{
    pushEvent({ when: Date.now(), type: 'procrastinei', payload: { where: 'captura' } });
  },[]);

  function gerarPlano() {
    const plan = generatePlan({ task, feeling, distractor, why, reward });
    set('currentPlan', plan);
    window.location.href = '/plano';
  }

  return (
    <main>
      <div className="card">
        <h1>Procrastinei agora</h1>
        <label>Tarefa evitada</label>
        <input placeholder="Ex.: finalizar proposta do cliente" value={task} onChange={(e)=>setTask(e.target.value)} />
        <div className="row">
          <div style={{flex:1}}>
            <label>Como me senti</label>
            <select value={feeling} onChange={(e)=>setFeeling(e.target.value)}>
              {FEELINGS.map(x => <option key={x}>{x}</option>)}
            </select>
          </div>
          <div style={{flex:1}}>
            <label>Distrator</label>
            <select value={distractor} onChange={(e)=>setDistractor(e.target.value)}>
              {DISTRACTORS.map(x => <option key={x}>{x}</option>)}
            </select>
          </div>
        </div>
        <label style={{marginTop:12}}>Observação (opcional)</label>
        <textarea rows={3} value={obs} onChange={(e)=>setObs(e.target.value)} />

        <div className="row" style={{marginTop:16}}>
          <Link href="/" className="btn btn-red" style={{flex:1}}>Cancelar</Link>
          <button onClick={gerarPlano} className="btn btn-green" style={{flex:1}}>Gerar plano</button>
        </div>
      </div>
    </main>
  );
}
