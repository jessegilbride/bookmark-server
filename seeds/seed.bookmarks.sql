-- psql -U dunder_mifflin -d bookmarks -f ./seeds/seed.bookmarks.sql

INSERT INTO bookmarks (title, url, rating, description)

VALUES
  ('(dummy seed) Google',
  'https://www.google.com',
  '3',
  'Internet-related services and products.'),
  ('(dummy seed) DuckDuckGo',
  'https://duckduckgo.com/',
  '5',
  'Search engine focused on privacy.'),
  ('(dummy seed) Thinkful',
  'https://www.thinkful.com',
  '3',
  '1-on-1 learning to accelerate your way to a new high-growth tech career!'),
  ('(dummy seed) Github',
  'https://www.github.com',
  '4',
  'A place to host code repos and collaborate on code projects.'),
  ('(dummy seed) CSS-Tricks',
  'https://css-tricks.com/',
  '5',
  'Web development tutorials, examples, and articles.'),
  ('(dummy seed) MDN',
  'https://developer.mozilla.org/en-US/',
  '5',
  'Resources for developers, by developers.'),
  ('(dummy seed) SoundCloud',
  'https://soundcloud.com/',
  '4',
  'Streaming music and audio, made easily sharable.'),
  ('(dummy seed) Regular Expression Library',
  'https://regexlib.com/Default.aspx',
  '4',
  'Regular Expression (regex) stuff.'),
  ('(dummy seed) The Big Lebowski (1998) - Quotes - IMDb',
  'https://www.imdb.com/title/tt0118715/quotes',
  '3',
  'Far out stuff the dude said, plus other utterances'),
  ('(dummy seed) Reddit',
  'https://www.reddit.com/',
  '5',
  'The front page of the internet.')
  