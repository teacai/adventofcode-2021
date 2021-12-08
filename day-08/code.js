

var digits = [];
digits[0] = ['a','b','c','e','f', 'g']; // 0
digits[1] = ['c','f']; // *
digits[2] = ['a','c','d','e','g'];
digits[3] = ['a','c','d','f','g'];
digits[4] = ['b','c','d','f']; // *
digits[5] = ['a','b','d','f','g'];
digits[6] = ['a','b','d','e','f','g']; // 6
digits[7] = ['a','c','f']; // *
digits[8] = ['a','b','c','d','e','f','g']; // *
digits[9] = ['a','b','c','d','f','g']; // 9


var lines = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .map(line => {
        var so = line.split(/\s*\|\s*/);
        return {signal: so[0].split(/\s+/).map(s => s.split("").sort().join("")),
                output: so[1].split(/\s+/).map(s => s.split("").sort().join(""))}
    });

var count = lines.reduce( (count, line) => {
    var o = line.output;
    for (var i = 0; i < o.length; i++) {
        var l = o[i].length;
        if (l == 2 || l == 3 || l == 4 || l == 7){
            //console.log('found ', o[i])
            count++;
        }
    }
    return count;
}, 0);
console.log('Part 1: ', count);

// what is present in str1 and not in str2
function diff(str1, str2) {
    if(!str2) return str1;
    if(!str1) return str2;
    var s = [...str1].sort();
    var t = [...str2].sort();
    var i = 0, j = 0;
    var diff = [];
    for (var i = 0; i < s.length; i++) {
        if (t.indexOf(s[i]) < 0) {
            diff.push(s[i]);
        }
    }
    return diff.sort().join("");
}

function conts(str1, str2){
    if (!str1 || !str2) return false;
    return diff(str2, str1) == "";
}

// 1. identify 1,4,7,8
// 2. identify 9 (same segments as 4), 0 (same as 1 or 7 but not 4) and 6 (length 6 but not 0 or 9)
// 3. rest 3 (contains 1 or 7), 2 and 5 (8-9=>e 8-6=>c checking for c or e)

var sum = lines.reduce( (sum, line) => {
    var s = line.signal.sort((s1, s2) => Math.abs(5-s2.length) - Math.abs(5-s1.length));
    var digits = Array(10).fill();
    var cis, eis;

    for (var p = 0; p < 4; p++) { // more passes technically not required as we sorted so 5s are last, but to be sure...
        for (var i = 0; i < s.length; i++) {
            var l = s[i].length;
            if (l == 2){
                digits[1] = s[i];
            } else if (l == 3) {
                digits[7] = s[i];
            } else if (l == 4) {
                digits[4] = s[i];
            } else if (l == 7) {
                digits[8] = s[i];
            } else if (l == 6) {
                if (conts(s[i], digits[4])) {
                    digits[9] = s[i];
                } else if (digits[9] && (conts(s[i], digits[1]) || conts(s[i], digits[7]))) {
                    digits[0] = s[i];
                } else {
                    digits[6] = s[i];
                }
            } else {
                if (digits[9] && digits[6]) {
                    eis = diff(digits[6], digits[9]);
                    cis = diff(digits[9], digits[6]);
                }
                if (digits[8] && digits[9]) {
                    eis = diff(digits[8], digits[9]);
                }
                if (digits[8] && digits[6]) {
                    cis = diff(digits[8], digits[6]);
                }

                if (conts(s[i], digits[1]) || conts(s[i], digits[7])) {
                    digits[3] = s[i];
                } else {
                    if (conts(s[i], eis) || conts(s[i], cis)) {
                        digits[2] = s[i];
                    } else {
                        digits[5] = s[i];
                    }
                }
            }
        }
    }
    //console.log('Signal: ', s);
    //console.log('Digits: ', digits);
    var o = line.output;

    var output = digits.indexOf(o[0]) * 1000 + digits.indexOf(o[1]) * 100 + digits.indexOf(o[2]) * 10 + digits.indexOf(o[3]);
    console.log('Out: ', output, digits, line);
    return sum + output;;
}, 0);
console.log('Part 2: ', sum);