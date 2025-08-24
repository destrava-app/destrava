'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { get, pushEvent } from '../../src/storage';
import type { Plan } from '../../src/storage';

function useCountdown(startSeconds: number) {
  const [sec, setSec] = useState(startSeconds);
  useEffect(()=>{
    const id = setInterval(()=> setSec(s => (s>0? s-1 : 0)), 1000);
    return ()=> clearInterval(id);
  },[startSeconds]);
  return sec;
}

export default function TimerClient() {
  const sp = useSearchParams();
  const stage = sp.get('stage') || '2';
  const plan: Plan | null = get('currentPlan', null);
  const seconds = stage === '2' ? 120 : (plan?.blockMinutes || 25) * 60;
  const sec = useCountdown(seconds);

  useEffect(()=>{
    pushEvent({ when: Date.now(), type: 'session', payload: { stage } });
  },[stage]);

  const mm = String(Math.floor(sec/60)).padStart(2,'0');
  const ss = String(sec%60).padStart(2,'0');

  return (
    <main>
      <div className="card" style={{textAlign:'center'}}>
        <h1>Timer</h1>
        <p style={{fontSize:64, fontFamily:'monospace', margin: '8px 0'}}>{mm}:{ss}</p>
        {sec === 0 ? (
          stage === '2' ? (
            <Link href="/timer?stage=25" className="btn btn-green">Continuar {plan?.blockMinutes || 25} min</Link>
          ) : (
            <Link href="/checkout" className="btn btn-green">Ir para Check-out</Link>
          )
        ) : (
          <p className="small">Sem perfeição. Só movimento.</p>
        )}
      </div>
    </main>
  );
}
