// Gráfico de líneas
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
            label: 'Ventas 2024',
            data: [120, 190, 300, 500, 200],
            borderColor: '#3a9c73',
            backgroundColor: 'rgba(58, 156, 115, 0.2)',
            fill: true,
            tension: 0.4,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        }
    }
});

// Gráfico de pastel
const pieCtx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Producto A', 'Producto B', 'Producto C'],
        datasets: [{
            data: [300, 500, 100],
            backgroundColor: ['#3a9c73', '#2d7a59', '#a3d4af']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
        }
    }
});
