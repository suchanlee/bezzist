# Bezzist

## What is Bezzist?

Bezzist is a list style Q&A platform currently launched in Cornell University.
It currently exists only as a responsive web application, but there are plans to
expand out to native mobile applications.

## What does Bezzist run on?

Bezzist is powered by several technologies.

API Server:
- Python
- [Django](https://www.djangoproject.com/) (and many libraries)
- [Restless](http://restless.readthedocs.org/en/latest/)
- [Gunicorn](http://gunicorn.org/)

Message Queue
- [RabbitMQ](https://www.rabbitmq.com/)
- [Celery](http://www.celeryproject.org/)

Database:
- [Postgres](http://www.postgresql.org/)
- Psycopg2 (Python-to-Postgres ORM)

Frontend:
- [React](http://facebook.github.io/react/)
- [Flux](http://facebook.github.io/flux/)
- Browserify + UglifyJS2
- Node + NPM

## How Bezzist Works

### How does the backend work?

The Bezzist backend is backed by Django and Postgres. We use Django for three things.

First, we use it to define and describe the models used. These are things like
questions, answers, and user profiles. By having a well defined schema, we know
exactly what the models provide and what thye can and cannot do. All backend logic
is defined in the models, which keeps the API server clean.

Second, it receives requests and serves the web page. What it serves is a basic
template that loads up the Javascript required to render everything. There
are plans to move this from Django to Nodejs to allow for server-side rendering.

Third, it serves as an API server that queries for data stored in the database,
serializes the data into [JSON (JavaScript Object Notation)](http://www.copterlabs.com/blog/json-what-it-is-how-it-works-how-to-use-it/)
and sends it back to the front end, which then uses that to render everything.

We use Postgres because it's well maintained, stable and mature, and does everything
that we need fast, reliably, and well.

### How does the front end work?

Right now is an exciting time for front end development, where a lot of the logic
is now moving to the front end and there are now more things possible in the
front end than ever before.

The front end is more than just some HTML and CSS. In Bezzist, almost all of the
front end is actually Javascript. The front end server will send requests to the 
backend API server for information on questions and answers, and the API server
replies with JSON-serialized responses. The front end server, upon receiving the
response, will use that data to render the elements that are displayed to the user.

We use the [React](http://facebook.github.io/react/) front end framework and the
[Flux](http://facebook.github.io/flux/) architecture, the former an open source
library and the latter an architectural paradigm.

If you are not familiar with React, I suggest that you take half an hour to go
through their [tutorial](http://facebook.github.io/react/docs/tutorial.html)
and try using it.

Some benefits of using React:
- It is a well-maintained library with a growing community around it
- It allows different parts of the application to be a separate "component",
  where both the rendering elements and the logic can be defined in one place
- It allows developers to *not* spend a ton of effort making sure that data
  and rendered elements are in sync. React takes care of this automatically.
- It is performant.

For Flux, I recommend that you watch the videos [here](https://egghead.io/series/react-flux-architecture).

### Setting Up Dev Environment


