# Generated by Django 5.0.6 on 2024-07-06 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ahorcado_game', '0002_ahorcado_mensaje'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ahorcado',
            name='mensaje',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
    ]
