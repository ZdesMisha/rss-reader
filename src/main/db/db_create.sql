CREATE SEQUENCE user_id_seq;
CREATE SEQUENCE rss_id_seq;
CREATE SEQUENCE post_id_seq;


CREATE TABLE users (
  id       INT  NOT NULL DEFAULT nextval('user_id_seq') PRIMARY KEY,
  email    TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE post (
  id          INT  NOT NULL DEFAULT nextval('post_id_seq') PRIMARY KEY,
  guid        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  link        TEXT NOT NULL,
  description TEXT,
  pubDate     TIMESTAMP
);

CREATE TABLE rss (
  id    INT  NOT NULL DEFAULT nextval('rss_id_seq') PRIMARY KEY,
  title TEXT NOT NULL,
  link  TEXT NOT NULL UNIQUE
);

CREATE TABLE users_posts (
  post_id INT NOT NULL REFERENCES post (id) ON UPDATE CASCADE ON DELETE CASCADE,
  feed_id INT NOT NULL REFERENCES rss (id) ON UPDATE CASCADE ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users (id) ON UPDATE CASCADE,
  CONSTRAINT users_post_pkey PRIMARY KEY (post_id, user_id),
  viewed  BOOLEAN DEFAULT FALSE
);

CREATE TABLE rss_posts (
  feed_id INT NOT NULL REFERENCES rss (id) ON UPDATE CASCADE ON DELETE CASCADE,
  post_id INT NOT NULL REFERENCES post (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT rss_post_pkey PRIMARY KEY (feed_id, post_id)
);

CREATE TABLE users_rss (
  user_id INT REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
  rss_id  INT REFERENCES rss (id) ON UPDATE CASCADE,
  CONSTRAINT users_rss_pkey PRIMARY KEY (user_id, rss_id)
);


INSERT INTO users (email, password) VALUES ('misha@mail.ru', '12345');
INSERT INTO users (email, password) VALUES ('mihaelkeel@mail.ru', 'qwerty');


TRUNCATE TABLE post CASCADE;
TRUNCATE TABLE rss CASCADE;
TRUNCATE TABLE users_rss CASCADE;
TRUNCATE TABLE rss_posts CASCADE;
TRUNCATE TABLE users_posts CASCADE;

DROP TABLE rss CASCADE;
DROP TABLE rss_posts CASCADE;
DROP TABLE users_rss CASCADE;
DROP TABLE users_posts CASCADE;
DROP TABLE post CASCADE;

COMMIT;
