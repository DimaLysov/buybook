from django.contrib import admin
from django.apps import apps
from django.utils.html import mark_safe

from api.models import Book


class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'price', 'stock_quantity', 'image_tag')

    def image_tag(self, obj):
        if obj.image_url:  # Если изображение существует
            return mark_safe(f'<img src="{obj.image_url.url}" style="width: 100px; height: 150px;" />')
        return "Нет изображения"

    image_tag.short_description = "Фото"


admin.site.register(Book, BookAdmin)

app_models = apps.get_app_config('api').get_models()

for model in app_models:
    try:
        admin.site.register(model)  # Регистрируем модель с дефолтными настройками
    except admin.sites.AlreadyRegistered:  # На случай, если модель уже зарегистрирована
        pass