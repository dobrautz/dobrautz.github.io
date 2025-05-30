---
layout: page
title: Jobs
permalink: /jobs/
description: Open positions in our group
nav: true
display_categories: [PostDoc, PhD, Master/Bachelor Theses]
horizontal: true
nav_order: 2
---

Join our open-minded, supportive, and ambitious research group in Dresden and Görlitz! We have upcoming funded PhD and Postdoctoral positions, stay tuned! We seek motivated individuals with a passion for fields like: computational physics, theoretical chemistry, quantum computing technologies, quantum information science, machine learning and artificial intelligence. Programming expertise, and a solid background in one (or multiple) of the above-mentioned topics is a plus! We are dedicated to fostering a supportive and inclusive research environment that encourages scientific excellence. We welcome applications from individuals of all backgrounds and expressly invite members of underrepresented groups to apply. 


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

We are always open for interested Bachelor and Master students from the TU Dresden and the Zittau/Görlitz University of Applied Sciences to work on their theses with us! Please just reach out to me! 

<h4>
We are also open and interested in assisting with applications for competitive postdoctoral research fellowships, like: 
</h4>
<ul>
<li>
<a href='https://www.humboldt-foundation.de/en/apply/sponsorship-programmes/humboldt-research-fellowship'>Humboldt Research Fellowship</a>
</li>

<li>
<a href='https://www.humboldt-foundation.de/en/apply/sponsorship-programmes/philipp-schwartz-initiative#h6386'>Philipp Humboldt foundation: Schwartz Initiative for researchers at risk</a>
</li>

<li>
<a href='https://www.humboldt-foundation.de/en/apply/sponsorship-programmes/georg-forster-research-fellowship'>Humboldt foundation: Georg Forster Research Fellowship</a>
</li>

<li>
<a href='https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships'>Marie Skłodowska-Curie Postdoctoral Fellowships</a>
</li>

<li>
<a href='https://www.dfg.de/en/research-funding/funding-opportunities/programmes/individual/walter-benjamin'>DFG Walter Benjamin Programme</a>
</li>

<li>
<a href="https://www.helmholtz-hida.de/en/new-horizons/hida-visiting-program/">Helmholtz Visiting Researcher Grant</a>
</li>

</ul>

or PhD fellowships, like:
<a href='https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=57135739'> DAAD Doctoral Fellowship </a>
or the 
<a href='https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?status=&origin=&subjectGrps=&daad=&intention=&q=research&page=1&detail=57742121'>DAAD Doctoral Progamme
</a>
