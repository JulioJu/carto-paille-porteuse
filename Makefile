.DEFAULT_GOAL := build

.PHONY: build deploy

make-build:
	npm exec run-p build lint:no-fix
	rm -rf dist/cloud
	cp -r cloud dist/

deploy: make-build
	cd dist && b4a deploy

parse-post-install:
	mkdir -p node_modules/@types/parse/dist/parse.min.js
	mv node_modules/@types/parse/* node_modules/@types/parse/dist/parse.min.js || true
