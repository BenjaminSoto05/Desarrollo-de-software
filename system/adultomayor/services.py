from .models import Solicitud

def crear_solicitud_desde_wizard(user, session_data):
    tipo_ayuda = session_data.get('solicitud_tipo', 'Ayuda General')
    descripcion = session_data.get('solicitud_desc', 'Sin descripción')
    
    solicitud = Solicitud.objects.create(
        titulo=f"Solicito: {tipo_ayuda}",
        descripcion=descripcion,
        presidente=user,
        estado='DISPONIBLE',
        cantidad_voluntarios=1,
        cantidad_beneficiarios=1,
        cantidad_presidentes=1
    )
    
    if hasattr(user, 'profile') and user.profile.rol == 'ADULTO_MAYOR':
        solicitud.adultos_mayores.add(user)
        
    return solicitud

def obtener_direccion_beneficiario(solicitud, usuario_solicitante):
    """
    Retorna la dirección solo si el solicitante es el presidente creador, 
    o un voluntario que ha sido ASIGNADO a la tarea. 
    Protege la Ley 19.628 evitando exposición pública accidental.
    """
    import logging
    logger = logging.getLogger('adultomayor')

    # Si es el presidente que lo creó
    if usuario_solicitante == solicitud.presidente:
        return "Dirección: Protegida (Acceso por Presidente)" # Placeholder ya que no hay campo dirección aún, pero ejemplifica la lógica
        
    # Si es un voluntario asignado
    if solicitud.estado == 'ASIGNADA' and usuario_solicitante in solicitud.voluntarios.all():
        logger.info(f"Acceso a datos sensibles (Dirección) por voluntario: {usuario_solicitante.username} para solicitud {solicitud.id}")
        return "Dirección: Mostrada temporalmente (Acceso autorizado)"
        
    logger.warning(f"Intento de acceso denegado a datos sensibles por: {usuario_solicitante.username} en solicitud {solicitud.id}")
    return "Dirección oculta por privacidad (Ley 19.628)."
