#### Start
docker-compose up

#### Run Tests
docker-compose run --rm node yarn test

#### Migrate
docker-compose run --rm node yarn run migrate



## Database Commands

#### Generate Model
docker-compose run --rm node yarn run sequelize model:create
