const fileInput = document.getElementById('fileInput');
const dropArea = document.getElementById('dropArea');
const fileInfo = document.getElementById('fileInfo');

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    displayFileInfo(file);
});

function displayFileInfo(file) {
    fileInfo.innerHTML = `Iм'я файла: ${file.name}, Розмір: ${file.size} байт`;
}

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
    displayFileInfo(file);
});