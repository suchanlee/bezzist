# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('alert', '0002_alert_displayed'),
    ]

    operations = [
        migrations.AddField(
            model_name='alert',
            name='title',
            field=models.CharField(default='', max_length=100, blank=True),
            preserve_default=False,
        ),
    ]
