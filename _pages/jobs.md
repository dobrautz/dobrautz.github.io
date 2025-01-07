---
layout: page
title: Jobs
permalink: /jobs/
description: Open positions in my group
nav: true
display_categories: [PostDoc, PhD, Master/Bachelor Theses]
horizontal: true
nav_order: 2
---

Join our open-minded, supportive, and ambitious research group in Dresden and Görlitz! We have upcoming funded PhD and Postdoctoral positions, stay tuned! We seek motivated individuals with a passion for fields like: computational physics, theoretical chemistry, quantum computing technologies, quantum information science, machine learning and artificial intelligence. Programming expertise, and a solid background in one (or multiple) of the above mentioned topics is a plus! We are dedicated to fostering a supportive and inclusive research environment that encourages scientific excellence. We explicitly welcome applications from individuals of all backgrounds. 


<!-- pages/jobs.md -->
<div class="jobs">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized jobs -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.jobs | where: "category", category -%}
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
<!-- Display jobs without categories -->
  {%- assign sorted_projects = site.jobs | sort: "importance" -%}
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

We are also open and interested in assisting with applications for competitive postdoctoral research fellowships (details below). 

