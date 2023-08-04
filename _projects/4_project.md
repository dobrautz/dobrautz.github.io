---
layout: page
title: Transcorrelation
description: Development and application of the transcorrelated method
img: assets/img/tc_motivation_5.png
importance: 2
category: Research
---

! UNDER CONSTRUCTION ! <br>

<p>
	Accurate methods are mandatory to 
	correctly describe strongly correlated systems, but have an unfavorable computational scaling with 
	the size of the system.
	An exact calculation called full configuration interaction (FCI), 
	even scales exponentially with the system size.
	In addition to this hierarchy of methods, there is a hierarchy of 
	<i>basis set expansions.</i>
	In electronic structure theory, the Schrödinger equation is usually expanded in one-electron basis functions (plane waves for extended systems/basis sets for molecular problems), 
	which makes it tractable to solve, but
	fails to capture the 
	electron-cusp condition[<a href='https://onlinelibrary.wiley.com/doi/10.1002/cpa.3160100201'>1</a>], a form of electron correlation.
	For a quantitatively accurate description of the physics/chemistry of a system
	it is crucial to capture this form of correlation.
	This necessitates using many basis functions, which results in more computational effort for highly accurate methods.

</p>

{% include figure.html path="assets/img/tc_motivation_5.png" title="TC Motivation" class="img-fluid rounded z-depth-1" zoomable=true %}


<p>
    Explicitly correlated methods[<a href="https://link.springer.com/article/10.1007/BF00527669">2</a>] can reduce the need for large basis set expansions by  directly incorporating the electronic cusp condition
	in the wavefunction Ansatz. 
	In the <b>transcorrelated (TC) approach</b>, a correlated Ansatz -- exactly incorporating the  cusp condition -- is applied and used to perform a similarity transformation 
	of the electronic Hamiltonian describing the <i>ab initio</i> chemical system.
    The benefit of the TC method is that it yields <b>highly accurate results</b> already <b>with a small number of basis functions</b>.
	The challenge, however, is that the TC approach renders the Hamiltonian 
	non-Hermitian and introduces 3-body terms.
	Thus, most computational methods need to be modified to deal with these intricacies, which I was able to do during my Ph.D. for the full configuration interaction QMC (FCIQMC) method and on quantum computing hardware during my postdoc. 
 
</p>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/berrylium.png" title="Beryllium" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/lih_results.png" title="LiH" class="img-fluid rounded z-depth-1" %}
    </div>
</div>



<h3>Related Publications: </h3>
<div class="publications">
    {% bibliography -f {{ site.scholar.bibliography }} -q @*[project_tc=true]* %}
</div>
