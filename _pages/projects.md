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

After a graduate study of physics, with specialization in computational solid state physics, and a subsequent Ph.D. in computational quantum chemistry in the field of stochastic wavefunction theory for strongly correlated electron systems, I am currently a Marie Skłodowska-Curie Postdoctoral Fellow at Chalmers University of Technology developing novel quantum computing algorithms to perform realistic ab initio calculations on near-term quantum computing devices. <br>
I have a strong knowledge of various modern theoretical and computational quantum chemistry and physics methods. 
I acquired extensive algorithm design and development expertise as the main developer of the publicly available full configuration interaction quantum Monte Carlo (FCIQMC) code <a href='https://github.com/ghb24/NECI_STABLE'>NECI</a> during my Ph.D. and consequent PostDoc.
<br><br>

The two main areas of my current research are (1) the development of novel quantum computing algorithms to perform realistic ab initio calculations on near-term quantum computers as well as (2) the development of highly accurate quantum Monte Carlo methods for high-performance computing clusters to solve strongly correlated electron problems. <br><br>


{% include figure.html path="assets/img/venn.png" title="Venn diagram" class="img-fluid rounded z-depth-1" %}



UNDER CONSTRUCTION!

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
