# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0003_userconfirmation_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='superuser',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='followed_questions',
            field=models.ManyToManyField(related_name='followed_users', to='question.Question'),
            preserve_default=True,
        ),
    ]
