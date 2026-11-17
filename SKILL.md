---
name: interface-audit
description: Audita UX, UI, acessibilidade e responsividade de projetos locais sem alterar código. Produz feedback breve e um Relatório de auditoria da interface visual, imprimível em PDF pelo navegador. Use para revisar interfaces em projetos abertos no Claude Code ou Codex.
---

# interface-audit — v1.0.0

## Limites e segurança
- Audite somente o projeto local aberto. Não use modo Web ou Playwright nesta versão.
- Somente leitura: não edite arquivos do projeto, não instale dependências, não faça commits nem altere configurações. Se o aplicativo não estiver rodando, solicite autorização antes de iniciá-lo.
- Ignore segredos, `.env`, `node_modules`, `.git`, `dist`, builds e dados privados. Não inclua segredos nem informações pessoais no relatório.
- Exceção expressamente autorizada: criar somente arquivos de relatório em `<raiz-do-projeto>/interface-audit/`. Não modificar nenhum outro arquivo do projeto, incluindo `.gitignore`. Nunca sobrescrever um relatório existente; se já existir, criar uma subpasta datada ou nome único.

## Fluxo
1. Identifique stack, páginas, rotas, componentes, estilos, tokens, documentação e `design.md` quando existir. Declare exatamente o que foi lido.
2. Consulte `references/criteria.md`. Avalie fluxos, hierarquia, consistência, feedback, formulários, responsividade e WCAG 2.2 AA. Leis de UX são lentes contextuais, não checklist obrigatório.
3. Registre apenas achados verificáveis, com caminho/linha ou evidência visual efetivamente observada, severidade, impacto e recomendação objetiva. Marque cada um como `confirmado` ou `hipotese`; não invente observações visuais.
4. Para cada dimensão, declare cobertura `concluida`, `parcial` ou `nao_executada` e motivo. `Concluida` significa escopo inspecionado, NÃO que todos os testes passaram. Sem navegador, avaliações visuais, teclado real e WCAG completa não são concluídas.
5. No chat, apresente até cinco achados prioritários, em 1–2 frases cada, e cobertura resumida. Sem introduções longas, sem encher a lista artificialmente.
6. Entregue **um único arquivo final HTML**, intitulado **Relatório de auditoria da interface**, visual GNZ, que o usuário pode abrir e salvar como PDF usando o botão `Salvar como PDF` (impressão nativa). NÃO gere PDF automaticamente, NÃO exija Python, ReportLab ou bibliotecas adicionais. NÃO divulgue o formato HTML como diferencial: chame a entrega de relatório completo da análise.
7. **Entrega e abertura:** salve o relatório final em `<raiz-do-projeto>/interface-audit/relatorio-de-auditoria-da-interface.html`. Se já existir, use `<raiz-do-projeto>/interface-audit/YYYY-MM-DD-HHMMSS/relatorio-de-auditoria-da-interface.html` (ou outro nome único). Não use `Temp`, `scratchpad` nem links para arquivos temporários como entrega final. A criação desta pasta e de seus relatórios é a única escrita autorizada dentro do repositório. Verifique a existência do arquivo final. Tente abri-lo no navegador padrão usando um caminho local de arquivo, **não** um link Markdown `C:/...` que o VS Code pode interpretar como código. No Windows, prefira `Start-Process -FilePath <caminho-absoluto>` via PowerShell, com argumento devidamente escapado; no macOS use `open <caminho-absoluto>` e no Linux `xdg-open <caminho-absoluto>`; se não houver permissão ou não funcionar, forneça o caminho absoluto e instrua a abrir pelo Explorador de Arquivos. Nunca alegue abertura bem-sucedida sem confirmação.
8. Para construir o relatório, prefira `scripts/build_report.mjs` com Node.js já disponível: `node scripts/build_report.mjs entrada.json saida.html`. O JSON é intermediário e não precisa ser entregue. Caso Node.js não esteja disponível, gere diretamente um HTML estático equivalente seguindo `references/report-guidelines.md` e `templates/report.html`. **A falta de Node não pode impedir a entrega do relatório.** Nunca afirme que um arquivo foi criado sem verificar sua existência.

## Severidade
- `critica`: bloqueio essencial ou barreira grave com evidência.
- `alta`: prejudica tarefa central ou acessibilidade de forma relevante.
- `media`: atrito significativo ou inconsistência recorrente.
- `baixa`: melhoria pontual.
Sem score numérico arbitrário.

## Relatório
- O cabeçalho deve conter apenas nome do projeto, data e método/escopo resumido (até 140 caracteres). Lista detalhada de arquivos, quando necessária, deve ficar em seção secundária, nunca na capa.
- Resumo executivo até 240 caracteres; adicione `headline` curta para a visão geral. Evidência, impacto e correção com uma frase objetiva cada; evitar parágrafos extensos.
- Título exato: `Relatório de auditoria da interface`.
- Cores GNZ: #161616, #434343, #CCFF00, #FDFDFD. Não distribuir fontes; usar Maison Neue apenas se instalada/licenciada; caso contrário, fallback de sistema.
- Logotipo original somente se acessível e autorizado; não reconstruir.
- Estrutura v1.0.0: visão geral e indicadores; até 5 prioridades; demais achados; cobertura; limitações. Preserve todos os achados relevantes, sem inflar a quantidade. Não adicionar texto genérico ou excesso de páginas.
- Usar o template v1.0.0 com cards de severidade em fundos suaves (alta vermelha, média âmbar, baixa verde), título semibold 600, impacto regular 400 e recomendação medium 500. Evidências técnicas recolhíveis na tela. Usar HTML sem recursos externos (CSS e scripts embutidos), com impressão A4 e botão `Salvar como PDF` acionando `window.print()`.

## Invocação
- Claude Code: `/interface-audit`
- Codex: `$interface-audit`
- Não implementar recomendações; apenas sugerir.
