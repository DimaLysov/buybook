from django.db import models

class Author(models.Model):
    full_name = models.CharField(max_length=255, verbose_name="ФИО")
    biography = models.TextField(verbose_name="Биография", blank=True, null=True)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = 'Автор'
        verbose_name_plural = 'Авторы'