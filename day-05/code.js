
function parsePoint(pairXY) {
    var s = pairXY.split(/\s*,\s*/);
    return {x: parseInt(s[0]), y: parseInt(s[1])};
}

var lines = document.querySelector('body').innerText.split(/\n/)
    .filter(line => line.length > 0)
    .map(line => {
        console.log('Line: ', line)
        var l = line.split(/\s+/);
        return {p1 : parsePoint(l[0]), p2: parsePoint(l[2])};
    });

var max = lines.reduce( (m, line) => {
    console.log('R: ', m, line);
    if (line.p1.x > m.x) m.x = line.p1.x;
    if (line.p2.x > m.x) m.x = line.p2.x;
    if (line.p1.y > m.y) m.y = line.p1.y;
    if (line.p2.y > m.y) m.y = line.p2.y;
    return m;
}, {x: 0, y: 0});

var table = Array(max.x + 1).fill().map(() => Array(max.y + 1).fill(0));

function fillLine(line, table) {
    //console.log('fillLine', line);
    var dx = (line.p1.x < line.p2.x) ? 1 : ((line.p1.x > line.p2.x) ? -1 : 0);
    var dy = (line.p1.y < line.p2.y) ? 1 : ((line.p1.y > line.p2.y) ? -1 : 0);

    // part 1 only, remove for part 2
    //if (dx != 0 && dy != 0) return;

    var p = line.p1;
    while(p.x != line.p2.x || p.y != line.p2.y) {
        //console.log('fill ', p);
        table[p.x][p.y] += 1;
        p.x += dx;
        p.y += dy;
    }
    table[p.x][p.y] += 1;
}

lines.map(line => {
    fillLine(line, table)
});

var count = 0;
for(var i = 0; i < table.length; i++) {
    for (var j = 0; j < table[i].length; j++) {
        if (table[i][j] > 1) {
            count++;
        }
    }
}
console.log('Count: ' + count);