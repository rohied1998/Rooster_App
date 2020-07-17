const timetable = document.querySelector(".timetable");
const nextBtn = document.querySelector("#rooster-next");
const prevBtn = document.querySelector("#rooster-prev");
const weekText = document.querySelector("#rooster-week");
const inputDateStart = document.querySelector("#rooster-tijd-start-input");
const inputDateEnd = document.querySelector("#rooster-tijd-eind-input");
const inputRooster = document.querySelector("#rooster-input");
const roosterCreateBtn = document.querySelector("#rooster-create-btn");

// Week verder knop
nextBtn.addEventListener("click", e => ChangeWeek(true));

// Week terug knop
prevBtn.addEventListener("click", e => ChangeWeek(false));

// Create btn
roosterCreateBtn.addEventListener("click", AddEvent);

const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
let currentWeek = new Date().getWeek();
weekText.innerHTML = `Week ${currentWeek}`;
inputDateStart.value = new Date().toDateInputValue();
inputDateEnd.value = new Date().toDateInputValue();


function AddEvent() {
    const startDateTimestamp = new Date(inputDateStart.value).getTime();
    const endDateTimestamp = new Date(inputDateEnd.value).getTime();
    const text = inputRooster.value;

    // Start en eindtijd verschillend?
    if (startDateTimestamp == endDateTimestamp)
        return alert("Start- en eindtijd mogen niet hetzelfde zijn");

    // Check of alles in ingevuld
    if (!text || !endDateTimestamp || !startDateTimestamp)
        return alert("Vul graag alle velden in");

    // Check of eind datum niet groter is dan begin
    if (startDateTimestamp > endDateTimestamp)
        return alert("Eind tijd mag niet kleiner dan begin tijd zijn");

    // Check dat de tijden binnen 09:00 en 17:00 zijn
    const startHour = new Date(startDateTimestamp).getHours();
    const endHour = new Date(endDateTimestamp).getHours();
    if (startHour < 9 || startHour > 17 || endHour < 9 || endHour > 17)
        return alert("Vul graag een tijd in tussen 09:00 en 17:00");


    // Check of de dagen hetzelfde zijn
    const startDay = new Date(startDateTimestamp).getDay();
    const endDay = new Date(endDateTimestamp).getDay();
    if (startDay != endDay)
        return alert("Een event kan niet strekken over verschillende dagen");

    // Check of er niet mere dan 8 uur is ingerosterd
    if (endHour - startHour > 8)
        return alert("Een event kan niet langer dan 8 uur zijn op dezelfde dag");

    // Haal gemaakte items op
    const items = GetFromStorage("roosterItems");

    if (!items) {
        PutInStorage("roosterItems", [
            {
                text: text,
                timestampStart: startDateTimestamp,
                timestampEnd: endDateTimestamp
            }
        ])
    } else {
        items.push({
            text: text,
            timestampStart: startDateTimestamp,
            timestampEnd: endDateTimestamp
        });
        PutInStorage("roosterItems", items)
    }

    // Ververs
    LoadEvents();
}

function ChangeWeek(add) {

    // Limiet bereikt? Verander naar andere uiterste limiet.
    if (add) currentWeek == 52 ? currentWeek = 1 : currentWeek++;
    else currentWeek == 1 ? currentWeek = 52 : currentWeek--;

    // Append de html
    weekText.innerHTML = `Week ${currentWeek}`;

    // Ververs
    LoadEvents();
}

function LoadEvents() {

    // Creeer fresh timetable
    const timetable = new Timetable();

    // Voeg de dagen toe
    timetable.addLocations(days);

    // Haal gemaakte items op
    const items = GetFromStorage("roosterItems");

    if (!items) return;

    // Ga over elk item heen
    items.forEach(item => {

        // Check of het de geselecteerde week is
        const week = new Date(item.timestampStart).getWeek();
        if (week !== currentWeek) return;

        const dateStart = new Date(item.timestampStart);
        const dateEnd = new Date(item.timestampEnd);
        const dagVdWeek = days[dateStart.getDay()];

        timetable.addEvent(item.text, dagVdWeek, dateStart, dateEnd, '#');
    });

    const renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable');
}

LoadEvents();