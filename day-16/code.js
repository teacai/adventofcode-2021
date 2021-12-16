

var input = document.querySelector('body').innerText;

function getBits(str) {
    var input = str.split("")
    var bits = [];
    for(var i = 0; i < input.length; i++) {
        var b = parseInt(input[i], 16).toString(2).padStart(4,"0").split("");
        for(var j = 0; j < b.length; j++) {
            bits.push(b[j]);
        }
    }
    return bits;
}


function decode3(array, i) {
    return parseInt(array[i] + array[i+1] + array[i+2], 2);
}

function asString(array, ix, len) {
    var s = "";
    for (var i = ix; i < ix + len; i++) {
        s = s + array[i];
    }
    return s;
}

// Return the real end of message if last bit used was at ix.
function multipleOf4Index(ix) {
    var modulo = ix % 4;
    return ix + 3 - modulo;
}

function decodePacket(array, start) {
    if ((array.length - start) < 10) return null;

    var type = decode3(array, start + 3);
    var packets = [];
    var bx = start + 6; // skipping first 6 bits header
    var ends = 0;
    if (type == 4) { //literal
         var l = "";
         while(array[bx] != 0) {
            l = l + asString(array, bx + 1, 4);
            bx += 5;
         }
         l = l + asString(array, bx + 1, 4);
         ends = bx + 4;
         packets.push(parseInt(l, 2));
    } else { // operator
        if (array[bx] == "1") {
            var pCount = parseInt(asString(array, bx + 1, 11), 2);
            //console.log("11 bits count of packets", pCount);
            bx = bx + 1 + 11;
            var c = 0;
            while(c < pCount) {
                var p = decodePacket(array, bx);
                if (p != null) {
                    packets.push(p);
                    bx = p.ends + 1;
                    ends = p.ends;
                } else {
                    break;
                }
                c += 1;
            }
        } else {
            var len = parseInt(asString(array, bx + 1, 15), 2);
            bx = bx + 1 + 15;
            var maxEnd = bx + len;
            //console.log("15 bits len in bits", len);

            while (true) {
                var p = decodePacket(array, bx);
                if (p != null && p.ends <= maxEnd) {
                    packets.push(p);
                    bx = p.ends + 1;
                    ends = p.ends;
                } else {
                    break;
                }
            }
        }
    }
    var pack = {version: decode3(array, start), type: type, packets: packets, starts: start, ends: ends,
        value: function() {

            if (this.type == 0) {
                return this.packets.reduce((r,p) => r + p.value(), 0);
            } else if (this.type == 1) {
                return this.packets.reduce((r,p) => r * p.value(), 1);
            } else if (this.type == 2) { // min
                return this.packets.reduce((r,p) => (r==0 || r > p.value()) ? p.value() : r, 0);
            } else if (this.type == 3) { // max
                return this.packets.reduce((r,p) => (r < p.value()) ? p.value() : r, 0);
            } else if (this.type == 4) {
                return this.packets[0];
            } else if (this.type == 5) { // >
                return this.packets[0].value() > this.packets[1].value() ? 1 : 0;
            } else if (this.type == 6) { // <
                return this.packets[0].value() < this.packets[1].value() ? 1 : 0;
            } else if (this.type == 7) { // =
                return this.packets[0].value() == this.packets[1].value() ? 1 : 0;
            } else {
                console.log("WTF?");
            }
        }};
    console.log("Packet ", pack);
    return pack;
}

function parseMessage(str) {
    var bits = getBits(str);
    console.log("Bits", bits);
    return decodePacket(bits, 0);
}

function sumVersions(packet) {
    var sum = 0;
    if (packet && packet.version != undefined) {
        sum += packet.version;
        //console.log("Sum", sum, packet)
        for(var i = 0; i < packet.packets.length; i++) {
            sum += sumVersions(packet.packets[i]);
        }
    }
    return sum;
}

console.log('Part 1: ', sumVersions(parseMessage(input)));
// ----

console.log('Part 2: ', parseMessage(input).value());