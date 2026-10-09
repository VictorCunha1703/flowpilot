function runWorkflow(steps, options = {}) {
  const retryLimit = options.retryLimit ?? 2;
  const results = [];
  let retries = 0;

  for (const step of steps) {
    if (step.shouldFail && retries < retryLimit) {
      retries += 1;
      results.push({ name: step.name, status: "retrying", attempt: retries });
      continue;
    }
    if (step.shouldFail) {
      results.push({ name: step.name, status: "failed", attempt: retries + 1 });
      return { status: "failed", completed: results.length - 1, retries, results };
    }
    results.push({ name: step.name, status: "completed", attempt: 1 });
  }

  return { status: "completed", completed: steps.length, retries, results };
}

function successRate(successfulRuns, totalRuns) {
  if (!totalRuns) return 0;
  return Math.round((successfulRuns / totalRuns) * 1000) / 10;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { runWorkflow, successRate };
} else {
  window.FlowPilotModel = { runWorkflow, successRate };
}
