# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('answer', '0002_auto_20141205_0750'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='answer',
            options={'ordering': ['-score', 'created']},
        ),
        migrations.AddField(
            model_name='answer',
            name='deleted',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='answer',
            name='flags',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
