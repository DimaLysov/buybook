from django.urls import path, include
from rest_framework import routers

from api.viewsets.author import AuthorViewSet
from api.viewsets.book import BookViewSet
from api.viewsets.category import CategoryViewSet
from api.viewsets.review import ReviewViewSet


router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'book', BookViewSet)
router.register(r'author', AuthorViewSet)
router.register(r'review', ReviewViewSet)


urlpatterns = [
    path('', include(router.urls)),
]