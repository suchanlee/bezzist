# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0010_question_liked_browsers'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='published_datetime',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
