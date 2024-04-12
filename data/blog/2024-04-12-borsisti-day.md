---
title: "GARR's Borsisti Day 2024-04-09"
date: 2024-04-12 00:00
excerpt: "You can now reproduce my speech"
tags:
  - Conferences
---

On the recent Tuesday, I joined my tutor, Luca Alessandrì, at GARR's Borsisti Day.
It marked my inaugural presentation of "CREDO", the bioinformatic-oriented project I'm working on under my research fellowship.

<iframe title="CREDO: DOcker file generator for bioinformatics applications - E. Martelli -  17° Borsisti Day 2024" src="https://garr.tv/videos/embed/2f7579db-ef10-47c8-969e-1d9ad6b905a8" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups" class="aspect-video w-full"></iframe>

[Slide deck](https://github.com/eliseomartelli/garr_borsisti_day_2024_04_09/archive/refs/tags/v1.0.0.zip)

The project CREDO is an open-source platform designed to simplify the management of bioinformatics environments. The platform is built using containerization technology, specifically Docker, to provide a
consistent and reproducible environment for researchers. The main goals of CREDO are:

1. Modularity: The platform is designed to be modular, allowing users to easily swap out different components or add new ones as needed.
2. Interoperability: CREDO aims to be interoperable with existing bioinformatics tools and platforms, making it easy for researchers to use the platform alongside their existing workflows.
3. Accessibility: The platform is designed to be accessible to researchers with varying levels of experience in bioinformatics, including those who are new to the field.
4. Reusability: CREDO aims to be reusable across different projects and experiments, reducing the need for duplicated effort and increasing efficiency.
5. Documentation: The platform includes detailed documentation to help users understand how to use it effectively.
6. Community involvement: The project is open-source, and the development team is committed to contributing to other open-source projects in the bioinformatics community.
7. Security: The platform includes security features such as encryption and secure authentication to protect user data and prevent unauthorized access.
8. Customization: Users can customize the platform to meet their specific needs and requirements.
9. Support: The development team is committed to providing ongoing support and maintenance for the platform, ensuring that it remains up-to-date and relevant over time.

The platform consists of several core technologies, including:

1. Registry pattern: CREDO uses a registry pattern to manage the configuration of the platform, allowing users to define their environment once and reuse it across different experiments and projects.
2. Go programming language: The platform is built using the Go programming language, which provides lightweight threads (goroutines) for parallel processing and a robust channel framework for communication
   between processes.
3. YAML configuration files: CREDO uses YAML configuration files to define the environment and manage changes to it over time.
4. Package manager integration: The platform includes integrations with popular package managers such as PIP, CRAN, and APT, making it easy for users to install and manage software packages.

Future improvements:

1. Event listening: CREDO can listen to events on the user's file system, allowing it to automatically detect changes to the environment and update the platform accordingly.
2. User feedback: The development team is committed to gathering feedback from users to improve the platform over time and ensure that it meets their needs and requirements.

![Picture of all research fellows](/posts/2024-04-12-borsisti-day/1712762678252.jpeg)
_Picture courtesy of GARR_

It was an amazing, kinda warm, networking day (pun not intended) and I can't wait to meet all those bright people again!
