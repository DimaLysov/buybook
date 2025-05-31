from drf_spectacular.utils import extend_schema
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from api.models import Book
from api.serializers.book import BookSerializer


@extend_schema(tags=['Book'])
class BookViewSet(ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()