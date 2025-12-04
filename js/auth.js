// Authentication Functions
function showLogin() {
    navigateToPage('login-page');
    
    const page = document.getElementById('login-page');
    page.innerHTML = `
        <main class="max-w-md mx-auto px-4 py-8">
            <div class="auth-form">
                <h2 class="arabic-display text-2xl text-center mb-6" style="color: var(--text-primary);">
                    تسجيل الدخول
                </h2>
                
                <div class="form-group">
                    <label class="form-label">البريد الإلكتروني أو اسم المستخدم</label>
                    <input type="text" id="login-identifier" class="form-input" placeholder="example@gmail.com">
                    <div class="form-error" id="login-identifier-error"></div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">كلمة المرور</label>
                    <input type="password" id="login-password" class="form-input" placeholder="********">
                    <div class="form-error" id="login-password-error"></div>
                </div>
                
                <button onclick="login()" class="w-full py-3 rounded-lg mt-6" style="background: var(--accent-primary); color: white;">
                    تسجيل الدخول
                </button>
                
                <div class="text-center mt-4">
                    <p class="arabic-body text-sm" style="color: var(--text-secondary);">
                        ليس لديك حساب؟ 
                        <button onclick="showRegister()" class="text-blue-500 hover:underline">
                            سجل الآن
                        </button>
                    </p>
                </div>
            </div>
        </main>
    `;
}

function showRegister() {
    navigateToPage('register-page');
    
    const page = document.getElementById('register-page');
    page.innerHTML = `
        <main class="max-w-md mx-auto px-4 py-8">
            <div class="auth-form">
                <h2 class="arabic-display text-2xl text-center mb-6" style="color: var(--text-primary);">
                    إنشاء حساب جديد
                </h2>
                
                <div class="form-group">
                    <label class="form-label">اسم المستخدم</label>
                    <input type="text" id="register-username" class="form-input" placeholder="اختر اسم مستخدم">
                    <div class="form-error" id="register-username-error"></div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">البريد الإلكتروني</label>
                    <input type="email" id="register-email" class="form-input" placeholder="example@gmail.com">
                    <div class="form-error" id="register-email-error"></div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">كلمة المرور</label>
                    <input type="password" id="register-password" class="form-input" placeholder="********">
                    <div class="form-error" id="register-password-error"></div>
                    <p class="arabic-body text-xs mt-1" style="color: var(--text-secondary);">
                        يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وتشمل أحرف كبيرة وصغيرة وأرقام
                    </p>
                </div>
                
                <div class="form-group">
                    <label class="form-label">تأكيد كلمة المرور</label>
                    <input type="password" id="register-confirm-password" class="form-input" placeholder="********">
                    <div class="form-error" id="register-confirm-password-error"></div>
                </div>
                
                <button onclick="register()" class="w-full py-3 rounded-lg mt-6" style="background: var(--accent-primary); color: white;">
                    إنشاء حساب
                </button>
                
                <div class="text-center mt-4">
                    <p class="arabic-body text-sm" style="color: var(--text-secondary);">
                        لديك حساب بالفعل؟ 
                        <button onclick="showLogin()" class="text-blue-500 hover:underline">
                            سجل دخول
                        </button>
                    </p>
                </div>
            </div>
        </main>
    `;
}

