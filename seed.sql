CREATE TABLE category(
    id int NOT NULL PRIMARY KEY,
    categoria VARCHAR(32)
);

INSERT INTO category (id , categoria) 
VALUES 
(1,'Neumáticos'),
(2,'Chasis'),
(3,'Motor'),
(4,'Accesorios');
