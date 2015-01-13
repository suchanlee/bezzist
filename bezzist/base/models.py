from django.contrib.auth.models import User
from django.db import models


class AbstractTimeStampedModel(models.Model):

    '''
    Abstract model class that keeps track of created and modified times.
    Created and modified are automatically kept track on every save.
    '''

    class Meta:
        abstract = True

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class AbstractUserCreatedModel(AbstractTimeStampedModel):

    '''
    Abstract model class that inherits from AbstractTimeStampedModel
    and must have a user.
    '''
    UNAUTHORIZED_STATUS_CODE = 401

    deleted = models.BooleanField(default=False)
    flags = models.IntegerField(default=0)
    flagged = models.BooleanField(default=False)
    user = models.ForeignKey(User, null=True)  # while all posting is allowed

    class Meta:
        abstract = True

    def increment_flags(self):
        self.flags += 1
        self.save()

    def soft_delete(self):
        self.deleted = True
        self.save()

    def save(self, *args, **kwargs):
        '''
        Grabs user from request and saves it to the model.
        '''
        ## Can't enforce user currently.
        if not self.user:
            self.user = User.objects.get(id=1)
        return super(AbstractUserCreatedModel, self).save(*args, **kwargs)

    def is_owner(self, user):
        if self.user == user:
            return True
        return False


class AbstractUserScoredModel(AbstractUserCreatedModel):

    '''
    Abstract model class that inherits from AbstractUserCreatedModel
    and keeps track of model score.
    '''

    score = models.IntegerField(default=0)
    liked = models.ManyToManyField(User, blank=True, related_name='%(class)s_liked_users')
    disliked = models.ManyToManyField(User, blank=True, related_name='%(class)s_disliked_users')

    class Meta:
        abstract = True

    def increment_score(self, user=None):
        if user:
            self.liked.add(user)
        return self._modify_score(self.score+1)

    def decrement_score(self, user=None):
        if user:
            self.disliked.add(user)
        return self._modify_score(self.score-1)

    def _modify_score(self, score):
        self.score = score
        self.save()
        return self.score


class MappableModel(object):

    '''
    Provide methods to shallow/deep mappify a Django model.

    In shallow mappification, relation fields (many-to-many and foreignkey)
    return id's of the related object, if it exists.

    In deep mappification, relation fields are recursively
    traveled to return a JSON representation of the related object.

    FileField and ImageField returns the url.

    '''

    def deep_mappify(self):
        return self._mappify(deep_copy=True)

    def shallow_mappify(self):
        return self._mappify(deep_copy=False)

    def _mappify(self, deep_copy=False):
        model = {}

        for field in self._meta.fields:
            if isinstance(field, models.FileField) or isinstance(field, models.ImageField):
                try:
                    model[field.name] = getattr(self, field.name).url
                except:
                    model[field.name] = ''
            elif isinstance(field, models.ForeignKey):
                if deep_copy:
                    model[field.name] = self._mappify(getattr(self, field.name))
                else:
                    try:
                        model[field.name] = getattr(self, field.name).id
                    except:
                        model[field.name] = ''
            elif isinstance(field, models.ManyToManyField):
                if deep_copy:
                    model[field.name] = self._mappify(getattr(self, field.name))
                else:
                    try:
                        model[field.name] = map(lambda o: o.id, list(getattr(self, field.name).all()))
                    except:
                        model[field.name] = []
            else:
                model[field.name] = getattr(self, field.name)

        return model
