# Compliance LGPD — Nexus Kids Academy

> **Status:** Draft inicial (2026-05-08). **Requer revisão jurídica antes de produção.**
> **Marcador `[REVISÃO JURÍDICA]`** indica pontos que exigem validação legal.

## 1. Base legal

A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) trata especialmente de dados de crianças e adolescentes:

- **Art. 14, § 1º** — O tratamento de dados pessoais de crianças deverá ser realizado com o consentimento específico e em destaque dado por pelo menos um dos pais ou pelo responsável legal.
- **Art. 14, § 5º** — O controlador deve realizar todos os esforços razoáveis para verificar que o consentimento foi dado pelo responsável.
- **Art. 18** — Direito do titular: confirmação, acesso, correção, anonimização, portabilidade, eliminação, revogação do consentimento.

[REVISÃO JURÍDICA] Confirmar abrangência de Art. 14 § 3º (uso de dados sem consentimento quando estritamente necessário, ainda assim limitado).

## 2. Princípios adotados

| Princípio LGPD (Art. 6) | Implementação no Kids Academy |
| --- | --- |
| Finalidade | Apenas dados necessários para fornecer experiência educacional. Sem revenda. |
| Adequação | Tratamento compatível com finalidade declarada no consentimento. |
| Necessidade | Mínima coleta. Idade não exata (apenas série) opcional. CPF nunca em claro. |
| Livre acesso | Pai vê todos os dados via dashboard parental. |
| Qualidade | Pai pode corrigir dados a qualquer momento. |
| Transparência | Política de privacidade infantil em linguagem clara. |
| Segurança | RLS Supabase, HTTPS, MFA, criptografia em repouso (Supabase). |
| Prevenção | Audit log de eventos sensíveis. |
| Não discriminação | Sem perfil para fins discriminatórios. |
| Responsabilização | Trilha auditável de consentimentos com versão e timestamp. |

## 3. Dados coletados

### Dados do responsável (pai/mãe)

- E-mail (obrigatório, autenticação)
- Nome (obrigatório)
- Telefone (campo `responsaveis.telefone` reservado no schema, **não coletado em formulários atuais**; se for ativado no futuro, finalidade será 2FA por SMS e contato em incidentes — só com consentimento adicional explícito)
- CPF (opcional, **armazenado apenas como hash** — nunca em claro) [REVISÃO JURÍDICA]: confirmar se hash é suficiente ou se é necessário tokenização

### Dados da criança

- Nome (obrigatório)
- Data de nascimento (opcional — usamos série como alternativa)
- Série escolar (obrigatório, para personalização BNCC)
- Avatar (referência local, sem foto real)
- Progresso de aprendizagem (anônimo entre crianças)
- Eventos comportamentais (15 dimensões, ver `MENTOR_AI.md`)

### Dados que **NÃO** coletamos

- Localização GPS
- Foto / vídeo da criança
- Contatos (lista de amigos)
- Dados biométricos
- Dados de saúde
- Dados financeiros (delegados ao RevenueCat / Google / Apple)

## 4. Fluxo de consentimento

1. **Cadastro do responsável** — pai cria conta com e-mail + senha.
2. **Verificação de e-mail** — link enviado por Resend confirma posse do e-mail.
3. **Consentimento LGPD** (`/consentimento-lgpd`) — apresenta resumo dos dados e três checkboxes:
   - **Obrigatório:** tratamento de dados básicos da criança.
   - **Opcional:** análise comportamental para personalização.
   - **Opcional:** comunicação por e-mail sobre progresso.
4. **Registro auditável** — cada consentimento é gravado em `consentimentos_lgpd` com:
   - `responsavel_id`, `tipo`, `status`
   - `texto_versao` (qual versão do termo foi aceita)
   - `ip_origem`, `user_agent`, `concedido_em`
5. **Criação do perfil da criança** — só liberada após consentimento obrigatório.

[REVISÃO JURÍDICA] Validar se "esforços razoáveis para verificar consentimento parental" (Art. 14, § 5º) estão atendidos — é necessário verificação adicional além de aceite digital? Considerar opcional: confirmação por SMS, foto de documento, etc.

