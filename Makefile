.DEFAULT_GOAL := build

.PHONY: build deploy

make-build:
	npm exec run-p build lint
	rm -rf dist/cloud
	cp -r cloud dist/

deploy: make-build
	cd dist && b4a deploy
