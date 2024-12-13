---
layout: post
title: 'New paper published in JCTC: Toward Real Chemical Accuracy on Current Quantum Hardware Through the Transcorrelated Method'
date: 2024-05-09
inline: false
related_posts: false
---

Our work to enable accurate quantum chemistry on current quantum hardware through the transcorrelated approach is now published in Journal of Chemical Theory and Computation: <a href='https://pubs.acs.org/doi/full/10.1021/acs.jctc.4c00070'>Link</a>

In this work, we use an explicitly correlated Ansatz that transfers – without any approximation – correlation from the wavefunction to the Hamiltonian of a system. Consequently, the wavefunction/solution is easier to describe, and we can drastically reduce the number of quantum resources – in the form of qubits and circuit depth – to achieve accurate quantum chemistry results. 

To showcase the power of this resource reduction: it allowed us to calculate the dissociation energy of lithium hydride within chemical accuracy to experimental /complete basis set limit results on the hashtag#ibm lagos device. In the case of LiH, our method only requires 4 qubits, and the easier description of the wavefunction allows us to use a hardware-efficient Ansatz with a CNOT gate count of only 6. 

For more details, please have a look at the #openaccess paper or reach out to me! 

Thanks to Igor Sokolov, Ke Liao, Pablo López Ríos, Martin Rahm, Ali Alavi and Ivano Tavernelli for the great collaboration

{% include figure.html path="assets/img/adapt-toc1.jpg" title="Paper TOC graphic" class="img-fluid rounded z-depth-1" zoomable=true %} 


