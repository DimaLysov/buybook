from drf_spectacular.utils import extend_schema
from rest_framework.viewsets import ReadOnlyModelViewSet

from api.models import Book
from api.serializers.book import BookSerializer


@extend_schema(tags=['Book'])
class BookViewSet(ReadOnlyModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()