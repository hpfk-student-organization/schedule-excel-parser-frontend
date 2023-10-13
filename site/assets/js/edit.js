const DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця'];
const PAIRS = 4;

function createHeader(groups, table) {
    let header = document.createElement("tr");
    header.innerHTML = '<th colspan="2"></th>';

    for (let group of groups) {
        let groupEl = document.createElement("th")
        groupEl.textContent = group
        header.appendChild(groupEl);
    }

    table.appendChild(header);
}

function createSideHeader(table) {
    for (let day of DAYS) {

        for (let i = 1; i < PAIRS + 1; i++) {
            let row = document.createElement("tr");

            if (i == 1) {
                let dayCell = document.createElement("th");
                dayCell.setAttribute("rowspan", 8);
                dayCell.setAttribute("class", "tableDay");
                dayCell.innerText = day;
                row.appendChild(dayCell);
            }
            let pairCell = document.createElement("th");
            pairCell.setAttribute("rowspan", 2);
            pairCell.innerText = i;
            row.appendChild(pairCell);
            table.appendChild(row);

            table.appendChild(document.createElement("tr"));

        }
    }
}

function addDayPairs() {

}

function addPairs(groups, course, table) {
    for (let i = 1; i <= table.childNodes.length; i += 8) {
        let dayRows = table.childNodes.slice(i, i+8);
        console.log(dayRows);
    }
}

function createTimetable(course, table) {
    let groups = Object.keys(course);
    createHeader(groups, table);
    createSideHeader(table);
    addPairs(groups, course, table);
    console.log(course);
}

function loadTimetable() {
    const table = document.getElementById('timetable');
    let timetable = JSON.parse(sessionStorage.getItem("timetable"));
    if (table.innerHTML != "" && timetable) {
        createTimetable(timetable["1 курс"], table);
    }
}

document.addEventListener("DOMContentLoaded", loadTimetable);