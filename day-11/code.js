

var lines = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .map(line => {
        return line.split("").map(d => parseInt(d));
    });

function addEnergyAndPropagate(array, i, j) {
    if (array[i] != undefined && array[i][j] != undefined) {
        array[i][j] += 1;
        return propagateFlash(lines, i, j);
    }
    return 0;
}

function propagateFlash(lines, i, j) {
    var count = 0;
    if (lines[i][j] > 9) {
        count += 1;
        lines[i][j] = -1000;

        count += addEnergyAndPropagate(lines, i - 1, j);
        count += addEnergyAndPropagate(lines, i + 1, j);
        count += addEnergyAndPropagate(lines, i - 1, j - 1);
        count += addEnergyAndPropagate(lines, i,     j - 1);
        count += addEnergyAndPropagate(lines, i + 1, j - 1);
        count += addEnergyAndPropagate(lines, i - 1, j + 1);
        count += addEnergyAndPropagate(lines, i,     j + 1);
        count += addEnergyAndPropagate(lines, i + 1, j + 1);
    }
    return count;
}

var count = 0;
for (var step = 0; step < 100; step++) {
    for (var i = 0; i < lines.length; i++){
        for (var j = 0; j < lines[i].length; j++) {
            lines[i][j] += 1;
        }
    }

    for (var i = 0; i < lines.length; i++){
        for (var j = 0; j < lines[i].length; j++) {
            count += propagateFlash(lines, i, j);
        }
    }

    for (var i = 0; i < lines.length; i++){
        for (var j = 0; j < lines[i].length; j++) {
            if (lines[i][j] < 0) lines[i][j] = 0;
        }
    }
}
console.log('Part 1: ', count);

// ---

var lines = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .map(line => {
        return line.split("").map(d => parseInt(d));
    });
var symStep = 0;
for (var step = 0; step < 500; step++) {
    for (var i = 0; i < lines.length; i++){
        for (var j = 0; j < lines[i].length; j++) {
            lines[i][j] += 1;
        }
    }


    for (var i = 0; i < lines.length; i++){
        for (var j = 0; j < lines[i].length; j++) {
            count += propagateFlash(lines, i, j);
        }
    }

    var count = 0;
    for (var i = 0; i < lines.length; i++){
        for (var j = 0; j < lines[i].length; j++) {
            if (lines[i][j] < 0) {
                lines[i][j] = 0;
                count ++;
            }
        }
    }
    if (count > 99) {
        symStep = step + 1;
        break;
    }
}
console.log('Part 2: ', symStep);