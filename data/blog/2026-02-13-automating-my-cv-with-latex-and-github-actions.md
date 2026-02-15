---
title: "Automating my CV with LaTeX and GitHub Actions"
date: "2026-02-13 10:00:00"
excerpt: "Back on the job market. Look at my overkill cv workflow."
tags:
  - Automation
  - Programming
---

After two wonderful, albeit intense years, working with Consortium GARR on
bioinformatics tools, it's time for a new challenge. I'm officially back on the
market.

Being a developer, passionate about automation and reproducibility, with a 
strong background in "DevOps", I couldn't just _write_ a CV in a word processor
and call it a day. It has to be version controlled, reproducible, and automated.

For years, I've used LaTeX for most of my writing needs, including my resume.
It's stable, looks professional, and most importantly, it's plain text, 
which means I can use all the tools I'm most confortable with: Git, Vim, and of
course all the good UNIX command line tools.

Since I'm easily annoyed by WYSIWYG editors, and I don't want to deal with
formatting issues every time I need to edit something, I created a zero-thought
workflow for my CV. With a custom command to keep the formatting consistent,
a simple Makefile to build the PDF, and a GitHub Action to automate the release
process, I can focus on what really matters: describing my experience and
skills.

The custom command `\resumeItem` is something like this:

```latex
\newcommand{\resumeItem}[5]{
    \noindent \textbf{#1} \hfill \textbf{#2}
    \ifboolexpr{test {\ifstrempty{#3}} and test {\ifstrempty{#4}}}{}{
        \\
        \textit{#3} \hfill #4
    }
    \ifstrempty{#5}{}{
        \begin{itemize}[noitemsep,topsep=0pt,leftmargin=1.5em]
            #5
        \end{itemize}
    }
    \vspace{1em}
}
```

The GitHub Action is triggered on every push to the repository, and 
when I push a tag, the workflow creates a GitHub Release with the PDF attached.

This setup ensures that I always have a "production-ready" version of my CV
available at a stable URL. No more "CV_final_v2_new.pdf" files floating around.

If you're looking for a developer who treats everything, even his resume, with
the rigor of a production system, [let's talk](mailto:me@eliseomartelli.it).
