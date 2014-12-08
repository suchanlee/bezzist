from django.contrib import admin

from .models import Answer


class AnswerAdmin(admin.ModelAdmin):
    list_display = ('answer', 'score', 'created')
    ordering = ['-created']

admin.site.register(Answer, AnswerAdmin)
