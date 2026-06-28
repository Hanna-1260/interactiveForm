// הגדרת משתנים גלובלים לגישה לאלמנטים הקבועים
const nameInput = document.getElementById('fullName'); // תיבת הטקסט לכתיבת שם המזמין
const sendBtn = document.getElementById('send'); // כפתור סיכום הטופס
const itriyotUser = document.getElementById('itriyotUser'); // תגית שמציגה את סוג האטריות שהמזמין יבחר

nameInput.value = ''; // מרוקן את תיבת הטקסט של השם
document.getElementById('displayName').textContent = ''; // ריקון טקסט שם המזמין שיופיע בחלק - המנה שלי 

// פונקציה שתציג את התמונה המתאימה בטופס, בהתאם לבחירות המשתמש
function updateMainImage() {
    const noodleRadio = document.querySelector('input[name="itriyoType"]:checked'); // יצירת משתנה לסוג האטריות שהמשתמש בוחר
    const spicyRadio = document.querySelector('input[name="spicyLevel"]:checked'); // יצירת משתנה לרמת החריפות שהמשתמש בוחר

    // תנאי שבודק האם המשתמש בחר בסוג אטריות - במידה ולא, לא תופיע תמונה והפונקציה תעצר 
    if (noodleRadio === null) {
        itriyotUser.innerHTML = '';
        return; // עוצר את הפונקציה
    }

    const noodleValue = noodleRadio.value; // יצירת משתנה של ערך סוג האטריות
    let src = 'images/Itriyot/' + noodleValue + '.png'; // יצירת משתנה של נתיב התמונה של האטריות לפי מה שהמשתמש בחר

    // בדיקה האם המשתמש בחר רמת חריפות כדי להחליף לתמונה מתאימה שמציגה את רמת החריפות
    if (spicyRadio !== null) { // אם המשתמש בחר רמת חריפות, כלומר הבחירה אינה ריקה
        const spicyValue = spicyRadio.value; // משתנה של ערך רמת החריפות
        let folder = ''; // פתיחת משתנה של התיקייה המתאימה לפי רמת החריפות
        let suffix = ''; // פתיחת משתנה של סיומת שם התמונה לפי רמת החריפות

        // תנאים לבדיקת רמת החריפת שנבחרה, והתאמת התיקייה וסיומת התמונה בהתאם
        if (spicyValue === 'notSpicy') {
            folder = 'notSpicy';
            suffix = 'NotSpicy';
        } else if (spicyValue === 'bitSpicy') {
            folder = 'bitSpicy';
            suffix = 'BitSpicy';
        } else if (spicyValue === 'verySpicy') {
            folder = 'Very';
            suffix = 'VerySpicy';
        } else if (spicyValue === 'extremeSpicy') {
            folder = 'Extreme';
            suffix = 'ExtremeSpicy';
        }

        // הצבת נתיב מציאת התמונה המתאימה לפי תוצאות הבדיקה בתנאים 
        src = 'images/' + folder + '/' + noodleValue + suffix + '.png';
    }

    // הצגת התמונה המעודכנת בתוך תיבת התצוגה
    itriyotUser.innerHTML = '<img src=' + src + '>';
}


// פונקציה לעדכון שקיפות תמונות התוספות בהתאם לסימון של המשתמש
function updateSideImage(checkbox) { // הפונקציה מוגדרת עם פרמטר חדש שמטרתו להעביר לתוכה את הבחירה של המשתמש מתוך התוספות
    let fileName = ''; // יצירת משתנה של שם הקובץ של התמונה של התוספת

    // בדיקת האם ערך ה-id של התוספת שנבחרה סומן, ואם כן להתאים לו את שם הקובץ המתאים
    if (checkbox.id === 'mushrooms') {
        fileName = 'mushrooms.png';
    } else if (checkbox.id === 'greenOnion') {
        fileName = 'greenOnion.png';
    } else if (checkbox.id === 'lettuce') {
        fileName = 'lettuce.png';
    } else if (checkbox.id === 'egg') {
        fileName = 'eggs.png';
    } else if (checkbox.id === 'beef') {
        fileName = 'beef.png';
    } else if (checkbox.id === 'tofu') {
        fileName = 'tofu.png';
    } else if (checkbox.id === 'seaweed') {
        fileName = 'seaweed.png';
    }

    // חיפוש התמונה שבשם שלה מופיע שם הקובץ שנמצא בבדיקה
    const img = document.querySelector('#sidesUser img[src*="' + fileName + '"]');

    // תנאי שבודק האם נמצאה תמונה שמתאימה לתוספת
    if (img !== null) {
        if (checkbox.checked === true) { // תנאי נוסף, שבודק אם המשתמש סימן את התוספת
            img.classList.add('highlighted'); // אם כן - התוספת מופיעה במלוא שקיפות
        } else {
            img.classList.remove('highlighted'); // אם לא - התוספת מופיעה בחצי שקיפות
        }
    }
}

// פונקציה לבדיקת תקינות הטופס והפעלת כפתור השליחה
function checkValidity() {
    const hasName = nameInput.value.trim(); // יצירת משתנה של שם המזמין כך שאם יוקלדו רווחים בלבד, תיבת הטקסט עדיין תחשב כריקה
    const hasNoodle = document.querySelector('input[name="itriyoType"]:checked'); // יצירת משתנה שמטרתו לבדוק האם המשתמש בחר סוג אטריות
    const hasSpicy = document.querySelector('input[name="spicyLevel"]:checked'); // יצירת משתנה שמטרתו לבדוק האם המשתמש בחר רמת חריפות

    if (hasName !== '' && hasNoodle !== null && hasSpicy !== null) { // אם השם הוזן, המשתמש בחר סוג אטריות והמשתמש בחר רמת חריפות
        sendBtn.disabled = false; // כפתור השליחה יהיה פעיל
    }
    else { // אם אחד התנאים לא התקיים
        sendBtn.disabled = true; // כפתור השליחה יהיה לא פעיל
    }
}

