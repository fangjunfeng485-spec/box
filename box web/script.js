// ==========================
// Smart Medicine Box
// script.js
// ==========================

// ---------- Notification ----------

if ("Notification" in window) {
    Notification.requestPermission();
}

// ---------- Alarm ----------

const alarm = new Audio("audio/alarm.mp3");

// ---------- Save Button ----------

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", saveReminder);

// ---------- Save Reminder ----------

function saveReminder() {

    const morning = document.getElementById("morning").value;
    const noon = document.getElementById("noon").value;
    const evening = document.getElementById("evening").value;
    const night = document.getElementById("night").value;

    localStorage.setItem("morning", morning);
    localStorage.setItem("noon", noon);
    localStorage.setItem("evening", evening);
    localStorage.setItem("night", night);

    updateSchedule();

    alert("Medication reminder saved successfully!");

}

// ---------- Load Reminder ----------

function loadReminder() {

    document.getElementById("morning").value =
        localStorage.getItem("morning") || "";

    document.getElementById("noon").value =
        localStorage.getItem("noon") || "";

    document.getElementById("evening").value =
        localStorage.getItem("evening") || "";

    document.getElementById("night").value =
        localStorage.getItem("night") || "";

    updateSchedule();

}

// ---------- Update Schedule ----------

function updateSchedule() {

    document.getElementById("morningDisplay").innerHTML =
        localStorage.getItem("morning") || "--:--";

    document.getElementById("noonDisplay").innerHTML =
        localStorage.getItem("noon") || "--:--";

    document.getElementById("eveningDisplay").innerHTML =
        localStorage.getItem("evening") || "--:--";

    document.getElementById("nightDisplay").innerHTML =
        localStorage.getItem("night") || "--:--";

}

// ---------- Reminder Checker ----------

let lastReminder = "";

function checkReminder() {

    const now = new Date();

    const current =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

    const reminders = [

        {
            name: "Morning",
            time: localStorage.getItem("morning")
        },

        {
            name: "Noon",
            time: localStorage.getItem("noon")
        },

        {
            name: "Evening",
            time: localStorage.getItem("evening")
        },

        {
            name: "Night",
            time: localStorage.getItem("night")
        }

    ];

    reminders.forEach(reminder => {

        if (!reminder.time) return;

        if (
            reminder.time === current &&
            lastReminder !== reminder.name + current
        ) {

            lastReminder = reminder.name + current;

            showReminder(reminder.name);

        }

    });

}

// ---------- Reminder Popup ----------

function showReminder(period) {

    // Play alarm

    alarm.play().catch(() => {});

    // Browser Notification

    if (Notification.permission === "granted") {

        new Notification("💊 Smart Medicine Box", {

            body:
                "It is time to take your " +
                period +
                " medicine.",

            icon: "images/medicine-box.png"

        });

    }

    // Popup

    alert(
        "⏰ Reminder!\n\nIt is time to take your " +
        period +
        " medicine."
    );

}

// ---------- Real Time Clock ----------

function showClock() {

    const now = new Date();

    const time =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0") +
        ":" +
        String(now.getSeconds()).padStart(2, "0");

    document.title =
        "🕒 " +
        time +
        " | Smart Medicine Box";

}

// ---------- Initialize ----------

loadReminder();

showClock();

setInterval(showClock, 1000);

setInterval(checkReminder, 30000);

// ---------- Smooth Animation ----------

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});

// ---------- Welcome ----------

window.onload = function () {

    console.log("Smart Medicine Box Ready!");

};