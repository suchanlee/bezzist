# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0004_auto_20141210_0509'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='flagged',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
