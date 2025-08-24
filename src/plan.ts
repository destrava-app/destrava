'use client';
import type { Plan, Round } from './storage';

type Inputs = { task: string; feeling: string; distractor: string; why: string; reward: string; totalMinutes?: number };
export function generatePlan(i: Inputs): Plan {
  const firstStep = chooseFirstStep(i.task);
  const phrase = `Se eu não agir hoje em ${i.task}, vou me arrepender daqui a 1 ano.`;
  const total = i.totalMinutes && i.totalMinutes > 0 ? i.totalMinutes : undefined;
  const rounds = total ? computeRounds(total) : undefined;
  return {
    task: i.task || 'Tarefa sem título',
    firstStep,
    distractor: i.distractor || 'Celular em outro cômodo',
    reward: i.reward || '1 episódio curto',
    why: i.why || 'Família',
    phrase,
    createdAt: Date.now(),
    totalMinutes: total,
    rounds,
    roundIndex: 0,
  };
}
function chooseFirstStep(task: string) {
  const t = task.toLowerCase();
  if (t.includes('apresenta') || t.includes('slide')) return 'Abrir slides e listar 3 bullets do tópico 1';
  if (t.includes('email') || t.includes('e-mail')) return 'Abrir rascunho e escrever a 1ª frase';
  if (t.includes('proposta') || t.includes('orçamento')) return 'Abrir doc e anotar 3 itens do escopo';
  return 'Abrir o doc/arquivo e escrever 3 bullets rápidos';
}
export function computeRounds(totalMinutes: number): Round[] {
  const seq: Round[] = [
    { label: 'Start', minutes: 2 },
    { label: 'Round 2', minutes: 15 },
    { label: 'Round 3', minutes: 25 },
    { label: 'Round 4', minutes: 45 },
  ];
  let acc = 0; const out: Round[] = [];
  for (const r of seq) {
    if (acc >= totalMinutes) break;
    const remaining = totalMinutes - acc;
    if (r.minutes <= remaining) { out.push(r); acc += r.minutes; }
    else { out.push({ label: 'Final Round', minutes: remaining }); acc += remaining; break; }
  }
  if (acc < totalMinutes) {
    const remaining = totalMinutes - acc;
    if (remaining > 0) out.push({ label: 'Final Round', minutes: remaining });
  }
  return out;
}
