
function parseLine(line) {
    return line.split("")
        .filter(p => p.length>0 && p != ",")
        .map(p => isNumber(p) ? parseInt(p) : p);
}

var input = document.querySelector('body').innerText.split(/\n/)
        .filter(l => l.length > 0)
        .map(l => parseLine(l));

function isNumber(x) {
    return x != undefined && x != "[" && x != "]";
}

function magnitude(sum) {
    var i = 0;
    while((!isNumber(sum[i]) || !isNumber(sum[i+1])) && i < 1000) {
        i++;
    }
    var m = 3 * sum[i] + 2 * sum[i+1];
    if (sum.length < 5) {
        //console.log("Mag: ", m);
        return m;
    } else {
        sum.splice(i-1, 4, m);
        //console.log("Mag, ", sum);
        return magnitude(sum);
    }
}

function explode(sum) {
    //console.log("Explode: ", sum);
    var level = 0;
    var found = false;
    for(var i = 0; i < sum.length; i++) {
        if (sum[i] == "[") {
            level++;
        } else if (sum[i] == "]") {
            level--;
        } else if(isNumber(sum[i]) && isNumber(sum[i+1]) && level > 4) {
            found = true;
            break;
        }
    }

    if (found) {
        var left = sum[i];
        var right = sum[i+1];
        sum.splice(i-1, 4, 0);

        i--;

        var k = 1;
        while((i+k) < sum.length && !isNumber(sum[i+k])) k++;
        if (isNumber(sum[i+k])) sum[i+k] += right;

        k = -1;
        while((i+k) > 0 && !isNumber(sum[i+k])) k--;
        if (isNumber(sum[i+k])) sum[i+k] += left;

        //console.log("Found", left, right, sum);
        return true;
    } else {
        return false;
    }
}


function split(sum) {
    //console.log("Split: ", sum);
    var found = false;
    for(var i = 0; i < sum.length; i++) {
        if(isNumber(sum[i]) && sum[i] > 9) {
            found = true;
            break;
        }
    }

    if (found) {
        var left = Math.floor(sum[i]/2);
        var right = sum[i] - left;
        sum.splice(i, 1, "[", left, right, "]");
        //console.log("Found: ", sum);
        return true;
    } else {
        return false;
    }
}

function add(sum1, sum2) {
    return ["["].concat(sum1, sum2, ["]"]);
}

function reduce(sum) {
    var s = [].concat(sum);

    while(true) {
        if(!explode(s) && !split(s)) {
           break;
        }
    }
    return s;
}

function magnitudeOfAdditions(lines) {
    var sum = lines[0];
    for (var i = 1; i < lines.length; i++) {
        sum = reduce(add(sum, lines[i]));
    }

    return magnitude(sum);
}

console.log('Part 1: ', magnitudeOfAdditions(input));
// ----

function maxMagnitudeOfAny2(lines) {
    var max = 0;
    for (var i = 0; i < lines.length - 1; i++) {
        for (var j = i + 1; j < lines.length; j++) {
            var mag = magnitude(reduce(add(lines[i], lines[j])));
            if (mag > max) max = mag;
            mag = magnitude(reduce(add(lines[j], lines[i])));
            if (mag > max) max = mag;
        }
    }
    return max;
}

console.log('Part 2: ', maxMagnitudeOfAny2(input));