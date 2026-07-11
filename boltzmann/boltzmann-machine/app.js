const states = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
const labels = ["(+1,+1)", "(+1,-1)", "(-1,+1)", "(-1,-1)"];
let current = [1, 1];
let trace = [];
const coupling = document.getElementById("coupling");
const temperature = document.getElementById("temperature");
const probabilityBars = document.getElementById("probabilityBars");
const spinGrid = document.getElementById("spinGrid");
const traceElement = document.getElementById("trace");

function parameters() { return { J: Number(coupling.value), T: Number(temperature.value) }; }
function energy(state, p) { return -p.J * state[0] * state[1]; }
function distribution(p) {
  const energies = states.map((state) => energy(state, p));
  const min = Math.min(...energies);
  const weights = energies.map((value) => Math.exp(-(value - min) / p.T));
  const total = weights.reduce((sum, value) => sum + value, 0);
  return { energies, probabilities: weights.map((value) => value / total) };
}
function randomBernoulli(p) { return Math.random() < p ? 1 : -1; }

function render() {
  const p = parameters();
  document.getElementById("couplingValue").textContent = `${p.J >= 0 ? "+" : ""}${p.J.toFixed(2)}`;
  document.getElementById("temperatureValue").textContent = p.T.toFixed(1);
  const result = distribution(p);
  probabilityBars.replaceChildren();
  labels.forEach((label, index) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.innerHTML = `<div class="bar-track"><div class="bar-fill" style="height:${Math.max(1, result.probabilities[index] * 100)}%"></div></div><div class="bar-value">${result.probabilities[index].toFixed(3)}</div><div class="bar-label">${label}<br>E = ${result.energies[index].toFixed(2)}</div>`;
    probabilityBars.append(bar);
  });
  spinGrid.replaceChildren();
  current.forEach((spin) => { const cell = document.createElement("div"); cell.className = `spin-cell ${spin === 1 ? "on" : ""}`; spinGrid.append(cell); });
  document.getElementById("currentState").textContent = `Current state: (${current[0] >= 0 ? "+1" : "-1"}, ${current[1] >= 0 ? "+1" : "-1"})`;
  document.getElementById("alignment").textContent = `Aligned: ${current[0] === current[1] ? "yes" : "no"}; energy = ${energy(current, p).toFixed(2)}`;
  drawTrace();
}

function drawTrace() {
  const min = Math.min(...trace, -1);
  const max = Math.max(...trace, 1);
  const range = Math.max(0.1, max - min);
  traceElement.replaceChildren();
  trace.slice(-30).forEach((value) => { const bar = document.createElement("div"); bar.className = "trace-bar"; bar.style.height = `${18 + 82 * (value - min) / range}%`; traceElement.append(bar); });
}

function gibbsUpdate() {
  const p = parameters();
  const index = Math.random() < 0.5 ? 0 : 1;
  const other = current[1 - index];
  const localField = p.J * other;
  const probabilityUp = 1 / (1 + Math.exp(-2 * localField / p.T));
  current[index] = randomBernoulli(probabilityUp);
  trace.push(energy(current, p));
  document.getElementById("stepInfo").textContent = `Updated spin ${index + 1}: p(s${index + 1}=+1 | other spin) = ${probabilityUp.toFixed(2)}.`;
  document.getElementById("sampleBox").textContent = current[0] === current[1] ? "This sample is aligned." : "This sample is anti-aligned. At finite temperature, neither outcome is forbidden.";
  render();
}

coupling.addEventListener("input", render);
temperature.addEventListener("input", render);
document.getElementById("stepButton").addEventListener("click", gibbsUpdate);
document.getElementById("runButton").addEventListener("click", () => { for (let i = 0; i < 24; i += 1) gibbsUpdate(); });
render();
