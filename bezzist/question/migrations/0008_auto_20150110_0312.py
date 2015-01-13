# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0007_question_finished'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='answers',
            field=models.ManyToManyField(related_name='question', to='answer.Answer', blank=True),
            preserve_default=True,
        ),
    ]
