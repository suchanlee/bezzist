from django.conf import settings


def is_debug_mode(request):
    return {
        'DEBUG': settings.DEBUG
    }
