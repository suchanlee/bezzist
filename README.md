# Bezzist

### What is Bezzist?

Bezzist is a list style Q&A platform currently launched in Cornell University.
It currently exists only as a responsive web application, but there are plans to
expand out to native mobile applications.

### What does Bezzist run on?

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

### Setting Up Dev Environment


