// Definición de la clase Calculadora
class Calculadora {
    // Constructor que inicializa los elementos de entrada usando sus IDs del DOM
    constructor(ingreso_mlInputId, ingreso_maInputId, viviendaInputId, transporteInputId, comidasInpuntId,
               salud_eduInputId, otroInputId) {
        this.ingreso_mlInput = document.getElementById(ingreso_mlInputId); 
        this.ingreso_maInput = document.getElementById(ingreso_maInputId); 
        this.viviendaInput = document.getElementById(viviendaInputId); 
        this.transporteInput = document.getElementById(transporteInputId); 
        this.comidasInpunt = document.getElementById(comidasInpuntId); 
        this.salud_eduInput = document.getElementById(salud_eduInputId); 
        this.otroInput = document.getElementById(otroInputId); 
    }

    // Método para calcular ingresos, gastos y el ingreso neto
    calcularIngresos() {
        // Suma de ingresos obtenidos de los elementos de entrada
        const ingreso_ml = parseFloat(this.ingreso_mlInput.value) || 0; // Ingreso mensual liquido
        const ingreso_ma = parseFloat(this.ingreso_maInput.value) || 0; // Ingresos mensual adicional
        const totalIngresos = ingreso_ml + ingreso_ma; // Total de ingresos
        
        // Suma de gastos obtenidos de los elementos de entrada
        const vivienda = parseFloat(this.viviendaInput.value) || 0; // Gastos en vivienda
        const transporte = parseFloat(this.transporteInput.value) || 0; // Gastos en transporte
        const comidas = parseFloat(this.comidasInpunt.value) || 0; // Gastos en comidas
        const salud_edu = parseFloat(this.salud_eduInput.value) || 0; // Gastos en salud y educación
        const otro = parseFloat(this.otroInput.value) || 0; // Otros gastos
        const totalGastos = vivienda + transporte + comidas + salud_edu + otro; // Total de gastos
        
        // Calcular ingreso neto restando gastos de ingresos
        const ingresoNeto = totalIngresos - totalGastos; 

        // Mostrar resultados en elementos del DOM
        document.getElementById('ingresoNeto').textContent = `Ingreso Neto: $${ingresoNeto}`; // Mostrar ingreso neto
        document.getElementById('totalIngresos').textContent = `Ingresos totales: $${totalIngresos}`; // Mostrar total de ingresos
        document.getElementById('totalGastos').textContent = `Gastos totales: $${totalGastos}`; // Mostrar total de gastos
    }
}

// Instanciar un objeto calculadora con IDs específicos para los elementos del DOM
const calculadora = new Calculadora(
    'ingreso_ml', 'ingreso_ma', 'vivienda', 'transporte', 'comidas', 'salud_edu', 'otro'
);

// Función para ejecutar el cálculo
function calcularIngresos() {
    calculadora.calcularIngresos(); // Llamar al método de calcular ingresos de la calculadora
}

