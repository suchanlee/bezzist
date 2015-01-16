# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
        ('question', '0008_auto_20150110_0312'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('score', models.IntegerField(default=0)),
                ('followed_questions', models.ManyToManyField(related_name='follwed_users', to='question.Question')),
            ],
            options={
                'ordering': ['user'],
            },
            bases=(models.Model,),
        ),
    ]
