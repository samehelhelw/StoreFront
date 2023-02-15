# Environement Variable

PORT = 3000
NODE_ENV=dev

# DB Configration

PORT=3000
ENV=dev

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

# Hashing Password

BCRYPT_PASSWORD=SECRET-PASSWORD
SALT_ROUNDS=10

# JSON Web Token (JWT)

TOKEN_SECRET=TOKEN_SECRET

# Syntax METHOD LINK

HOME GET http://localhost:3000/
CREATEUSER POST http://localhost:3000/api/users/create

CREATE PRODUCT POST http://localhost:3000/api/proudcts/create
GET ALL PRODUCT GET http://localhost:3000/api/products/index

CREATE ORDER POST http://localhost:3000/api/orders/create
GET ALL ORDER GET http://localhost:3000/api/orders/index

Add Product to Order POST http://localhost:3000/api/orders/addProduct
Get All Products On Order GET http://localhost:3000/api/orders/getProduct/1

"scripts": {
"watch": "tsc-watch --esModuleInterop src/index.ts --outDir ./dist --onSuccess \"node ./dist/index.js\"",
"test": "tsc && jasmine",
"dev": "nodemon ./src/index.ts",
"build": " npx tsc",
"start": "npm run build && nodemon build/index.js",
"format": "prettier --write 'src/\*_/_.{ts,tsx,js,jsx}'",
"lint": "eslint . --ext .ts",
"migration:run": "db-migrate up"
}
