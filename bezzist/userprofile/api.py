from django.http import JsonResponse
from django.views.generic import View

from .models import UserProfile


class ActiveUserResource(View):

    def get(self, request):
        if request.user.is_authenticated():
            profile = UserProfile.objects.get(user=request.user)
            return JsonResponse(profile.shallow_mappify())
        else:
            return JsonResponse({})
