# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alert',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('show_from', models.DateTimeField()),
                ('show_to', models.DateTimeField()),
                ('alert_type', models.CharField(default=b'INFO', max_length=10, choices=[(b'SUCCESS', b'Success'), (b'INFO', b'Info'), (b'WARNING', b'Warning'), (b'DANGER', b'Danger')])),
                ('content', models.CharField(max_length=500)),
            ],
            options={
                'ordering': ['-created'],
            },
            bases=(models.Model,),
        ),
    ]
