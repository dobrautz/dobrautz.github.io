---
layout: page
title: qHPC-GREEN
description: Quantum-enhanced high-performance computing for the green energy transition
img: /assets/img/qhpc-green.png
importance: 1
category: Projects
permalink: /projects/qhpc/
---
<h3>Overview</h3> 
In the research project <b>qHPC-GREEN</b>, we aim to address the challenges posed by climate change and the imperative for a green energy transition by leveraging the synergistic potential of high-performance computing (HPC) and quantum computing (QC) to model quantum mechanical systems pivotal to biochemical and physical phenomena relevant to environmental and energy challenges.

{% include figure.html path="assets/img/qhpc-green.png" title="qHPC-GREEN TOC" class="center img-fluid rounded z-depth-1" zoomable=true %} 

One of the main obstacles to advancing green technologies, such as bio-catalysis for efficient ammonia production, is the complexity of their underlying quantum mechanical mechanisms. These processes, catalyzed by small quantum systems with strong electronic correlations, are not yet fully understood and pose significant challenges to experimental and theoretical investigation. Hence, there is a pressing need for sophisticated computational models to elucidate these phenomena and support the development of effective catalysts and other green technologies. Especially artificial enzymatic nitrogen fixation at lower temperatures and pressures would offer a more sustainable alternative to the energy-intensive Haber-Bosch process, thereby drastically reducing greenhouse gas emissions.

In this project, we aim to bridge this gap through an innovative approach that combines the strengths of both classical and novel quantum computing hardware. The project aims to develop a seamless hybrid HPC+QC methodology tailored to accurately describe quantum materials and bio-inspired catalysts. This approach includes a correlated method to minimize quantum resources and a divide-and-conquer strategy utilizing HPC for weakly-correlated and QC for strongly-correlated regions. The seamless HPC+QC computational toolset will aid in understanding biological nitrogen fixation performed by the nitrogenase enzyme and its iron-molybdenum cofactor. 

This project aims to create algorithms that exploit the unique advantages of QC, particularly in treating small, strongly correlated regions that are challenging for classical computations. Integrating QC solutions with conventional HPC approaches will create a powerful computational toolset expected to address complex environmental science research problems beyond the capabilities of existing computational methods.


<h3>Objectives</h3>
This project aims to develop hybrid HPC+QC algorithms, enabling accurate electronic structure calculations of strongly correlated problems with significant scientific and economic implications in the form of transition-metal clusters involved in enzymatic nitrogen fixation.
To achieve this aim, the project consists of two interconnected scientific objectives (SOs), which are combined with computational studies system with (bio-)chemical significance in the form of iron-sulfur clusters: Fe$$_2$$S$$_2$$, Fe$$_4$$S$$_4$$, and FeMoCo (Fe$$_7$$MoS$$_9$$C).


{% include figure.html path="assets/img/nitrogrenase.png" title="Systems" class="center img-fluid rounded z-depth-1" zoomable=true %} 

These systems are out of reach of accurate computational chemistry methods performed on conventional HPC hardware as they scale -- in the worst case -- exponentially with the problems' size. Quantum computing has the potential to provide a significant speedup compared to classical computers, but its practical implementation is still in its infancy.
The main roadblocks are the limited number of available qubits as well as noise and decoherence, severely restricting the number of operations that can be applied -- the circuit depth. Additionally, it is not yet clear how QC hardware's potential to encode an exponential problem size, 2$$^n$$, with $$n$$ qubits can be efficiently utilized to solve practical use cases. 

Thus, before the advent of fault-tolerant quantum computing, there is a paramount need to develop novel noise-resilient quantum algorithms that can use the current limited number of available qubits to bring quantum advantage in practical applications. The most promising route is to develop hybrid quantum-classical algorithms that seamlessly combine HPC and QC resources; utilizing the strengths of both quantum and classical computing to study strongly correlated PNTM compounds essential to biochemical processes in the green energy transition.

{% include figure.html path="assets/img/quantum_circuit_sketch_1.png" title="Hybrid QC" class="center img-fluid rounded z-depth-1" zoomable=true %} 

<b>SO1</b> aims to extend a highly accurate quantum algorithm, variational quantum imaginary time evolution (VarQITE), to larger and relevant problem sizes for bio-catalysis in the form of polynuclear transition metal (PNTM) compounds. VarQITE is a near-term friendly, hybrid quantum-classical approach to obtain accurate ground state energies of quantum systems. The objective entails optimizing quantum resources by (a) implementing a correlated approach, the transcorrelated (TC) method, that reduces the required qubit number, and (b) developing quantum algorithms to further reduce the quantum circuit depth.
This reduction will be achieved by combining adaptive and novel quantum ansätze that integrate hardware efficiency with physical and chemical insights via symmetries. This quantum resource reduction will allow us to obtain accurate results on current and near-term noisy intermediate-scale quantum (NISQ) devices.

<b>SO2</b> is to combine this highly accurate quantum algorithm with a divide-and-conquer strategy, utilizing HPC methods for the extended, weakly correlated parts of a system and QC for the strongly correlated regions. This objective entails the combination of VarQITE with an embedding approach in the form of the complete active space self-consistent field (CASSCF) embedding. To enable this self-consistent HPC+QC combination, VarQITE needs to be extended to obtain not only ground state energies of quantum systems but also properties by sampling reduced density matrices (RDMs). The embedding approach will extend the applicability of highly accurate hybrid quantum algorithms to even larger and more relevant problem sizes in biochemistry. Additionally, to target relevant chemical properties in the form of energy differences and transition state properties,  the combined HPC+QC approach will be extended to excited-state energies and properties.

Concurrently, in SO1 and SO2, the development of novel error mitigation strategies, in the form of multi-reference error mitigation (MREM), will enable the current and near-term applicability of noisy quantum devices, addressing a key challenge in the field.

{% include figure.html path="assets/img/vision_new.png" title="Project" class="center img-fluid rounded z-depth-1" zoomable=true %} 

Hosted by:
{% include figure.html path="assets/img/hosted_by/hosted_by.002.png" title="Hosted by" class="center img-fluid rounded z-depth-1" zoomable=true %} 

Funded by:
{% include figure.html path="assets/img/funded_by/funded_by.002.png" title="Hosted by" class="center img-fluid rounded z-depth-1" zoomable=true %} 

