// Table Sorting
function sortTable(colIndex) {
    const table = document.getElementById("classTable");
    const rows = Array.from(table.rows).slice(1);
    const asc = table.getAttributeNS("data-sort") != asc;
    table.setAttribute("data-sort", asc ? "asc" : "desc");

    rows.sort((a, b) => { 
        const A = a.cells[colIndex].innerText;
        const B = b.cells[colIndex].innerText;

        if (!isNaN(A) && !isNaN(B)) {
            return asc ? A - B : B - A;
        }

        return asc ? A.localCompare(B) : B.localCompare(A);
    });

    rows.forEach(row => table.tBodies[0].appendChild(row));
}

// Table Filtering
document.getElementById("classFilter").addEventListener("change", filterTable);
document.getElementById("minSurvive").addEventListener("change", filterTable);
document.getElementById("maxSurvive").addEventListener("change", filterTable);
document.getElementById("minDamage").addEventListener("change", filterTable);
document.getElementById("maxDamage").addEventListener("change", filterTable);
document.getElementById("minUtility").addEventListener("change", filterTable);
document.getElementById("maxUtility").addEventListener("change", filterTable);

function getFilter() {
    const selectedClass = document.getElementById("classFilter");
    const survives = {
        min: document.getElementById("minSurvive"),
        max: document.getElementById("maxSurvive")
    };
    const damages = {
        min: document.getElementById("minDamage"),
        max: document.getElementById("maxDamage")
    };
    const utilities = {
        min: document.getElementById("minUtility"),
        max: document.getElementById("maxUtility")
    };

    return { selectedClass, survives, damages, utilities };
}

function filterTable() {
    const filter = getFilter();

    const rows = document.querySelectorAll("#classTable tbody tr");

    rows.forEach(row => { 
        const survive = parseInt(row.cells[0].innerText);
        const damage = parseInt(row.cells[1].innerText);
        const utility = parseInt(row.cells[2].innerText);
        const rowClass = row.cells[3].innerText;

        const matchesClass = !filter.selectedClass || rowClass.includes(filter.selectedClass.value);
        const matchesSurvive = (!filter.survives.min && !filter.survives.max) || (survive >= filter.survives.min.value && survive <= filter.survives.max.value);
        const matchesDamage = (!filter.damages.min && !filter.damages.max) || (damage >= filter.damages.min.value && damage <= filter.damages.max.value);
        const matchesUtility = (!filter.utilities.min && !filter.utilities.max) || (utility >= filter.utilities.min.value && utility <= filter.utilities.max.value);

        row.style.display = matchesClass && matchesSurvive && matchesDamage && matchesUtility ? "" : "none";
    });
}

function resetFilter() {
    const filter = getFilter();

    filter.selectedClass.value = "";
    filter.survives.min.value = 1;
    filter.survives.max.value = 5;
    filter.damages.min.value = 1;
    filter.damages.max.value = 5;
    filter.utilities.min.value = 1;
    filter.utilities.max.value = 5;

    filterTable();
}
