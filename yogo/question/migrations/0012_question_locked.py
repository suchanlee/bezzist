# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0011_question_published_datetime'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='locked',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
