
// بيانات التطبيقات الافتراضية
let applications = [
    {
        name: "ChatGPT",
        company: "OpenAI",
        website: "https://chat.openai.com",
        isFree: "مجاني",
        usageField: "Education",
        description: "مساعد ذكي للدردشة والإجابة على الأسئلة"
    },
    {
        name: "Midjourney",
        company: "Midjourney",
        website: "https://www.midjourney.com",
        isFree: "غير مجاني",
        usageField: "Entertainment",
        description: "تطبيق لإنشاء الصور الفنية باستخدام الذكاء الاصطناعي"
    },
    {
        name: "Grammarly",
        company: "Grammarly",
        website: "https://www.grammarly.com",
        isFree: "مجاني",
        usageField: "Education",
        description: "مساعد كتابي لتحسين القواعد اللغوية والأسلوب"
    },
    {
        name: "TensorFlow",
        company: "Google",
        website: "https://www.tensorflow.org",
        isFree: "مجاني",
        usageField: "Education",
        description: "مكتبة مفتوحة المصدر للتعلم الآلي والذكاء الاصطناعي"
    },
    {
        name: "IBMWatson",
        company: "IBM",
        website: "https://www.ibm.com/watson",
        isFree: "غير مجاني",
        usageField: "Healthcare",
        description: "منصة ذكاء اصطناعي للمؤسسات والشركات"
    }
];

// تهيئة التطبيقات عند تحميل الصفحة
$(document).ready(function() {
    initializeApplications();
    setupEventHandlers();
});

// تهيئة قائمة التطبيقات
function initializeApplications() {
    if (localStorage.getItem('applications')) {
        applications = JSON.parse(localStorage.getItem('applications'));
    } else {
        localStorage.setItem('applications', JSON.stringify(applications));
    }
    displayApplications();
}

// عرض التطبيقات في الجدول
function displayApplications() {
    const tbody = $('#appsTable tbody');
    tbody.empty();

    applications.forEach((app, index) => {
        const row = `
            <tr>
                <td>${app.name}</td>
                <td>${app.company}</td>
                <td>${app.usageField}</td>
                <td>${app.isFree}</td>
                <td>
                    <button class="details-btn" data-index="${index}">إظهار التفاصيل</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });

    // إضافة event listeners للأزرار
    $('.details-btn').click(function() {
        const index = $(this).data('index');
        showAppDetails(index);
    });
}

// عرض تفاصيل التطبيق
function showAppDetails(index) {
    const app = applications[index];
    const modal = $('#appDetailsModal');
    const content = $('#appDetailsContent');

    const detailsHtml = `
        <h2>${app.name}</h2>
        <div class="app-details">
            <p><strong>الشركة المطورة:</strong> ${app.company}</p>
            <p><strong>مجال الاستخدام:</strong> ${app.usageField}</p>
            <p><strong>النوع:</strong> ${app.isFree}</p>
            <p><strong>الموقع الإلكتروني:</strong> <a href="${app.website}" target="_blank">${app.website}</a></p>
            <p><strong>الشرح المختصر:</strong> ${app.description}</p>
        </div>
    `;

    content.html(detailsHtml);
    modal.show();
}

// إغلاق المودال
$('.close').click(function() {
    $('#appDetailsModal').hide();
});

// إغلاق المودال عند النقر خارج المحتوى
$(window).click(function(event) {
    const modal = $('#appDetailsModal');
    if (event.target === modal[0]) {
        modal.hide();
    }
});

// إعداد event handlers
function setupEventHandlers() {
    // التحقق من النموذج
    $('#appForm').submit(function(e) {
        e.preventDefault();
        if (validateForm()) {
            addNewApplication();
        }
    });

    // زر الإعادة
    $('#resetBtn').click(function() {
        resetForm();
    });
}

// التحقق من صحة النموذج
function validateForm() {
    let isValid = true;

    // التحقق من اسم التطبيق (أحرف إنجليزية فقط بدون فراغات)
    const appName = $('#appName').val();
    const appNameRegex = /^[A-Za-z]+$/;
    if (!appNameRegex.test(appName)) {
        showError('appName', 'اسم التطبيق يجب أن يحتوي على أحرف إنجليزية فقط بدون فراغات');
        isValid = false;
    } else {
        hideError('appName');
    }

    // التحقق من اسم الشركة (أحرف إنجليزية فقط)
    const companyName = $('#companyName').val();
    const companyNameRegex = /^[A-Za-z\s]+$/;
    if (!companyNameRegex.test(companyName)) {
        showError('companyName', 'اسم الشركة يجب أن يحتوي على أحرف إنجليزية فقط');
        isValid = false;
    } else {
        hideError('companyName');
    }

    // التحقق من الموقع الإلكتروني
    const website = $('#website').val();
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-])\/?$/;
    if (!urlRegex.test(website)) {
        showError('website', 'الرجاء إدخال عنوان موقع إلكتروني صحيح');
        isValid = false;
    } else {
        hideError('website');
    }

    // التحقق من الحقول المطلوبة
    const requiredFields = ['isFree', 'usageField', 'description'];
    requiredFields.forEach(field => {
        const value = $(#${field}).val();
        if (!value) {
            showError(field, 'هذا الحقل مطلوب');
            isValid = false;
        } else {
            hideError(field);
        }
    });

    return isValid;
}

// إظهار خطأ
function showError(fieldId, message) {
    $(#${fieldId}).addClass('error');
    let errorElement = $(#${fieldId}).siblings('.error-message');
    if (errorElement.length === 0) {
        errorElement = $(<small class="error-message" style="color: red;"></small>);
        $(#${fieldId}).after(errorElement);
    }
    errorElement.text(message);
}

// إخفاء الخطأ
function hideError(fieldId) {
    $(#${fieldId}).removeClass('error');
    $(#${fieldId}).siblings('.error-message').remove();
}

// إضافة تطبيق جديد
function addNewApplication() {
    const newApp = {
        name: $('#appName').val(),
        company: $('#companyName').val(),
        website: $('#website').val(),
        isFree: $('#isFree').val(),
        usageField: $('#usageField').val(),
        description: $('#description').val()
    };

    applications.push(newApp);
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // الانتقال إلى صفحة التطبيقات
    window.location.href = 'apps.html';
}

// إعادة تعيين النموذج
function resetForm() {
    $('#appForm')[0].reset();
    $('.error-message').remove();
    $('.error').removeClass('error');
}

// إضافة تنسيق للأخطاء في CSS
const errorStyles = `
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 5px rgba(231, 76, 60, 0.3) !important;
    }
    .error-message {
        color: #e74c3c !important;
        font-weight: bold;
    }
`;

// إضافة التنسيقات للأخطاء
$('head').append(<style>${errorStyles}</style>)