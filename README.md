# Japanese Dictionary and Flashcards project (WIP)

This project intends to provide a combination of Japanese dictionary
and flashcard reviewing application.

This is a mono-repository consisting of services necessary to run
this application.

### Dictionary/Kanji API
Based on Jmdict (working), Jmnedict and Kanjidic.
Nodejs/Mongoose/Typescript.

### Web client
React client application.

### User API
Api for managing users and their saved flashcards.

### Database generator
This isn't a part of the runtime environment, rather a local script
used for downloading and processing the freely available data to set up 
a mongodb database.
