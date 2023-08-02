---
layout: page
title: Research
permalink: /projects/
description: An overview of my past and current research projects
nav: true
nav_order: 2
display_categories: [Research]
horizontal: true
---

<h3>Motivation</h3> 
<p>
	Electronic structure theory is concerned with the solution of the Schödinger equation to obtain ground and excited states
	energies, wavefunctions, and properties of quantum mechanical systems of interest.
	A solution of the correlated motion of electrons would allow a description 
	of many groundbreaking yet unsolved physical and chemical phenomena, like unconventional high-Tc
	superconductivity, photosynthesis, or nitrogen fixation.
	With an efficient method to solve this problem, we could predict and design the chemical and physical properties of novel 
	quantum materials and molecules. 
</p>

{% include figure.html path="assets/img/schrodinger.png" title="Electronic Structure Problem" class="center" %} 


<h3>Background</h3> 

I studied physics, specializing in computational solid-state physics, at Graz University of Technology Austria.
Subsequently, I obtained my Ph.D. in computational quantum chemistry in the field of stochastic wavefunction theory for strongly correlated electron systems at the Max Planck Institute of Solid State Research and the University of Stuttgart. 
Currently, I am a Marie Skłodowska-Curie Postdoctoral Fellow at <a href='https://www.chalmers.se/en/persons/dobrautz/'>Chalmers University of Technology</a> developing novel quantum computing algorithms to perform realistic ab initio calculations on near-term quantum computing devices. <br>
I have a strong knowledge of various modern theoretical and computational quantum chemistry and physics methods. 
I acquired extensive algorithm design and development expertise as the main developer of the publicly available full configuration interaction quantum Monte Carlo (FCIQMC) code <a href='https://github.com/ghb24/NECI_STABLE'>NECI</a> during my Ph.D. and consequent PostDoc.
<br>

{% include figure.html path="assets/img/cv_map.png" title="CV Map" class="img-fluid rounded z-depth-1" zoomable=true %}

<h3>Research</h3>

My ongoing research focuses on three areas: (1) the development of highly accurate quantum Monte Carlo (QMC) methods for high-performance computing clusters to solve strongly correlated electron problems; (2) developing novel quantum computing (QC) algorithms to perform realistic electronic structure calculations on near-term intermediate-scale quantum (NISQ) devices; and (3) a seamless integration of a hybrid HPC+QC approach to tackle relevant solid state and electronic structure problems on NISQ devices. This will pave the way to simulate strongly correlated electron systems of high scientific and economic interest, where accurate approaches are needed to understand groundbreaking physical phenomena like high-temperature superconductivity, photosynthesis, or nitrogen fixation.
<br><br>


{% include figure.html path="assets/img/venn.png" title="Venn diagram" class="center" %} 


You can find more info about my past and current research interests and projects below!
<br>

! PAGE IS UNDER CONSTRUCTION!

<!-- pages/projects.md -->
<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.projects | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>
