CREATE TABLE order_products (
  order_id   bigint REFERENCES NOT NULL orders(id) ,
  product_id bigint  REFERENCES NOT NULL product(id) ,
  quantity   INTEGER NOT NULL ,
  PRIMARY KEY(order_id, product_id)
);