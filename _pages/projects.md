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
	Electronic structure theory is concerned with the solution of the Schödinger equation to obtain ground and excited states	energies, wavefunctions, and properties of quantum mechanical systems of interest.
	A solution of the correlated motion of electrons would allow a description of many groundbreaking yet unsolved physical and chemical phenomena, like unconventional high-Tc	superconductivity, photosynthesis, or nitrogen fixation.
	With an efficient method to solve this problem, we could predict and design the chemical and physical properties of novel quantum materials and molecules. 
</p>

{% include figure.html path="assets/img/schrodinger.png" title="Electronic Structure Problem" class="center" %} 


<h3>Background</h3> 

I studied technical physics at Graz University of Technology, specializing in computational solid-state physics. I obtained my PhD in computational quantum chemistry at the Max Planck Institute for Solid State Research and the University of Stuttgart in 2019. My research during my PhD focused on developing innovative quantum Monte Carlo methods in a high-performance computing (HPC) setting to solve strongly correlated electron problems. From 2021 until the end of 2024, I was a Marie Skłodowska-Curie Postdoctoral Fellow at Chalmers University of Technology in Gothenburg, Sweden. My research at Chalmers University and the Wallenberg Centre for Quantum Technologies focused on developing novel quantum computing algorithms to enable realistic electronic structure calculations on current and near-term quantum computing (QC) devices.
<br>

I have a strong knowledge of various modern theoretical and computational quantum chemistry and physics methods. 
I acquired extensive algorithm design and development expertise as the main developer of the publicly available full configuration interaction quantum Monte Carlo (FCIQMC) code <a href='https://github.com/ghb24/NECI_STABLE'>NECI</a> during my Ph.D. and consequent PostDoc.
<br>

Since December 2024, I am a DRESDEN-concept research group leader jointly appointed at the Center for Scalable Data Analytics and Artificial Intelligence (ScaDS.AI) in Dresden and the Center for Advanced Systems Understanding (CASUS) in Görlitz.
{% include figure.html path="assets/img/cv_map.png" title="CV Map" class="img-fluid rounded z-depth-1" zoomable=true %}

<h3>Research</h3>

 In my current role, I am building an <b>AI 4 Quantum</b> research group that focuses on developing a synergistic HPC+QC approach aided by novel artificial intelligence/deep machine learning methods to enable the computational study of complex quantum systems relevant to the green energy transition. 
Additionally, my current research focuses on developing innovative quantum Monte Carlo methods and novel quantum computing algorithms to enable realistic electronic structure calculations for strongly correlated electron problems on high-performance computing hardware and near-term quantum computing devices. <br>

{% include figure.html path="assets/img/venn.png" title="Venn diagram" class="center" %} 


You can find more info about my past and current research interests and projects below!
<br>

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
