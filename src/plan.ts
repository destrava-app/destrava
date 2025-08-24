'use client';
import type { Plan } from './storage';

type Inputs = {
  task: string;
  feeling: string;
  distractor: string;
  why: string;
  reward: string;
};
export function generatePlan(i: Inputs): Plan {
  const firstStep = chooseFirstStep(i.task);
  const blockMinutes = i.feeling === 'Sobrecarga' ? 15 : 25;
  const phrase = `Se eu não agir hoje em ${i.task}, vou me arrepender daqui a 1 ano.`;
  return {
    task: i.task || 'Tarefa sem título',
    firstStep,
    blockMinutes,
    distractor: i.distractor || 'Celular em outro cômodo',
    reward: i.reward || '1 episódio curto',
    why: i.why || 'Família',
    phrase,
    createdAt: Date.now(),
  };
}
function chooseFirstStep(task: string) {
  const t = task.toLowerCase();
  if (t.includes('apresenta') || t.includes('slide')) return 'Abrir slides e listar 3 bullets do tópico 1';
  if (t.includes('email') || t.includes('e-mail')) return 'Abrir rascunho e escrever a primeira frase do email';
  if (t.includes('proposta') || t.includes('orçamento')) return 'Abrir doc e anotar 3 itens do escopo';
  return 'Abrir o doc/arquivo e escrever 3 bullets rápidos';
}
