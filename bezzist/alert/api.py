from django.http import JsonResponse
from django.views.generic import View

from .models import Alert


class ActiveAlertsRpcResource(View):

    def get(self, request):
        alerts = Alert.objects.filter(displayed=True)
        alert_maps = []
        for alert in alerts:
            alert_maps.append(alert.shallow_mappify())
        return JsonResponse(
            sorted(alert_maps, cmp=Alert.alert_cmp, key=lambda alert: alert.get('alert_type'), reverse=True),
            safe=False)
