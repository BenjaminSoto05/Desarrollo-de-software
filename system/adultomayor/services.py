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
