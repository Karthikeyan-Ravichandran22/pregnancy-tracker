// Data Configuration - 100 Points Total
const POINTS = {
    // 10 items to track for points now? 
    // Let's adjust slightly or keep meds as 'bonus/mandatory' (0 pts) to not break 100 logic.
    // User wants tracker "pro level".
    // Current: Milk(10), Bkfst(10), Fruit(10), Lunch(15), Snack(10), Dinner(15), Milk(10), Water(20) = 100
    // Meds (Fe/Ca) are critical. Let's make them mandatory checks.
    thyroid: 0,
    milk_am: 10,
    breakfast: 10,
    meds_am: 0, // Critical but staying 0 to keep score out of 100 simpler? Or maybe 5 each?
    // Let's keep 0 but visually warn if missed.
    fruit: 10,
    lunch: 15,
    snack: 10,
    dinner: 15,
    meds_pm: 0,
    milk_pm: 10,
    water: 20
};

const RECOMMENDATION_TEXT = "Based on 51.7kg: ~2.3L base + 700ml for pregnancy = 3L Goal.";

// Detailed Diet Plan (South Indian + Thyroid Friendly)
const MENU_PLAN = [
    {
        day: "Monday",
        slots: {
            "Early (6:30)": "Warm Milk (No Sugar) + 2 Soaked Almonds",
            "Bkfst (8:30)": "3 Idli + Veggie Sambar (Drumstick/Carrot) + Mint Chutney",
            "Mid-Morn (11:30)": "Pomegranate Bowl (Best for Hb)",
            "Lunch (1:30)": "1 Cup Rice + Spinach Dal (Keerai) + Cabbage Poriyal (Fully Cooked)",
            "Eve Snack (4:30)": "Boiled Chana (Sundal) + Light Tea",
            "Dinner (7:30)": "2 Chapati + Paneer Butter Masala (Less Oil)",
            "Bedtime (9:30)": "Warm Milk + Pinch of Turmeric"
        }
    },
    {
        day: "Tuesday",
        slots: {
            "Early (6:30)": "Warm Milk + 2 Walnuts",
            "Bkfst (8:30)": "2 Dosa + Coconut Chutney + Sambar",
            "Mid-Morn (11:30)": "Orange / Mosambi Juice (Fresh, No Sugar)",
            "Lunch (1:30)": "Rice + Drumstick Sambar + Beans Poriyal + Curd",
            "Eve Snack (4:30)": "Roasted Makhana (Lotus Seeds) - 1 Cup",
            "Dinner (7:30)": "3 Idiyappam + Veg Kurma (Carrot/Peas)",
            "Bedtime (9:30)": "Warm Milk"
        }
    },
    {
        day: "Wednesday",
        slots: {
            "Early (6:30)": "Warm Milk + 1 Fig (Anjeer)",
            "Bkfst (8:30)": "Ven Pongal + Gotsu (Less Ghee)",
            "Mid-Morn (11:30)": "Guava (High Vit C) or Apple",
            "Lunch (1:30)": "Lemon Rice + 1 Boiled Egg + Ladies Finger Fry",
            "Eve Snack (4:30)": "Veg Soup (Murungai Keerai Soup is best)",
            "Dinner (7:30)": "2 Kal Dosa + Tomato Chutney",
            "Bedtime (9:30)": "Warm Milk"
        }
    },
    {
        day: "Thursday",
        slots: {
            "Early (6:30)": "Warm Milk + Almonds",
            "Bkfst (8:30)": "2 Ragi Dosa (Calcium Rich) + Onion Chutney",
            "Mid-Morn (11:30)": "Tender Coconut Water",
            "Lunch (1:30)": "Rice + More Kuzhambu (Buttermilk stew) + Potato Roast",
            "Eve Snack (4:30)": "Fruit Salad (Papaya safe in modulation, avoid if scared)",
            "Dinner (7:30)": "Wheat Upma + Banana",
            "Bedtime (9:30)": "Warm Milk"
        }
    },
    {
        day: "Friday",
        slots: {
            "Early (6:30)": "Warm Milk",
            "Bkfst (8:30)": "Kuzhi Paniyaram (5-6) + Spicy Chutney",
            "Mid-Morn (11:30)": "Watermelon Bowl",
            "Lunch (1:30)": "Rice + Vatha Kuzhambu + Pumpkin Kootu",
            "Eve Snack (4:30)": "Boiled Peanuts (Handful)",
            "Dinner (7:30)": "2 Chapati + Mixed Veg Sabzi",
            "Bedtime (9:30)": "Warm Milk"
        }
    },
    {
        day: "Saturday",
        slots: {
            "Early (6:30)": "Warm Milk",
            "Bkfst (8:30)": "Uthappam (Carrot Topping) + Sambar",
            "Mid-Morn (11:30)": "Muskmelon / Kirni Fruit",
            "Lunch (1:30)": "Jeera Rice/Ghee Rice + Dal Tadka + Plantain Fry",
            "Eve Snack (4:30)": "Ragi Porridge / Malt",
            "Dinner (7:30)": "Semiya Upma (Veggie Loaded)",
            "Bedtime (9:30)": "Warm Milk"
        }
    },
    {
        day: "Sunday",
        slots: {
            "Early (6:30)": "Warm Milk",
            "Bkfst (8:30)": "Poori (2) + Potato Masala (Limit Oil)",
            "Mid-Morn (11:30)": "Seasonal Fruit",
            "Lunch (1:30)": "Veg Biryani (Mild Spices) + Onion Raita + Papad",
            "Eve Snack (4:30)": "Corn Cup (Boiled)",
            "Dinner (7:30)": "Dosa + Idli Podi (Oil)",
            "Bedtime (9:30)": "Warm Milk"
        }
    },
];

