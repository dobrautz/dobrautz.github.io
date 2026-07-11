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

document.querySelectorAll("[data-pattern]").forEach((button) => button.addEventListener("click", () => setPattern(button.dataset.pattern)));
document.getElementById("corruptButton").addEventListener("click", () => {
  const choices = [...Array(9).keys()].sort(() => Math.random() - 0.5).slice(0, 3);
  choices.forEach((index) => { current[index] *= -1; });
  record("Three spins were flipped. Can the network recall the memory?");
});
document.getElementById("stepButton").addEventListener("click", updateOne);
document.getElementById("relaxButton").addEventListener("click", relax);
record("This stored pattern is an energy minimum.");
