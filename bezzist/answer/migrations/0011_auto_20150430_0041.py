# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations

from question.models import Question


class Migration(migrations.Migration):

    def setQuestions(apps, schema_editor):
        
        # We can't import the Person model directly as it may be a newer
        # version than this migration expects. We use the historical version.
        import pdb; pdb.set_trace()
        allQuestions = Question.objects.all()
        for question in allQuestions:
            allAnswers = question.answers.all()
            for answer in allAnswers:
                answer.questionTemp.add(question)
                answer.save()
            #person.name = "%s %s" % (person.first_name, person.last_name)
            #person.save()
    
    dependencies = [
        ('answer', '0010_auto_20150430_0040'),
        ('question', '0001_initial')
    ]

    operations = [
        migrations.RunPython(setQuestions),
    ]