const WATER_GOAL = 3.0; // Liters

// Initialize State (Fetch from Server)
let appData = {
    grid: Array(7).fill().map(() => ({
        thyroid: false, milk_am: false, breakfast: false, meds_am: false, fruit: false,
        lunch: false, snack: false, dinner: false, meds_pm: false, milk_pm: false, water: false, score: 0
    })),
    waterLog: Array(7).fill(0),
    weightLog: []
};

// DOM Elements (Pre-fetch selection)
const trackerBody = document.getElementById('tracker-body');
const todayScoreEl = document.getElementById('today-score');
const dailyMenuContent = document.getElementById('daily-menu-content');
const menuBadge = document.getElementById('menu-day-badge');
const waterCountEl = document.getElementById('water-count');
const waterProgressEl = document.getElementById('water-progress');
const weightHistoryEl = document.getElementById('weight-history');

// Initialization
async function init() {
    await loadDataFromServer(); // Sync before rendering
    renderTable();
    updateMenu();
    updateWaterWidget();
    renderWeightHistory();
    setTimeout(initChart, 100);
}

// Sync: Load
async function loadDataFromServer() {
    try {
        const res = await fetch('/api/data');
        if (res.ok) {
            const serverData = await res.json();
            if (serverData && serverData.grid) {
                appData = serverData;
                console.log("✅ Data Synced with Server");
            }
        }
    } catch (e) {
        console.warn("⚠️ Offline Mode: Using local data/defaults", e);
        // Fallback to localStorage logic if server fails? 
        // For simplicity, we assume server reliance for the "Pro" sync feature.
        const local = localStorage.getItem('pregnancyTrackerData_v3');
        if (local) appData = JSON.parse(local);
    }
}

// Sync: Save
async function saveData() {
    // 1. Save Locally (Instant Feedback)
    localStorage.setItem('pregnancyTrackerData_v3', JSON.stringify(appData));

    // 2. Sync to Cloud (Background)
    try {
        await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appData)
        });
    } catch (e) {
        console.error("❌ Sync Failed:", e);
    }
}

