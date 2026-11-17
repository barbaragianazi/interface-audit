// interface-audit v1.0.0 · HTML autocontido, sem dependências externas.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const [input, output] = process.argv.slice(2);
if (!input || !output) { console.error('Uso: node build_report.mjs entrada.json saida.html'); process.exit(2); }
if (existsSync(output)) { console.error('O relatório já existe. Use uma pasta datada, sem sobrescrever.'); process.exit(2); }
const d = JSON.parse(readFileSync(input,'utf8'));
const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const norm = v => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const validSeverity = new Set(['critica','alta','media','baixa']);
const findings = (d.findings ?? []).map((f,i)=>({...f, severity:validSeverity.has(norm(f.severity))?norm(f.severity):'media',_order:i}));
const rank={critica:0,alta:1,media:2,baixa:3};
findings.sort((a,b)=>rank[a.severity]-rank[b.severity] || a._order-b._order);
const top=findings.slice(0,5), others=findings.slice(5);
const label={critica:'Crítica',alta:'Alta',media:'Média',baixa:'Baixa'};
function card(f,i){const conf=norm(f.confidence)==='confirmado'?'Confirmado no código':norm(f.confidence)==='hipotese'?'Hipótese a validar':String(f.confidence||'Evidência limitada');return `<article class="finding ${f.severity}"><div class="f-head"><div class="f-num">${String(i+1).padStart(2,'0')}</div><div class="f-main"><div class="tags"><span class="severity">${label[f.severity]}</span><span class="verification">${esc(conf)}</span></div><h3>${esc(f.title)}</h3></div></div><p class="impact">${esc(f.impact)}</p><div class="fix"><span class="mini-label">O que fazer</span><p>${esc(f.recommendation)}</p></div><details><summary>Ver evidência técnica</summary><div class="evidence">${esc(f.evidence)}</div></details></article>`;}
const stats=[['Achados documentados',findings.length,''],['Alta prioridade',findings.filter(f=>['alta','critica'].includes(f.severity)).length,'high'],['Média prioridade',findings.filter(f=>f.severity==='media').length,''],['Hipóteses a validar',findings.filter(f=>norm(f.confidence)==='hipotese').length,'hyp']].map(([l,n,c])=>`<div class="stat ${c}"><b>${n}</b><span>${l}</span></div>`).join('');
const coverage=(d.coverage??[]).map(c=>{const st=norm(c.status),cl=st==='concluida'?'done':st==='parcial'?'partial':'notdone',name=st==='concluida'?'Concluída*':st==='parcial'?'Parcial':'Não executada';return `<div class="coverage-row"><span>${esc(c.area)}</span><span class="cov-status ${cl}">${name}</span><small>${esc(c.reason)}</small></div>`}).join('');
const limits=(d.limitations??[]).map(l=>`<li>${esc(l)}</li>`).join('') || '<li>Sem limitações adicionais registradas.</li>';
let t=readFileSync(resolve(dirname(fileURLToPath(import.meta.url)),'../templates/report.html'),'utf8');
const fields={PROJECT:d.project,DATE:d.date,METHOD:d.method||'Inspeção estática',HEADLINE:d.headline||'Oportunidades de melhoria identificadas na interface.',SUMMARY:d.summary||'Consulte os achados priorizados e suas evidências.',STATS:stats,PRIORITY_COUNT:top.length,PRIORITIES:top.map(card).join('')||'<p>Nenhum achado registrado no escopo.</p>',OTHER_COUNT:others.length,OTHERS:others.map((f,i)=>card(f,i+top.length)).join('')||'<p>Sem outros achados.</p>',COVERAGE:coverage,LIMITATIONS:limits};
for(const [key,val] of Object.entries(fields)) t=t.replaceAll(`{{${key}}}`,['STATS','PRIORITIES','OTHERS','COVERAGE','LIMITATIONS'].includes(key)?String(val):esc(val));
mkdirSync(dirname(resolve(output)),{recursive:true});
writeFileSync(output,t,{encoding:'utf8',flag:'wx'});
console.log(resolve(output));
