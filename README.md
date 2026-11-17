# interface-audit v1.0.0

Skill de auditoria de UX, UI, acessibilidade e responsividade de projetos locais, somente leitura. Funciona no **Claude Code** e no **Codex**. Entrega o **Relatório de auditoria da interface**, com visual GNZ, que pode ser salvo como PDF pelo navegador.

> **Distribuição gratuita, não é open source.** Uso pessoal e profissional gratuito; redistribuição, modificação e comercialização exigem autorização. Veja [LICENSE.md](LICENSE.md).

## Requisitos

- Claude Code ou Codex, em qualquer sistema operacional.
- Um navegador moderno (Chrome, Edge, Firefox ou Safari) para abrir o relatório e salvar como PDF.
- **Node.js 18 ou superior (opcional)**, para gerar o relatório com `scripts/build_report.mjs`. Sem Node, o agente monta o HTML diretamente a partir de `templates/report.html`.
- Sem Python, ReportLab, Playwright ou outras bibliotecas. Sem dependências externas ou fontes de terceiros.

## Instalação

Copie a pasta inteira (`SKILL.md`, `references/`, `templates/`, `scripts/` e, se quiser, `examples/`) para o diretório de skills do agente. O destino final deve ser `.../skills/interface-audit/SKILL.md`, sem criar `interface-audit/interface-audit`.

| Sistema | Claude Code | Codex |
|---|---|---|
| Windows | `%USERPROFILE%\.claude\skills\interface-audit\` | `%USERPROFILE%\.agents\skills\interface-audit\` |
| macOS / Linux | `~/.claude/skills/interface-audit/` | `~/.agents/skills/interface-audit/` |

macOS/Linux (Claude Code):

```sh
mkdir -p ~/.claude/skills
cp -R interface-audit ~/.claude/skills/interface-audit
```

Windows (PowerShell, Claude Code):

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\skills" | Out-Null
Copy-Item -Recurse .\interface-audit "$env:USERPROFILE\.claude\skills\interface-audit"
```

Para atualizar, substitua a pasta anterior. Depois, abra uma nova sessão do agente.

## Uso

- Claude Code: `/interface-audit`
- Codex: `$interface-audit`

Prompt sugerido: `Audite o projeto local aberto. Não altere o código. Entregue até cinco achados prioritários, cobertura e o Relatório de auditoria da interface dentro da pasta interface-audit na raiz do projeto. Abra no navegador.`

## Relatório e PDF

O relatório final é **um único arquivo HTML autônomo**, salvo em `<raiz-do-projeto>/interface-audit/relatorio-de-auditoria-da-interface.html`. Se já existir, uma subpasta datada preserva a versão anterior. O agente tenta abri-lo no navegador padrão; se não conseguir, informa o caminho para abertura manual. Para obter o PDF, clique em **Salvar como PDF** e escolha o destino no diálogo de impressão.

O agente pode gerar o relatório com Node.js usando `scripts/build_report.mjs`, ou criar o HTML diretamente a partir do template. O JSON é intermediário e opcional (formato em `references/report-schema.md`).

O template traz indicadores, até cinco prioridades em destaque, demais achados, cobertura e limitações, com cards em fundos suaves por severidade.

## Gerar um relatório de teste

A partir da pasta da skill, com Node.js 18+:

```sh
node scripts/build_report.mjs examples/exemplo-generico.json teste.html
```

O gerador não sobrescreve arquivos existentes: se a saída já existir, escolha outro nome. O exemplo `examples/exemplo-relatorio.html` foi gerado assim, com dados inteiramente fictícios, apenas para demonstrar a apresentação. Não representa uma auditoria real.

## Limites

A análise estática não substitui inspeção visual, testes com usuários ou verificação WCAG completa. Cada categoria informa se a verificação foi concluída, parcial ou não executada, com motivo. Não há modo Web nesta versão. A skill não altera código, configuração ou documentação do projeto auditado. A única escrita permitida é a pasta `interface-audit/` com o relatório. Essa pasta aparecerá no controle de versão como não rastreada até que você decida ignorá-la ou versioná-la; a skill não edita `.gitignore`.

## Validação sugerida

1. Confirmar stack e escopo corretos.
2. Verificar evidências e recomendações dos achados.
3. Confirmar cobertura honesta e concisão.
4. Confirmar que o relatório está na raiz do projeto em `interface-audit/`, que abre no navegador e testar **Salvar como PDF**.
5. Conferir que o projeto auditado não foi modificado.

## Contribuições e forks

O repositório é público e o GitHub permite forks para consulta e para propor mudanças por pull request. Isso não autoriza modificar para uso próprio nem redistribuir a skill; veja [LICENSE.md](LICENSE.md). Sugestões e problemas podem ser enviados em issues.

## Licença e autoria

© Bárbara Gianazi - GNZ. Todos os direitos reservados, salvo o que [LICENSE.md](LICENSE.md) permitir. O nome e a identidade visual GNZ não estão licenciados para uso por terceiros. A fonte Maison Neue não é distribuída; o relatório a usa somente se estiver instalada e licenciada no sistema.
