// Utility Functions

// Show Custom Alert
function showCustomAlert(message, isHTML = false) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-[2000] px-6 py-4 rounded-xl shadow-2xl';
    alertDiv.style.background = 'var(--card-bg)';
    alertDiv.style.backdropFilter = 'blur(20px)';
    alertDiv.style.border = '2px solid var(--accent-primary)';
    alertDiv.style.maxWidth = '90%';
    alertDiv.style.width = '500px';
    alertDiv.style.maxHeight = '80vh';
    alertDiv.style.overflowY = 'auto';
    
    if (isHTML) {
        alertDiv.innerHTML = message;
    } else {
        alertDiv.innerHTML = `
            <p class="arabic-body text-center leading-relaxed text-sm sm:text-base" style="color: var(--text-primary); white-space: pre-line;">${message}</p>
        `;
    }
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.left = '10px';
    closeBtn.style.background = 'var(--accent-primary)';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.width = '24px';
    closeBtn.style.height = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => alertDiv.remove();
    
    alertDiv.appendChild(closeBtn);
    document.body.appendChild(alertDiv);

    // Auto-remove after 5 seconds if not HTML
    if (!isHTML) {
        setTimeout(() => {
            alertDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            alertDiv.style.opacity = '0';
            alertDiv.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Theme Toggle
function toggleTheme() {
    manualThemeToggle = true;
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    document.getElementById('sidebar-theme-icon').textContent = isDarkMode ? '🌙' : '☀️';
    document.getElementById('theme-status').textContent = isDarkMode ? 'النمط الليلي' : 'النمط النهاري';
}

// Language Toggle
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    showCustomAlert(`تم تغيير اللغة إلى: ${currentLanguage === 'ar' ? 'العربية' : 'English'}`);
}

// Background Selector
function showBackgroundSelector() {
    const modal = document.getElementById('background-modal');
    modal.innerHTML = `
        <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-[1000]">
            <div class="bg-opacity-100 border-2 rounded-2xl p-8 max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto" style="background: var(--bg-primary); border-color: var(--border-color);">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h3 class="arabic-display text-2xl sm:text-3xl mb-2" style="color: var(--text-primary);">اختر الخلفية</h3>
                        <p class="arabic-body text-sm" style="color: var(--text-secondary);">اختر النمط الهندسي المفضل</p>
                    </div>
                    <button onclick="closeBackgroundModal()" style="color: var(--text-secondary);">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button onclick="changeBackground('bg-pattern-1')" class="p-6 rounded-xl border-2 hover:border-4 transition-all bg-pattern-1" style="border-color: ${currentBgPattern === 'bg-pattern-1' ? 'var(--accent-primary)' : 'var(--border-color)'}; height: 140px;">
                        <p class="arabic-body font-semibold" style="color: var(--text-primary);">نمط 1</p>
                    </button>
                    <button onclick="changeBackground('bg-pattern-2')" class="p-6 rounded-xl border-2 hover:border-4 transition-all bg-pattern-2" style="border-color: ${currentBgPattern === 'bg-pattern-2' ? 'var(--accent-primary)' : 'var(--border-color)'}; height: 140px;">
                        <p class="arabic-body font-semibold" style="color: var(--text-primary);">نمط 2</p>
                    </button>
                    <button onclick="changeBackground('bg-pattern-3')" class="p-6 rounded-xl border-2 hover:border-4 transition-all bg-pattern-3" style="border-color: ${currentBgPattern === 'bg-pattern-3' ? 'var(--accent-primary)' : 'var(--border-color)'}; height: 140px;">
                        <p class="arabic-body font-semibold" style="color: var(--text-primary);">نمط 3</p>
                    </button>
                </div>

                <div class="mt-6">
                    <button onclick="closeBackgroundModal()" class="btn-primary w-full">
                        <span class="arabic-body">تم</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    toggleSidebar();
}

function closeBackgroundModal() {
    const modal = document.getElementById('background-modal');
    modal.innerHTML = '';
}

function changeBackground(pattern) {
    document.body.classList.remove(currentBgPattern);
    document.body.classList.add(pattern);
    currentBgPattern = pattern;
    showCustomAlert('تم تغيير الخلفية بنجاح');
    closeBackgroundModal();
}
