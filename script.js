// Путь к файлу (динамический, меняется для каждой игры)
const FILE_PATH = "/Fl-Studio26.1-ProducerEdition/26.1.1";

// Собираем полную ссылку из конфига и пути
const FULL_DOWNLOAD_URL = BASE_DOWNLOAD_URL + FILE_PATH;

document.getElementById('download-trigger').addEventListener('click', function() {
    const btn = this;
    const progContainer = document.getElementById('progress-container');
    const bar = document.getElementById('bar-fill');
    const percent = document.getElementById('percent-val');
    const status = document.getElementById('status-msg');

    // Скрываем кнопку, показываем прогресс
    btn.style.display = 'none';
    progContainer.style.display = 'block';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 4;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            status.innerText = "SUCCESSFULLY SYNCHRONIZED";

            // Через 1 секунду показываем модальное окно
            setTimeout(() => {
                document.getElementById('download-modal').style.display = 'flex';
            }, 1000);
        }

        bar.style.width = progress + '%';
        percent.innerText = Math.floor(progress) + '%';

        if(progress > 30) status.innerText = "Reifying Shell...";
        if(progress > 70) status.innerText = "Finalizing Devout Link...";
    }, 100);
});

// Обработка кнопки скачивания в модальном окне
document.getElementById('final-download-btn').addEventListener('click', function() {
    // Открываем ссылку в новой вкладке
    window.open(FULL_DOWNLOAD_URL, '_blank');

    // Закрываем модальное окно
    document.getElementById('download-modal').style.display = 'none';

    // Обнуляем прогресс-бар
    const progContainer = document.getElementById('progress-container');
    const bar = document.getElementById('bar-fill');
    const percent = document.getElementById('percent-val');
    const status = document.getElementById('status-msg');
    const btn = document.getElementById('download-trigger');

    progContainer.style.display = 'none';
    bar.style.width = '0%';
    percent.innerText = '0%';
    status.innerText = 'Fragmenting Data...';
    btn.style.display = 'inline-block';
});
