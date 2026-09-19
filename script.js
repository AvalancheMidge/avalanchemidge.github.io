document.addEventListener("DOMContentLoaded", () => {
    // 1. Получаем ключ игры из URL (?3q или ?game=3q)
    const urlParams = new URLSearchParams(window.location.search);
    let gameKey = urlParams.get('game');
    if (!gameKey) {
        gameKey = Array.from(urlParams.keys())[0];
    }

    // 2. Достаем данные игры
    const currentGame = GAMES_DATABASE[gameKey] || GAMES_DATABASE["default"];
    const FULL_DOWNLOAD_URL = BASE_DOWNLOAD_URL.replace(/\/$/, '') + (currentGame.filePath || '');

    // 3. Подставляем текстовые данные
    const titleElem = document.getElementById('game-title');
    const statusElem = document.getElementById('game-status');
    const osElem = document.getElementById('game-os');
    const archElem = document.getElementById('game-arch');
    const modalTitleElem = document.getElementById('modal-game-title');

    if (titleElem) titleElem.textContent = `Download ${currentGame.title}`;
    if (statusElem) statusElem.textContent = currentGame.status || "Ready to Deploy";
    if (osElem) osElem.textContent = currentGame.os || "Windows 10 / 11 (64-bit)";
    if (archElem) archElem.textContent = currentGame.arch || "Recommended System Config";
    if (modalTitleElem) modalTitleElem.textContent = `${currentGame.title} Ready`;

    // 4. Логика подстановки ЛОГОТИПА
    const logoImg = document.getElementById('game-logo');
    const defaultIcon = document.getElementById('game-default-icon');

    if (currentGame.logo && logoImg) {
        logoImg.src = currentGame.logo;
        logoImg.classList.remove('hidden');
        if (defaultIcon) defaultIcon.classList.add('hidden');
    } else {
        if (logoImg) logoImg.classList.add('hidden');
        if (defaultIcon) defaultIcon.classList.remove('hidden');
    }

    // 5. Логика отображения ЕДИНОГО СКРИНШОТА
    const screenshotSection = document.getElementById('screenshot-section');
    const screenshotImg = document.getElementById('screenshot-img');

    if (currentGame.screenshot && screenshotImg) {
        screenshotImg.src = currentGame.screenshot;
        if (screenshotSection) screenshotSection.classList.remove('hidden');
    } else if (screenshotSection) {
        screenshotSection.classList.add('hidden');
    }

    // 6. Логика рендеринга ОСОБЕННОСТЕЙ (FEATURES)
    const featuresSection = document.getElementById('features-section');
    const featuresList = document.getElementById('features-list');

    if (currentGame.features && currentGame.features.length > 0 && featuresList) {
        featuresList.innerHTML = ''; // Очищаем контейнер

        currentGame.features.forEach((featureText) => {
            const item = document.createElement('div');
            item.className = 'flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-200';
            item.innerHTML = `
                <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>${featureText}</span>
            `;
            featuresList.appendChild(item);
        });

        if (featuresSection) featuresSection.classList.remove('hidden');
    } else if (featuresSection) {
        if (featuresSection) featuresSection.classList.add('hidden');
    }

    // 7. Обработка скачивания и модального окна
    const btn = document.getElementById('download-trigger');
    const progContainer = document.getElementById('progress-container');
    const bar = document.getElementById('bar-fill');
    const percent = document.getElementById('percent-val');
    const status = document.getElementById('status-msg');
    const modal = document.getElementById('download-modal');
    const finalBtn = document.getElementById('final-download-btn');

    if (btn) {
        btn.addEventListener('click', function() {
            btn.style.display = 'none';
            if (progContainer) progContainer.style.display = 'block';

            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 4;

                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    if (status) status.innerText = "SUCCESSFULLY SYNCHRONIZED";

                    setTimeout(() => {
                        if (modal) modal.classList.remove('hidden');
                    }, 1000);
                }

                if (bar) bar.style.width = progress + '%';
                if (percent) percent.innerText = Math.floor(progress) + '%';

                if (status) {
                    if (progress > 30 && progress <= 70) {
                        status.innerText = "Reifying Shell...";
                    } else if (progress > 70 && progress < 100) {
                        status.innerText = "Finalizing Devout Link...";
                    }
                }
            }, 100);
        });
    }

    if (finalBtn) {
        finalBtn.addEventListener('click', function() {
            window.open(FULL_DOWNLOAD_URL, '_blank');
            if (modal) modal.classList.add('hidden');
            if (progContainer) progContainer.style.display = 'none';
            if (bar) bar.style.width = '0%';
            if (percent) percent.innerText = '0%';
            if (status) status.innerText = 'Initializing...';
            if (btn) btn.style.display = 'flex';
        });
    }
});
