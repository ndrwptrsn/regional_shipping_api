# Regional Shipping Eligibility API
Andrew Peterson March 2020

## Notes

Thank you for reviewing my assessment, I had a lot of fun working on it!

I prioritized API functionality (dynamic, stored rules feature, exposed endpoints) and API integrity (validations, tests) over front-end tooling (which seems like the kind of thing that would be added to a pre-existing admin panel anyway). I did spruce up the docs a bit: http://localhost:3000/api

Each eligibility rule uses an operator (<, >, <=, =>, =, in, between), a comparator (either a list of something in the db to check against, a value, or range of values) and a target (the part of the incoming request that gets checked). Each rule gets processed, even if prior rules didn't pass. The response consists of whether or not the item is eligible and why:


##### Eligibility Endpoint
```
POST http://localhost:3000/api

{
   "title": "1959 Goya Nylon String Guitar",
   "price": 31500,
   "seller":"ndrwptrsn",
   "category":"33021"
}

200 response

{
   "eligible": false,
   "reason": [
    "rule 1: passed",
    "rule 2: provided category 12345 is not in model Category attribute ebay_id",
    "rule 3: provided price 123 is not > 1000",
    "rule 4: today's date 2020-03-26T17:24:02.647Z is not between
    2020-06-04T00:20:18.000Z & 2020-07-04T00:20:18.000Z",
   ]
}
```

##### Get all rules endpoint
```
GET http://localhost:3000/api/rules

[
    {
        "id": 1,
        "label": "enrolled_seller",
        "target": "seller",
        "operator": "in",
        "comparator": {
            "model": "Seller",
            "attribute": "username"
        },
        "createdAt": "2020-03-26T19:17:37.203Z",
        "updatedAt": "2020-03-26T19:18:22.555Z"
    },
    {
        "id": 2,
        "label": "eligible_category",
        "target": "category",
        "operator": "in",
        "comparator": {
            "model": "Category",
            "attribute": "ebay_id"
        },
        "createdAt": "2020-03-26T19:17:37.203Z",
        "updatedAt": "2020-03-26T19:17:37.203Z"
    },
    {
        "id": 3,
        "label": "minimum_price",
        "target": "price",
        "operator": ">",
        "comparator": [
            1000
        ],
        "createdAt": "2020-03-26T19:17:37.203Z",
        "updatedAt": "2020-03-26T19:17:37.203Z"
    },
    {
        "id": 4,
        "label": "active_season",
        "target": "date",
        "operator": "between",
        "comparator": [
            "1591230018000",
            "1593822018000"
        ],
        "createdAt": "2020-03-26T19:17:37.203Z",
        "updatedAt": "2020-03-26T19:17:37.203Z"
    },
    {
        "id": 5,
        "label": "pricerange",
        "target": "price",
        "operator": "between",
        "comparator": [
            59999,
            57777
        ],
        "createdAt": "2020-03-26T19:17:37.203Z",
        "updatedAt": "2020-03-26T19:17:37.203Z"
    }
]
```


Because all of the eligibility rules are stored in the db using the same format, there are many, many permutations of possible rules that can be created, updated, and destroyed programmatically without having to touch the code at all. This is the strength of this approach.

To that end, I focused my efforts on validations and tests instead of menus, buttons, and sliders. Most of the validations are to make sure that non-sensical rule objects do not get made. For example, a rule object which is looking for a price between [1099] doesn't make sense but a rule object looking for a price between [3599, 1099] does (order gets sorted, no big deal. negative values thrown out, however). I encourage you to try making rules that don't make sense as I did my best to cover these scenarios with specific, helpful error messaging. It is possible to update a rule so that it is no longer valid. In these cases I tried to provide messaging at the point of checking eligibility - if any of the rules are invalid, the eligibility endpoint will let you know.

#### Adding Rules

'Arithmetic' rules are easy to add, simply post to api/rules with a value or value range and a target attribute. Adding 'categorical' rules, i.e. rules that use the 'in' operator to check against a list stored in the db, will require a adding a new model, migration, and controller. Hopefully between the existing code and the commands below, this task is straight-forward, but as it is now, it cannot be done programmatically.

#### Final Thoughts

I had a ton of fun working on this! I put some serious time in and I hope it shows. The API could definitely use some refactoring, but I wanted to get it done. I chose not to add authentication to make it easy to play with. Along the same lines I've included a PostMan collection so you don't have to make your own.

Thank you!

#### Start
docker-compose up

#### Run Tests
docker-compose run --rm node yarn test

#### Migrate
docker-compose run --rm node yarn run migrate

## Sequelize Client

#### Generate Model (includes migration)
docker-compose run --rm node yarn run sequelize model:create  --name Seller --attributes name:string,eligible:boolean

#### Generate a Migration (no model)
docker-compose run --rm node yarn run sequelize migration:generate --name create-seller