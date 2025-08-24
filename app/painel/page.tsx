'use client';
import Link from 'next/link';
import { get } from '../../src/storage';
import type { EventLog } from '../../src/storage';

function hourFrom(ts:number){ const d=new Date(ts); return d.getHours(); }
function groupHours(events: EventLog[]){
  const map: Record<number, number> = {};
  events.forEach(e => { const h = hourFrom(e.when); map[h] = (map[h]||0)+1; });
  return map;
}

export default function Painel(){
  const events = get<EventLog[]>('events', []);
  const logs = get<any[]>('logs', []);
  const hours = groupHours(events);
  const topHours = Object.entries(hours).sort((a,b)=>b[1]-a[1]).slice(0,3);

  const sessions = events.filter(e => e.type==='session');
  const twoMinSessions = sessions.filter(s => s.payload?.stage==='2').length;
  const continued = sessions.filter(s => s.payload?.stage==='25').length;
  const startedRate = twoMinSessions ? Math.round((continued / twoMinSessions) * 100) : 0;

  return (
    <main>
      <div className="card">
        <h1>Painel</h1>
        <p><strong>Streak:</strong> (em breve)</p>
      </div>

      <div className="card">
        <h2>Horários críticos</h2>
        {topHours.length === 0 ? <p>Nenhum dado ainda.</p> : (
          <ul>
            {topHours.map(([h, q]) => <li key={h}>📊 {h}h — {q} eventos</li>)}
          </ul>
        )}
      </div>

      <div className="card" style={{textAlign:'center'}}>
        <p className="small">Taxa de "sair do zero"</p>
        <p style={{fontSize:28, fontWeight:800}}>🔥 {startedRate}%</p>
        <p className="small">(passar de 2 min para o bloco)</p>
      </div>

      <div className="card">
        <h2>Últimos check-outs</h2>
        {logs.length===0 ? <p>Nenhum check-out.</p> : (
          <ul>
            {logs.slice(-5).reverse().map((l,i)=>(
              <li key={i}>[{new Date(l.when).toLocaleString()}] <strong>{l.status}</strong> — próximo: {l.nextStep || '—'}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <Link href="/" className="btn" style={{background:'#f1f5f9'}}>Voltar para Home</Link>
      </div>
    </main>
  );
}
