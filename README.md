## Installation

- Run mongo `docker-compose up -d mongo`
- Run server `docker-compose up server`
- Run client `docker-compose up client`
- [Tips] To quick run `make run`
- To seed database send `POST` request to `http://localhost:400/seeds`

## URLs

- Socialite App `http://localhost:5000`
- API `http://localhost:4000`

## Useful links

- To add package `docker-compose run client yarn add <package-name>`
- Type checking with [propTypes](https://fr.reactjs.org/docs/typechecking-with-proptypes.html)
