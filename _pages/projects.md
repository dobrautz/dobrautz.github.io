---
layout: page
title: Research and Projects
permalink: /projects/
description: An overview of my past and current research projects
nav: true
nav_order: 2
display_categories: [Research]
horizontal: false
---

After a graduate study of physics, with specialization in computational solid state physics, and a subsequent Ph.D. in computational quantum chemistry in the field of stochastic wavefunction theory for strongly correlated electron systems, I am currently a Marie Skłodowska-Curie Postdoctoral Fellow at <a href='https://www.chalmers.se/en/persons/dobrautz/'>Chalmers University of Technology</a> developing novel quantum computing algorithms to perform realistic ab initio calculations on near-term quantum computing devices. <br>
I have a strong knowledge of various modern theoretical and computational quantum chemistry and physics methods. 
I acquired extensive algorithm design and development expertise as the main developer of the publicly available full configuration interaction quantum Monte Carlo (FCIQMC) code <a href='https://github.com/ghb24/NECI_STABLE'>NECI</a> during my Ph.D. and consequent PostDoc.
<br>

The two main areas of my current research are (1) the development of novel quantum computing algorithms to perform realistic ab initio calculations on near-term quantum computers as well as (2) the development of highly accurate quantum Monte Carlo methods for high-performance computing clusters to solve strongly correlated electron problems. <br><br>

<figure>
    <img src="/assets/img/venn.png"
         alt="Venn diagram">
</figure>

{% include figure.html path="assets/img/venn.png" title="Venn diagram" class="resize" %} 

<br>

The title of my Ph.D. thesis was <a href='http://dx.doi.org/10.18419/opus-10593'>'Development of FCIQMC methods for strongly correlated electron systems'</a>, supervised by <a href='https://en.wikipedia.org/wiki/Ali_Alavi'>Prof. Ali Alavi</a> at the <a href='https://www.fkf.mpg.de/en'>Max Planck Institute for Solid State Research</a>. The two major contributions of my work were (1) <a href='https://pubs.aip.org/aip/jcp/article/151/9/094104/197502/Efficient-formulation-of-full-configuration'>the efficient implementation of FCIQMC in a fully spin-adapted basis via the unitary group approach</a> and (2) the development and implementation of a correlated wavefunction Ansatz, the so-called transcorrelated approach, for <a href='https://journals.aps.org/prb/abstract/10.1103/PhysRevB.99.075119'>lattice models</a> and <a href='https://pubs.aip.org/aip/jcp/article/151/6/061101/561008'>ab initio systems.</a>

<br>

You can find more info about my past and current research interests and projects below!

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
