# All
run:
	docker-compose up -d && docker-compose up server
up:
	docker-compose up -d
build:
	docker-compose up -d --build

# Front
fstart:
	docker-compose run client
finstall:
	docker-compose run client yarn install
fclean:
	rm -rf client/node_modules client/yarn.lock
