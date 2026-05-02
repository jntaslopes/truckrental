# Truck Rental Preview

Preview navegável da experiência VW Truck Rental construída com Next.js 16 App Router.

## Objetivo

Este repositório entrega uma preview funcional de landing page, catálogo e detalhe de caminhões por assinatura. A aplicação continua bloqueada para indexação pública e a proposta funciona como prévia local, sem envio real nem integração externa.

## Stack

- Next.js 16.2.4
- React 19
- TypeScript
- ESLint 9
- Vitest + Testing Library

## Comandos

```bash
npm run dev
npm run lint
npm run build
npm run test
npm run test:watch
```

O script `npm run dev` usa `scripts/codex-dev.mjs` para escolher uma porta livre do worktree atual e expor a identidade do runtime em `/api/codex-runtime`.

## Estrutura funcional

- `/`: landing page da preview
- `/caminhoes`: catálogo filtrável
- `/caminhoes/[slug]`: detalhe do caminhão
## Store da proposta

A proposta é centralizada no `ProposalProvider` e compartilhada entre landing, catálogo e detalhe.

- persiste entre páginas
- persiste após reload via `localStorage`
- expõe operações de domínio para adicionar, remover, atualizar quantidade e limpar a proposta

O drawer de proposta consome a store, permite organizar os dados da prévia e apresenta um feedback local sem envio real.

## Limites atuais da preview

- `robots` e metadata mantêm o projeto fora de indexação pública
- a proposta continua somente como prévia local
- não há integração com CRM, e-mail, analytics comercial ou backend externo

## Testes

A suíte cobre os fluxos essenciais desta preview:

- hidratação e persistência da store da proposta
- atualização de quantidade com saneamento
- continuidade da proposta entre consumidores/páginas
- filtro inicial do catálogo com dados unificados
- abertura e confirmação visual do drawer em modo preview
