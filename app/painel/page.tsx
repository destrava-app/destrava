'use client';
import Link from 'next/link';
import { get } from '../../src/storage';
import type { EventLog } from '../../src/storage';

function hourFrom(ts:number){ return new Date(ts).getHours(); }
function groupHours(events: EventLog[]){
  const map: Record<number, number> = {};
  events.forEach(e => { const h = hourFrom(e.when); map[h] = (map[h]||0)+1; });
  return Object.entries(map).sort((a,b)=>Number(b[0])-Number(a[0]));
}

export default function Painel(){
  const events = get<EventLog[]>('events', []);
  const logs = get<any[]>('logs', []);
  const today = new Date(); today.setHours(0,0,0,0);
  const todaySessions = events.filter(e => e.type==='round' && e.when >= today.getTime());
  const twoMin = events.filter(e => e.type==='round' && e.payload?.seconds===120).length;
  const cont = events.filter(e => e.type==='round' && e.payload?.seconds && e.payload.seconds>120).length;
  const startRate = twoMin ? Math.round((cont / twoMin) * 100) : 0;
  const hours = groupHours(events);

  return (
    <main>
      <div className="card">
        <h1 style={{fontSize:24, fontWeight:900}}>Painel</h1>
      </div>

      <div className="card">
        <p className="small">Hoje</p>
        <p style={{fontSize:22, fontWeight:900}}>{todaySessions.length} rounds • {startRate}% saiu do zero</p>
      </div>

      <div className="card">
        <p className="small">Horários (últimos eventos)</p>
        {hours.length===0 ? <p>Nenhum dado ainda.</p> : (
          <ul>
            {hours.slice(0,3).map(([h,q]) => <li key={h}>📊 {h}h — {q} eventos</li>)}
          </ul>
        )}
      </div>

      <div className="card">
        <p className="small">Últimos check-outs</p>
        {logs.length===0 ? <p>Nenhum check-out.</p> : (
          <ul>
            {logs.slice(-5).reverse().map((l,i)=>(
              <li key={i}>[{new Date(l.when).toLocaleString()}] <strong>{l.status}</strong> — próximo: {l.nextStep || '—'}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <Link href="/" className="btn-ghost">← Home</Link>
      </div>
    </main>
  );
}
