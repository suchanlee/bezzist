# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('answer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('score', models.IntegerField(default=0)),
                ('question', models.CharField(max_length=200)),
                ('active', models.BooleanField(default=False)),
                ('finished', models.BooleanField(default=False)),
                ('answers', models.ManyToManyField(to='answer.Answer', blank=True)),
                ('disliked', models.ManyToManyField(related_name='question_disliked_users', to=settings.AUTH_USER_MODEL, blank=True)),
                ('liked', models.ManyToManyField(related_name='question_liked_users', to=settings.AUTH_USER_MODEL, blank=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created'],
            },
            bases=(models.Model,),
        ),
    ]
