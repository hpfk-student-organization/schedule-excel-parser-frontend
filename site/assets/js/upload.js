const API_URL = './timetable.json'
const EDIT_URL = './edit'
const loading = document.getElementById('loading');
const fileInput = document.getElementById('fileInput');
const dropArea = document.getElementById('dropArea');

function sendFile(file) {
    fetchAPI()
        .then(data => responseAPI(data))
        .catch(error => {
            console.error(error);
        });
    loading.innerHTML = "Загрузка..."
}

function fetchAPI() {
    return fetch(API_URL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Не удалось загрузить JSON файл');
            }
        })
}

function responseAPI(data) {
    sessionStorage.setItem('timetable', JSON.stringify(data));
    setTimeout(() => window.open(EDIT_URL, '_self'), 1000);
}

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    sendFile(file);
    fileInput.value = "";
});

dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropArea.style.border = '2px dashed #333';
});

dropArea.addEventListener('dragleave', function () {
    dropArea.style.border = '2px dashed #ccc';
});

dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    dropArea.style.border = '2px dashed #ccc';
    const file = e.dataTransfer.files[0];
    sendFile(file);
});