# Generated by Django 3.2.10 on 2022-01-13 22:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('media', '0002_remove_entry_media_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='year_of_birth',
        ),
    ]
