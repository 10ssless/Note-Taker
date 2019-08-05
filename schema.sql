DROP DATABASE IF EXISTS note_taker_db;
CREATE DATABASE note_taker_db;
USE note_taker_db;

CREATE TABLE notes (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  text VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO notes (title,text) 
VALUES ('HW','Finish note taker app.'),
('Groceries','Buy apples.');

