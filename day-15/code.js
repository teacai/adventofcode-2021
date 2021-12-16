

var input = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .map((line) => {
        return line.split("").map(c => parseInt(c));
    });

function lowestTotalRisk(input) {
    for(var j = 2; j < input[0].length; j++) {
        input[0][j] += input[0][j-1];
    }
    for (var i = 2; i < input.length; i++) {
        input[i][0] += input[i-1][0];
    }

    for (var i = 1; i < input.length; i++) {
        for(var j = 1; j < input[i].length; j++) {
            input[i][j] += input[i-1][j] < input[i][j-1] ? input[i-1][j] : input[i][j-1];
        }
    }
    return input[input.length - 1][input[0].length - 1];
}
console.log('Part 1: ', lowestTotalRisk(input));
// ----


var input = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .map((line) => {
        return line.split("").map(c => parseInt(c));
    });
var il = input.length;
var jl = input[0].length;
var input5 = Array(il * 5).fill().map(() => Array(jl * 5).fill(0));

function copyArray(input, input5, di, dj, dv) {
    //console.log('Copy ', di, dj, dv)
    for (var i = 0; i < il; i++) {
        for (var j = 0; j < jl; j++) {
            var value = input[i][j] + dv;
            input5[i + di][j + dj] = (value > 9 ? (value%9) : value);
        }
    }
}
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
        copyArray(input, input5, i * il, j * jl, j+i);
    }
}
function logC(input, di, dj) {
    var values = [];
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            values.push(input[di + i * il][dj + j * jl]);
        }
    }
    console.log('Cells: ', di,dj, values);
}

console.log('Part 2: ', lowestTotalRisk(input5));


