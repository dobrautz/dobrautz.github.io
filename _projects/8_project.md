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

Related Publications: 
<div class="publications">
    {% bibliography -f {{ site.scholar.bibliography }} -q @*[project_thesis=true]* %}
</div>
