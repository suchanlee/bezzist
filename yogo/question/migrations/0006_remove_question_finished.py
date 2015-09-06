# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0005_question_flagged'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='finished',
        ),
    ]
