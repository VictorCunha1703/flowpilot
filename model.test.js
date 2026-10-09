const assert = require("node:assert/strict");
const { runWorkflow, successRate } = require("./model.js");

const completed = runWorkflow([
  { name: "Validar formulário" },
  { name: "Criar tarefa" },
]);
assert.equal(completed.status, "completed");
assert.equal(completed.completed, 2);

const recovered = runWorkflow([
  { name: "Enviar webhook", shouldFail: true },
], { retryLimit: 2 });
assert.equal(recovered.status, "completed");
assert.equal(recovered.retries, 1);

const failed = runWorkflow([
  { name: "Enviar webhook", shouldFail: true },
], { retryLimit: 0 });
assert.equal(failed.status, "failed");

assert.equal(successRate(984, 1000), 98.4);
assert.equal(successRate(0, 0), 0);

console.log("✓ FlowPilot: motor de automação passou nos testes");
