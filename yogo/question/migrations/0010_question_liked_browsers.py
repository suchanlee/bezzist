# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
        ('question', '0009_question_featured'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='liked_browsers',
            field=models.ManyToManyField(related_name='question_browser_liked_users', to='base.BrowserIdentifier', blank=True),
            preserve_default=True,
        ),
    ]
