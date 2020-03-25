#### Start
docker-compose up

#### Run Tests
docker-compose run --rm node yarn test

#### Migrate
docker-compose run --rm node yarn run migrate

## Sequelize Client

#### Generate Model (includes migration)
docker-compose run --rm node yarn run sequelize model:create  --name Seller --attributes name:string,eligible:boolean

#### Generate Migration
docker-compose run --rm node yarn run sequelize migration:generate --name create-seller
