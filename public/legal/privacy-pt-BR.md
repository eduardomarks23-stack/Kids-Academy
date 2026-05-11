# Política de Privacidade — Nexus Kids Academy

> **AVISO: TEXTO PROVISÓRIO**
>
> Este texto é um placeholder operacional para implementação técnica do fluxo de consentimento.
> O texto jurídico oficial deve ser substituído antes de qualquer release pública,
> após revisão por advogado especializado em LGPD/proteção de menores.
> Marcadores `[REVISÃO JURÍDICA]` indicam pontos que precisam de validação legal.

**Versão**: 1.0 (placeholder)  
**Última atualização**: 11 de maio de 2026

---

## 1. Quem somos

Nexus Kids Academy é um produto educacional digital operado pela **Nexus / Eduardo Marks**
(identificação completa em [REVISÃO JURÍDICA]). Direcionado a crianças de 3 a 8 anos,
sob responsabilidade obrigatória dos pais.

## 2. Dados que coletamos

Coletamos o **mínimo necessário** para o funcionamento do produto, em conformidade com o
Art. 14 da LGPD e tratamento de dados de crianças.

### Da criança
- Apelido (`display_name`) — **não exigimos nome legal completo**
- Ano de nascimento (`birth_year`) — **não dia/mês**
- Avatar/seed visual escolhido
- Preferência de mão (canhoto/destro), se informada
- Progresso pedagógico (sessões completadas, conceitos dominados, tempo gasto)

### Do responsável
- Email + senha (Supabase Auth)
- País / idioma
- Histórico de assinatura (via RevenueCat)
- Registro de consentimento (escopos, data, IP, user agent — para defesa jurídica)

## 3. Como usamos

| Finalidade | Base legal | Dados |
|---|---|---|
| Funcionamento básico do app | Consentimento + Execução de contrato | Todos os dados da criança e do responsável |
| Melhoria pedagógica anônima | Consentimento (opcional) | Eventos comportamentais agregados, sem PII |
| Comunicações sobre o filho | Consentimento (opcional) | Email do responsável |

## 4. Direitos do titular

Você pode, a qualquer momento, via `/settings/lgpd`:

- **Exportar** todos os dados da sua criança (JSON)
- **Excluir** os dados (soft delete + hard delete em 30 dias)
- **Corrigir** dados cadastrais
- **Revogar consentimento** parcial ou total

## 5. Compartilhamento

[REVISÃO JURÍDICA] Não compartilhamos dados pessoais de crianças com terceiros para fins de marketing.
Compartilhamos apenas com:
- Supabase (provedor de infra) — sob contrato com cláusulas LGPD
- Stripe / RevenueCat (pagamento) — apenas dados do responsável
- Cloudflare Stream (vídeos) — apenas conteúdo, não dados de criança

## 6. Segurança

- Senhas com hash bcrypt
- Comunicação sempre via HTTPS
- RLS (Row-Level Security) em todas as tabelas Supabase
- Service role keys server-side only
- PIN parental com bcrypt (4 dígitos)

## 7. Contato

[REVISÃO JURÍDICA] Para exercer seus direitos, contate o encarregado de dados em:
**privacidade@nexuskids.app** (placeholder — substituir por endereço real)

---

*Este documento é parte do fluxo técnico de implementação. Substituir antes de release.*
