'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { get, set, pushEvent } from '../../src/storage';
import { requestWakeLock, releaseWakeLock, enterFullscreen, exitFullscreen, setupVisibilityLogging, beep, vibrate } from '../../src/focus';
import type { Plan, Round } from '../../src/storage';

function useCountdown(startSeconds: number) {
  const [sec, setSec] = useState(startSeconds);
  useEffect(()=>{
    setSec(startSeconds);
    const id = setInterval(()=> setSec(s => (s>0? s-1 : 0)), 1000);
    return ()=> clearInterval(id);
  },[startSeconds]);
  return sec;
}

export default function TimerClient(){
  const sp = useSearchParams();
  const mode = sp.get('mode'); // 'rounds' | null
  const stage = sp.get('stage') || '2';
  const plan: Plan | null = get('currentPlan', null);
  const rounds: Round[] = useMemo(()=> plan?.rounds || [], [plan]);
  const [idx, setIdx] = useState<number>(plan?.roundIndex ?? 0);
  const [confirming, setConfirming] = useState(false);
  const [fs, setFs] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    const cleanup = setupVisibilityLogging();
    requestWakeLock();
    return ()=>{ cleanup(); releaseWakeLock(); };
  },[]);

  const seconds = useMemo(()=>{
    if (mode === 'rounds' && rounds.length) {
      const current = rounds[idx] || rounds[rounds.length-1];
      return current.minutes * 60;
    }
    return stage === '2' ? 120 : 25 * 60;
  },[mode, rounds, idx, stage]);

  const sec = useCountdown(seconds);

  useEffect(()=>{
    if(sec===0){
      beep(); vibrate();
      if (mode === 'rounds') setConfirming(true);
    }
  },[sec, mode]);

  useEffect(()=>{
    pushEvent({ when: Date.now(), type: 'round', payload: { mode: mode||'legacy', idx, seconds } });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[idx]);

  function toggleFullscreen(){
    if (!fs) enterFullscreen(containerRef.current).then(()=>setFs(true)).catch(()=>{});
    else exitFullscreen().then(()=>setFs(false)).catch(()=>setFs(false));
  }

  function nextRound(focused: boolean) {
    setConfirming(false);
    const current = get<Plan>('currentPlan', plan as any);
    if(!current) { window.location.href = '/checkout'; return; }
    let r = current.rounds || [];
    let nextIndex = (current.roundIndex ?? idx) + 1;

    if (!focused) {
      r = [...r]; r.splice(nextIndex, 0, { label:'Reset', minutes:2 });
    }

    if (nextIndex >= r.length) {
      set('currentPlan', { ...current, rounds: r, roundIndex: r.length });
      window.location.href = '/checkout';
      return;
    }

    set('currentPlan', { ...current, rounds: r, roundIndex: nextIndex });
    setIdx(nextIndex);
  }

  // legacy flow (2 -> 25)
  if (mode !== 'rounds') {
    const mm = String(Math.floor(sec/60)).padStart(2,'0');
    const ss = String(sec%60).padStart(2,'0');
    return (
      <main ref={containerRef}>
        <div className="card topbar">
          <p className="small">Tarefa: {plan?.task || '—'}</p>
          <span className="badge">Porquê: {plan?.why || '—'}</span>
        </div>
        <div className="card center">
          <p style={{fontSize:18, fontWeight:800}}>Timer</p>
          <div className="timer-circle"><p className="timer-digits">{mm}:{ss}</p></div>
          <p className="small">Sem perfeição. Só movimento.</p>
          <div className="grid2" style={{marginTop:10}}>
            <button className="btn-ghost" onClick={toggleFullscreen}>{fs?'Sair de tela cheia':'Tela cheia'}</button>
            <Link href={sec===0? (stage==='2'? '/timer?stage=25' : '/checkout') : '#'} className={sec===0?'btn-green':'btn-ghost'}>{sec===0? (stage==='2'?'Continuar 25 min':'Ir para Check-out') : '…'}</Link>
          </div>
        </div>
      </main>
    );
  }

  // rounds flow
  const current = rounds[idx] || { label:'Final', minutes:1 };
  const mm = String(Math.floor(sec/60)).padStart(2,'0');
  const ss = String(sec%60).padStart(2,'0');

  return (
    <main ref={containerRef}>
      <div className="card topbar">
        <p className="small">Tarefa: {plan?.task || '—'}</p>
        <span className="badge">Porquê: {plan?.why || '—'}</span>
      </div>
      <div className="card center">
        <p style={{fontSize:18, fontWeight:800}}>{current.label} — {current.minutes}:00</p>
        <div className="timer-circle"><p className="timer-digits">{mm}:{ss}</p></div>
        <p className="small">Sem perfeição. Só movimento.</p>
        <div className="grid2" style={{marginTop:10}}>
          <button className="btn-ghost" onClick={toggleFullscreen}>{fs?'Sair de tela cheia':'Tela cheia'}</button>
          <Link href="/plano" className="btn-ghost">Pânico</Link>
        </div>
      </div>

      {confirming && (
        <div className="card" style={{border:'2px solid rgba(22,163,74,.6)'}}>
          <h3 style={{textAlign:'center', marginBottom:8}}>Você ficou focado?</h3>
          <div className="grid2">
            <button className="btn-green" onClick={()=>nextRound(true)}>Sim, continuar</button>
            <button className="btn-ghost" onClick={()=>nextRound(false)}>Não muito</button>
          </div>
          <p className="small" style={{marginTop:6, textAlign:'center'}}>Se “Não muito”, inserimos um Reset de 2 min antes do próximo round.</p>
        </div>
      )}
    </main>
  );
}
