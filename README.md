# Japanese Dictionary and Flashcards project (WIP)

This project intends to provide a combination of Japanese dictionary
and flashcard reviewing application.

This is a mono-repository consisting of services necessary to run
this application.

### Dictionary API

Based on Jmdict (working), Jmnedict and Kanjidic.
Nodejs/Mongoose/Typescript.

### Dictionary App

React client application.

### Database generator

This isn't a part of the environment, rather a local script
used for downloading and processing the freely available data to set up
a mongodb database. Eventually it should become it's own microservice checking for changes
that updates the database continuously.
