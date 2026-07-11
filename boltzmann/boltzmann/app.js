const spectra = {
  "one-low": [-2, 0, 0, 0],
  "two-low": [-1, -1, 1, 1],
  flat: [0, 0, 0, 0],
};
const labels = ["A", "B", "C", "D"];
let spectrumName = "one-low";
const temperature = document.getElementById("temperature");
const energyScale = document.getElementById("energyScale");
const temperatureValue = document.getElementById("temperatureValue");
const energyScaleValue = document.getElementById("energyScaleValue");
const probabilityBars = document.getElementById("probabilityBars");
const readout = document.getElementById("readout");

function render() {
  const T = Number(temperature.value);
  const scale = Number(energyScale.value);
  const energies = spectra[spectrumName].map((value) => value * scale);
  const minEnergy = Math.min(...energies);
  const weights = energies.map((energy) => Math.exp(-(energy - minEnergy) / T));
  const Zshifted = weights.reduce((sum, weight) => sum + weight, 0);
  const probabilities = weights.map((weight) => weight / Zshifted);
  const Z = energies.map((energy) => Math.exp(-energy / T)).reduce((sum, weight) => sum + weight, 0);

  temperatureValue.textContent = T.toFixed(1);
  energyScaleValue.textContent = scale.toFixed(2);
  probabilityBars.replaceChildren();
  labels.forEach((label, index) => {
    const element = document.createElement("div");
    element.className = "bar";
    element.innerHTML = `<div class="bar-track"><div class="bar-fill" style="height:${Math.max(1, probabilities[index] * 100)}%"></div></div><div class="bar-value">${probabilities[index].toFixed(3)}</div><div class="bar-label">state ${label}<br>E = ${energies[index].toFixed(1)}</div>`;
    probabilityBars.append(element);
  });
  const mostLikely = labels[probabilities.indexOf(Math.max(...probabilities))];
  const entropy = -probabilities.reduce((sum, p) => sum + (p ? p * Math.log2(p) : 0), 0);
  readout.innerHTML = `<div class="readout-item"><strong>${Z.toFixed(2)}</strong><span>partition function Z</span></div><div class="readout-item"><strong>${mostLikely}</strong><span>most likely state</span></div><div class="readout-item"><strong>${entropy.toFixed(2)} bits</strong><span>distribution entropy</span></div>`;
}

document.querySelectorAll("[data-spectrum]").forEach((button) => button.addEventListener("click", () => {
  spectrumName = button.dataset.spectrum;
  document.querySelectorAll("[data-spectrum]").forEach((item) => item.classList.toggle("selected", item === button));
  render();
}));
temperature.addEventListener("input", render);
energyScale.addEventListener("input", render);
render();
