.PHONEY: build run help

default: help

help:
	@echo "This is a makefile around docker commands."

build:
	@docker build -t oracle-node .

clean:
	@docker rm -f oracle-node

run:
	@docker run -d --name oracle-node -p 3000:3000 oracle-node
