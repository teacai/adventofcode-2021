

var lines = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .map(line => {
        var loc = line.split("");
        return loc.map(l => parseInt(l));
    });

function isDefined(array, i, j) {
    return i >= 0 && j >= 0 && array.length > i && array[i].length > j;
}

function isLocalMin(array, i, j) {
    var x = array[i][j];
    if (isDefined(lines, i-1, j) && (array[i-1][j] <= x)) return false;
    if (isDefined(lines, i+1, j) && (array[i+1][j] <= x)) return false;
    if (isDefined(lines, i, j-1) && (array[i][j-1] <= x)) return false;
    if (isDefined(lines, i, j+1) && (array[i][j+1] <= x)) return false;
    return true;
}

var sum = 0;
for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < lines[i].length; j++) {
        if (isLocalMin(lines, i, j)) {
            console.log('Local min: ', lines[i][j], i, j)
            sum += (lines[i][j] + 1);
        }
    }
}

console.log('Part 1: ', sum);


function exploreAndFillBasin(array, i, j) {
    var size = 0;
    if (array[i][j] != 9) {
        array[i][j] = 9;
        size += 1;

        if (isDefined(array, i-1, j)) size += exploreAndFillBasin(array, i-1, j);
        if (isDefined(array, i+1, j)) size += exploreAndFillBasin(array, i+1, j);
        if (isDefined(array, i, j+1)) size += exploreAndFillBasin(array, i, j+1);
        if (isDefined(array, i, j-1)) size += exploreAndFillBasin(array, i, j-1);
    }
    return size;
}

var basins = [];
for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < lines[i].length; j++) {
        if (isLocalMin(lines, i, j)) {
            var size = exploreAndFillBasin(lines, i, j);
            console.log('Basin size ' + size + ' with min at ', i, j);
            basins.push(size);
        }
    }
}
basins.sort((x, y) => y - x);
console.log('Part 2: ', basins[0] * basins[1] * basins[2], basins);