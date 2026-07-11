const states = [
  { key: "00", label: "Nobody", v: [0, 0] },
  { key: "10", label: "Anna only", v: [1, 0] },
  { key: "01", label: "Lukas only", v: [0, 1] },
  { key: "11", label: "Both", v: [1, 1] },
];

const presets = {
  "hidden-cause": { aA: -2, aL: 2, b: 0, wA: 4, wL: -4 },
  independent: { aA: 0, aL: 0, b: 0, wA: 0, wL: 0 },
  together: { aA: -2, aL: -2, b: 0, wA: 4, wL: 4 },
};

const parameterIds = ["aA", "aL", "b", "wA", "wL"];
const inputs = Object.fromEntries(parameterIds.map((id) => [id, document.getElementById(id)]));
const outputs = Object.fromEntries(parameterIds.map((id) => [id, document.getElementById(`${id}Value`)]));
const chart = document.getElementById("probabilityChart");
const inferenceGrid = document.getElementById("inferenceGrid");
const sampleResult = document.getElementById("sampleResult");

function values() {
  return Object.fromEntries(parameterIds.map((id) => [id, Number(inputs[id].value)]));
}

function sigmoid(x) {
  return x >= 0 ? 1 / (1 + Math.exp(-x)) : Math.exp(x) / (1 + Math.exp(x));
}

function formatSigned(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}`;
}

function score(v, h, p) {
  return p.aA * v[0] + p.aL * v[1] + p.b * h + p.wA * v[0] * h + p.wL * v[1] * h;
}

function visibleDistribution(p) {
  const raw = states.map(({ v }) => Math.exp(score(v, 0, p)) + Math.exp(score(v, 1, p)));
  const total = raw.reduce((sum, value) => sum + value, 0);
  return raw.map((value) => value / total);
}

function hiddenProbability(v, p) {
  return sigmoid(p.b + p.wA * v[0] + p.wL * v[1]);
}

function visibleProbabilities(h, p) {
  return [sigmoid(p.aA + p.wA * h), sigmoid(p.aL + p.wL * h)];
}

function edgeStyle(edge, weight, label) {
  const magnitude = Math.min(13, 3 + Math.abs(weight) * 1.55);
  edge.style.stroke = weight >= 0 ? "#146c63" : "#d65a43";
  edge.style.strokeWidth = `${magnitude}`;
  label.textContent = formatSigned(weight);
  label.setAttribute("fill", weight >= 0 ? "#146c63" : "#d65a43");
}

function updateNetwork(p) {
  document.getElementById("annaBias").textContent = `bias ${formatSigned(p.aA)}`;
  document.getElementById("lukasBias").textContent = `bias ${formatSigned(p.aL)}`;
  document.getElementById("brunoBias").textContent = `bias ${formatSigned(p.b)}`;
  edgeStyle(document.getElementById("edgeAnna"), p.wA, document.getElementById("edgeAnnaLabel"));
  edgeStyle(document.getElementById("edgeLukas"), p.wL, document.getElementById("edgeLukasLabel"));
}

function updateChart(probabilities) {
  chart.replaceChildren();
  states.forEach((state, index) => {
    const column = document.createElement("div");
    column.className = "bar-column";
    column.innerHTML = `
      <div class="bar-track"><div class="bar-fill" style="height:${Math.max(probabilities[index] * 100, 1)}%"></div></div>
      <div class="bar-value">${probabilities[index].toFixed(3)}</div>
      <div class="bar-label">${state.key}<br>${state.label}</div>`;
    chart.append(column);
  });
}

function inferenceText(probability) {
  if (probability > 0.78) return "strongly present";
  if (probability < 0.22) return "strongly absent";
  return "no strong preference";
}

function updateInference(p) {
  inferenceGrid.replaceChildren();
  states.forEach((state) => {
    const probability = hiddenProbability(state.v, p);
    const item = document.createElement("div");
    item.className = "inference-item";
    item.style.borderTopColor = probability > 0.5 ? "#146c63" : probability < 0.5 ? "#d65a43" : "#cfd6d1";
    item.innerHTML = `
      <div class="inference-state">${state.key} - ${state.label}</div>
      <div class="inference-value">${probability.toFixed(2)}</div>
      <p class="inference-copy">Bruno is ${inferenceText(probability)}.</p>`;
    inferenceGrid.append(item);
  });
}

function update() {
  const p = values();
  parameterIds.forEach((id) => { outputs[id].textContent = formatSigned(p[id]); });
  updateNetwork(p);
  updateChart(visibleDistribution(p));
  updateInference(p);
}

function randomBernoulli(probability) {
  return Math.random() < probability ? 1 : 0;
}

function runGibbsStep() {
  const p = values();
  const selected = document.getElementById("initialState").value;
  const start = states.find((state) => state.key === selected);
  const pHidden = hiddenProbability(start.v, p);
  const h = randomBernoulli(pHidden);
  const [pAnna, pLukas] = visibleProbabilities(h, p);
  const next = [randomBernoulli(pAnna), randomBernoulli(pLukas)].join("");
  const nextLabel = states.find((state) => state.key === next).label;
  sampleResult.innerHTML = `<strong>${start.key}</strong> -> Bruno: p(h=1|v) = ${pHidden.toFixed(2)}, sampled h = <strong>${h}</strong> -> next visible state: <strong>${next}</strong> (${nextLabel}).`;
}

function setPreset(name) {
  const preset = presets[name];
  parameterIds.forEach((id) => { inputs[id].value = preset[id]; });
  document.querySelectorAll(".preset").forEach((button) => {
    button.classList.toggle("active", button.dataset.preset === name);
  });
  update();
}

parameterIds.forEach((id) => inputs[id].addEventListener("input", () => {
  document.querySelectorAll(".preset").forEach((button) => button.classList.remove("active"));
  update();
}));
document.querySelectorAll(".preset").forEach((button) => button.addEventListener("click", () => setPreset(button.dataset.preset)));
document.getElementById("resetButton").addEventListener("click", () => setPreset("hidden-cause"));
document.getElementById("gibbsButton").addEventListener("click", runGibbsStep);

update();
