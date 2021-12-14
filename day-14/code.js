

var input = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .reduce((input, line) => {
        if (line.indexOf("->") > 0) {
            var p = line.split(" -> ");
            input.mapping[p[0]] = p[1];
        } else {
            var p = line.split("");
            input.polymer = p;
        }
        return input;
    }, {polymer: [], mapping: {}});

function counts(polymer) {
    var c = {};
    for (var i = 0; i < polymer.length; i++) {
        if(c[polymer[i]] == undefined) {
            c[polymer[i]] = 0;
        }
        c[polymer[i]] ++;
    }
    return c;
}

function polymerization(polymer, mapping) {
    var np = [polymer[0]];
    for (var i = 1; i < polymer.length; i++) {
        var p1 = polymer[i - 1];
        var p2 = polymer[i];
        var m = "" + p1 + p2;
        //console.log("S: ", m, p1, p2);
        //console.log("M: ", mapping[m]);
        np.push(mapping[m]);
        np.push(p2);
    }
    return np;
}

var polymer = input.polymer;
for(var x = 0; x < 10; x++) {
    polymer = polymerization(polymer, input.mapping)
}

console.log('Part 1: ', polymer, counts(polymer));

// ---


function addForPair(obj, key, val) {
    if (obj[key] == undefined) {
        obj[key] = 0;
    }
    obj[key] += val;
}

var input = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .reduce((input, line) => {
        if (line.indexOf("->") > 0) {
            var p = line.split(" -> ");
            input.mapping[p[0]] = p[1];
        } else {
            var p = line.split("");
            for (var i = 1; i < p.length; i++) {
                addForPair(input.polymer, "" + p[i-1] + p[i], 1)
            }
        }
        return input;
    }, {polymer: {}, mapping: {}});

function counts(polymer) {
    var c = {};
    for(var polyPair of Object.entries(polymer)) {
        var p = polyPair[0].split("");
        addForPair(c, p[0], polyPair[1]);
        addForPair(c, p[1], polyPair[1]);
    }

    var counts = {};
    for(var l of Object.entries(c)) {
        counts[l[0]] = Math.round(l[1]/2);
    }
    return counts;
}

function polymerization(polymer, mapping) {
    var newPairs = {};
    for(var polyPair of Object.entries(polymer)) {

        var p = polyPair[0].split("");
        var m = mapping[polyPair[0]];
        addForPair(newPairs, "" + p[0] + m, polyPair[1]);
        addForPair(newPairs, "" + m + p[1], polyPair[1]);
    }

    return newPairs;
}

function maxMin(counts) {
    var max = 0, min = 0;
    for(var l of Object.entries(counts)) {
        if (max == 0 || max < l[1]) max = l[1];
        if (min == 0 || min > l[1]) min = l[1];
    }
    return max - min;
}

var polymer = input.polymer;
for(var x = 0; x < 40; x++) {
    polymer = polymerization(polymer, input.mapping)
}
console.log('Part 2: ', polymer, counts(polymer), maxMin(counts(polymer)));


