# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0013_question_default_visible_answers'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='hide_score_until_finished',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
