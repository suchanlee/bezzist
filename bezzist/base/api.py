from abc import ABCMeta

from restless.dj import DjangoResource


class AbstractBezzistResource(DjangoResource):

    # Abstractize class
    __metaclass__ = ABCMeta

    # Initialize resource_name
    resource_name = None

    def is_authenticated(self):
        if self._get_endpoint() in ('update', 'create', 'delete'):
            return self.request.user.is_authenticated()
        else:
            return True

    def is_debug(self):
        return False

    def wrap_list_response(self, data):
        return {
            self._get_object_name(): data
        }

    def _get_endpoint(self):
        return self.http_methods.get(self.endpoint).get(self.request.META.get('REQUEST_METHOD'))

    def _get_object_name(self):
        return self.resource_name if self.resource_name else 'objects'
