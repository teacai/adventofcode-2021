

var input = document.querySelector('body').innerText;

var target = {x: [102, 157], y: [-146,-90]};

function stepsToReach0(initX) {
    return initX;
}
function distanceToReach0(initX) {
    return initX * (initX + 1) / 2;
}

function velocityToReachTargetX(minX, maxX) {
    var vx = 1;
    while(distanceToReach0(vx) < minX) {
        vx++;
    }
    if (distanceToReach0(vx) > maxX) {
        console.log("overshoot?");
        return -1;
    }
    return vx;
}


function maxVelocityToReachTargetY(minY, maxY) {
    var vy = Math.abs(maxY - minY) * 3;

    while(vy > 1) {
        var maxYvy = distanceToReach0(vy);
        var maxX = Math.abs(minY) + maxYvy;
        var minX = Math.abs(maxY) + maxYvy;
        if (velocityToReachTargetX(minX, maxX) > 0) {
            console.log("reached", maxYvy);
            return vy;
        }
        vy--;
    }
    return -1;
}

function velocityFor(minX, maxX, minY, maxY) {
    return [velocityToReachTargetX(minX, maxX), maxVelocityToReachTargetY(minY, maxY)];
}

console.log('Part 1: ', velocityFor(target.x[0],target.x[1],target.y[0],target.y[1]));
// ----

function validVelocities(vx, vy, minX, maxX, minY, maxY) {
    var x = 0, y = 0;
    while (x <= maxX && y >= minY) {
        if (x >= minX && y <= maxY) return true;
        x = x + vx;
        vx = vx > 0 ? vx-1 : 0;
        y = y + vy;
        vy--;
    }
    return false;
}

function countDistinctVelocities(minX, maxX, minY, maxY) {
    var maxVy = maxVelocityToReachTargetY(minY, maxY);
    var count = 0;
    for (var vx = maxX; vx > 0; vx--) {
        for (var vy = maxVy; vy >= minY; vy --) {
            if (validVelocities(vx, vy, minX, maxX, minY, maxY)){
                console.log("Valid ", vx, vy);
                count++;
            }
        }
    }
    console.log("Searched between " + maxX + " and ", maxVy, minY);
    return count;
}

console.log('Part 2: ', countDistinctVelocities(target.x[0],target.x[1],target.y[0],target.y[1]))
