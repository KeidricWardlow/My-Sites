const ctx = document.getElementById('pieChart').getContext('2d');
let chart;
let data = [];
let labels = [];
let colors = [];
let isNightTheme = false;

document.getElementById('addMeasurement').addEventListener('click', () => {
    const measurement = document.getElementById('measurement').value;
    const label = document.getElementById('label').value;
    const color = document.getElementById('color').value;

    if (measurement && label) {
        data.push(Number(measurement));
        labels.push(label);
        colors.push(color);
        drawChart();
        document.getElementById('measurement').value = '';
        document.getElementById('label').value = '';
    }
});

document.getElementById('updateLabel').addEventListener('click', () => {
    const oldLabel = document.getElementById('editLabel').value;
    const index = labels.indexOf(oldLabel);

    if (index !== -1) {
        const updatedLabel = prompt("Enter new label for " + oldLabel);
        if (updatedLabel) {
            labels[index] = updatedLabel;
            drawChart();
        }
        document.getElementById('editLabel').value = '';
    }
});

document.getElementById('chartType').addEventListener('change', () => {
    drawChart();
});

document.getElementById('saveChart').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'pie-chart.jpg';
    link.href = document.getElementById('pieChart').toDataURL('image/jpeg', 1.0);
    link.click();
});

document.getElementById('toggleTheme').addEventListener('click', () => {
    isNightTheme = !isNightTheme;
    document.body.classList.toggle('night-theme', isNightTheme);
    document.body.classList.toggle('day-theme', !isNightTheme);
});

function drawChart() {
    if (chart) {
        chart.destroy();
    }

    const total = data.reduce((acc, val) => acc + val, 0);
    const remaining = total < 100 ? 100 - total : 0;

    if (remaining > 0) {
        data.push(remaining);
        labels.push('Remaining');
        colors.push('#cccccc');
    }

    const chartType = document.getElementById('chartType').value;
    chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Pie Chart'
                }
            }
        }
    });

    if (remaining > 0) {
        data = data.slice(0, -1);
        labels = labels.slice(0, -1);
        colors = colors.slice(0, -1);
    }
}
