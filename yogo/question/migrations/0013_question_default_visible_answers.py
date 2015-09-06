# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0012_question_locked'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='default_visible_answers',
            field=models.SmallIntegerField(default=5),
            preserve_default=True,
        ),
    ]
