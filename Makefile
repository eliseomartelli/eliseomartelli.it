TITLE ?= new-post

SLUG := $(shell echo "$(TITLE)" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
DATE := $(shell date '+%Y-%m-%d')
FULL_DATE := $(shell date '+%Y-%m-%d %H:%M:%S%z')
FILENAME := content/blog/$(DATE)-$(SLUG).md

new-blog-post:
	mkdir -p content/blog
	echo '---' > $(FILENAME)
	echo 'title: "$(TITLE)"' >> $(FILENAME)
	echo 'date: "$(FULL_DATE)"' >> $(FILENAME)
	echo 'excerpt: ""' >> $(FILENAME)
	echo 'tags:' >> $(FILENAME)
	echo '  - Sample' >> $(FILENAME)
	echo 'description: ""' >> $(FILENAME)
	echo '---' >> $(FILENAME)
