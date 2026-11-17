# Estrutura intermediária opcional para gerar o relatório

O agente pode criar JSON temporário para `scripts/build_report.mjs`. Não é uma entrega obrigatória.

```json
{
  "project": "Projeto Exemplo",
  "date": "2026-11-16",
  "scope": "Arquivos e componentes efetivamente inspecionados",
  "headline": "Síntese curta para a visão geral.",
  "method": "Inspeção estática",
  "summary": "Resumo objetivo em até 240 caracteres.",
  "findings": [
    {"id":"IA-001", "title":"Título específico", "severity":"alta", "confidence":"confirmado", "evidence":"src/App.tsx:42 — evidência objetiva", "impact":"Impacto direto.", "recommendation":"Correção específica."}
  ],
  "coverage": [
    {"area":"Responsividade", "status":"parcial", "reason":"CSS inspecionado; sem teste visual."}
  ],
  "limitations": ["Não foram realizados testes com navegador."]
}
```

Valores: `severity` = `critica|alta|media|baixa`; `confidence` = `confirmado|hipotese`; `status` = `concluida|parcial|nao_executada`.
