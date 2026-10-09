const workflows = [
  { name: "Novos leads → CRM", trigger: "Formulário", status: "active", runs: "418", success: "99,2%", updated: "há 4 min", icon: "↯" },
  { name: "Pedido aprovado → Financeiro", trigger: "Webhook", status: "active", runs: "326", success: "97,8%", updated: "há 16 min", icon: "◈" },
  { name: "Relatório semanal", trigger: "Agendamento", status: "active", runs: "52", success: "100%", updated: "há 1h", icon: "◷" },
  { name: "Onboarding de clientes", trigger: "Formulário", status: "paused", runs: "187", success: "96,4%", updated: "há 2h", icon: "◇" },
  { name: "Alerta de estoque baixo", trigger: "Agendamento", status: "active", runs: "265", success: "98,7%", updated: "há 3h", icon: "△" },
];
let selectedIndex = 0;
const list = document.querySelector("#workflow-list");
const search = document.querySelector("#search");
const statusFilter = document.querySelector("#status-filter");
const toast = document.querySelector("#toast");
const modal = document.querySelector("#workflow-modal");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

function visibleWorkflows() {
  const query = search.value.trim().toLowerCase();
  return workflows.filter((workflow) => {
    const statusOk = statusFilter.value === "all" || workflow.status === statusFilter.value;
    const queryOk = !query || `${workflow.name} ${workflow.trigger}`.toLowerCase().includes(query);
    return statusOk && queryOk;
  });
}

function renderWorkflows() {
  list.innerHTML = visibleWorkflows().map((workflow) => `
    <div class="workflow-row">
      <div class="flow-name"><span class="flow-icon">${workflow.icon}</span><span><b>${workflow.name}</b><small>${workflow.trigger} · ${workflow.updated}</small></span></div>
      <div class="row-text">${workflow.runs} execuções</div>
      <div class="row-text">${workflow.success}</div>
      <div><span class="status ${workflow.status === "paused" ? "paused" : ""}"><i></i>${workflow.status === "paused" ? "Pausado" : "Ativo"}</span></div>
      <button class="row-menu" data-workflow="${workflow.name}" aria-label="Abrir opções de ${workflow.name}">···</button>
    </div>`).join("");
}

function selectWorkflow(index) {
  selectedIndex = index % workflows.length;
  document.querySelector("#selected-workflow").textContent = workflows[selectedIndex].name;
}

function runTest() {
  const runButton = document.querySelector("#run-test");
  const note = document.querySelector("#run-note");
  runButton.disabled = true;
  runButton.innerHTML = "<span>↻</span> Executando...";
  note.textContent = "Processando cada etapa com dados simulados...";
  document.querySelectorAll(".step").forEach((step, index) => { if (index > 0) step.classList.remove("done"); });
  setTimeout(() => {
    document.querySelectorAll(".step").forEach((step) => step.classList.add("done"));
    document.querySelectorAll(".step>span").forEach((span) => { span.textContent = "✓"; });
    runButton.disabled = false;
    runButton.innerHTML = "<span>▶</span> Executar teste";
    note.textContent = "Teste concluído em 1,4s. Nenhum sistema externo foi alterado.";
    showToast("Execução concluída com sucesso");
  }, 850);
}

search.addEventListener("input", renderWorkflows);
statusFilter.addEventListener("change", renderWorkflows);
document.querySelector("#cycle-workflow").addEventListener("click", () => selectWorkflow(selectedIndex + 1));
document.querySelector("#run-test").addEventListener("click", runTest);
document.querySelector("#new-workflow").addEventListener("click", () => { modal.hidden = false; document.querySelector("#workflow-name").focus(); });
document.querySelector("#close-modal").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", (event) => { if (event.target === modal) modal.hidden = true; });
document.querySelector("#create-workflow").addEventListener("click", () => {
  const name = document.querySelector("#workflow-name").value.trim();
  if (!name) { showToast("Dê um nome para a automação"); return; }
  workflows.unshift({ name, trigger: document.querySelector("#workflow-trigger").value.split(" ")[2] || "Gatilho", status: "active", runs: "0", success: "-", updated: "agora", icon: "✦" });
  modal.hidden = true;
  document.querySelector("#workflow-name").value = "";
  renderWorkflows();
  showToast("Automação criada no ambiente de demonstração");
});
document.addEventListener("click", (event) => { const item = event.target.closest("[data-workflow]"); if (item) showToast(`Opções de ${item.dataset.workflow}`); });
renderWorkflows();
