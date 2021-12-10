

var lines = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .map(line => {
        return line.split("");
    });

function match(charOpen, charClose) {
    if (charOpen == '(' && charClose == ')') return true;
    if (charOpen == '[' && charClose == ']') return true;
    if (charOpen == '{' && charClose == '}') return true;
    if (charOpen == '<' && charClose == '>') return true;
    return false;
}

function isOpening(char) {
    return ['(', '[', '{', '<'].indexOf(char) >= 0;
}

function isClosing(char) {
    return [')', ']', '}', '>'].indexOf(char) >= 0;
}

function score1(char) {
    return {')' : 3, ']' : 57, '}' : 1197, '>' : 25137}[char];
}


var sum = 0;
for (var i = 0; i < lines.length; i++) {
    var stack = [];
    for (var j = 0; j < lines[i].length; j++) {
        if (isOpening(lines[i][j])) {
            stack.push(lines[i][j]);
        } else if (isClosing(lines[i][j])) {
            var prev = stack.pop();
            if (!match(prev, lines[i][j])) {
                sum += score1(lines[i][j]);
                console.log('Corrupted: ', lines[i][j], lines[i], j, stack)
                break;
            } else {
                //console.log('Matched ', prev, lines[i][j])
            }
        } else {
            console.log('Invalid char ', lines[i][j]);
        }
    }
}
console.log('Part 1: ', sum);

// ---

function closingFor(char) {
    return {'(':')', '[':']', '{':'}', '<':'>'}[char];
}

function score2(char) {
    return {')' : 1, ']' : 2, '}' : 3, '>' : 4}[char];
}

var scores = [];
for (var i = 0; i < lines.length; i++) {
    var stack = [];
    var corrupted = false;
    for (var j = 0; j < lines[i].length; j++) {
        if (isOpening(lines[i][j])) {
            stack.push(lines[i][j]);
        } else if (isClosing(lines[i][j])) {
            var prev = stack.pop();
            if (!match(prev, lines[i][j])) {
                corrupted = true;
                //sum += score2(lines[i][j]);
                console.log('Corrupted: ', lines[i][j])
                break;
            } else {
                //console.log('Matched ', prev, lines[i][j])
            }
        } else {
            console.log('Invalid char ', lines[i][j]);
        }
    }
    if (!corrupted) {
        var sum = 0;
        for (var k = stack.length - 1; k >= 0; k--) {
            sum = sum * 5 + score2(closingFor(stack[k]))
        }
        console.log('Incomplete: ', lines[i], stack, sum);
        scores.push(sum);
    }
}

scores.sort((x,y) => x-y);

console.log('Part 2: ', scores[Math.floor(scores.length/2)], scores);