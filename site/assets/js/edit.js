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

function addDayPairs(dayGroupsPairs, dayRows) {
    for (let groupPairs of dayGroupsPairs) {
        for (let pairNum = 0; pairNum < MIN_PAIRS; pairNum++) {
            let pairLen = groupPairs[pairNum].length;
            if (pairLen > 0) {
                for (let i = 0; i < Math.min(pairLen, 2); i++) {
                    let pairCell = document.createElement("td");
                    pairCell.innerText = groupPairs[pairNum][i]["Предмет"];
                    dayRows[pairNum * 2 + i].appendChild(pairCell);
                }
            }
            else {
                dayRows[pairNum * 2].appendChild(document.createElement("td"));
            }
        }
    }
}

function addPairs(groups, course, table) {
    const tableRows = Array.from(table.childNodes);
    for (let day = 0; day < DAYS.length; day++) {
        let dayRows = tableRows.slice(day * 8 + 1, day * 8 + 9);

        let dayGroupsPairs = groups.map((group) => course[group][day]);
        console.log(dayGroupsPairs);
        addDayPairs(dayGroupsPairs, dayRows);
    }
}

function formatJSON(groups, course) {
    for (let group of groups) {
        course[group].forEach((days) => {
            while (days.length < 4) {
                days.push([]);
            }
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
    const table = document.getElementById('timetable');
    let timetable = JSON.parse(sessionStorage.getItem("timetable"));
    if (table.innerHTML == "" && timetable) {
        createTimetable(timetable["1 курс"], table);
    }
}

document.addEventListener("DOMContentLoaded", loadTimetable);