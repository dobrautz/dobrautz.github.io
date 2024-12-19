---
layout: page
title: FCIQMC
description: Development of the full configuration interaction quantum Monte Carlo method
img: assets/img/neci.png
importance: 5
category: Research
---

Instead of describing all possible states of a system, Monte Carlo (MC) methods rely on random numbers to sample the physically most relevant and representative ones and draw conclusions from them to understand the underlying physical properties of a system. <br>

Full configuration interaction quantum Monte Carlo (FCIQMC)
[<a href='https://doi.org/10.1063/1.3193710'>1</a>,
<a href='https://doi.org/10.1063/1.3302277'>2</a>,
<a href='https://doi.org/10.1063/5.0005754'>3</a>]
is a QMC method to solve the Schrödinger equation of a system
with very high accuracy and for comparatively large system sizes.
It can obtain ground and excited states
energies
[<a href='https://doi.org/10.1063/1.4932595'>4</a>]
, as well as static
[<a href='https://doi.org/10.1063/1.4904313'>5</a>,
<a href='https://doi.org/10.1063/1.4986963'>6</a>]
and dynamic properties[<a href='https://doi.org/10.1103/PhysRevLett.121.056401'>7</a>]
of ab initio problems, as well as lattice models, i.e., Hubbard
[<a href='https://doi.org/10.1103/physrevb.99.075119'>8</a>]
or Heisenberg Hamiltonians
[<a href='https://doi.org/10.1103/physrevb.105.195123'>9</a>]
. <br>

The open-source repository of our FCIQMC code base NECI can be found <a href='https://github.com/ghb24/NECI_STABLE'>here</a>. <br>

{% include figure.html path="assets/img/Reduced-Movie.gif" title="Venn diagram" class="center" %} 
<div class="caption">
Example of an FCIQMC simulation for a model of streched N2 from <a href='http://www-alavi.ch.cam.ac.uk/'>http://www-alavi.ch.cam.ac.uk/</a>
</div>


<br>

<h4>Related Publications: </h4>
<div class="publications">
    {% bibliography -f {{ site.scholar.bibliography }} -q @*[project_fciqmc=true]* %}
</div>
