# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0004_auto_20150318_0630'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='followed_questions',
            field=models.ManyToManyField(related_name='followed_users', to='question.Question', blank=True),
            preserve_default=True,
        ),
    ]
