'use client';
export type Round = { label: string; minutes: number };
export type Plan = {
  task: string;
  firstStep: string;
  distractor: string;
  reward: string;
  why: string;
  phrase: string;
  createdAt: number;
  // rounds
  totalMinutes?: number;
  rounds?: Round[];
  roundIndex?: number;
};
export type EventLog = {
  when: number;
  type: 'procrastinei' | 'session' | 'round' | 'visibility';
  payload: any;
};
export function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch { return fallback; }
}
export function set<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}
export function pushEvent(e: EventLog) {
  const arr = get<EventLog[]>('events', []);
  arr.push(e);
  set('events', arr);
}
