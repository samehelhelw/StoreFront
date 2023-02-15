
CREATE TABLE users(
id serial PRIMARY KEY,
user_name varchar(100) NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
password VARCHAR(255) NOT NULL
);
