import { Suspense } from 'react';
import TimerClient from './TimerClient';

export const dynamic = 'force-dynamic';

export default function TimerPage(){
  return (
    <Suspense fallback={<main><div className="card center"><h1>Timer</h1><p>Carregando…</p></div></main>}>
      <TimerClient />
    </Suspense>
  );
}
