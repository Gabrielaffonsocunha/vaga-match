import "./style.css";

type SkillCategory = "Linguagens" | "Web e APIs" | "Ferramentas" | "Práticas";

interface Skill {
  name: string;
  category: SkillCategory;
  aliases: string[];
}

interface SkillMatch {
  skill: Skill;
  inResume: boolean;
}

interface Analysis {
  score: number;
  matched: Skill[];
  missing: Skill[];
  detected: number;
}

const skillCatalog: Skill[] = [
  { name: "TypeScript", category: "Linguagens", aliases: ["typescript", "ts"] },
  { name: "JavaScript", category: "Linguagens", aliases: ["javascript", "js"] },
  { name: "Java", category: "Linguagens", aliases: ["java"] },
  { name: "Python", category: "Linguagens", aliases: ["python"] },
  { name: "SQL", category: "Linguagens", aliases: ["sql"] },
  { name: "HTML", category: "Web e APIs", aliases: ["html"] },
  { name: "CSS", category: "Web e APIs", aliases: ["css"] },
  { name: "React", category: "Web e APIs", aliases: ["react", "react.js", "reactjs"] },
  { name: "Node.js", category: "Web e APIs", aliases: ["node.js", "nodejs"] },
  { name: "Spring Boot", category: "Web e APIs", aliases: ["spring boot"] },
  { name: "FastAPI", category: "Web e APIs", aliases: ["fastapi", "fast api"] },
  { name: "APIs REST", category: "Web e APIs", aliases: ["api rest", "apis rest", "rest api", "restful"] },
  { name: "PostgreSQL", category: "Ferramentas", aliases: ["postgresql", "postgres"] },
  { name: "MySQL", category: "Ferramentas", aliases: ["mysql"] },
  { name: "Docker", category: "Ferramentas", aliases: ["docker", "docker compose"] },
  { name: "Git", category: "Ferramentas", aliases: ["git", "github"] },
  { name: "AWS", category: "Ferramentas", aliases: ["aws", "amazon web services"] },
  { name: "Azure", category: "Ferramentas", aliases: ["azure"] },
  { name: "Linux", category: "Ferramentas", aliases: ["linux"] },
  { name: "Testes automatizados", category: "Práticas", aliases: ["testes automatizados", "testes unitarios", "unit tests", "jest", "vitest", "junit"] },
  { name: "CI/CD", category: "Práticas", aliases: ["ci/cd", "continuous integration", "integracao continua", "github actions"] },
  { name: "Metodologias ágeis", category: "Práticas", aliases: ["metodologias ageis", "scrum", "kanban", "agile"] },
  { name: "Comunicação", category: "Práticas", aliases: ["comunicacao", "comunicacao clara"] },
];

const exampleResume = `Gabriel Affonso Cunha\nDesenvolvedor Júnior | Infraestrutura e Automação\n\nEstudante de Análise e Desenvolvimento de Sistemas com experiência prática em suporte e infraestrutura de TI. Desenvolvo APIs REST com Python, FastAPI e Java, além de interfaces com HTML, CSS e JavaScript.\n\nProjetos:\n• Gestão de chamados com Java, Spring Boot e PostgreSQL\n• Monitoramento de serviços com Docker e GitHub Actions\n• Painel web com TypeScript, JavaScript e APIs REST\n\nConhecimentos: Git, GitHub, Docker, SQL, Linux, testes automatizados, comunicação com áreas de negócio e metodologias ágeis.`;

const exampleJob = `Pessoa Desenvolvedora Júnior\n\nBuscamos alguém para desenvolver e manter aplicações web.\n\nRequisitos: JavaScript ou TypeScript, React, Node.js, APIs REST, SQL, Git e testes automatizados. Docker e metodologias ágeis são diferenciais. Valorizamos comunicação clara, curiosidade e vontade de aprender.`;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("O elemento principal da aplicação não foi encontrado.");
}

