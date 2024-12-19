---
layout: page
title: Quantum Computing 
description: <font size="5">  My research in the area of novel quantum computing approaches to solve the electronic structure problem</font>
img: assets/img/hybrid_quantum_classical.png
importance: 1
category: Research
permalink: /projects/quantum/
---

! UNDER CONSTRUCTION ! <br>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/PXL_20220420_122357042.jpg" title="Chalmers chip image" class="center img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/PXL_20220420_122708445.jpg" title="Chalmers fridge" class="center img-fluid rounded z-depth-1" %}
    </div>
</div>

<p>
Due to the unfavorable scaling with system and basis set size, accurate computational approaches are practically limited to small problem sizes, even on high-performance computing (HPC) clusters.
Quantum computing, on the other hand, harnesses quantum mechanical phenomena to allow a major leap in computation.
By using <i>quantum bits</i> (qubits) as the basic unit of information and computation, quantum computers can 
encode an exponentially growing problem space with the superposition of <i>n</i> qubits.
Specifically designed quantum algorithms are then able to utilize quantum wave interference and entanglement
to find solutions to  problems in this vast multidimensional space.
Multiple research teams were able to show so-called 
<i>quantum advantage</i>, solving problems on a quantum computer orders of magnitude
faster than the largest supercomputers -- albeit for highly constructed and practically irrelevant problems. 
The sizes of electronic structure problems treatable on current quantum hardware
are far more modest and do not yet exceed the capability of conventional computing approaches.
The main roadblocks are <b>noise</b>, the <b>circuit depth</b>, and the <b>limited number of available qubits</b>,
as the number of qubits needed to encode a given problem is equal to the size of the utilized basis set.
</p>

{% include figure.html path="assets/img/hybrid_quantum_classical.png" title="Hybrid Quantum Classical" class="center-75 img-fluid rounded z-depth-1" zoomable=true %}

<p>
Thus, quantum computing has the potential to provide a significant speedup compared to classical computers, but the practical implementation is still in its infancy. Two central questions are: <b>(1)</b> in which field the current NISQ hardware can provide benefits compared to classical computers and <b>(2)</b> which methods and algorithms enable this advantage? <br>

My research in quantum computing aims to answer these questions by developing hybrid digital quantum computing algorithms to enable accurate electronic structure calculations on current and near-term quantum hardware.
My research in this area focuses on <i>NISQ-friendly</i> hybrid quantum-classical approaches, where the quantum processing unit (QPU) is used to 
efficiently prepare and store parametrized quantum states and measure expectation values of operators of interest, i.e., the system's Hamiltonian.
The measured expected values are then used on a classical processing unit (CPU) to update the 
parameters of our quantum state to iteratively perform a desired computation, i.e., ground/excited state energy calculation, time-evolution, dynamic response functions, etc. <br>

A major roadblock toward realistic electronic structure calculations on NISQ devices 
is the above-mentioned necessary expansion of a problem in larger and larger number of basis functions. A large number of basis functions increases the required number of qubits to encode the system of interest on quantum hardware.
The transcorrelated method reduces the necessary expansion size, allowing highly accurate electronic structure calculations for relevant, realistic systems on NISQ devices. 
This directly tackles two of the major problems of current quantum computing hardware: 
<b>(1)</b> the limited number of available qubits (circuit width) and <b>(2)</b> the 
restricted circuit depth due to qubit/gate noise and decoherence.

</p>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/berrylium.png" title="Beryllium" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/lih_results.png" title="LiH" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


<br>
<h4>Related Publications: </h4>

<div class="publications">
    {% bibliography -f {{ site.scholar.bibliography }} -q @*[project_quantum=true]* %}
</div>
