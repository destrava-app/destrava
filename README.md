# Destrava v3 — PWA (Next.js App Router)

Mobile-first para foco com rounds crescentes e "Pacote Foco".
Fluxo: **Home → Start → Plano → Pacote Foco → Timer (rounds) → Check-out → Painel**.

## Rodar local
```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy na Vercel
- Importar repositório → Framework: **Next.js** → Deploy.
- PWA já configurado com `manifest.json` + `sw.js`.

## PWA
- Instale no celular (Adicionar à Tela de Início).
- Ícones em `public/icons/*`.
- Para atualizar cache: troque `CACHE_NAME` em `public/sw.js` e redeploy.

## Recursos
- **Start**: Tarefa, Porquê e Tempo total (chips + custom).
- **Plano**: mostra 1º passo + Rounds; **Pacote Foco obrigatório** (Leve/Profundo).
- **Timer**: full-screen opcional, **Wake Lock**, bip/vibração no final, confirmação de foco entre rounds.
- **Painel**: hoje + últimas estatísticas. Dados no `localStorage`.
- **Config**: Porquê, Recompensa e Tema (Dark/Light).

## Observações
- PWA não pode ativar **DND**/**Modo Avião** automaticamente; a interface guia o usuário.
- **Wake Lock** e **Fullscreen** dependem do navegador/sistema — há fallback.
- Logs de visibilidade registram quando o app fica em background durante o round.