app.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#inicio" aria-label="VagaMatch, início">
        <span class="brand-mark" aria-hidden="true">v<span>+</span></span>
        <span class="brand-name">vaga<span>match</span></span>
      </a>
      <div class="topbar-meta"><span class="status-dot"></span> Análise local no navegador</div>
      <a class="topbar-link" href="#como-funciona">Como funciona <span aria-hidden="true">↗</span></a>
    </header>

    <main id="inicio">
      <section class="intro">
        <div class="intro-copy">
          <div class="eyebrow"><span class="eyebrow-line"></span> FERRAMENTA DE CARREIRA · VERSÃO 1.0</div>
          <h1>Mostre o que você<br /><em>já sabe fazer.</em></h1>
          <p>Compare seu currículo com uma vaga e encontre os pontos que merecem destaque. Seus textos ficam neste navegador.</p>
        </div>
        <div class="intro-stamp" aria-label="Seus dados não saem do navegador">
          <span class="stamp-icon" aria-hidden="true">↗</span>
          <span>PRIVACIDADE<br /><strong>NO SEU NAVEGADOR</strong></span>
        </div>
      </section>

      <section class="workspace" aria-label="Análise de compatibilidade">
        <div class="workspace-head">
          <div><span class="section-kicker">01 — CONTEXTO</span><h2>Comece com os dois textos</h2></div>
          <button class="text-button" id="example-button" type="button"><span aria-hidden="true">✳</span> Carregar exemplo</button>
        </div>

        <div class="input-grid">
          <label class="input-card" for="resume-input">
            <span class="input-title"><span class="input-index">A</span> SEU CURRÍCULO</span>
            <textarea id="resume-input" maxlength="10000" placeholder="Cole aqui o resumo, experiências e competências do currículo…" spellcheck="false"></textarea>
            <span class="input-foot"><span>O conteúdo permanece no dispositivo</span><span id="resume-count">0 / 10.000</span></span>
          </label>
          <label class="input-card input-card-accent" for="job-input">
            <span class="input-title"><span class="input-index">B</span> DESCRIÇÃO DA VAGA</span>
            <textarea id="job-input" maxlength="10000" placeholder="Cole aqui a descrição e os requisitos da oportunidade…" spellcheck="false"></textarea>
            <span class="input-foot"><span>Inclua os requisitos da oportunidade</span><span id="job-count">0 / 10.000</span></span>
          </label>
        </div>

        <div class="action-row">
          <p id="form-status" class="form-status" role="status">Carregue um exemplo ou cole seus textos para começar.</p>
          <div class="action-buttons">
            <button id="clear-button" class="button button-secondary" type="button">Limpar</button>
            <button id="analyze-button" class="button button-primary" type="button">
              Analisar compatibilidade <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <section id="results" class="results" aria-live="polite" aria-label="Resultado da análise">
        <div class="results-placeholder">
          <span class="placeholder-mark" aria-hidden="true">↘</span>
          <div><span class="section-kicker">02 — LEITURA</span><h2>A análise aparece aqui</h2><p>Você verá as competências encontradas no currículo e os requisitos que ainda não aparecem no texto.</p></div>
        </div>
      </section>

      <section class="how-it-works" id="como-funciona">
        <div class="how-heading"><span class="section-kicker">TRANSPARÊNCIA</span><h2>Uma leitura útil, sem prometer mágica.</h2></div>
        <div class="how-grid">
          <article><span class="how-number">01</span><h3>Compara termos conhecidos</h3><p>A ferramenta identifica um conjunto de competências técnicas e práticas nos dois textos.</p></article>
          <article><span class="how-number">02</span><h3>Não inventa experiência</h3><p>Um requisito ausente é só um ponto para revisar. Inclua-o no currículo apenas se fizer parte da sua experiência.</p></article>
          <article><span class="how-number">03</span><h3>Não é uma nota de ATS</h3><p>O percentual mostra cobertura das competências reconhecidas. Sistemas de seleção variam e podem avaliar outros fatores.</p></article>
        </div>
      </section>
    </main>

    <footer class="footer"><span>VagaMatch <span class="footer-separator">/</span> Projeto demonstrativo em TypeScript</span><span>Feito para ajudar, revisado por você.</span></footer>
  </div>
`;

function getElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Controle não encontrado: ${selector}`);
  return element;
}

