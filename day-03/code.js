
var acc = document.querySelector('body').innerText.split(/s*\ns*/).filter(line => line.length > 0)
        .reduce((acc, line) => {
            var bits = line.split('');
            for(var i = 0; i < bits.length; i++) {
                acc[i] += parseInt(bits[i]);
            }
            acc[12]++;
            return acc;
        },
        [0,0,0,0,0,0,0,0,0,0,0,0,0]);

    var gama = "";
    var epsilon = "";
    var mid = acc[12] / 2;
    for (var i = 0; i < 12; i++) {
        gama = ""  + gama + (acc[i] > mid ? 1 : 0);
        epsilon = "" + epsilon + (acc[i] > mid ? 0 : 1);
    }
    console.log('Gama: ' + gama + ' epsilon: ' + epsilon);
    console.log('Result:', {gama: parseInt(gama, 2), epsilon: parseInt(epsilon, 2), multiply: parseInt(gama, 2) * parseInt(epsilon, 2)});



var lines = document.querySelector('body').innerText.split(/s*\ns*/).filter(line => line.length > 0);
var bit = 0;
while(lines.length > 1) {
    var bitDelta = lines.reduce((acc, line) => {
       return line.charAt(bit) == '1' ? acc + 1 : acc - 1;
    }, 0);
    var bitDigit = bitDelta >= 0 ? '0' : '1';
    lines = lines.filter(line => bitDigit == line.charAt(bit));
    bit++;
}
console.log('Remaining: ', lines);
console.log('Remaining: ', parseInt(lines[0],2));