function login() {
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;
    
    // Reset errors
    document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');
    
    let hasError = false;
    
    if (!identifier) {
        document.getElementById('login-identifier-error').textContent = 'البريد الإلكتروني أو اسم المستخدم مطلوب';
        document.getElementById('login-identifier-error').style.display = 'block';
        hasError = true;
    }
    
    if (!password) {
        document.getElementById('login-password-error').textContent = 'كلمة المرور مطلوبة';
        document.getElementById('login-password-error').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user by email or username
    const user = users.find(u => 
        u.email === identifier || u.username === identifier
    );
    
    if (!user) {
        document.getElementById('login-identifier-error').textContent = 'المستخدم غير موجود';
        document.getElementById('login-identifier-error').style.display = 'block';
        return;
    }
    
    if (user.password !== password) {
        document.getElementById('login-password-error').textContent = 'كلمة المرور غير صحيحة';
        document.getElementById('login-password-error').style.display = 'block';
        return;
    }
    
    // Login successful
    currentUser = {
        id: user.id,
        username: user.username,
        email: user.email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showCustomAlert(`مرحباً بك ${user.username}!`);
    
    // Update UI
    loadHeader();
    loadSidebar();
    goHome();
}

function register() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Reset errors
    document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');
    
    let hasError = false;
    
    // Validate username
    if (!username) {
        document.getElementById('register-username-error').textContent = 'اسم المستخدم مطلوب';
        document.getElementById('register-username-error').style.display = 'block';
        hasError = true;
    } else if (username.length < 3) {
        document.getElementById('register-username-error').textContent = 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل';
        document.getElementById('register-username-error').style.display = 'block';
        hasError = true;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('register-email-error').textContent = 'البريد الإلكتروني مطلوب';
        document.getElementById('register-email-error').style.display = 'block';
        hasError = true;
    } else if (!emailRegex.test(email)) {
        document.getElementById('register-email-error').textContent = 'البريد الإلكتروني غير صحيح';
        document.getElementById('register-email-error').style.display = 'block';
        hasError = true;
    } else if (!email.endsWith('@gmail.com') && !email.endsWith('@hotmail.com')) {
        document.getElementById('register-email-error').textContent = 'يجب أن يكون البريد من @gmail.com أو @hotmail.com';
        document.getElementById('register-email-error').style.display = 'block';
        hasError = true;
    }
    
    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password) {
        document.getElementById('register-password-error').textContent = 'كلمة المرور مطلوبة';
        document.getElementById('register-password-error').style.display = 'block';
        hasError = true;
    } else if (!passwordRegex.test(password)) {
        document.getElementById('register-password-error').textContent = 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، وتشمل أحرف كبيرة وصغيرة وأرقام';
        document.getElementById('register-password-error').style.display = 'block';
        hasError = true;
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
        document.getElementById('register-confirm-password-error').textContent = 'كلمة المرور غير متطابقة';
        document.getElementById('register-confirm-password-error').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        document.getElementById('register-email-error').textContent = 'البريد الإلكتروني مسجل بالفعل';
        document.getElementById('register-email-error').style.display = 'block';
        return;
    }
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
        document.getElementById('register-username-error').textContent = 'اسم المستخدم مسجل بالفعل';
        document.getElementById('register-username-error').style.display = 'block';
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    currentUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showCustomAlert(`تم إنشاء حسابك بنجاح! مرحباً بك ${username}`);
    
    // Update UI
    loadHeader();
    loadSidebar();
    goHome();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    showCustomAlert('تم تسجيل الخروج بنجاح');
    
    // Update UI
    loadHeader();
    loadSidebar();
    goHome();
}

function showProfile() {
    navigateToPage('profile-page');
    
    const page = document.getElementById('profile-page');
    page.innerHTML = `
        <main class="max-w-md mx-auto px-4 py-8">
            <div class="auth-form">
                <h2 class="arabic-display text-2xl text-center mb-6" style="color: var(--text-primary);">
                    الملف الشخصي
                </h2>
                
                <div class="text-center mb-6">
                    <div class="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4" style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));">
                        <div class="w-full h-full flex items-center justify-center text-white text-2xl">
                            ${currentUser.username.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <h3 class="arabic-display text-xl">${currentUser.username}</h3>
                    <p class="arabic-body text-sm" style="color: var(--text-secondary);">${currentUser.email}</p>
                </div>
                
                <div class="space-y-4">
                    <button onclick="showChangePassword()" class="w-full p-4 rounded-xl border text-right flex items-center gap-3" style="border-color: var(--border-color); background: var(--card-bg);">
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                        </svg>
                        <div class="flex-1 text-right">
                            <p class="arabic-body font-semibold" style="color: var(--text-primary);">تغيير كلمة المرور</p>
                        </div>
                    </button>
                    
                    <button onclick="logout()" class="w-full p-4 rounded-xl border text-right flex items-center gap-3" style="border-color: var(--danger-color); background: var(--card-bg);">
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <div class="flex-1 text-right">
                            <p class="arabic-body font-semibold" style="color: var(--danger-color);">تسجيل خروج</p>
                        </div>
                    </button>
                </div>
            </div>
        </main>
    `;
}

function showChangePassword() {
    showCustomAlert(`
        <h3 class="arabic-display text-xl mb-4">تغيير كلمة المرور</h3>
        <div class="form-group">
            <label class="form-label">كلمة المرور الحالية</label>
            <input type="password" id="current-password" class="form-input">
        </div>
        <div class="form-group">
            <label class="form-label">كلمة المرور الجديدة</label>
            <input type="password" id="new-password" class="form-input">
        </div>
        <div class="form-group">
            <label class="form-label">تأكيد كلمة المرور الجديدة</label>
            <input type="password" id="confirm-new-password" class="form-input">
        </div>
        <button onclick="changePassword()" class="w-full py-3 rounded-lg mt-4" style="background: var(--accent-primary); color: white;">
            تغيير كلمة المرور
        </button>
    `, true);
}

function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex === -1) {
        showCustomAlert('المستخدم غير موجود');
        return;
    }
    
    // Check current password
    if (users[userIndex].password !== currentPassword) {
        showCustomAlert('كلمة المرور الحالية غير صحيحة');
        return;
    }
    
    // Validate new password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        showCustomAlert('كلمة المرور الجديدة يجب أن تحتوي على 8 أحرف على الأقل، وتشمل أحرف كبيرة وصغيرة وأرقام');
        return;
    }
    
    if (newPassword !== confirmNewPassword) {
        showCustomAlert('كلمة المرور غير متطابقة');
        return;
    }
    
    // Update password
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    showCustomAlert('تم تغيير كلمة المرور بنجاح');
      }
