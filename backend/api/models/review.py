from django.db import models
from django.utils import timezone

from api.models import Book


class Review(models.Model):
    RATING_REVIEW = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    ]

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_REVIEW, verbose_name="Оценка отзыва")
    text = models.TextField(verbose_name='Текст отзыва')
    date = models.DateTimeField(default=timezone.now, verbose_name='Дата отзыва')

    def __str__(self):
        return f'{self.book} - {self.rating} ({self.date})'

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'