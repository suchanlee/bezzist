from abc import ABCMeta

from restless.dj import DjangoResource


class AbstractBezzistResource(DjangoResource):

    # Abstractize class
    __metaclass__ = ABCMeta

    # Initialize resource_name
    resource_name = None

    def is_authenticated(self):
        return True  # HORRIBLE BUT REQUIRED FOR NO AUTH POST

    def is_debug(self):
        return False

    # def bubble_exceptions(self):
        # return False

    def wrap_list_response(self, data):
        return {
            self._get_object_name(): data
        }

    def _get_object_name(self):
        return self.resource_name if self.resource_name else 'objects'
