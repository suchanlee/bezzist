# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0008_auto_20150110_0312'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='featured',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
