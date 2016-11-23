.PHONEY: build run help

default: help

help:
	@echo "This is a makefile around docker commands."

network:
	@docker network rm blah
	@docker network create blah

app:
	@docker stop oracle-node
	@docker rm -f oracle-node
	@docker build -t oracle-node .
	@docker run -d --name oracle-node --network blah -p 3000:3000 oracle-node

db:
	@docker pull sath89/oracle-12c
	@docker run -d --network blah --name oracledb -p 8080:8080 -p 1521:1521 sath89/oracle-12c
