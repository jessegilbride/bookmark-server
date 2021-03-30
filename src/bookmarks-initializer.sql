------------------------------------------------------------
-- * creation of the bookmarks table in the database
-- * seeding the table with bookmark data
------------------------------------------------------------

-- Remove any pre-existing bookmarks table
DROP TABLE IF EXISTS bookmarks;

-- Create the table anew
CREATE TYPE star_rating AS ENUM ('1', '2', '3', '4', '5');
CREATE TABLE bookmarks (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, -- each generated ID increments automatically
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  rating star_rating NOT NULL,
  desc TEXT
);

-- insert data into table
INSERT INTO bookmarks (title, url, rating, desc)
VALUES
  ('Google',
  'https://www.google.com',
  '3',
  'Internet-related services and products.'),
  ('DuckDuckGo',
  'https://duckduckgo.com/',
  '5',
  'Search engine focused on privacy.'),
  ('Thinkful',
  'https://www.thinkful.com',
  '3',
  '1-on-1 learning to accelerate your way to a new high-growth tech career!'),
  ('Github',
  'https://www.github.com',
  '4',
  'A place to host code repos and collaborate on code projects.'),
  ('CSS-Tricks',
  'https://css-tricks.com/',
  '5',
  'Web development tutorials, examples, and articles.'),
  ('MDN',
  'https://developer.mozilla.org/en-US/',
  '5',
  'Resources for developers, by developers.'),
  ('SoundCloud',
  'https://soundcloud.com/',
  '4',
  'Streaming music and audio, made easily sharable.'),
  ('Regular Expression Library',
  'https://regexlib.com/Default.aspx',
  '4',
  'Regular Expression (regex) stuff.'),
  ('The Big Lebowski (1998) - Quotes - IMDb',
  'https://www.imdb.com/title/tt0118715/quotes',
  '3',
  'Far out stuff the dude said, plus other utterances'),
  ('Reddit',
  'https://www.reddit.com/',
  '5',
  'The front page of the internet.')