# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations

from question.models import Question


class Migration(migrations.Migration):

    def set_questions(apps, schema_editor):
        all_questions = Question.objects.all()
        for question in all_questions:
            all_answers = question.answers.all()
            for answer in all_answers:
                answer.questionTemp.add(question)
                answer.save()
         
    dependencies = [
        ('answer', '0010_auto_20150430_0040'),
        ('question', '0001_initial')
    ]

    operations = [
        migrations.RunPython(set_questions),
    ]
