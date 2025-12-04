// Content Management Functions
const pagesData = {
    'مظالم أهل البيت': {
        title: 'مظالم أهل البيت عليهم السلام',
        description: 'تاريخ المظالم والاضطهاد الذي تعرض له النبي وآله الأطهار',
        content: `
            <div class="content-card">
                <h3>عبد المطلب جد النبي</h3>
                <p>عبد المطلب بن هاشم، جد النبي محمد ﷺ، كان سيد قريش وحكيمها. تعرض لمحاولات تهميش من قبل بعض أعداء بني هاشم.</p>
            </div>
            
            <div class="content-card">
                <h3>والدي النبي: عبد الله وآمنة</h3>
                <p>عبد الله بن عبد المطلب توفي قبل ولادة النبي، وأمه آمنة بنت وهب توفيت وهو في السادسة من عمره.</p>
            </div>
            
            <div class="content-card">
                <h3>النبي محمد ﷺ</h3>
                <p>تعرض النبي لأذى قريش، الحصار الاقتصادي، محاولات الاغتيال، والتشويه من قبل المنافقين.</p>
            </div>
            
            <div class="content-card">
                <h3>الإمام علي بن أبي طالب</h3>
                <p>تعرض للحرمان من حقه في الخلافة، المؤامرات ضده، الحرب في الجمل وصفين، واستشهاده بالسم.</p>
            </div>
        `
    },
    
    'العقائد والمناظرات': {
        title: 'العقائد والمناظرات',
        description: 'أهم المناظرات والأسئلة العقائدية مع الأدلة والبراهين',
        content: `
            <div class="content-card">
                <h3>حديث الثقلين</h3>
                <p>قال النبي ﷺ: "إني تارك فيكم الثقلين: كتاب الله وعترتي أهل بيتي، ما إن تمسكتم بهما لن تضلوا بعدي أبداً".</p>
            </div>
            
            <div class="content-card">
                <h3>معنى النجاسة</h3>
                <p>النجاسة عند الشيعة تنقسم إلى: نجاسة عينية ونجاسة حكمية، مع تفصيل أحكام كل نوع.</p>
            </div>
            
            <div class="content-card">
                <h3>متى ظهرنا ومن سمانا</h3>
                <p>اسم "الشيعة" أطلقه النبي ﷺ على أتباع علي عليه السلام في عدة مواضع من الحديث.</p>
            </div>
        `
    },
    
    // ... باقي المحتوى لكل بوابة
};

function navigateTo(portalName) {
    if (!pagesData[portalName]) {
        showCustomAlert(`جاري تحضير صفحة: ${portalName}`);
        return;
    }
    
    navigateToPage('content-page');
    
    const page = document.getElementById('content-page');
    const data = pagesData[portalName];
    
    page.innerHTML = `
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Bismillah -->
            <div class="text-center mb-6">
                <h2 class="arabic-quran text-3xl sm:text-4xl" style="color: var(--accent-primary);">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </h2>
            </div>

            <!-- Page Title -->
            <div class="mb-8 text-center">
                <h2 class="arabic-display text-2xl sm:text-3xl mb-2" style="color: var(--text-primary);">
                    ${data.title}
                </h2>
                <p class="arabic-body text-sm" style="color: var(--text-secondary);">
                    ${data.description}
                </p>
            </div>

            <!-- Content -->
            <div class="mb-6">
                ${data.content}
            </div>

            <!-- Save Button -->
            <div class="text-center mt-8">
                <button onclick="saveItem('${portalName}: ${data.description}')" 
                        class="px-6 py-3 rounded-lg" 
                        style="background: var(--accent-primary); color: white;">
                    💾 حفظ هذه الصفحة
                </button>
            </div>
        </main>
    `;
}

function quickSearch(term) {
    document.getElementById('main-search').value = term;
    performSearch(term);
}

function performSearch(query) {
    if (!query || query.trim() === '') {
        showCustomAlert('الرجاء إدخال كلمة للبحث');
        return;
    }
    
    const results = [];
    const searchTerm = query.toLowerCase();
    
    // Search in pages data
    Object.keys(pagesData).forEach(page => {
        const data = pagesData[page];
        if (page.toLowerCase().includes(searchTerm) || 
            data.description.toLowerCase().includes(searchTerm) ||
            data.content.toLowerCase().includes(searchTerm)) {
            results.push(page);
        }
    });
    
    if (results.length === 0) {
        showCustomAlert(`لا توجد نتائج للبحث عن: "${query}"`);
        return;
    }
    
    let resultHTML = `<h3 class="arabic-display text-xl mb-4">نتائج البحث عن: "${query}"</h3>`;
    
    results.forEach(result => {
        resultHTML += `
            <div class="portal-card mb-3 p-4" onclick="navigateTo('${result}')">
                <h4 class="arabic-body font-semibold">${result}</h4>
                <p class="arabic-body text-sm" style="color: var(--text-secondary);">
                    ${pagesData[result].description}
                </p>
            </div>
        `;
    });
    
    showCustomAlert(resultHTML, true);
}
