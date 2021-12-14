

var paths = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .reduce((paths, line) => {
        var p = line.split("-");
        if (!paths[p[0]]) {
            paths[p[0]] = [];
        }
        paths[p[0]].push(p[1]);

        if (!paths[p[1]]) {
            paths[p[1]] = [];
        }
        paths[p[1]].push(p[0]);
        return paths;
    }, {});

function isBig(cave) {
    return cave != cave.toLowerCase();
}

function doesntHaveSameSmallTwice(array) {
    for (var i = 0; i < array.length - 1; i++) {
        if (!isBig(array[i])) {
            for (var j = i + 1; j < array.length; j++) {
                if (array[i] == array[j]) return false;
            }
        }
    }
    return true;
}


function traverseDF(paths, traversed) {
    var cur = traversed[traversed.length - 1];
    if (cur == 'end') {
        //console.log('Arrived: ', traversed);
        return 1;
    }
    var optPaths = paths[cur];
    if (!optPaths) return 0;

    //console.log('Options for ' + cur, optPaths);
    var count = 0;
    for (var i = 0; i < optPaths.length; i++) {
        if (isBig(optPaths[i]) || (traversed.indexOf(optPaths[i]) < 0)) {
            var t2 = traversed.slice();
            t2.push(optPaths[i]);
            count += traverseDF(paths, t2);
        }
    }
    return count;
}

console.log('Part 1: ', traverseDF(paths, ['start']));

// ---

function traverseDF2(paths, traversed) {
    var cur = traversed[traversed.length - 1];
    if (cur == 'end') {
        //console.log('Arrived: ', traversed);
        return 1;
    }
    var optPaths = paths[cur];
    if (!optPaths) return 0;

    //console.log('Options for ' + cur, optPaths);
    var count = 0;
    for (var i = 0; i < optPaths.length; i++) {
        if (optPaths[i] != 'start' &&
            (isBig(optPaths[i]) || (traversed.indexOf(optPaths[i]) < 0) || doesntHaveSameSmallTwice(traversed))) {
            var t2 = traversed.slice();
            t2.push(optPaths[i]);
            count += traverseDF2(paths, t2);
        }
    }
    return count;
}

console.log('Part 1: ', traverseDF2(paths, ['start']));