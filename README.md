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


### Setting Up Dev Environment


