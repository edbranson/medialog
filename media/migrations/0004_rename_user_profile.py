# Generated by Django 3.2.10 on 2022-01-21 23:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('media', '0003_auto_20220113_1558'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='Profile',
        ),
    ]
