
let modalElements = {
    temperature: document.getElementById('temperature'),
    humidity: document.getElementById('humidity'),
    ec: document.getElementById('ec'),
    ph: document.getElementById('ph'),
    waterLevel: document.getElementById('waterLevel'),
    light: document.getElementById('light')
};

function openModal(graphType) {
    modalElements[graphType].style.display = "block";
    createGraph(graphType);
}

function closeModal(graphType) {
    modalElements[graphType].style.display = "none";
}

function goBack() {
    window.location.href = "index.html";
}

function createGraph(graphType) {
    let ctx = document.getElementById(graphType + 'Graph').getContext('2d');
    let graphData = fetchData(graphType);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: graphData.labels,
            datasets: [{
                label: graphType.charAt(0).toUpperCase() + graphType.slice(1),
                data: graphData.data,
                borderColor: '#007bff',
                fill: false
            }]
        },
        options: {
            onClick: function(e) {
                var activePoint = this.getElementAtEvent(e);
                if (activePoint.length > 0) {
                    alert('You clicked on ' + graphType + ' data: ' + activePoint[0]._model.label);
                }
            }
        }
    });
}

function fetchData(graphType) {
    // Simulate fetching data for each graph type from Google Sheets or API
    const data = {
        temperature: { labels: ['1', '2', '3', '4'], data: [22, 23, 21, 24] },
        humidity: { labels: ['1', '2', '3', '4'], data: [60, 65, 58, 62] },
        ec: { labels: ['1', '2', '3', '4'], data: [1.2, 1.3, 1.1, 1.2] },
        ph: { labels: ['1', '2', '3', '4'], data: [6.8, 7.0, 6.7, 7.1] },
        waterLevel: { labels: ['1', '2', '3', '4'], data: [5, 6, 4, 7] },
        light: { labels: ['1', '2', '3', '4'], data: [300, 400, 350, 450] }
    };
    
    return data[graphType] || { labels: [], data: [] };
}


