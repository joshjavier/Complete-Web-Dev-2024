-- Create tables

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  username varchar(20) UNIQUE NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title varchar(100) NOT NULL,
  isbn varchar(17) UNIQUE NOT NULL
);

CREATE TABLE authors (
  olid varchar(20) PRIMARY KEY,
  name varchar(100) NOT NULL
);

CREATE TABLE booknotes (
  user_id integer REFERENCES users,
  book_id integer REFERENCES books,
  content text NOT NULL,
  rating numeric(3,1) NOT NULL,
  date_read timestamp with time zone NOT NULL,
  PRIMARY KEY (user_id, book_id),
  CONSTRAINT check_rating_is_valid CHECK (rating >= 0 AND rating <= 5)
);

CREATE TABLE authorship (
  book_id integer REFERENCES books ON DELETE CASCADE,
  author_id varchar(20) REFERENCES authors ON DELETE CASCADE,
  PRIMARY KEY (book_id, author_id)
);

-- Add initial data

INSERT INTO users (username, name)
VALUES ('joshjavier', 'Josh Javier');

INSERT INTO books (title, isbn) VALUES
  ('Hannibal Pride of Carthage', '9780553814910'),
  ('One Small Step Can Change Your Life', '9780761180326'),
  ('Zen and the Art of Motorcycle Maintenance', '9780060589462');
INSERT INTO authors (olid, name) VALUES
  ('OL1392732A', 'David Anthony Durham'),
  ('OL7708362A', 'Robert Maurer Ph.D.'),
  ('OL70357A', 'Robert M. Pirsig');
INSERT INTO authorship (book_id, author_id) VALUES
  (1, 'OL1392732A'),
  (2, 'OL7708362A'),
  (3, 'OL70357A');
INSERT INTO booknotes (user_id, book_id, content, rating, date_read) VALUES
  (1, 1, 'Stumbled upon this one in a booksale and was hooked by the engaging writing style.', 4.0, now()),
  (1, 2, 'Great book on kaizen and the concept of continuous improvement', 4.5, now()),
  (1, 3, 'My favorite philosophy book that made me want to own (and maintain) a motorcycle.', 5, now());
