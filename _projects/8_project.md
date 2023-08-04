---
layout: page
title: PhD Thesis
description: Development of full configuration interaction quantum Monte Carlo methods for strongly correlated electron systems
img: assets/img/fciqmc_spawning_step.jpg
importance: 8
category: Research
---

<p>
The title of my Ph.D. thesis was <a href='http://dx.doi.org/10.18419/opus-10593'>'Development of FCIQMC methods for strongly correlated electron systems'</a>, supervised by <a href='https://en.wikipedia.org/wiki/Ali_Alavi'>Prof. Ali Alavi</a> at the <a href='https://www.fkf.mpg.de/en'>Max Planck Institute for Solid State Research</a>. The two major contributions of my work were (1) <a href='https://pubs.aip.org/aip/jcp/article/151/9/094104/197502/Efficient-formulation-of-full-configuration'>the efficient implementation of FCIQMC in a fully spin-adapted basis via the unitary group approach</a> and (2) the development and implementation of a correlated wavefunction Ansatz, the so-called transcorrelated approach, for <a href='https://journals.aps.org/prb/abstract/10.1103/PhysRevB.99.075119'>lattice models</a> and <a href='https://pubs.aip.org/aip/jcp/article/151/6/061101/561008'>ab initio systems.</a>
</p>

<p>
The open-source repository of our FCIQMC code base NECI can be found <a href='https://github.com/ghb24/NECI_STABLE'>here</a>.
</p>

<p> 
Full Configuration Interaction Quantum Monte Carlo (FCIQMC) is a method to calculate the exact solution of the Schrödinger equation in a finite antisymmetric basis and gives access to physical observables through an efficient stochastic sampling of the wavefunction that describes a quantum mechanical system. 
Although system-agnostic (black-box-like) and numerically exact, its effectiveness depends crucially on the compactness of the wave function: a property that gradually decreases as correlation effects become stronger.
In my thesis, I developed two -- conceptually distinct --  approaches to extend the applicability of FCIQMC towards larger and more <b>strongly correlated</b> systems.
</p>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/guga_1.png" title="GUGA example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/guga_2.png" title="GUGA example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<p>
In the first part, I investigated a spin-adapted formulation of the FCIQMC algorithm based on the <b>Unitary Group Approach</b>. 
Exploiting the inherent symmetries of the nonrelativistic molecular Hamiltonian dramatically reduces the effective Hilbert space size of the problem. 
A spin-pure basis explicitly resolves the different spin sectors, even when degenerate, and the absence of spin-contamination ensures the sampled wavefunction is an eigenfunction of the total spin operator.
Moreover, targeting specific many-body states with conserved total spin allows an accurate description of chemical processes governed by their intricate interplay. 
I applied the above methodology to obtain results not otherwise attainable with conventional approaches for the spin-gap of the high-spin cobalt atom ground- and low-spin excited state and the electron affinity of scandium within chemical accuracy to experiment.
Furthermore, we establish the ordering of the scandium anion bound states, which has until now not been experimentally determined. 
</p>

<p>
In the second part, I investigated a methodology to explicitly incorporate electron correlation into the initial Ansatz of the ground state wavefunction. 
Such an Ansatz induces a compact description of the wave function, which ameliorates the sampling of the configuration space of a system with FCIQMC.
Within this approach, I investigated the two-dimensional Hubbard model near half-filling in the intermediate interaction regime, where such an Ansatz can be exactly incorporated by a nonunitary similarity transformation of the Hamiltonian based on a Gutzwiller correlator.
This transformation generates novel three-body interactions, tractable due to the stochastic nature of FCIQMC, and leads to a non-Hermitian effective Hamiltonian with extremely compact right eigenvectors.
The latter fact allows the application of FCIQMC to larger lattice sizes well beyond the reach of the method applied to the original Hubbard Hamiltonian.  
</p>

Related Publications: 
<div class="publications">
    {% bibliography -f {{ site.scholar.bibliography }} -q @*[project_thesis=true]* %}
</div>
