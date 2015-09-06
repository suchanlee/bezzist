# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('score', models.IntegerField(default=0)),
                ('answer', models.CharField(max_length=500)),
                ('disliked', models.ManyToManyField(related_name='answer_disliked_users', to=settings.AUTH_USER_MODEL, blank=True)),
                ('liked', models.ManyToManyField(related_name='answer_liked_users', to=settings.AUTH_USER_MODEL, blank=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-score', '-created'],
            },
            bases=(models.Model,),
        ),
    ]
