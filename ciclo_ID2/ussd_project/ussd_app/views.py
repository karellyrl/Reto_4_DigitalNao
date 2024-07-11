from django.shortcuts import render  

def home(request):
    #diccionario con codigos ussd y sus descripciones
    codigos = {
        '*#*#2663#*#*': 'Información de la versión de<br> la pantalla táctil',
        '*#*#4336#*#*': 'Tiempo de construcción del teléfono',
        '*#*#3264#*#*': 'Versión de RAM',
        '*#*#1111#*#*': 'Versión del software FTA',
        '*#*#2222#*#*': 'Versión de hardware FTA',
        '*#*#2327#*#': 'Dirección del dispositivo Bluetooth',
        '*#06#': 'Ver el número IMEI del teléfono',
        '*#*#2328#*#*': 'Dirección MAC de la red Wi-Fi',
        '*#*#4986#*#*': 'Información del firmware del teléfono',
        '*#*#3497*#*': 'Información del firmware de la cámara',
        '*#*#1234#*#*': 'Información del firmware del teléfono,<br> incluida la versión del software PDA',  # Ejemplo de salto de línea
        '*#03#': 'Número de serie de la memoria<br> flash NAND',
        '*#*#7594#*#*': 'Comportamiento del botón de encendido',
        '*#*#1932#*#*': 'Modo de servicio para realizar pruebas<br> y cambiar la configuración del teléfono',  # Ejemplo de salto de línea
        '*#32*72*#': 'Información de almacenamiento<br> y consumo de datos',
        '*#*#4636#*#*': 'Información de la batería,<br> estado de WLAN y estadísticas de uso',
        '*#*#225#*#*': 'Datos del calendario almacenados<br> en el teléfono',
        '*#2263#': 'Selección de banda RF',
        '*3282#': 'Reciba un mensaje de texto con<br> la información de facturación',
        '*#0*#': 'Ingreso al modo de prueba',
    }

    #rennderizar la plantilla html con la lista de los codigos
    return render(request, 'ussd_app/index.html', {'codigos': codigos})

#mostrar el detalle de un codigo específico
def codigo_detail(request, codigo):
    # usar los codigos para la vista de detail
    codigos = {
        '*#*#2663#*#*': 'Información de la versión de<br> la pantalla táctil',
        '*#*#4336#*#*': 'Tiempo de construcción del teléfono',
        '*#*#3264#*#*': 'Versión de RAM',
        '*#*#1111#*#*': 'Versión del software FTA',
        '*#*#2222#*#*': 'Versión de hardware FTA',
        '*#*#2327#*#': 'Dirección del dispositivo Bluetooth',
        '*#06#': 'Ver el número IMEI del teléfono',
        '*#*#2328#*#*': 'Dirección MAC de la red Wi-Fi',
        '*#*#4986#*#*': 'Información del firmware del teléfono',
        '*#*#3497*#*': 'Información del firmware de la cámara',
        '*#*#1234#*#*': 'Información del firmware del teléfono,<br> incluida la versión del software PDA',  # Ejemplo de salto de línea
        '*#03#': 'Número de serie de la memoria<br> flash NAND',
        '*#*#7594#*#*': 'Comportamiento del botón de encendido',
        '*#*#1932#*#*': 'Modo de servicio para realizar pruebas<br> y cambiar la configuración del teléfono',  # Ejemplo de salto de línea
        '*#32*72*#': 'Información de almacenamiento<br> y consumo de datos',
        '*#*#4636#*#*': 'Información de la batería,<br> estado de WLAN y estadísticas de uso',
        '*#*#225#*#*': 'Datos del calendario almacenados<br> en el teléfono',
        '*#2263#': 'Selección de banda RF',
        '*3282#': 'Reciba un mensaje de texto con<br> la información de facturación',
        '*#0*#': 'Ingreso al modo de prueba',
    }

    #obtener el significado del codigo USSD
    significado = codigos.get(codigo, 'Significado no encontrado')

    #renderiza la plantilla de detail con el codigo USSD y su significado
    return render(request, 'ussd_app/detail.html', {'codigo': codigo, 'significado': significado})
