from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.generic import View

from .models import UserProfile, UserConfirmation


class UserCreateRpcResource(View):

    def post(self, request):
        email = request.POST.get('email').lower()
        password = request.POST.get('password')
        if not self._is_valid_email(email):
            return HttpResponseBadRequest('Not a valid Cornell email')
        if User.objects.filter(email=email).count() > 0:
            return HttpResponse('Provided email has already been used', status=409)
        user = User.objects.create_user(username=email, email=email, password=password)
        profile = UserProfile.objects.create(user=user)
        profile.increment_score(100)
        UserConfirmation.create_confirmation(user)
        UserAuthRpcResource.login(request, email, password)
        return JsonResponse(profile.package())

    def _is_valid_email(self, email):
        validate_email(email)
        return '@cornell.edu' in email


class UserAuthRpcResource(View):

    def post(self, request):
        email = request.POST.get('email').lower()
        password = request.POST.get('password')
        return self.login(request, email, password)

    @classmethod
    def login(cls, request, username, password):
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            profile = UserProfile.objects.get(user=user)
            return JsonResponse(profile.package())
        else:
            return HttpResponseBadRequest('Wrong username and password combination')

class UserLogoutRpcResource(View):

    def get(self, request):
        logout(request)
        return JsonResponse({})


class ActiveUserRpcResource(View):

    def get(self, request):
        if request.user.is_authenticated():
            profile = UserProfile.objects.get(user=request.user)
            return JsonResponse(profile.package())
        else:
            return JsonResponse({})
