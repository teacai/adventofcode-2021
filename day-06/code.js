


var fishes = document.querySelector('body').innerText.split(/,/)
    .filter(line => line.length > 0)
    .map(line => {
        return parseInt(line);
    })
    .reduce((perDay, line) => {
        perDay[line] ++;
        return perDay;
    }, [0,0,0,0,0,0,0,0,0]);

function moveDownJToI(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    return temp;
}


for (var i = 0; i < 256; i++) {
    var zeros = moveDownJToI(fishes, 0, 1);
    for (var f = 2; f < fishes.length; f++) {
        moveDownJToI(fishes, f-1, f);
    }
    fishes[8] = zeros;
    fishes[6] += zeros;
}


console.log('Count: ' + fishes.reduce((sum, f) => sum += f, 0));