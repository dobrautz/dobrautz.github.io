const localField = document.getElementById("localField");
const localTemperature = document.getElementById("localTemperature");
const pairCoupling = document.getElementById("pairCoupling");
const pairTemperature = document.getElementById("pairTemperature");
const pairStates = [[0, 0], [0, 1], [1, 0], [1, 1]];
const pairLabels = ["00", "01", "10", "11"];
let lastUnitSample = 1;
let learningWeights = [0, 0];
let visibleBiases = [0, 0];
let hiddenBias = 0;
const learningRate = 0.7;
const memoryTarget = [1, 0, 1];
let memoryState = [...memoryTarget];
let featureState = [1, 0, 1];

function sigmoid(value) {
  return value >= 0 ? 1 / (1 + Math.exp(-value)) : Math.exp(value) / (1 + Math.exp(value));
}

function signed(value, digits = 2) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(digits)}`;
}

function svgElement(name, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function drawSigmoid(h, T, probability) {
  const svg = document.getElementById("sigmoidPlot");
  const width = 560;
  const height = 230;
  const margin = { left: 52, right: 22, top: 18, bottom: 40 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const x = (value) => margin.left + (value + 4) / 8 * plotWidth;
  const y = (value) => margin.top + (1 - value) * plotHeight;
  svg.replaceChildren();

  [0, 0.5, 1].forEach((value) => {
    svg.append(svgElement("line", { class: "sigmoid-grid", x1: margin.left, x2: width - margin.right, y1: y(value), y2: y(value) }));
    const label = svgElement("text", { class: "sigmoid-label", x: margin.left - 10, y: y(value) + 5, "text-anchor": "end" });
    label.textContent = value.toFixed(value === 0.5 ? 1 : 0);
    svg.append(label);
  });
  svg.append(svgElement("line", { class: "sigmoid-axis", x1: margin.left, x2: width - margin.right, y1: y(0), y2: y(0) }));
  svg.append(svgElement("line", { class: "sigmoid-axis", x1: x(0), x2: x(0), y1: margin.top, y2: y(0) }));
  [-4, 0, 4].forEach((value) => {
    const label = svgElement("text", { class: "sigmoid-label", x: x(value), y: height - 14, "text-anchor": "middle" });
    label.textContent = value;
    svg.append(label);
  });
  const xLabel = svgElement("text", { class: "sigmoid-label", x: width / 2, y: height - 2, "text-anchor": "middle" });
  xLabel.textContent = "local field h";
  svg.append(xLabel);
  const yLabel = svgElement("text", { class: "sigmoid-label", x: margin.left, y: 13 });
  yLabel.textContent = "p(s = 1)";
  svg.append(yLabel);

  const path = Array.from({ length: 161 }, (_, index) => {
    const field = -4 + index / 160 * 8;
    return `${index === 0 ? "M" : "L"}${x(field).toFixed(2)},${y(sigmoid(field / T)).toFixed(2)}`;
  }).join(" ");
  svg.append(svgElement("path", { class: "sigmoid-curve", d: path }));
  svg.append(svgElement("line", { class: "sigmoid-marker-line", x1: x(h), x2: x(h), y1: y(0), y2: y(probability) }));
  svg.append(svgElement("circle", { class: "sigmoid-marker", cx: x(h), cy: y(probability), r: 6 }));
  const annotation = svgElement("text", { class: "sigmoid-annotation", x: x(h), y: Math.max(margin.top + 14, y(probability) - 12), "text-anchor": "middle" });
  annotation.textContent = `(${h.toFixed(2)}, ${probability.toFixed(2)})`;
  svg.append(annotation);
}

function renderUnitUpdate() {
  const h = Number(localField.value);
  const T = Number(localTemperature.value);
  const probability = sigmoid(h / T);
  document.getElementById("localFieldOutput").textContent = signed(h);
  document.getElementById("localTemperatureOutput").textContent = T.toFixed(2);
  document.getElementById("deterministicState").textContent = `s = ${h > 0 ? 1 : 0}`;
  document.getElementById("probabilisticState").textContent = `p(s = 1) = ${probability.toFixed(3)}`;
  document.getElementById("sampledState").textContent = `last sample: s = ${lastUnitSample}`;
  drawSigmoid(h, T, probability);
}

function pairDistribution() {
  const J = Number(pairCoupling.value);
  const T = Number(pairTemperature.value);
  const energies = pairStates.map((state) => -J * state[0] * state[1]);
  const weights = energies.map((energy) => Math.exp(-energy / T));
  const Z = weights.reduce((sum, weight) => sum + weight, 0);
  return { J, T, energies, Z, probabilities: weights.map((weight) => weight / Z) };
}

function renderPairDistribution() {
  const result = pairDistribution();
  document.getElementById("pairCouplingOutput").textContent = signed(result.J);
  document.getElementById("pairTemperatureOutput").textContent = result.T.toFixed(2);
  document.getElementById("partitionFunction").textContent = result.Z.toFixed(3);
  const bars = document.getElementById("pairBars");
  bars.replaceChildren();
  pairLabels.forEach((label, index) => {
    const bar = document.createElement("div");
    bar.className = "compact-bar";
    const track = document.createElement("div");
    track.className = "compact-bar-track";
    const fill = document.createElement("div");
    fill.className = "compact-bar-fill";
    fill.style.height = `${Math.max(1, result.probabilities[index] * 100)}%`;
    track.append(fill);
    const probability = document.createElement("span");
    probability.textContent = result.probabilities[index].toFixed(3);
    const labelEnergy = document.createElement("span");
    labelEnergy.textContent = `${label}; E = ${result.energies[index].toFixed(2)}`;
    bar.append(track, probability, labelEnergy);
    bars.append(bar);
  });
  const favored = result.J > 0 ? "11" : result.J < 0 ? "00, 01, and 10" : "all four states";
  document.getElementById("pairSummary").textContent = result.J === 0 ? "All four states have equal energy." : `Lowest-energy state(s): ${favored}.`;
}

function memoryEnergy(state) {
  return -state[0] * state[2] - 0.5 * state[0] + state[1] - 0.5 * state[2];
}

function memoryField(state, index) {
  if (index === 0) return state[2] + 0.5;
  if (index === 1) return -1;
  return state[0] + 0.5;
}

function bitLabel(state) {
  return state.join("");
}

function drawMemoryNetwork() {
  const svg = document.getElementById("memoryNetwork");
  const nodes = [
    { x: 65, y: 152, label: "s1", bias: "+0.5" },
    { x: 150, y: 62, label: "s2", bias: "-1.0" },
    { x: 235, y: 152, label: "s3", bias: "+0.5" },
  ];
  svg.replaceChildren();
  svg.append(svgElement("line", { class: "memory-network-edge", x1: nodes[0].x, y1: nodes[0].y, x2: nodes[2].x, y2: nodes[2].y }));
  const weight = svgElement("text", { class: "memory-network-weight", x: 150, y: 143 });
  weight.textContent = "w13 = +1";
  svg.append(weight);
  nodes.forEach((node, index) => {
    const circle = svgElement("circle", { class: `memory-network-node ${memoryState[index] === 1 ? "on" : ""}`, cx: node.x, cy: node.y, r: 28 });
    const state = svgElement("text", { class: `memory-network-state ${memoryState[index] === 1 ? "on" : ""}`, x: node.x, y: node.y + 1 });
    state.textContent = memoryState[index];
    const label = svgElement("text", { class: "memory-network-label", x: node.x, y: node.y + 48 });
    label.textContent = node.label;
    const bias = svgElement("text", { class: "memory-network-bias", x: node.x, y: node.y - 42 });
    bias.textContent = `theta = ${node.bias}`;
    const field = svgElement("text", { class: "memory-network-label", x: node.x, y: node.y + 66 });
    field.textContent = `h = ${signed(memoryField(memoryState, index))}`;
    svg.append(circle, state, label, bias, field);
  });
}

function renderMemory() {
  const bits = document.getElementById("memoryBits");
  bits.replaceChildren();
  memoryState.forEach((bit, index) => {
    const button = document.createElement("button");
    button.className = `memory-bit ${bit === 1 ? "on" : ""}`;
    button.type = "button";
    button.textContent = bit;
    button.setAttribute("aria-label", `toggle Hopfield unit ${index + 1}`);
    button.addEventListener("click", () => { memoryState[index] = memoryState[index] ? 0 : 1; document.getElementById("memoryMessage").textContent = "You changed one unit. Run a sweep to follow deterministic energy descent."; renderMemory(); });
    bits.append(button);
  });
  document.getElementById("memoryReadout").textContent = `E(${bitLabel(memoryState)}) = ${memoryEnergy(memoryState).toFixed(2)}`;
  const energies = document.getElementById("memoryEnergies");
  energies.replaceChildren();
  const states = Array.from({ length: 8 }, (_, number) => [2, 1, 0].map((bit) => (number & (1 << bit)) ? 1 : 0));
  states.forEach((state) => {
    const item = document.createElement("div");
    const isCurrent = bitLabel(state) === bitLabel(memoryState);
    const isTarget = bitLabel(state) === bitLabel(memoryTarget);
    item.className = `memory-energy${isCurrent ? " current" : ""}${isTarget ? " target" : ""}`;
    item.textContent = `${bitLabel(state)}: ${memoryEnergy(state).toFixed(1)}`;
    energies.append(item);
  });
  drawMemoryNetwork();
}

function renderFeatures() {
  const bits = document.getElementById("featureBits");
  bits.replaceChildren();
  featureState.forEach((bit, index) => {
    const button = document.createElement("button");
    button.className = `feature-bit ${bit === 1 ? "on" : ""}`;
    button.type = "button";
    button.textContent = bit;
    button.setAttribute("aria-label", `toggle visible unit ${index + 1}`);
    button.addEventListener("click", () => { featureState[index] = featureState[index] ? 0 : 1; renderFeatures(); });
    bits.append(button);
  });
  const weights = [[3, -1.5], [-1.5, 3], [3, -1.5]];
  const biases = [-5, -2];
  const fields = [0, 1].map((hiddenIndex) => biases[hiddenIndex] + featureState.reduce((sum, bit, visibleIndex) => sum + weights[visibleIndex][hiddenIndex] * bit, 0));
  const probabilities = fields.map((field) => sigmoid(field));
  const hidden = document.getElementById("hiddenFeatures");
  hidden.replaceChildren();
  ["both endpoints", "middle unit"].forEach((label, index) => {
    const item = document.createElement("div");
    item.className = "hidden-feature";
    item.innerHTML = `<strong>h${index + 1}: ${probabilities[index].toFixed(3)}</strong><span>${label}<br>field = ${signed(fields[index])}</span>`;
    hidden.append(item);
  });
  const maximum = Math.max(...probabilities);
  const preferred = probabilities[0] > probabilities[1] ? "both-endpoints feature h1" : probabilities[1] > probabilities[0] ? "middle feature h2" : "two hidden features equally";
  document.getElementById("featureMessage").textContent = maximum < 0.5
    ? `For v = ${bitLabel(featureState)}, neither hidden feature is likely to be active.`
    : `For v = ${bitLabel(featureState)}, the ${preferred} is likely. Intermediate probabilities are expected: this is a probabilistic feature representation, not a rule-based classifier.`;
}

function renderFeaturePresets() {
  const container = document.getElementById("featurePresets");
  container.replaceChildren();
  Array.from({ length: 8 }, (_, value) => value.toString(2).padStart(3, "0")).forEach((pattern) => {
    const button = document.createElement("button");
    button.className = "action";
    button.type = "button";
    button.textContent = pattern;
    button.addEventListener("click", () => { featureState = pattern.split("").map(Number); renderFeatures(); });
    container.append(button);
  });
}

function modelStates() {
  const states = [];
  for (let v1 = 0; v1 <= 1; v1 += 1) {
    for (let v2 = 0; v2 <= 1; v2 += 1) {
      for (let h = 0; h <= 1; h += 1) states.push([v1, v2, h]);
    }
  }
  const rawWeights = states.map(([v1, v2, h]) => Math.exp(visibleBiases[0] * v1 + visibleBiases[1] * v2 + hiddenBias * h + learningWeights[0] * v1 * h + learningWeights[1] * v2 * h));
  const Z = rawWeights.reduce((sum, value) => sum + value, 0);
  return states.map((state, index) => ({ state, probability: rawWeights[index] / Z }));
}

function learningStatistics() {
  const positiveHidden = sigmoid(hiddenBias + learningWeights[0]);
  const positive = [positiveHidden, 0];
  const model = modelStates();
  const negative = [0, 1].map((visibleIndex) => model.reduce((sum, item) => sum + item.probability * item.state[visibleIndex] * item.state[2], 0));
  const negativeVisible = [0, 1].map((visibleIndex) => model.reduce((sum, item) => sum + item.probability * item.state[visibleIndex], 0));
  const negativeHidden = model.reduce((sum, item) => sum + item.probability * item.state[2], 0);
  const visibleStates = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const visibleDistribution = visibleStates.map((state) => model.filter((item) => item.state[0] === state[0] && item.state[1] === state[1]).reduce((sum, item) => sum + item.probability, 0));
  return {
    positive,
    negative,
    negativeVisible,
    negativeHidden,
    weightGradient: positive.map((value, index) => value - negative[index]),
    visibleBiasGradient: [1 - negativeVisible[0], -negativeVisible[1]],
    hiddenBiasGradient: positiveHidden - negativeHidden,
    visibleDistribution,
    dataProbability: visibleDistribution[2],
  };
}

function renderTrainingDistribution(modelDistribution) {
  const states = ["00", "01", "10", "11"];
  const dataDistribution = [0, 0, 1, 0];
  const chart = document.getElementById("trainingDistribution");
  chart.replaceChildren();
  states.forEach((label, index) => {
    const group = document.createElement("div");
    group.className = "training-state";
    const columns = document.createElement("div");
    columns.className = "training-columns";
    ["model", "data"].forEach((kind, columnIndex) => {
      const column = document.createElement("div");
      column.className = "training-column";
      const fill = document.createElement("div");
      fill.className = `training-fill ${kind}`;
      const value = columnIndex === 0 ? modelDistribution[index] : dataDistribution[index];
      fill.style.height = `${Math.max(value === 0 ? 0 : 1, value * 100)}%`;
      fill.title = `${kind === "model" ? "model" : "data"} p(${label}) = ${value.toFixed(3)}`;
      column.append(fill);
      columns.append(column);
    });
    const value = document.createElement("span");
    value.className = "training-value";
    value.textContent = modelDistribution[index].toFixed(3);
    const labelElement = document.createElement("span");
    labelElement.textContent = `v = ${label}`;
    group.append(columns, value, labelElement);
    chart.append(group);
  });
}

function renderLearning() {
  const result = learningStatistics();
  document.getElementById("positiveCorrelation").textContent = `<v h>data = (${result.positive[0].toFixed(3)}, ${result.positive[1].toFixed(3)})`;
  document.getElementById("negativeCorrelation").textContent = `<v h>model = (${result.negative[0].toFixed(3)}, ${result.negative[1].toFixed(3)})`;
  document.getElementById("weightOne").textContent = signed(learningWeights[0], 3);
  document.getElementById("weightTwo").textContent = signed(learningWeights[1], 3);
  document.getElementById("visibleBiasOne").textContent = signed(visibleBiases[0], 3);
  document.getElementById("visibleBiasTwo").textContent = signed(visibleBiases[1], 3);
  document.getElementById("hiddenBias").textContent = signed(hiddenBias, 3);
  document.getElementById("dataProbability").textContent = result.dataProbability.toFixed(3);
  document.getElementById("biasUpdateNote").textContent = `<v>data = (1, 0), <v>model = (${result.negativeVisible[0].toFixed(3)}, ${result.negativeVisible[1].toFixed(3)}); <h>data = ${result.positive[0].toFixed(3)}, <h>model = ${result.negativeHidden.toFixed(3)}.`;
  renderTrainingDistribution(result.visibleDistribution);
}

function learn(steps) {
  for (let step = 0; step < steps; step += 1) {
    const result = learningStatistics();
    learningWeights = learningWeights.map((weight, index) => weight + learningRate * result.weightGradient[index]);
    visibleBiases = visibleBiases.map((bias, index) => bias + learningRate * result.visibleBiasGradient[index]);
    hiddenBias += learningRate * result.hiddenBiasGradient;
  }
  const result = learningStatistics();
  document.getElementById("learningMessage").textContent = `Weights and biases have both been updated. The remaining weight mismatch is (${signed(result.weightGradient[0], 3)}, ${signed(result.weightGradient[1], 3)}).`;
  renderLearning();
}

localField.addEventListener("input", renderUnitUpdate);
localTemperature.addEventListener("input", renderUnitUpdate);
document.getElementById("sampleUnitButton").addEventListener("click", () => {
  lastUnitSample = Math.random() < sigmoid(Number(localField.value) / Number(localTemperature.value)) ? 1 : 0;
  renderUnitUpdate();
});
pairCoupling.addEventListener("input", renderPairDistribution);
pairTemperature.addEventListener("input", renderPairDistribution);
document.getElementById("corruptMemoryButton").addEventListener("click", () => { memoryState = [1, 1, 1]; document.getElementById("memoryMessage").textContent = "The input 111 differs from the stored pattern by one bit."; renderMemory(); });
document.getElementById("memorySweepButton").addEventListener("click", () => {
  [0, 1, 2].forEach((index) => { memoryState[index] = memoryField(memoryState, index) > 0 ? 1 : 0; });
  document.getElementById("memoryMessage").textContent = bitLabel(memoryState) === bitLabel(memoryTarget) ? "The state reached the stored attractor 101." : "The sweep updated each unit from its local field.";
  renderMemory();
});
document.getElementById("memoryResetButton").addEventListener("click", () => { memoryState = [...memoryTarget]; document.getElementById("memoryMessage").textContent = "101 is the stored attractor."; renderMemory(); });
document.getElementById("learnStepButton").addEventListener("click", () => learn(1));
document.getElementById("learnRunButton").addEventListener("click", () => learn(10));
document.getElementById("learnResetButton").addEventListener("click", () => {
  learningWeights = [0, 0];
  visibleBiases = [0, 0];
  hiddenBias = 0;
  document.getElementById("learningMessage").textContent = "The model initially treats all visible patterns equally.";
  renderLearning();
});

renderUnitUpdate();
renderMemory();
renderPairDistribution();
renderLearning();
renderFeaturePresets();
renderFeatures();
