# Generated by Django 5.0.6 on 2024-07-06 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ahorcado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('palabra_secreta', models.CharField(max_length=50)),
                ('letras_adivinadas', models.CharField(max_length=50)),
                ('intentos_restantes', models.IntegerField(default=5)),
            ],
        ),
    ]