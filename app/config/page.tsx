'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { get, set } from '../../src/storage';

export default function Config(){
  const [why, setWhy] = useState(get('why', 'Criar liberdade para minha família'));
  const [reward, setReward] = useState(get('rewardDefault', '1 episódio curto'));

  useEffect(()=>{
    set('why', why);
    set('rewardDefault', reward);
  },[why, reward]);

  return (
    <main>
      <div className="card">
        <h1>Configurações</h1>
        <label>Seu porquê</label>
        <input value={why} onChange={(e)=>setWhy(e.target.value)} />
        <label style={{marginTop:12}}>Recompensa padrão</label>
        <input value={reward} onChange={(e)=>setReward(e.target.value)} />
        <p className="small" style={{marginTop:8}}>Essas preferências são salvas no seu dispositivo.</p>
        <Link href="/" className="btn" style={{background:'#f1f5f9', marginTop:12}}>← Voltar</Link>
      </div>
    </main>
  );
}
