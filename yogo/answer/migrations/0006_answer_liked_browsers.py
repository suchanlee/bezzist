# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
        ('answer', '0005_answer_flagged'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='liked_browsers',
            field=models.ManyToManyField(related_name='answer_browser_liked_users', to='base.BrowserIdentifier', blank=True),
            preserve_default=True,
        ),
    ]
