# Setup the project

1. Exec `docker-compose up`
2. Exec `docker exec -it bodify-api bash`
3. Exec `node bin/load-initial-data.js`. If you would like to setup the initial
data for a specific environment run a command specifying the NODE_ENV, like:
`NODE_ENV=test node bin/load-initial-data.js`

# Running the project

1. Make a copy of the file `api/.env.example` to `api/.env` configuring the
variables according with your environment
2. Exec `docker-compose up`

# Running the api tests

1. Exec `docker exec -it bodify-api bash`
2. Run `yarn test`
