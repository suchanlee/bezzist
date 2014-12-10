from django.contrib import admin

from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'score', 'flags', 'flagged', 'created')
    ordering = ['-created']

admin.site.register(Question, QuestionAdmin)
