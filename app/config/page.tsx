'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { get, set } from '../../src/storage';

export default function Config(){
  const [why, setWhy] = useState(get('why','Criar liberdade para minha família'));
  const [reward, setReward] = useState(get('rewardDefault','1 episódio curto'));
  const [theme, setTheme] = useState<string>(typeof window!=='undefined' ? (localStorage.getItem('theme')||'dark') : 'dark');

  useEffect(()=>{ set('why', why); },[why]);
  useEffect(()=>{ set('rewardDefault', reward); },[reward]);
  useEffect(()=>{
    localStorage.setItem('theme', theme);
    if(theme==='dark') document.documentElement.classList.remove('light');
    else document.documentElement.classList.add('light');
  },[theme]);

  return (
    <main>
      <div className="card">
        <h1 style={{fontSize:24, fontWeight:900}}>Configurações</h1>
        <label className="small">Seu porquê</label>
        <input className="input" value={why} onChange={e=>setWhy(e.target.value)} />
        <label className="small" style={{marginTop:10}}>Recompensa padrão</label>
        <input className="input" value={reward} onChange={e=>setReward(e.target.value)} />

        <hr className="sep" />

        <label className="small">Tema</label>
        <div className="row">
          <button className={theme==='dark'?'btn-green':'btn-ghost'} onClick={()=>setTheme('dark')}>Dark</button>
          <button className={theme==='light'?'btn-green':'btn-ghost'} onClick={()=>setTheme('light')}>Light</button>
        </div>

        <div className="row" style={{marginTop:12}}>
          <Link href="/" className="btn-ghost" style={{flex:1, textAlign:'center'}}>← Voltar</Link>
        </div>
      </div>
    </main>
  );
}