// --- Grid & Score ---
function renderTable() {
    trackerBody.innerHTML = '';
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let todayIndex = new Date().getDay() - 1;
    if (todayIndex < 0) todayIndex = 6;

    days.forEach((day, index) => {
        const row = document.createElement('div');
        row.className = `tracker-row ${index === todayIndex ? 'active' : ''}`;

        const createCheck = (key, isMeds = false) => `
            <div class="cell">
                <input type="checkbox" 
                    class="check-input ${isMeds ? 'meds' : ''}" 
                    ${appData.grid[index][key] ? 'checked' : ''}
                    onchange="toggleTask(${index}, '${key}')"
                    ${key === 'water' ? 'disabled' : ''} 
                >
            </div>
        `;

        row.innerHTML = `
            <div class="cell day-cell">
                ${day.substring(0, 3)}
                ${index === todayIndex ? '<span class="today-indicator">Today</span>' : ''}
            </div>
            ${createCheck('thyroid', true)}
            ${createCheck('milk_am')}
            ${createCheck('breakfast')}
            ${createCheck('meds_am', true)}
            ${createCheck('fruit')}
            ${createCheck('lunch')}
            ${createCheck('snack')}
            ${createCheck('dinner')}
            ${createCheck('meds_pm', true)}
            ${createCheck('milk_pm')}
            ${createCheck('water')}
            <div class="cell score-cell" id="score-${index}">0</div>
            <div class="cell"><div class="status-cell status-pending" id="status-${index}">Pending</div></div>
        `;

        trackerBody.appendChild(row);
        calculateScore(index);
    });
}

window.toggleTask = function (dayIndex, key) {
    if (key === 'water') return;
    appData.grid[dayIndex][key] = !appData.grid[dayIndex][key];
    saveData();
    calculateScore(dayIndex);

    if (appData.grid[dayIndex][key]) {
        if (key.includes('meds')) showToast("💊 Supplements Taken!");
        else if (key === 'milk_pm') showToast("🌙 Sweet Dreams!");
        else showToast("✅ Saved!");
    }
    updateChart();
};

function calculateScore(dayIndex) {
    let score = 0;
    const dayData = appData.grid[dayIndex];
    // Main Points
    if (dayData.milk_am) score += POINTS.milk_am;
    if (dayData.breakfast) score += POINTS.breakfast;
    if (dayData.fruit) score += POINTS.fruit;
    if (dayData.lunch) score += POINTS.lunch;
    if (dayData.snack) score += POINTS.snack;
    if (dayData.dinner) score += POINTS.dinner;
    if (dayData.milk_pm) score += POINTS.milk_pm;
    if (dayData.water) score += POINTS.water;

    appData.grid[dayIndex].score = score;
    saveData();

    // UI
    const scoreEl = document.getElementById(`score-${dayIndex}`);
    if (scoreEl) scoreEl.innerText = score;

    // Update Status
    const statusEl = document.getElementById(`status-${dayIndex}`);
    if (statusEl) {
        // Strict logic: Score > 90 AND both meds taken?
        // keeping simple score logic for 'Perfect'
        if (score === 100) {
            statusEl.className = 'status-cell status-perfect';
            statusEl.innerText = 'Perfect';
        } else if (score >= 70) {
            statusEl.className = 'status-cell status-good';
            statusEl.innerText = 'Good';
        } else {
            statusEl.className = 'status-cell status-pending';
            statusEl.innerText = 'Pending';
        }
    }

    let todayIndex = getTodayIndex();
    if (dayIndex === todayIndex) todayScoreEl.innerText = `${score} / 100`;
}

// --- Water Widget (Liters) ---
window.adjustWater = function (amount) {
    let todayIndex = getTodayIndex();
    let current = appData.waterLog[todayIndex] || 0;

    let newVal = parseFloat((current + amount).toFixed(2)); // Avoid float errors
    if (newVal < 0) newVal = 0;
    if (newVal > 5) newVal = 5; // Max 5L

    appData.waterLog[todayIndex] = newVal;

    const metGoal = newVal >= WATER_GOAL;
    if (appData.grid[todayIndex].water !== metGoal) {
        appData.grid[todayIndex].water = metGoal;
        renderTable();
        if (metGoal) showToast("💧 3L Goal Reached!");
    }

    saveData();
    updateWaterWidget();
    calculateScore(todayIndex);
    updateChart();
};

