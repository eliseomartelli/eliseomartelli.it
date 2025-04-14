#!/bin/sh

# Based on: https://gist.github.com/oneohthree/f528c7ae1e701ad990e6
slugify () {
  iconv -t ascii//TRANSLIT | \
  sed -E 's/[^a-zA-Z0-9]+/-/g' | \
  sed -E 's/^-+|-+$//g' | \
  tr A-Z a-z
}

read -p "title: " title
slug=$(echo "$title" | slugify)

dateString=$(date +%Y-%m-%d-)
filename="${dateString}${slug}.md"

cat <<EOF > "$filename"
---
title: $title
date: "$(date '+%Y-%m-%d %H:%M:00')"
excerpt: ""
tags:
  - Misc
---

EOF
