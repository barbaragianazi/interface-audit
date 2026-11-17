# Critérios de auditoria — v1.0.0

Aplique somente critérios relevantes ao escopo. Não trate inferência a partir do código como teste visual executado.

1. **Fluxos e navegação:** rotas, rótulos, orientação, estados e ações primárias; heurísticas de Nielsen e lei de Jakob.
2. **Hierarquia e UI:** ordem de leitura, agrupamento, proximidade, semelhança, contraste visual e consistência de tokens.
3. **Carga cognitiva:** excesso de escolhas (Hick), organização de conteúdo, instruções e complexidade desnecessária (Tesler).
4. **Interação e feedback:** estados loading, vazio, erro, sucesso, desabilitado, prevenção e recuperação de erro; feedback perceptível.
5. **Formulários:** labels, tipos, obrigatoriedade, mensagens, validação, foco, autocomplete e acessibilidade.
6. **Acessibilidade WCAG 2.2 AA:** semântica, nomes acessíveis, teclado, foco visível, contraste, redimensionamento, reflow, tamanho/espaçamento de alvos e mensagens de estado. Não declarar conformidade WCAG completa por inspeção estática.
7. **Responsividade:** breakpoints, overflow, tabelas, modais, tipografia, alvos de toque, zoom e orientação. Testes de viewport só podem ser marcados como realizados se houver navegador ou evidência visual.
8. **Design System:** aderência a tokens, componentes, estados e `design.md` quando existirem; sem impor um design system a projetos que não o adotam.
9. **Performance percebida:** apenas riscos observáveis no código; não declarar métricas Core Web Vitals sem medição.

Para cada problema: evidência concreta, por que importa, ação específica e severidade. Referencie a lei/heurística somente quando realmente acrescentar contexto.