## 5. Direitos do titular (Art. 18)

| Direito | Implementação |
| --- | --- |
| Confirmação | `/pais/conta` mostra dados cadastrais. |
| Acesso | `/pais/dashboard` exibe todos os dados da criança. |
| Correção | Edição inline no dashboard parental. |
| Anonimização | Não aplicável — dados já são pseudonimizados (UUIDs). |
| Bloqueio | `perfis_crianca.ativo = false` desabilita sem deletar. |
| Eliminação | Função `deletar_dados_crianca(id)` cascata todos os dados relacionados. |
| Portabilidade | Export JSON em `/pais/conta/exportar-dados`. [REVISÃO JURÍDICA: formato exigido?] |
| Revogação consentimento | Toggle em `/pais/conta/consentimentos`. |

## 6. Retenção e eliminação

- **Dados ativos:** mantidos enquanto a conta estiver ativa.
- **Conta inativa:** após 24 meses sem login, conta marcada para anonimização (notificação prévia 30 dias antes).
- **Solicitação de exclusão:** processada em até 15 dias.
- **Logs de auditoria:** mantidos por 5 anos (consentimentos LGPD) [REVISÃO JURÍDICA: confirmar prazo].
- **Backups:** purgados em até 90 dias após exclusão da base ativa.

## 7. Compartilhamento com terceiros

| Terceiro | Dado compartilhado | Finalidade | Base legal |
| --- | --- | --- | --- |
| Supabase | Todos os dados (banco) | Hospedagem | Execução de contrato |
| Anthropic | Eventos comportamentais (anônimos) | MENTOR IA | Consentimento opcional |
| RevenueCat | App User ID, status assinatura | Pagamento via lojas | Execução de contrato |
| Google Play / Apple | Dados de pagamento | Cobrança | Execução de contrato |
| Resend | E-mail do responsável | Comunicação transacional | Execução de contrato |
| PostHog | Eventos anônimos (sem PII) | Analytics produto | Interesse legítimo |
| Sentry | Stack traces de erros | Debug | Interesse legítimo |

[REVISÃO JURÍDICA] Validar:
- Bases legais de cada compartilhamento
- DPAs (Data Processing Agreements) firmados com cada provedor
- Localização dos servidores (preferência: South America East para residência de dados BR)

## 8. Segurança

- **Em trânsito:** HTTPS obrigatório (Vercel + Capacitor enforcing).
- **Em repouso:** criptografia AES-256 (padrão Supabase).
- **Acesso ao banco:** Row Level Security em 100% das tabelas.
- **Autenticação:** senha mínima 8 caracteres + MFA opcional.
- **Audit log:** consentimentos versionados com IP e user-agent.
- **Secrets:** nunca em código; gerenciados via env vars Vercel + Supabase.

## 9. Encarregado pelo Tratamento de Dados (DPO)

[REVISÃO JURÍDICA] Definir DPO: pessoa física ou empresa terceirizada. ANPD requer canal de comunicação público (e-mail).

- **Canal:** dpo@kidsacademy.com.br [a configurar]
- **Tempo máximo de resposta:** 15 dias

## 10. Incidentes

Plano de resposta a incidentes:

1. Detecção (Sentry alerta + dashboards Supabase)
2. Contenção (revogar tokens, isolar componente)
3. Notificação ANPD em até 72h (Art. 48)
4. Notificação titulares (Art. 48, § 1º)
5. Postmortem em 30 dias

## 11. Roadmap de compliance

- [ ] Política de privacidade infantil revisada por advogado especializado em LGPD/educação
- [ ] Termos de uso para menores revisados
- [ ] DPA assinado com cada provedor (Supabase, Anthropic, RevenueCat, Resend, PostHog, Sentry)
- [ ] DPO designado e canal de contato público
- [ ] Auditoria de segurança externa (penetration test) antes do beta
- [ ] Plano de resposta a incidentes formalizado
- [ ] Treinamento da equipe em LGPD (eventual contratação de devs/QA)

---

**Última atualização:** 2026-05-08 (draft inicial)
**Próxima revisão obrigatória:** antes do beta fechado
