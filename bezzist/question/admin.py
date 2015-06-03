from django.contrib import admin

from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'score', 'flag_counts', 'created')
    ordering = ['-created']

admin.site.register(Question, QuestionAdmin)
