const patterns = {
  x: { name: "X", spins: [1, -1, 1, -1, 1, -1, 1, -1, 1] },
  ring: { name: "ring", spins: [1, 1, 1, 1, -1, 1, 1, 1, 1] },
};
let patternName = "x";
let target = [...patterns.x.spins];
let current = [...target];
let trace = [];

const spinGrid = document.getElementById("spinGrid");
const targetName = document.getElementById("targetName");
const distanceText = document.getElementById("distanceText");
const energyText = document.getElementById("energyText");
const energyTrace = document.getElementById("energyTrace");
const status = document.getElementById("status");

const learningPatterns = [
  { name: "A", spins: [1, 1, -1, -1] },
  { name: "B", spins: [1, -1, 1, -1] },
];
const learningStates = Array.from({ length: 16 }, (_, number) =>
  [3, 2, 1, 0].map((bit) => (number & (1 << bit)) ? 1 : -1),
);
let learningAmount = 0;
const learningAmountInput = document.getElementById("learningAmount");
const learningAmountOutput = document.getElementById("learningAmountOutput");
const learningStatus = document.getElementById("learningStatus");
const weightMatrix = document.getElementById("weightMatrix");
const biasVector = document.getElementById("biasVector");
const learningLandscape = document.getElementById("learningLandscape");

function weights() {
  return target.map((rowSpin, i) => target.map((columnSpin, j) => i === j ? 0 : rowSpin * columnSpin / target.length));
}

function energy(state) {
  const W = weights();
  let total = 0;
  state.forEach((spinI, i) => state.forEach((spinJ, j) => { total += W[i][j] * spinI * spinJ; }));
  return -0.5 * total;
}

function hammingDistance() { return current.reduce((sum, spin, index) => sum + (spin !== target[index] ? 1 : 0), 0); }

function updateGrid() {
  spinGrid.replaceChildren();
  current.forEach((spin, index) => {
    const cell = document.createElement("button");
    cell.className = `spin-cell ${spin === 1 ? "on" : ""}`;
    cell.type = "button";
    cell.setAttribute("aria-label", `spin ${index + 1}: ${spin === 1 ? "+1" : "-1"}`);
    cell.addEventListener("click", () => { current[index] *= -1; record("You flipped one spin by hand."); });
    spinGrid.append(cell);
  });
}

function drawTrace() {
  const min = Math.min(...trace);
  const max = Math.max(...trace);
  const range = Math.max(0.001, max - min);
  energyTrace.replaceChildren();
  trace.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "trace-bar";
    bar.style.height = `${18 + 82 * (value - min) / range}%`;
    bar.title = `E = ${value.toFixed(3)}`;
    energyTrace.append(bar);
  });
}

function record(message) {
  const e = energy(current);
  trace.push(e);
  targetName.textContent = patterns[patternName].name;
  distanceText.textContent = `Hamming distance: ${hammingDistance()} of 9 spins.`;
  energyText.textContent = `Energy: ${e.toFixed(3)}`;
  status.textContent = message;
  updateGrid();
  drawTrace();
}

function updateOne() {
  const W = weights();
  const index = Math.floor(Math.random() * current.length);
  const localField = W[index].reduce((sum, weight, j) => sum + weight * current[j], 0);
  current[index] = localField >= 0 ? 1 : -1;
  record(`Updated spin ${index + 1} using the sign of its local field.`);
}

function relax() {
  for (let iteration = 0; iteration < 30; iteration += 1) {
    const before = energy(current);
    for (let index = 0; index < current.length; index += 1) {
      const W = weights();
      const localField = W[index].reduce((sum, weight, j) => sum + weight * current[j], 0);
      current[index] = localField >= 0 ? 1 : -1;
    }
    trace.push(energy(current));
    if (Math.abs(energy(current) - before) < 1e-9) break;
  }
  record("Repeated deterministic updates reached a stable attractor.");
}

function setPattern(name) {
  patternName = name;
  target = [...patterns[name].spins];
  current = [...target];
  trace = [];
  document.querySelectorAll("[data-pattern]").forEach((button) => button.classList.toggle("selected", button.dataset.pattern === name));
  record("This stored pattern is an energy minimum.");
}

function spinLabel(state) {
  return state.map((spin) => spin === 1 ? "+" : "-").join("");
}

function sameState(first, second) {
  return first.every((spin, index) => spin === second[index]);
}

