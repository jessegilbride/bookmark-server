# Bookmark Server

## Available Routes:

- `/bookmarks`

  GET -- get all bookmarks

  POST -- add a bookmark (requires JSON body containing `title, url, rating, desc`)

- `bookmarks/:id`

  GET -- get a single bookmark based on its ID

  DELETE -- delete a bookmark based on its ID
