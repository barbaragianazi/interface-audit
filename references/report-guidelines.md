# Diretrizes de relatório — v1.0.0

- Nome: **Relatório de auditoria da interface**. Entrega exclusiva HTML autocontido, exportável a PDF por impressão nativa.
- Visual GNZ aprovado: #161616, #434343, #CCFF00, #FDFDFD; Maison Neue se disponível, fallback local. Sem fontes externas nem arquivos de fontes distribuídos.
- Visão geral: headline curta, resumo até 240 caracteres, quatro indicadores derivados dos achados.
- Mostrar até cinco achados de maior prioridade primeiro; os demais em seção própria. Nunca omitir achados relevantes só para reduzir a lista.
- Cards: fundo vermelho suave para crítica/alta, âmbar para média, verde suave para baixa. Sempre incluir rótulo textual. Título peso 600; impacto 400; recomendação 500; metadados 600.
- Cada achado: gravidade, confirmado/hipótese, título, impacto, correção objetiva e evidência técnica recolhível. Evidências precisam estar presentes no HTML, inclusive na impressão.
- Cobertura: concluída/parcial/não executada com motivo. Inspeção estática não significa teste funcional ou conformidade WCAG.
- Limitações resumidas. Não inventar screenshots, testes ou notas.
- Salvar em `<raiz>/interface-audit/relatorio-de-auditoria-da-interface.html`; se existir, criar subpasta datada sem sobrescrever.
- Abrir navegador padrão se permitido, sem afirmar sucesso sem confirmação. Não modificar código nem `.gitignore`.
- Gerar com Node embutido, sem pacotes: `node scripts/build_report.mjs entrada.json saida.html`. Se Node não estiver disponível, criar o HTML diretamente seguindo `templates/report.html`.
- Botão Salvar como PDF usa `window.print()`; não gerar PDF automaticamente.
- Para testar a apresentação, use `examples/exemplo-generico.json` (dados fictícios).
