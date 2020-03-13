require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const text = `
  SELECT  "productId",
          "name",
          "price",
          "image",
          "shortDescription"
  FROM "products";
  `;
  db.query(text)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const value = [req.params.productId];
  const text = `
  SELECT    *
  FROM      "products"
  WHERE     "productId" = $1;
  `;
  db.query(text, value)
    .then(result => {
      if (result.rows[0]) {
        return res.json(result.rows[0]);
      } else {
        next(new ClientError('The product you are looking for could not be found or has moved. Whoops!', 404));
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.json([]);
  } else {
    const value = [req.session.cartId];
    const text = `
    SELECT "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
      FROM "cartItems" AS "c"
      JOIN "products" AS "p" USING ("productId")
     WHERE "c"."cartId" = $1;
     `;
    db.query(text, value)
      .then(result => res.json(result.rows[0]))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const value = [req.body.productId];
  const text = `
  SELECT  "price"
  FROM    "products"
  WHERE   "productId" = $1;
  `;
  const parsedId = parseInt(req.body.productId);
  if (parsedId < 0 || isNaN(parsedId)) {
    return res.status(400).json({ error: 'Invalid Product ID' });
  }
  db.query(text, value)
    .then(priceResult => {
      const price = priceResult.rows[0];
      if (!priceResult.rows[0]) {
        throw new ClientError('Product not found', 400);
      } else {
        if (req.session.cartId) {
          const cartObj = { cartId: req.session.cartId, ...price };
          return cartObj;
        } else {
          const text = `
            INSERT INTO "carts" ("cartId", "createdAt")
            VALUES              (default, default)
            RETURNING           "cartId";
            `;
          return db.query(text)
            .then(cartResult => {
              const cartObj = { ...cartResult.rows[0], ...price };
              return cartObj;
            });
        }
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const values = [req.session.cartId, req.body.productId, result.price];
      const text = `
      INSERT INTO   "cartItems" ("cartId", "productId", "price")
      VALUES        ($1, $2, $3)
      RETURNING     "cartItemId";
      `;
      return db.query(text, values)
        .then(result => result.rows[0].cartItemId);
    })
    .then(result => {
      const value = [result];
      const text = `
      SELECT "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
      FROM   "cartItems" AS "c"
      JOIN   "products" AS "p" USING ("productId")
      WHERE  "c"."cartItemId" = $1;
      `;
      return db.query(text, value)
        .then(result => res.status(201).json(result.rows[0]));
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