// יצירת משתנה גלובלי שיוצר רשימה של כל כפתורי הרדיו - סוגי האטריות ורמות החריפות
const radios = document.querySelectorAll('input[name="itriyoType"], input[name="spicyLevel"]');

// לולאה להצמדת מאזין אירועים לכל כפתורי הרדיו (אטריות וחריפות)
for (let i = 0; i < radios.length; i++) { // מעבר על כל הרשימה - התחלה מ-0 כי היא מתנהגת כמו מערך  
    radios[i].addEventListener('change', function () { // הצמדה לכל כפתור רדיו מאזין אירועים לשינוי סימון הבחירה
        updateMainImage(); // קריאה לפונקציה לעדכון התמונה לפי השינוי
        checkValidity(); // קריאה לפונקציה לבדיקת תקינות הטופס לפי השינוי
    });
}

// יצירת משתנה גלובלי שיוצר רשימה של כל כפתורי הצ'קבוקס - תוספות
const checkboxes = document.querySelectorAll('input[name="sides"]');

// לולאה להצמדת מאזין אירועים לכל צ'ק-בוקס של תוספת
for (let i = 0; i < checkboxes.length; i++) { // מעבר על כל הרשימה - התחלה מ-0 כי היא מתנהגת כמו מערך  
    const cb = checkboxes[i]; // יצירת משתנה של כפתור הצ'קבוקס הנוכחי
    cb.addEventListener('change', function () { // הצמדה לכל צ'ק-בוקס מאזין אירועים לשינוי סימון הבחירה
        updateSideImage(cb); // קריאה לפונקציה לעדכון התמונה לפי השינוי
    });
    updateSideImage(cb); // שליחת כל תוספת לפונקציה שמשנה את שקיפות התמונה של התוספת, כדי לוודא שהדפדפן לא שמר בחירות קודמות
}

// מאזין אירועים להקלדת שם המשתמש בתיבת הטקסט - מעתיק את השם בלייב ובודק תקינות
nameInput.addEventListener('input', function () {
    document.getElementById('displayName').textContent = nameInput.value;
    checkValidity(); // קריאה לפונקציה לבדיקת תקינות הטופס
});

// בדיקות ועדכונים ראשוניים בעת טעינת הדף בפעם הראשונה
checkValidity();
updateMainImage();

// פונקציה שמופעלת כאשר הכפתור - שגרו אלינו נלחץ, תציג את סיכום ההזמנה
function showReservSummery() {
    const name = nameInput.value.trim(); // יצירת משתנה של שם המזמין תוך כדי בדיקה שאין רווחים מיותרים

    // יצירת שני משתנים של סוג האטריות ורמת החריפות שנבחרו לפי הערך של הלייבל שסומן
    const noodleLabel = document.querySelector('input[name="itriyoType"]:checked + label').innerText;
    const spicyLabel = document.querySelector('input[name="spicyLevel"]:checked + label').innerText;

    // יצירת משתנה שמכיל רשימה של כל התוספות שנבחרו בצ'קבוקסים
    const checkedSides = document.querySelectorAll('input[name="sides"]:checked');
    let sidesText = ''; // פתיחת משתנה של הטקסט של התוספות שיוצג למשתמש בסיכום

    for (let i = 0; i < checkedSides.length; i++) { // לולאה שעוברת על כל הרשימה של התוספות שנבחרו
        const sideId = checkedSides[i].id; // יצירת משתנה של ערך האיידי של הצ'קבוקס הנוכחי
        const labelElement = document.querySelector('label[for="' + sideId + '"]'); // יצירת משתנה של הלייבל של התוספת הנוכחית לפי האיידי שנשמר
        const labelText = labelElement.innerText; // יצירת משתנה ששומר את שם התוספת

        // חיבור שמות התוספות עם פסיק מפריד
        if (sidesText === '') {
            sidesText = labelText;
        } else {
            sidesText += ', ' + labelText;
        }
    }

    // אם לא נבחרו תוספות
    if (sidesText === '') {
        sidesText = 'ללא תוספות';
    }

    let notes = document.getElementById('notes').value.trim(); // יצירת משתנה של הערות המזמין תוך כדי בדיקה שאין רווחים מיותרים
    if (notes === '') { // אם לא נכתבו הערות
        notes = 'ללא הערות';
    }

    // יצירת משתנה של כל התוכן של סיכום ההזמנה שיודפס למשתמש
    const contentHtml =
        '<h2>ההזמנה שוגרה בהצלחה!</h2>' +
        '<p><strong>שם המזמין:</strong> ' + name + '</p>' +
        '<p><strong>סוג אטריות:</strong> ' + noodleLabel + '</p>' +
        '<p><strong>רמת חריפות:</strong> ' + spicyLabel + '</p>' +
        '<p><strong>תוספות שנבחרו:</strong> ' + sidesText + '</p>' +
        '<p><strong>הערות:</strong> ' + notes + '</p>' ;

    // הדפסת התוכן בחלונית הסיכום
    document.getElementById('modalBody').innerHTML = contentHtml;
    // הפעלת חלונית הסיכום
    document.getElementById('summaryModal').classList.add('active');
}