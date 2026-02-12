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
document.getElementById("minDamage").addEventListener("change", filterTable);
document.getElementById("maxDamage").addEventListener("change", filterTable);

function filterTable() {
    const selectedClass = document.getElementById("classFilter").value;
    const damages = {
        min: document.getElementById("minDamage").value,
        max: document.getElementById("maxDamage").value
    };

    const rows = document.querySelectorAll("#classTable tbody tr");

    rows.forEach(row => { 
        const damage = parseInt(row.cells[1].innerText);
        const rowClass = row.cells[3].innerText;

        const matchesClass = !selectedClass || rowClass.includes(selectedClass);
        const matchesDamage = (!damage.min && !damage.max) || (damage >= damage.min && damage <= damage.max);

        row.style.display = matchesClass && matchesDamage ? "" : "none";
    });
}