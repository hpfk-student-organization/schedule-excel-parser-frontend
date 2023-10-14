const DAYS = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця'];
const MIN_PAIRS = 4;

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

        for (let i = 1; i < MIN_PAIRS + 1; i++) {
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

function addPair(pair, pairNum, dayRows) {
    let pairLen = pair.length;
    if (pairLen > 1) {
        for (let altPair = 0; altPair < 2; altPair++) {
            let pairCell = document.createElement("td");
            pairCell.innerText = pair[altPair]["Предмет"];
            dayRows[pairNum * 2 + altPair].appendChild(pairCell);
        }
    }
    else {
        let pairCell = document.createElement("td");
        pairCell.setAttribute("rowspan", 2);
        if (pairLen == 1) {
            pairCell.innerText = pair[0]["Предмет"];
        }
        dayRows[pairNum * 2].appendChild(pairCell);
    }
}

function addDayPairs(dayGroupsPairs, dayRows) {
    for (let groupPairs of dayGroupsPairs) {
        for (let pairNum = 0; pairNum < MIN_PAIRS; pairNum++) {
            addPair(groupPairs[pairNum], pairNum, dayRows);
        }
    }
}

function addPairs(groups, course, table) {
    const tableRows = Array.from(table.childNodes);
    for (let day = 0; day < DAYS.length; day++) {
        let dayRows = tableRows.slice(day * 8 + 1, day * 8 + 9);

        let dayGroupsPairs = groups.map((group) => course[group][day]);
        addDayPairs(dayGroupsPairs, dayRows);
    }
}

function formatJSON(groups, course) {
    for (let group of groups) {
        course[group].forEach((days) => {
            while (days.length < 4) days.push([]);
        });
    }
}

function createTimetable(course, table) {
    let groups = Object.keys(course);
    formatJSON(groups, course);

    createHeader(groups, table);
    createSideHeader(table);
    addPairs(groups, course, table);

    console.log(course);
}

function loadTimetable() {
    const table = document.getElementById('schedule');
    let schedule = JSON.parse(sessionStorage.getItem("schedule"));
    if (table.innerHTML == "" && schedule) {
        createTimetable(schedule["1 курс"], table);
    }
}

document.addEventListener("DOMContentLoaded", loadTimetable);