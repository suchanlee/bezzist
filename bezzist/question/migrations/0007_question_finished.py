# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0006_remove_question_finished'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='finished',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
