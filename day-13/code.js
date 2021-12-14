

var input = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .reduce((input, line) => {
        if (line.indexOf(",") > 0) {
            var p = line.split(",");
            var x = parseInt(p[0]);
            var y = parseInt(p[1]);
            if (x > input.maxX) input.maxX = x;
            if (y > input.maxY) input.maxY = y;

            input.points.push({x: x, y: y});
        } else if (line.startsWith("fold")) {
            var f = line.split("=");
            if (f[0].endsWith("x")) {
                input.folds.push({type: "x", value: parseInt(f[1])});
            } else {
                input.folds.push({type: "y", value: parseInt(f[1])});
            }
        } else {
            console.log('Line: ', line);
        }
        return input;
    }, {points: [], folds: [], maxX: 0, maxY: 0});



function deduplicate(array) {
    var dd = [];
    for(var i = 0; i < array.length; i++) {
        var found = false;
        for(var d = 0; d < dd.length; d++) {
            if (array[i].x == dd[d].x && array[i].y == dd[d].y) {
                found = true;
                break;
            }
        }
        if (!found) {
            dd.push(array[i]);
        }
    }
    return dd;
}

function fold(type, value, points) {
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        if(p[type] > value) {
            p[type] = value - (p[type] - value);
        }
    }
}

var f = input.folds[0];
fold(f.type, f.value, input.points);
console.log('Part 1: ', deduplicate(input.points).length);
// ---


function display(points) {
    var array = Array(10).fill().map(() => Array(50).fill(" "));
    for(var i = 0; i < points.length; i++) {
        array[points[i].y][points[i].x] = "#";
    }
    return array;
}

for (var f = 0; f < input.folds.length; f++) {
    fold(input.folds[f].type, input.folds[f].value, input.points);
    input.points = deduplicate(input.points);
}
console.log('Part 2: ', display(input.points));
