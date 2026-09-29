from django.contrib import admin
from .models import User, Place
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

@admin.register(User)
class UserAdmin(BaseUserAdmin):

    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role', {
            'fields': ('role',)
        }),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Role', {
            'fields': ('role',)
        }),
    )

    list_display = (
        'username',
        'email',
        'role',
        'is_staff',
        'is_active',
    )

    list_filter = (
        'role',
        'is_staff',
        'is_active',
    )

    
@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'latitude',
        'longitude',
        'requires_booking',
        'price_per_adult',
        'price_per_child',
    )

    search_fields = ('name', 'description')

    list_filter = ('requires_booking',)