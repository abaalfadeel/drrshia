// State Management
let isDarkMode = false;
let currentLanguage = 'ar';
let currentBgPattern = 'bg-pattern-1';
let currentPage = 'home';
let currentUser = null;
let activeUsers = 0;
let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

// Initialize Application
function initApp() {
    // Load components
    loadHeader();
    loadSidebar();
    loadHomePage();
    loadCarousel();
    
    // Check for saved user session
    checkUserSession();
    
    // Update active users count
    updateActiveUsers();
    
    // Initialize copy/screenshot detection
    initCopyDetection();
    
    // Load saved items count
    updateSaveButton();
    
    console.log('درر الشيعة - Shia Pearls initialized ✓');
    console.log('المطور: هدوء - أبا الفضل');
    console.log('البريد الإلكتروني: abaalfadeel1@gmail.com');
    console.log('TikTok: @_2j_o');
}

// Load Header
function loadHeader() {
    const header = document.getElementById('header');
    header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
            <!-- Hamburger Menu -->
            <button onclick="toggleSidebar()" class="p-2 hover:bg-opacity-50 rounded-lg transition-all" style="color: var(--text-primary);">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            <!-- Logo and Title -->
            <div class="flex items-center gap-3">
                <h1 class="arabic-display text-xl sm:text-2xl" style="color: var(--accent-primary);">الشيعة</h1>
                
                <svg class="pearl-icon" width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="25" fill="var(--accent-primary)" opacity="0.2"/>
                    <circle cx="50" cy="50" r="18" fill="var(--accent-primary)" opacity="0.5"/>
                    <circle cx="50" cy="50" r="12" fill="var(--accent-primary)"/>
                    <circle cx="45" cy="45" r="4" fill="white" opacity="0.8"/>
                </svg>
                
                <h1 class="arabic-display text-xl sm:text-2xl" style="color: var(--accent-primary);">درر</h1>
            </div>

            <!-- User Menu or Back Button -->
            <div class="flex items-center gap-2">
                ${currentUser ? `
                    <button onclick="showProfile()" class="p-2 hover:bg-opacity-50 rounded-lg transition-all" style="color: var(--text-primary);">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                ` : `
                    <button onclick="showLogin()" class="px-3 py-1 rounded-lg text-sm" style="background: var(--accent-primary); color: white;">
                        تسجيل دخول
                    </button>
                `}
                
                <button id="back-btn" onclick="goHome()" class="p-2 hover:bg-opacity-50 rounded-lg transition-all" style="color: var(--text-primary); display: none;">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// Load Sidebar
function loadSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
        <div class="p-6">
            <!-- Sidebar Header -->
            <div class="flex justify-between items-center mb-8">
                <h2 class="arabic-display text-2xl" style="color: var(--accent-primary);">القائمة</h2>
                <button onclick="toggleSidebar()" style="color: var(--text-secondary);">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <!-- User Stats -->
            <div class="user-stats mb-6">
                <div class="stat-item">
                    <div class="stat-number" id="active-users-count">${activeUsers}</div>
                    <div class="stat-label">مستخدم نشط</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${savedItems.length}</div>
                    <div class="stat-label">محفوظ</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="forum-count">0</div>
                    <div class="stat-label">مناقشة</div>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <div class="space-y-4">
                <!-- Change Language -->
                <button onclick="toggleLanguage()" class="sidebar-menu-btn">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <div class="flex-1 text-right">
                        <p class="arabic-body font-semibold" style="color: var(--text-primary);">تغيير اللغة</p>
                        <p class="arabic-body text-xs" style="color: var(--text-secondary);">Change Language</p>
                    </div>
                </button>

                <!-- Change Theme -->
                <button onclick="toggleTheme()" class="sidebar-menu-btn">
                    <span id="sidebar-theme-icon" style="font-size: 20px;">☀️</span>
                    <div class="flex-1 text-right">
                        <p class="arabic-body font-semibold" style="color: var(--text-primary);">تغيير المظهر</p>
                        <p class="arabic-body text-xs" id="theme-status" style="color: var(--text-secondary);">النمط النهاري</p>
                    </div>
                </button>

                <!-- Change Background -->
                <button onclick="showBackgroundSelector()" class="sidebar-menu-btn">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <div class="flex-1 text-right">
                        <p class="arabic-body font-semibold" style="color: var(--text-primary);">تغيير الخلفية</p>
                        <p class="arabic-body text-xs" style="color: var(--text-secondary);">اختر نمط هندسي</p>
                    </div>
                </button>

                <!-- Developer Button -->
                <button onclick="showDeveloperPage()" class="sidebar-menu-btn">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div class="flex-1 text-right">
                        <p class="arabic-body font-semibold" style="color: var(--text-primary);">المطور</p>
                        <p class="arabic-body text-xs" style="color: var(--text-secondary);">معلومات التواصل</p>
                    </div>
                </button>

                <!-- Forum Button -->
                <button onclick="showForum()" class="sidebar-menu-btn">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <div class="flex-1 text-right">
                        <p class="arabic-body font-semibold" style="color: var(--text-primary);">المنتدى</p>
                        <p class="arabic-body text-xs" style="color: var(--text-secondary);">مناقشات وأسئلة</p>
                    </div>
                </button>

                <!-- Auth Buttons -->
                ${currentUser ? `
                    <button onclick="logout()" class="sidebar-menu-btn" style="border-color: var(--danger-color);">
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <div class="flex-1 text-right">
                            <p class="arabic-body font-semibold" style="color: var(--danger-color);">تسجيل خروج</p>
                            <p class="arabic-body text-xs" style="color: var(--text-secondary);">${currentUser.username}</p>
                        </div>
                    </button>
                ` : `
                    <button onclick="showLogin()" class="sidebar-menu-btn" style="border-color: var(--accent-primary);">
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                        <div class="flex-1 text-right">
                            <p class="arabic-body font-semibold" style="color: var(--accent-primary);">تسجيل دخول</p>
                            <p class="arabic-body text-xs" style="color: var(--text-secondary);">إنشاء حساب</p>
                        </div>
                    </button>
                `}

                <!-- Saved Items -->
                <button onclick="showSavedItems()" class="sidebar-menu-btn">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <div class="flex-1 text-right">
                        <p class="arabic-body font-semibold" style="color: var(--text-primary);">المحفوظات</p>
                        <p class="arabic-body text-xs" style="color: var(--text-secondary);">${savedItems.length} عنصر</p>
                    </div>
                </button>
            </div>

            <!-- Footer -->
            <div class="mt-auto pt-8 border-t" style="border-color: var(--border-color); margin-top: 100px;">
                <p class="arabic-body text-xs text-center" style="color: var(--text-secondary);">الإصدار 1.1.0</p>
            </div>
        </div>
    `;
    
    // Add CSS for sidebar menu buttons
    const style = document.createElement('style');
    style.textContent = `
        .sidebar-menu-btn {
            width: 100%;
            padding: 16px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            background: var(--card-bg);
            text-align: right;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .sidebar-menu-btn:hover {
            background: var(--card-hover);
            transform: translateX(-5px);
        }
    `;
    document.head.appendChild(style);
}

// Load Home Page
function loadHomePage() {
    const homePage = document.getElementById('home-page');
    homePage.innerHTML = `
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Bismillah -->
            <div class="text-center mb-8 fade-in-up stagger-1">
                <h2 class="arabic-quran text-4xl sm:text-5xl mb-6" style="color: var(--accent-primary);">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </h2>
            </div>

            <!-- Imam Mahdi Image Placeholder -->
            <div class="mb-8 fade-in-up stagger-2">
                <div class="w-full h-48 sm:h-64 rounded-2xl overflow-hidden" style="background: var(--card-bg); border: 2px solid var(--border-color);">
                    <div class="w-full h-full flex flex-col items-center justify-center" style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); opacity: 0.9;">
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" stroke="white" stroke-width="2" opacity="0.3"/>
                            <circle cx="50" cy="50" r="30" stroke="white" stroke-width="2" opacity="0.5"/>
                            <circle cx="50" cy="50" r="20" fill="white" opacity="0.7"/>
                        </svg>
                        <p class="arabic-display text-xl sm:text-2xl text-white mt-4">الإمام المهدي عجل الله فرجه</p>
                    </div>
                </div>
            </div>

            <!-- Daily Pearl -->
            <div class="daily-pearl mb-8 fade-in-up stagger-3">
                <p class="arabic-body text-sm mb-2 opacity-90">اللؤلؤة اليومية</p>
                <h3 class="arabic-display text-xl sm:text-2xl mb-4 leading-relaxed">
                    "مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ"
                </h3>
                <p class="arabic-body text-base opacity-90">
                    الإمام علي عليه السلام - نهج البلاغة
                </p>
                <button onclick="saveItem('اللؤلؤة اليومية: مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ')" 
                        class="mt-4 px-4 py-2 rounded-lg text-sm" 
                        style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3);">
                    💾 حفظ هذه اللؤلؤة
                </button>
            </div>

            <!-- Search Bar -->
            <div class="mb-8 fade-in-up stagger-4">
                <div class="relative">
                    <input
                        type="text"
                        id="main-search"
                        class="search-input w-full py-4 px-6 rounded-2xl text-base"
                        placeholder="ابحث في درر الشيعة..."
                        style="font-size: 16px;"
                    >
                    <button class="absolute left-4 top-1/2 transform -translate-y-1/2" style="color: var(--accent-primary);" onclick="performSearch()">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Most Used Topics -->
            <div class="mb-12">
                <h3 class="arabic-display text-xl sm:text-2xl mb-4" style="color: var(--text-primary);">المواضيع الأكثر استخداماً</h3>
                <div class="flex flex-wrap gap-3">
                    ${['فدك', 'الولاية', 'الغدير', 'كربلاء', 'السقيفة', 'تحريف القرآن', 'المتعة', 'الرجعة']
                        .map(topic => `
                        <button onclick="quickSearch('${topic}')" class="topic-tag">
                            <span class="arabic-body font-semibold text-sm">${topic}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- Main Portals Section -->
            <div class="mb-12">
                <div class="flex items-center gap-3 mb-6">
                    <div class="h-1 flex-1 rounded" style="background: var(--accent-primary);"></div>
                    <h2 class="arabic-display text-2xl sm:text-3xl" style="color: var(--text-primary);">البوابات الرئيسية</h2>
                    <div class="h-1 flex-1 rounded" style="background: var(--accent-primary);"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${Object.keys(pagesData).slice(0, 9).map(portal => `
                        <div class="portal-card rounded-xl p-6" onclick="navigateTo('${portal}')">
                            <div class="mb-3" style="color: var(--accent-primary);">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                    <path d="M2 17l10 5 10-5"></path>
                                    <path d="M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                            <h3 class="arabic-display text-lg sm:text-xl mb-2" style="color: var(--text-primary);">${portal}</h3>
                            <p class="arabic-body text-xs sm:text-sm" style="color: var(--text-secondary);">${pagesData[portal].description}</p>
                            <button onclick="event.stopPropagation(); saveItem('${portal}: ${pagesData[portal].description}')" 
                                    class="mt-3 px-3 py-1 rounded-lg text-xs" 
                                    style="background: var(--accent-primary); color: white;">
                                💾 حفظ
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Forum Preview -->
            <div class="mb-12">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-3">
                        <div class="h-1 w-20 rounded" style="background: var(--accent-secondary);"></div>
                        <h2 class="arabic-display text-2xl sm:text-3xl" style="color: var(--text-primary);">آخر المناقشات</h2>
                    </div>
                    <button onclick="showForum()" class="px-4 py-2 rounded-lg text-sm" style="background: var(--accent-secondary); color: white;">
                        عرض الكل
                    </button>
                </div>

                <div id="forum-preview">
                    <!-- سيتم تحميل المناقشات عبر JavaScript -->
                    <div class="text-center py-8" style="color: var(--text-secondary);">
                        جاري تحميل المناقشات...
                    </div>
                </div>
            </div>

            <!-- For Our Shiites Section -->
            <div class="mb-12">
                <div class="flex items-center gap-3 mb-6">
                    <div class="h-1 flex-1 rounded" style="background: var(--accent-secondary);"></div>
                    <h2 class="arabic-display text-2xl sm:text-3xl" style="color: var(--text-primary);">لشيعتنا</h2>
                    <div class="h-1 flex-1 rounded" style="background: var(--accent-secondary);"></div>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    ${['الصلوات', 'الأدعية', 'الأذكار', 'الأحاديث', 'نور الأئمة', 'النجاة من الجهالة', 'سيرة أهل البيت', 'أخلاق أهل البيت', 'قصص أهل البيت', 'الأتباع', 'الزيارات', 'وصايا أهل البيت']
                        .map(item => `
                        <div class="portal-card rounded-xl p-4 text-center" onclick="navigateTo('${item}')">
                            <div class="mb-2 flex justify-center" style="color: var(--accent-primary);">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <h4 class="arabic-display text-base sm:text-lg" style="color: var(--text-primary);">${item}</h4>
                            <button onclick="event.stopPropagation(); saveItem('${item}')" 
                                    class="mt-2 px-2 py-1 rounded text-xs" 
                                    style="background: var(--accent-primary); color: white;">
                                💾
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </main>
    `;
    
    // Add CSS for topic tags
    const style = document.createElement('style');
    style.textContent = `
        .topic-tag {
            padding: 8px 16px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
            background: var(--card-bg);
            color: var(--text-primary);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .topic-tag:hover {
            background: var(--accent-primary);
            color: white;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
    
    // Load forum preview
    loadForumPreview();
}

// Load Carousel
function loadCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const items = [
        '📚 مكتبة متكاملة',
        '✨ تحديثات يومية',
        '🔍 بحث متقدم',
        '📖 الكتب الأربعة',
        '💎 لآلئ يومية',
        '🌙 وضع ليلي',
        '🎨 تصميم فاخر',
        '👥 منتدى تفاعلي',
        '💾 حفظ المحتوى',
        '⭐ تقييم الموقع'
    ];
    
    // Duplicate items for seamless loop
    const allItems = [...items, ...items];
    
    carouselTrack.innerHTML = allItems.map(item => `
        <div class="carousel-item">
            <p class="arabic-body font-semibold" style="color: var(--text-primary);">${item}</p>
        </div>
    `).join('');
}

// Update Active Users
function updateActiveUsers() {
    // Simulate active users (in a real app, this would come from a server)
    activeUsers = Math.floor(Math.random() * 100) + 50;
    const countElement = document.getElementById('active-users-count');
    if (countElement) {
        countElement.textContent = activeUsers;
    }
    
    // Update every 5 minutes
    setTimeout(updateActiveUsers, 300000);
}

// Initialize Copy Detection
function initCopyDetection() {
    // Detect copy
    document.addEventListener('copy', function(e) {
        showRatingModal('نسخ');
    });
    
    // Detect screenshot (using Ctrl+Shift+S or PrintScreen)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && e.shiftKey && e.key === 'S') || e.key === 'PrintScreen') {
            showRatingModal('لقطة شاشة');
        }
    });
}

// Show Rating Modal
function showRatingModal(action) {
    const modal = document.getElementById('rating-modal');
    modal.innerHTML = `
        <div class="text-center">
            <h3 class="arabic-display text-xl mb-4" style="color: var(--text-primary);">
                شكراً ل${action} المحتوى!
            </h3>
            <p class="arabic-body mb-4" style="color: var(--text-secondary);">
                كيف تقيم موقع درر الشيعة؟
            </p>
            
            <div class="rating-stars">
                <span class="rating-star" onclick="rate(1)">☆</span>
                <span class="rating-star" onclick="rate(2)">☆</span>
                <span class="rating-star" onclick="rate(3)">☆</span>
                <span class="rating-star" onclick="rate(4)">☆</span>
                <span class="rating-star" onclick="rate(5)">☆</span>
            </div>
            
            <button onclick="closeRatingModal()" class="mt-6 px-6 py-2 rounded-lg" style="background: var(--accent-primary); color: white;">
                إغلاق
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

// Rate the site
function rate(stars) {
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach((star, index) => {
        if (index < stars) {
            star.classList.add('active');
            star.textContent = '★';
        } else {
            star.classList.remove('active');
            star.textContent = '☆';
        }
    });
    
    // Save rating to localStorage
    const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    ratings.push({
        stars: stars,
        date: new Date().toISOString()
    });
    localStorage.setItem('ratings', JSON.stringify(ratings));
    
    showCustomAlert(`شكراً لتقييمك بـ ${stars} نجوم!`);
    
    // Close modal after 2 seconds
    setTimeout(closeRatingModal, 2000);
}

// Close Rating Modal
function closeRatingModal() {
    const modal = document.getElementById('rating-modal');
    modal.classList.remove('active');
}

// Save Item
function saveItem(item) {
    if (!savedItems.includes(item)) {
        savedItems.push(item);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        updateSaveButton();
        showCustomAlert('تم الحفظ بنجاح!');
    } else {
        showCustomAlert('هذا العنصر محفوظ مسبقاً.');
    }
}

// Update Save Button
function updateSaveButton() {
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.innerHTML = `💾 حفظ (${savedItems.length})`;
    }
}

// Show Saved Items
function showSavedItems() {
    if (savedItems.length === 0) {
        showCustomAlert('لا توجد عناصر محفوظة بعد.');
        return;
    }
    
    let content = '<h3 class="arabic-display text-xl mb-4">المحفوظات</h3>';
    savedItems.forEach((item, index) => {
        content += `
            <div class="content-card">
                <p>${item}</p>
                <button onclick="removeSavedItem(${index})" class="mt-2 px-3 py-1 rounded text-sm" style="background: var(--danger-color); color: white;">
                    حذف
                </button>
            </div>
        `;
    });
    
    showCustomAlert(content, true);
}

// Remove Saved Item
function removeSavedItem(index) {
    savedItems.splice(index, 1);
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    updateSaveButton();
    showSavedItems();
}

// Check User Session
function checkUserSession() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        currentUser = user;
    }
}

// Show Developer Page
function showDeveloperPage() {
    navigateToPage('developer-page');
    
    const page = document.getElementById('developer-page');
    page.innerHTML = `
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="developer-card">
                <h2 class="arabic-display text-3xl mb-6 text-center" style="color: var(--accent-primary);">
                    المطور
                </h2>
                
                <div class="text-center mb-8">
                    <div class="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4" style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));">
                        <div class="w-full h-full flex items-center justify-center text-white text-4xl">
                            هـ
                        </div>
                    </div>
                    <h3 class="arabic-display text-2xl mb-2">هدوء - أبا الفضل</h3>
                    <p class="arabic-body" style="color: var(--text-secondary);">
                        مطور موقع درر الشيعة
                    </p>
                </div>
                
                <div class="mb-8">
                    <h4 class="arabic-display text-xl mb-4" style="color: var(--text-primary);">عن المطور</h4>
                    <p class="arabic-body mb-4" style="color: var(--text-secondary); line-height: 1.8;">
                        أهلاً وسهلاً بكم في موقع درر الشيعة. هذا الموقع هو جهد متواضع لجمع ونشر التراث الشيعي الأصيل من مصادر موثوقة. 
                        جميع المحتويات مجانية ومتاحة للجميع، ويمكنكم استخدامها ونشرها وتوزيعها بحرية تاملة.
                    </p>
                    <p class="arabic-body" style="color: var(--text-secondary); line-height: 1.8;">
                        ﴿إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا﴾
                    </p>
                </div>
                
                <div class="mb-8">
                    <h4 class="arabic-display text-xl mb-4" style="color: var(--text-primary);">طرق التواصل</h4>
                    <div class="contact-buttons">
                        <a href="mailto:abaalfadeel1@gmail.com" class="contact-btn">
                            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span>abaalfadeel1@gmail.com</span>
                        </a>
                        
                        <a href="https://tiktok.com/@_2j_o" target="_blank" class="contact-btn">
                            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                                <path d="M9 12v4a4 4 0 0 0 4 4h2"></path>
                            </svg>
                            <span>TikTok: @_2j_o</span>
                        </a>
                    </div>
                </div>
                
                <div class="text-center">
                    <p class="arabic-body text-sm" style="color: var(--text-secondary);">
                        جميع محتويات هذا التطبيق مجانية ومتاحة للجميع. يمكنكم استخدامها ونشرها وتوزيعها بحرية تامة. نسألكم الدعاء.
                    </p>
                    <p class="arabic-body mt-4" style="color: var(--accent-primary);">
                        لخادمكم<br>
                        هدوء - أبا الفضل
                    </p>
                </div>
            </div>
        </main>
    `;
}

// Load Forum Preview
function loadForumPreview() {
    const forumPreview = document.getElementById('forum-preview');
    const questions = JSON.parse(localStorage.getItem('forumQuestions')) || [];
    
    if (questions.length === 0) {
        forumPreview.innerHTML = `
            <div class="text-center py-8" style="color: var(--text-secondary);">
                لا توجد مناقشات بعد. كن أول من يبدأ مناقشة!
            </div>
        `;
        return;
    }
    
    const recentQuestions = questions.slice(-3).reverse();
    forumPreview.innerHTML = recentQuestions.map(q => `
        <div class="forum-card" onclick="showQuestion('${q.id}')">
            <h4 class="arabic-body font-semibold text-lg mb-2" style="color: var(--text-primary);">
                ${q.title}
            </h4>
            <p class="arabic-body text-sm mb-3" style="color: var(--text-secondary);">
                ${q.content.substring(0, 100)}...
            </p>
            <div class="forum-meta">
                <span>بواسطة: ${q.author}</span>
                <span>${new Date(q.date).toLocaleDateString('ar-SA')}</span>
            </div>
        </div>
    `).join('');
}

// Show Forum
function showForum() {
    navigateToPage('forum-page');
    loadForumPage();
}

// Load Forum Page
function loadForumPage() {
    const page = document.getElementById('forum-page');
    page.innerHTML = `
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="arabic-display text-3xl mb-2" style="color: var(--text-primary);">المنتدى</h2>
                    <p class="arabic-body" style="color: var(--text-secondary);">مناقشات وأسئلة حول المذهب الشيعي</p>
                </div>
                ${currentUser ? `
                    <button onclick="showNewQuestionForm()" class="px-6 py-2 rounded-lg" style="background: var(--accent-primary); color: white;">
                        سؤال جديد
                    </button>
                ` : `
                    <button onclick="showLogin()" class="px-6 py-2 rounded-lg" style="background: var(--accent-secondary); color: white;">
                        سجل دخول لطرح سؤال
                    </button>
                `}
            </div>
            
            <div id="questions-list">
                <!-- سيتم تحميل الأسئلة هنا -->
            </div>
        </main>
    `;
    
    loadQuestions();
}

// Load Questions
function loadQuestions() {
    const questionsList = document.getElementById('questions-list');
    const questions = JSON.parse(localStorage.getItem('forumQuestions')) || [];
    
    if (questions.length === 0) {
        questionsList.innerHTML = `
            <div class="text-center py-12">
                <svg class="mx-auto mb-4" width="64" height="64" fill="none" stroke="var(--text-secondary)" stroke-width="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <p class="arabic-body text-lg" style="color: var(--text-secondary);">
                    لا توجد أسئلة بعد. كن أول من يبدأ مناقشة!
                </p>
            </div>
        `;
        return;
    }
    
    questionsList.innerHTML = questions.reverse().map(q => `
        <div class="forum-card forum-question" onclick="showQuestion('${q.id}')">
            <h3 class="arabic-body font-semibold text-xl mb-3" style="color: var(--text-primary);">
                ${q.title}
            </h3>
            <p class="arabic-body mb-4" style="color: var(--text-secondary); line-height: 1.6;">
                ${q.content.substring(0, 200)}...
            </p>
            <div class="forum-meta">
                <div>
                    <span>بواسطة: ${q.author}</span>
                    <span class="mx-2">•</span>
                    <span>${new Date(q.date).toLocaleDateString('ar-SA')}</span>
                </div>
                <div>
                    <span>${q.answers ? q.answers.length : 0} إجابة</span>
                    <span class="mx-2">•</span>
                    <span>${q.views || 0} مشاهدة</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Show New Question Form
function showNewQuestionForm() {
    showCustomAlert(`
        <h3 class="arabic-display text-xl mb-4">سؤال جديد</h3>
        <div class="form-group">
            <label class="form-label">عنوان السؤال</label>
            <input type="text" id="question-title" class="form-input" placeholder="اكتب عنوان السؤال">
        </div>
        <div class="form-group">
            <label class="form-label">تفاصيل السؤال</label>
            <textarea id="question-content" class="form-input" rows="4" placeholder="اكتف تفاصيل السؤال هنا..."></textarea>
        </div>
        <button onclick="submitQuestion()" class="w-full py-3 rounded-lg mt-4" style="background: var(--accent-primary); color: white;">
            نشر السؤال
        </button>
    `, true);
}

// Submit Question
function submitQuestion() {
    const title = document.getElementById('question-title').value;
    const content = document.getElementById('question-content').value;
    
    if (!title || !content) {
        showCustomAlert('الرجاء ملء جميع الحقول');
        return;
    }
    
    // Check for inappropriate content
    if (containsInappropriateContent(title + content)) {
        showCustomAlert('يحتوي النص على محتوى غير لائق. الرجاء التعديل.');
        return;
    }
    
    const questions = JSON.parse(localStorage.getItem('forumQuestions')) || [];
    const newQuestion = {
        id: generateId(),
        title: title,
        content: content,
        author: currentUser.username,
        date: new Date().toISOString(),
        answers: [],
        views: 0
    };
    
    questions.push(newQuestion);
    localStorage.setItem('forumQuestions', JSON.stringify(questions));
    
    showCustomAlert('تم نشر سؤالك بنجاح!');
    loadForumPage();
}

// Show Question
function showQuestion(questionId) {
    navigateToPage('question-page');
    
    const questions = JSON.parse(localStorage.getItem('forumQuestions')) || [];
    const question = questions.find(q => q.id === questionId);
    
    if (!question) {
        showCustomAlert('السؤال غير موجود');
        goBack();
        return;
    }
    
    // Update views
    question.views = (question.views || 0) + 1;
    localStorage.setItem('forumQuestions', JSON.stringify(questions));
    
    const page = document.getElementById('question-page');
    page.innerHTML = `
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Question -->
            <div class="forum-card forum-question mb-8">
                <h2 class="arabic-display text-2xl mb-4" style="color: var(--text-primary);">
                    ${question.title}
                </h2>
                <div class="arabic-body mb-6" style="color: var(--text-secondary); line-height: 1.8;">
                    ${question.content}
                </div>
                <div class="forum-meta">
                    <div>
                        <span>بواسطة: ${question.author}</span>
                        <span class="mx-2">•</span>
                        <span>${new Date(question.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div>
                        <span>${question.views} مشاهدة</span>
                    </div>
                </div>
            </div>
            
            <!-- Answers -->
            <div class="mb-8">
                <h3 class="arabic-display text-xl mb-4" style="color: var(--text-primary);">
                    الإجابات (${question.answers ? question.answers.length : 0})
                </h3>
                
                <div id="answers-list">
                    ${question.answers && question.answers.length > 0 
                        ? question.answers.map(answer => `
                            <div class="forum-card forum-answer mb-4">
                                <div class="arabic-body mb-3" style="color: var(--text-secondary); line-height: 1.8;">
                                    ${answer.content}
                                </div>
                                <div class="forum-meta">
                                    <div>
                                        <span>بواسطة: ${answer.author}</span>
                                        <span class="mx-2">•</span>
                                        <span>${new Date(answer.date).toLocaleDateString('ar-SA')}</span>
                                    </div>
                                    ${answer.author === 'المطور' ? '<span style="color: var(--accent-primary);">✓ مطور</span>' : ''}
                                </div>
                            </div>
                        `).join('')
                        : '<p class="arabic-body text-center py-8" style="color: var(--text-secondary);">لا توجد إجابات بعد.</p>'
                    }
                </div>
            </div>
            
            <!-- Add Answer Form -->
            ${currentUser ? `
                <div class="forum-card">
                    <h4 class="arabic-display text-lg mb-4" style="color: var(--text-primary);">أضف إجابة</h4>
                    <div class="form-group">
                        <textarea id="answer-content" class="form-input" rows="4" placeholder="اكتب إجابتك هنا..."></textarea>
                    </div>
                    <button onclick="submitAnswer('${questionId}')" class="px-6 py-2 rounded-lg" style="background: var(--accent-primary); color: white;">
                        نشر الإجابة
                    </button>
                </div>
            ` : `
                <div class="text-center py-8">
                    <p class="arabic-body mb-4" style="color: var(--text-secondary);">
                        يجب تسجيل الدخول لإضافة إجابة
                    </p>
                    <button onclick="showLogin()" class="px-6 py-2 rounded-lg" style="background: var(--accent-primary); color: white;">
                        تسجيل دخول
                    </button>
                </div>
            `}
        </main>
    `;
}

// Submit Answer
function submitAnswer(questionId) {
    const content = document.getElementById('answer-content').value;
    
    if (!content) {
        showCustomAlert('الرجاء كتابة إجابة');
        return;
    }
    
    // Check for inappropriate content
    if (containsInappropriateContent(content)) {
        showCustomAlert('يحتوي النص على محتوى غير لائق. الرجاء التعديل.');
        return;
    }
    
    const questions = JSON.parse(localStorage.getItem('forumQuestions')) || [];
    const questionIndex = questions.findIndex(q => q.id === questionId);
    
    if (questionIndex === -1) {
        showCustomAlert('السؤال غير موجود');
        return;
    }
    
    if (!questions[questionIndex].answers) {
        questions[questionIndex].answers = [];
    }
    
    const newAnswer = {
        id: generateId(),
        content: content,
        author: currentUser.username,
        date: new Date().toISOString()
    };
    
    questions[questionIndex].answers.push(newAnswer);
    localStorage.setItem('forumQuestions', JSON.stringify(questions));
    
    showCustomAlert('تم نشر إجابتك بنجاح!');
    showQuestion(questionId);
}

// Check for Inappropriate Content
function containsInappropriateContent(text) {
    const inappropriateWords = [
        'كلمة_غير_لائقة_1', 'كلمة_غير_لائقة_2', 'شتيمة', 'سب', 'قذف', 
        'عنصري', 'طائفي', 'تحريض', 'كراهية', 'إساءة'
    ];
    
    const lowerText = text.toLowerCase();
    return inappropriateWords.some(word => lowerText.includes(word));
}

// Generate ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Navigate to Page
function navigateToPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Show/hide back button
    const backBtn = document.getElementById('back-btn');
    if (pageId === 'home-page') {
        backBtn.style.display = 'none';
        currentPage = 'home';
    } else {
        backBtn.style.display = 'block';
        currentPage = pageId;
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close sidebar if open
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }
}

// Go Home
function goHome() {
    navigateToPage('home-page');
}

// Go Back
function goBack() {
    if (currentPage === 'question-page') {
        showForum();
    } else if (currentPage !== 'home-page') {
        goHome();
    }
}

// ... (بقية الدوال مثل toggleSidebar, toggleTheme, toggleLanguage, showBackgroundSelector, changeBackground, etc.)
// سيتم وضعها في ملفات JavaScript المنفصلة

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
