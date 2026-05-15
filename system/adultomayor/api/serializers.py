from rest_framework import serializers
from ..models import Solicitud
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class SolicitudSerializer(serializers.ModelSerializer):
    presidente = UserSerializer(read_only=True)
    voluntarios = UserSerializer(many=True, read_only=True)
    adultos_mayores = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Solicitud
        fields = [
            'id', 'titulo', 'descripcion', 'estado', 
            'cantidad_voluntarios', 'cantidad_beneficiarios', 
            'presidente', 'voluntarios', 'adultos_mayores', 'created_at'
        ]
        read_only_fields = ['id', 'estado', 'created_at']
