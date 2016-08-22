
CREATE SEQUENCE user_id_seq;
CREATE SEQUENCE rss_id_seq;
CREATE SEQUENCE post_id_seq;


CREATE TABLE users(
  id              INT NOT NULL DEFAULT nextval('user_id_seq') PRIMARY KEY,
  email            TEXT NOT NULL UNIQUE ,
  password            TEXT NOT NULL
);

CREATE TABLE post(
  id              INT NOT NULL DEFAULT nextval('post_id_seq') PRIMARY KEY,
  feed_id         INT NOT NULL REFERENCES rss (id) ON UPDATE CASCADE ON DELETE CASCADE,
  guid            TEXT NOT NULL UNIQUE ,
  title            TEXT NOT NULL,
  link            TEXT NOT NULL,
  description            TEXT NOT NULL,
  pubDate            TIMESTAMP NOT NULL
);

CREATE TABLE users_posts(
  post_id         INT REFERENCES post (id) ON UPDATE CASCADE ON DELETE CASCADE,
  feed_id         INT NOT NULL REFERENCES rss (id) ON UPDATE CASCADE ON DELETE CASCADE,
  user_id    INT REFERENCES users (id) ON UPDATE CASCADE,
  CONSTRAINT users_post_pkey PRIMARY KEY (post_id, user_id),
  viewed    BOOLEAN DEFAULT FALSE
);


CREATE TABLE rss (
  id              INT NOT NULL DEFAULT nextval('rss_id_seq') PRIMARY KEY,
  title            TEXT NOT NULL ,
  link            TEXT NOT NULL UNIQUE
);

CREATE TABLE users_rss(
  user_id         INT REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
  rss_id    INT REFERENCES rss (id) ON UPDATE CASCADE,
  CONSTRAINT users_rss_pkey PRIMARY KEY (user_id, rss_id)
);


INSERT INTO users (email,password) VALUES ('misha@mail.ru','12345');
INSERT INTO users (email,password) VALUES ('mihaelkeel@mail.ru','qwerty');


drop table rss CASCADE ;
truncate TABLE post CASCADE ;
truncate TABLE rss CASCADE ;
truncate TABLE users_rss CASCADE ;
truncate TABLE users_posts CASCADE ;
truncate TABLE rss CASCADE ;
commit;
