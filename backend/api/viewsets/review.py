from drf_spectacular.utils import extend_schema
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from api.models import Review
from api.serializers.review import ReviewSerializer


@extend_schema(tags=['Review'])
class ReviewViewSet(mixins.CreateModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   GenericViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    @action(detail=False, methods=['get'], url_path='by-book/(?P<book_id>[^/.]+)')
    def get_items_by_user(self, request, book_id=None):
        reviews = self.queryset.filter(book=book_id)
        serializer = self.get_serializer(reviews, many=True)
        return Response(serializer.data)