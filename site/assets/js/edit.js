const DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця'];
const PAIRS = 4;

function createHeader(groups, table) {
    let header = document.createElement("tr");

    let dummy = document.createElement("th");
    dummy.setAttribute("colspan", 2);
    header.appendChild(dummy);

    for (let group of groups) {
        let groupEl = document.createElement("th")
        groupEl.textContent = group
        header.appendChild(groupEl);
    }

    table.appendChild(header);
}

function createSideHeader(table) {
    for (let day of DAYS) {
        let firstRow = document.createElement("tr");

        let dayCell = document.createElement("th");
        dayCell.setAttribute("rowspan", 8);
        dayCell.setAttribute("class", "tableDay");
        dayCell.innerText = day;

        firstRow.appendChild(dayCell);

        for (let i = 1, row = firstRow; i < PAIRS + 1; i++, row = document.createElement("tr")) {
            let pairCell = document.createElement("th");
            pairCell.setAttribute("rowspan", 2);
            pairCell.innerText = i;
            row.appendChild(pairCell);
            table.appendChild(row);

            row = document.createElement("tr");
            table.appendChild(row);

        }
    }
}

function createTimetable(course, table) {
    let groups = Object.keys(course, table);
    createHeader(groups, table);
    createSideHeader(table);
    console.log(course);
}

function loadTimetable() {
    const loading = document.getElementById('timetable');
    let timetable = JSON.parse(sessionStorage.getItem("timetable"));
    createTimetable(timetable["1 курс"], loading);
}

document.addEventListener("DOMContentLoaded", loadTimetable);