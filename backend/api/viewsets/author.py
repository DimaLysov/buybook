from drf_spectacular.utils import extend_schema
from rest_framework.viewsets import ReadOnlyModelViewSet

from api.models import Author
from api.serializers.author import AuthorSerializer


@extend_schema(tags=['Author'])
class AuthorViewSet(ReadOnlyModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()