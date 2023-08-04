---
layout: page
title: Spin symmetry 
description: Implementation and exploitation of spin symmetry
img: assets/img/casscf.png
importance: 4
category: Research
---

! UNDER CONSTRUCTION ! <br>

<p>
The concept of symmetry is of paramount importance in physics and chemistry. The exploitation of the inherent symmetries and corresponding conservation laws in electronic structure calculations not only reduces the degrees of freedom by block-diagonalization of the Hamiltonian into different symmetry sectors but also ensures the conservation of “good” quantum numbers and, thus, the physical correctness of calculated quantities. It also allows us to target a specific many-body subspace of the problem at hand. Commonly utilized symmetries in electronic structure calculations are discrete translational and point group symmetries, angular momentum, and z-projection of the total spin. 

Due to a non-straight-forward implementation and accompanying increased computational cost, one often ignored symmetry is the global SU(2) spin-rotation symmetry of spin-preserving, nonrelativistic Hamiltonians, common to many molecular systems studied.

</p>

{% include figure.html path="assets/img/hilbert_space_reduc.png" title="Block diagonalization" class="center img-fluid rounded z-depth-1" zoomable=true %} 

<p>
    In addition to the abovementioned Hilbert space size reduction and conservation of the total spin S, solving for the eigenstates of the Hamiltonian in a spin-eigenbasis allows targeting distinct—even (near-)degenerate—spin eigenstates, which allows the calculation of spin gaps between states inaccessible otherwise, and facilitates a correct physical interpretation of calculations and description of chemical processes governed by the intricate interplay between them. Moreover, by working in a specific spin sector, convergence of projective techniques that rely on the repeated application of a propagator to an evolving wavefunction is greatly improved, especially where there are near spin-degeneracies in the exact spectrum.
</p>

<p>
The Full Configuration Interaction Quantum Monte Carlo (FCIQMC) approach is a method that benefits from working in a spin-pure many-body basis. 
In my PhD, I implemented FCIQMC in a fully spin-adapted basis based on the unitary group approach. 
I applied the above methodology to obtain results not otherwise attainable with conventional approaches for the spin-gap of the high-spin cobalt atom ground- and low-spin excited state and the electron affinity of scandium within chemical accuracy to experiment.
Furthermore, we establish the ordering of the scandium anion bound states, which has until now not been experimentally determined. 
	Recently, my spin-adapted implementation of FCIQMC enabled us to study the 
	<a href='https://pubs.acs.org/doi/full/10.1021/acs.jctc.1c00589'>magnetic
		properties and spin interactions of transition-metal complexes</a> in the form of iron-sulfur cluster, <a href='https://journals.aps.org/prb/abstract/10.1103/PhysRevB.104.235102'>Nagaoka ferromagnetism in the hole-doped Hubbard model</a> and a <a href='https://journals.aps.org/prb/abstract/10.1103/PhysRevB.105.195123'>combination of the unitary and symmetric group approach for low-dimensional spin systems</a>, possibly extending our method to allow the study of spin-liquid phases.
    
</p>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/casscf.png" title="CASSCF" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/magnetic_coupling" title="Magnetic coupling" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

{% include figure.html path="assets/img/magnetic_coupling_2.png" title="Magnetic Coupling 2" class="img-fluid rounded z-depth-1" zoomable=true %} 



Related Publications: 
<div class="publications">
    {% bibliography -f {{ site.scholar.bibliography }} -q @*[project_guga=true]* %}
</div>