const resumeInput = getElement<HTMLTextAreaElement>("#resume-input");
const jobInput = getElement<HTMLTextAreaElement>("#job-input");
const analyzeButton = getElement<HTMLButtonElement>("#analyze-button");
const exampleButton = getElement<HTMLButtonElement>("#example-button");
const clearButton = getElement<HTMLButtonElement>("#clear-button");
const results = getElement<HTMLElement>("#results");
const statusMessage = getElement<HTMLElement>("#form-status");

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasAlias(text: string, alias: string): boolean {
  const normalizedText = normalize(text);
  const normalizedAlias = normalize(alias);
  const escapedAlias = escapeRegExp(normalizedAlias).replace(/\s+/g, "\\s+");
  const pattern = new RegExp(`(^|[^a-z0-9])${escapedAlias}(?=$|[^a-z0-9])`, "i");
  return pattern.test(normalizedText);
}

function findSkills(text: string): Skill[] {
  return skillCatalog.filter((skill) => skill.aliases.some((alias) => hasAlias(text, alias)));
}

function analyze(resume: string, job: string): Analysis {
  const requestedSkills = findSkills(job);
  const resumeSkills = new Set(findSkills(resume).map((skill) => skill.name));
  const matched = requestedSkills.filter((skill) => resumeSkills.has(skill.name));
  const missing = requestedSkills.filter((skill) => !resumeSkills.has(skill.name));
  const detected = requestedSkills.length;
  const score = detected === 0 ? 0 : Math.round((matched.length / detected) * 100);

  return { score, matched, missing, detected };
}

function updateCounter(input: HTMLTextAreaElement, counterId: string): void {
  const counter = document.querySelector<HTMLElement>(counterId);
  if (counter) counter.textContent = `${input.value.length.toLocaleString("pt-BR")} / 10.000`;
}

function makeChip(item: SkillMatch, kind: "matched" | "missing"): HTMLLIElement {
  const chip = document.createElement("li");
  chip.className = `skill-chip ${kind}`;
  const icon = document.createElement("span");
  icon.className = "chip-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = kind === "matched" ? "✓" : "+";
  const label = document.createElement("span");
  label.textContent = item.skill.name;
  chip.append(icon, label);
  return chip;
}

function makeSkillList(items: Skill[], kind: "matched" | "missing"): HTMLUListElement {
  const list = document.createElement("ul");
  list.className = "skill-list";
  for (const skill of items) list.append(makeChip({ skill, inResume: kind === "matched" }, kind));
  return list;
}

function renderGroup(container: HTMLElement, title: string, items: Skill[], kind: "matched" | "missing", emptyText: string): void {
  const group = document.createElement("section");
  group.className = `result-group ${kind}`;
  const heading = document.createElement("div");
  heading.className = "result-group-heading";
  const titleElement = document.createElement("h3");
  titleElement.textContent = title;
  const count = document.createElement("span");
  count.className = "group-count";
  count.textContent = items.length.toString().padStart(2, "0");
  heading.append(titleElement, count);
  group.append(heading);
  if (items.length) {
    group.append(makeSkillList(items, kind));
  } else {
    const empty = document.createElement("p");
    empty.className = "empty-group";
    empty.textContent = emptyText;
    group.append(empty);
  }
  container.append(group);
}

