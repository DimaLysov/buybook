from drf_spectacular.utils import extend_schema
from rest_framework.viewsets import ModelViewSet

from api.models import Author
from api.serializers.author import AuthorSerializer


@extend_schema(tags=['Author'])
class AuthorViewSet(ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()