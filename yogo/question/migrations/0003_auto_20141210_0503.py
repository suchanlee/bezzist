# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0002_auto_20141205_0817'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='question',
            options={'ordering': ['-score', 'created']},
        ),
        migrations.AddField(
            model_name='question',
            name='deleted',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='question',
            name='flags',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