function learningWeights() {
  const contributions = [Math.min(learningAmount, 1), Math.max(learningAmount - 1, 0)];
  return Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (_, j) => {
    if (i === j) return 0;
    return learningPatterns.reduce((sum, pattern, index) => sum + contributions[index] * pattern.spins[i] * pattern.spins[j] / 4, 0);
  }));
}

function learningBiases() {
  const contributions = [Math.min(learningAmount, 1), Math.max(learningAmount - 1, 0)];
  return Array.from({ length: 4 }, (_, i) => learningPatterns.reduce((sum, pattern, index) => sum + contributions[index] * pattern.spins[i] / 4, 0));
}

function learningEnergy(state, W, h) {
  const interaction = -0.5 * state.reduce((total, spinI, i) => total + state.reduce((rowTotal, spinJ, j) => rowTotal + W[i][j] * spinI * spinJ, 0), 0);
  const field = -state.reduce((total, spin, i) => total + h[i] * spin, 0);
  return interaction + field;
}

function stateClass(state) {
  if (sameState(state, learningPatterns[0].spins)) return "a";
  if (sameState(state, learningPatterns[1].spins)) return "b";
  return "other";
}

function drawLearning() {
  const W = learningWeights();
  const h = learningBiases();
  learningAmountInput.value = learningAmount;
  learningAmountOutput.textContent = `${learningAmount.toFixed(2)} / 2.00`;
  if (learningAmount === 0) {
    learningStatus.textContent = "All couplings are zero: every configuration has the same energy.";
  } else if (learningAmount < 1) {
    learningStatus.textContent = "The outer-product contribution from training pattern A is being added.";
  } else if (learningAmount < 2) {
    learningStatus.textContent = "A is stored. The outer-product contribution from training pattern B is now being added.";
  } else {
    learningStatus.textContent = "Both training data have contributed to W and h. A and B are the lowest-energy configurations.";
  }

  weightMatrix.replaceChildren();
  W.flat().forEach((weight, index) => {
    const cell = document.createElement("div");
    cell.className = `matrix-cell ${weight > 0 ? "positive" : weight < 0 ? "negative" : "zero"}`;
    cell.textContent = index % 5 === 0 ? "0" : weight.toFixed(2);
    weightMatrix.append(cell);
  });
  biasVector.replaceChildren();
  h.forEach((bias, index) => {
    const cell = document.createElement("div");
    cell.className = `bias-cell ${bias > 0 ? "positive" : bias < 0 ? "negative" : "zero"}`;
    cell.textContent = `h${index + 1} = ${bias.toFixed(2)}`;
    biasVector.append(cell);
  });

  const energies = learningStates.map((state) => learningEnergy(state, W, h));
  const scale = Math.max(0.25, ...energies.map((value) => Math.abs(value)));
  learningLandscape.replaceChildren();
  learningStates.forEach((state, index) => {
    const stateType = stateClass(state);
    const item = document.createElement("div");
    item.className = `landscape-item ${stateType}`;
    item.title = `${spinLabel(state)}: E = ${energies[index].toFixed(3)}`;
    const track = document.createElement("div");
    track.className = "landscape-track";
    const fill = document.createElement("div");
    fill.className = `landscape-fill ${energies[index] < 0 ? "lower" : "higher"}`;
    fill.style.height = `${Math.abs(energies[index]) / scale * 50}%`;
    track.append(fill);
    const label = document.createElement("span");
    label.textContent = spinLabel(state);
    item.append(track, label);
    learningLandscape.append(item);
  });
}

document.querySelectorAll("[data-pattern]").forEach((button) => button.addEventListener("click", () => setPattern(button.dataset.pattern)));
document.getElementById("corruptButton").addEventListener("click", () => {
  const choices = [...Array(9).keys()].sort(() => Math.random() - 0.5).slice(0, 3);
  choices.forEach((index) => { current[index] *= -1; });
  record("Three spins were flipped. Can the network recall the memory?");
});
document.getElementById("stepButton").addEventListener("click", updateOne);
document.getElementById("relaxButton").addEventListener("click", relax);
learningAmountInput.addEventListener("input", () => { learningAmount = Number(learningAmountInput.value); drawLearning(); });
document.getElementById("nextDatumButton").addEventListener("click", () => {
  learningAmount = learningAmount < 1 ? 1 : 2;
  drawLearning();
});
document.getElementById("resetLearningButton").addEventListener("click", () => { learningAmount = 0; drawLearning(); });
record("This stored pattern is an energy minimum.");
drawLearning();