function updateWaterWidget() {
    let todayIndex = getTodayIndex();
    let val = appData.waterLog[todayIndex] || 0;
    waterCountEl.innerText = `${val} / ${WATER_GOAL} L`;

    let pct = (val / WATER_GOAL) * 100;
    if (pct > 100) pct = 100;
    waterProgressEl.style.width = `${pct}%`;
}

// --- Weight Tracker ---
window.logWeight = function () {
    const val = document.getElementById('weight-input').value;
    if (!val) return;
    const entry = { date: new Date().toLocaleDateString(), weight: parseFloat(val) };
    appData.weightLog.unshift(entry);
    if (appData.weightLog.length > 5) appData.weightLog.pop();
    saveData();
    renderWeightHistory();
    document.getElementById('weight-input').value = '';
    showToast("⚖️ Weight logged!");
};

function renderWeightHistory() {
    weightHistoryEl.innerHTML = appData.weightLog.map(e => `
        <div class="weight-entry">
            <span>${e.date}</span>
            <span><strong>${e.weight} kg</strong></span>
        </div>
    `).join('');
}

// --- Menu ---
function updateMenu() {
    // Logic: If current time > 8:00 PM (20:00), show NEXT day's menu
    // Because moms prep for next day at night.
    const now = new Date();
    const currentHour = now.getHours();
    let displayIndex = now.getDay() - 1;
    let isTomorrow = false;

    // Fix Sunday index (0 -> 6)
    if (displayIndex < 0) displayIndex = 6;

    if (currentHour >= 20) { // After 8 PM
        displayIndex = (displayIndex + 1) % 7;
        isTomorrow = true;
    }

    const menu = MENU_PLAN[displayIndex];

    // Update Badge (e.g., "Tomorrow (Tuesday)")
    menuBadge.innerHTML = isTomorrow
        ? `<span style="color:#d53f8c; background:#FFF5F7; padding:2px 6px; border-radius:4px;">Tomorrow (${menu.day})</span>`
        : `(${menu.day})`;

    // Convert slots object to HTML list
    let html = '<div class="detailed-menu">';
    for (const [time, meal] of Object.entries(menu.slots)) {
        html += `
            <div class="menu-row">
                <span class="menu-time-label">${time}</span>
                <span class="menu-meal-text">${meal}</span>
            </div>
        `;
    }
    html += '</div>';

    html += `
        <div style="font-size:0.75rem; color:#E53E3E; margin-top:12px; border-top:1px dashed #feb2b2; padding-top:8px;">
            <strong>⚠️ Medical Checks:</strong><br>
            • Thyroid Tablet: Empty Stomach (wait 45m)<br>
            • Meds (Iron/Ca): After Food (Never with Milk)<br>
            • Egg: Max 1/day fully boiled.
        </div>
    `;

    dailyMenuContent.innerHTML = html;
}

// --- Helper & Chart ---
function getTodayIndex() {
    let d = new Date().getDay() - 1;
    return d < 0 ? 6 : d;
}

function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toast-message').innerText = msg;
    t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), 3000);
}

function initChart() {
    const canvas = document.getElementById('consistencyChart');
    if (!canvas) return; // Guard

    const ctx = canvas.getContext('2d');

    if (window.myChart) window.myChart.destroy(); // Destroy old if exists

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Score',
                data: appData.grid.map(d => d.score),
                backgroundColor: 'rgba(0, 135, 90, 0.2)',
                borderColor: '#00875A',
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#00875A',
                pointRadius: 4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } },
                x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

function updateChart() {
    if (window.myChart) {
        window.myChart.data.datasets[0].data = appData.grid.map(d => d.score);
        window.myChart.update();
    }
}

// Start
init();
