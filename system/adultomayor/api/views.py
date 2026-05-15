from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .serializers import SolicitudSerializer
from ..infrastructure.repositories import SolicitudRepository
from ..application.services import crear_solicitud_desde_wizard

class SolicitudViewSet(viewsets.ModelViewSet):
    """
    API REST para la gestión de Solicitudes (RNF-MAN-02).
    Manejo centralizado de permisos y abstracción mediante Repository Pattern.
    """
    serializer_class = SolicitudSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Delegate to Repository Pattern (Clean Architecture)
        return SolicitudRepository.get_all_disponibles()

    @extend_schema(
        summary="Crear una nueva Solicitud",
        description="Crea una solicitud delegando la lógica de negocio a la capa de Servicios."
    )
    def create(self, request, *args, **kwargs):
        # Simulamos que la data viene en el formato que espera el wizard para reusar el servicio
        # En la vida real el serializer validaría primero y pasaría un DTO limpio al servicio
        try:
            # Reutilizando el Service Layer (DRY)
            solicitud = crear_solicitud_desde_wizard(request.user, request.data)
            serializer = self.get_serializer(solicitud)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
