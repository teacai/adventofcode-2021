


var pos = document.querySelector('body').innerText.split(/,/)
    .filter(line => line.length > 0)
    .map(line => {
        return parseInt(line);
    });

pos.sort((a,b) => a-b);

var median = pos[pos.length / 2];

var changes = pos.reduce((sum, pos) => {
    sum += Math.abs(pos - median);
    return sum;
},0);

console.log('Part 1: ', changes);

var sum = pos.reduce((sum, pos) => {
    sum += pos;
    return sum;
},0);

var average = Math.round(sum / pos.length);

function additionalFuel(x) {
    var s = 0;
    for (var i = 1; i <=x; i++) {
        s += i;
    }
    return s;
}

var changes2 = pos.reduce((sum, pos) => {
    sum = sum + additionalFuel(Math.abs(pos - average));
    return sum;
},0);
var changes3 = pos.reduce((sum, pos) => {
    sum = sum + additionalFuel(Math.abs(pos - average + 1));
    return sum;
},0);
// surely one of the 2 is the right one:
console.log('Part 2: ', changes2, changes3);