function renderResults(report: Analysis): void {
  results.replaceChildren();
  results.className = "results results-ready";

  const header = document.createElement("div");
  header.className = "results-header";
  const heading = document.createElement("div");
  heading.innerHTML = `<span class="section-kicker">02 — LEITURA</span><h2>O que a vaga está pedindo</h2>`;
  const exportButton = document.createElement("button");
  exportButton.className = "text-button export-button";
  exportButton.type = "button";
  exportButton.innerHTML = `Baixar resumo <span aria-hidden="true">↓</span>`;
  exportButton.addEventListener("click", () => downloadReport(report));
  header.append(heading, exportButton);

  const overview = document.createElement("div");
  overview.className = "overview-card";
  const scoreBlock = document.createElement("div");
  scoreBlock.className = "score-block";
  const score = document.createElement("span");
  score.className = "score-value";
  score.textContent = `${report.score}%`;
  const scoreLabel = document.createElement("span");
  scoreLabel.className = "score-label";
  scoreLabel.textContent = "cobertura estimada";
  scoreBlock.append(score, scoreLabel);

  const overviewCopy = document.createElement("div");
  overviewCopy.className = "overview-copy";
  const overviewTitle = document.createElement("h3");
  overviewTitle.textContent = report.detected === 0 ? "Nenhuma competência reconhecida" : `${report.matched.length} de ${report.detected} competências identificadas`;
  const overviewBody = document.createElement("p");
  overviewBody.textContent = report.detected === 0
    ? "A descrição não menciona competências do catálogo atual. Você ainda pode revisar os requisitos manualmente."
    : "Use a leitura como um guia para personalizar o currículo. Não acrescente uma competência que você não domina.";
  overviewCopy.append(overviewTitle, overviewBody);
  overview.append(scoreBlock, overviewCopy);

  const groups = document.createElement("div");
  groups.className = "result-groups";
  renderGroup(groups, "Já aparecem no seu currículo", report.matched, "matched", "Nenhuma competência do catálogo foi encontrada nos dois textos.");
  renderGroup(groups, "Para revisar", report.missing, "missing", "As competências reconhecidas já aparecem no currículo.");

  const note = document.createElement("p");
  note.className = "result-note";
  note.innerHTML = `<span aria-hidden="true">ⓘ</span> O catálogo inclui ${skillCatalog.length} competências. Expressões fora dele não entram no percentual.`;
  results.append(header, overview, groups, note);
  statusMessage.textContent = "Análise concluída. Revise as sugestões e adapte o currículo com informações verdadeiras.";
}

function downloadReport(report: Analysis): void {
  const lines = [
    "VagaMatch — resumo de compatibilidade",
    `Cobertura estimada: ${report.score}% (${report.matched.length} de ${report.detected} competências identificadas)`,
    "",
    "Encontradas no currículo:",
    ...(report.matched.length ? report.matched.map((skill) => `- ${skill.name}`) : ["- Nenhuma competência reconhecida em comum"]),
    "",
    "Para revisar:",
    ...(report.missing.length ? report.missing.map((skill) => `- ${skill.name}`) : ["- Nenhuma competência reconhecida pendente"]),
    "",
    "Nota: estimativa por palavras-chave. Não representa uma nota de ATS. Inclua competências no currículo apenas se forem verdadeiras.",
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "vaga-match-resumo.txt";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function analyzeCurrentTexts(): void {
  const resume = resumeInput.value.trim();
  const job = jobInput.value.trim();
  if (!resume || !job) {
    statusMessage.textContent = "Preencha os dois campos antes de analisar.";
    return;
  }
  renderResults(analyze(resume, job));
}

function markResultsOutdated(): void {
  if (results.classList.contains("results-ready")) {
    statusMessage.textContent = "Os textos mudaram. Gere uma nova análise para atualizar o resultado.";
  }
}

function loadExample(): void {
  resumeInput.value = exampleResume;
  jobInput.value = exampleJob;
  updateCounter(resumeInput, "#resume-count");
  updateCounter(jobInput, "#job-count");
  statusMessage.textContent = "Exemplo fictício carregado. Clique em analisar compatibilidade.";
  resumeInput.focus();
}

function clearInputs(): void {
  resumeInput.value = "";
  jobInput.value = "";
  updateCounter(resumeInput, "#resume-count");
  updateCounter(jobInput, "#job-count");
  results.className = "results";
  results.innerHTML = `<div class="results-placeholder"><span class="placeholder-mark" aria-hidden="true">↘</span><div><span class="section-kicker">02 — LEITURA</span><h2>A análise aparece aqui</h2><p>Você verá as competências encontradas no currículo e os requisitos que ainda não aparecem no texto.</p></div></div>`;
  statusMessage.textContent = "Campos limpos. Seus textos não são armazenados pela ferramenta.";
  resumeInput.focus();
}

resumeInput.addEventListener("input", () => {
  updateCounter(resumeInput, "#resume-count");
  markResultsOutdated();
});
jobInput.addEventListener("input", () => {
  updateCounter(jobInput, "#job-count");
  markResultsOutdated();
});
analyzeButton.addEventListener("click", analyzeCurrentTexts);
exampleButton.addEventListener("click", loadExample);
clearButton.addEventListener("click", clearInputs);

loadExample();
analyzeCurrentTexts();
