const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx);

const collisionsMap = [];
for(let i = 0; i < collisions.length; i += 100){
    collisionsMap.push(collisions.slice(i, 100 + i));
}

const boundaries = [];
const offset = {
    x: -450,
    y: -510,
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    }
                })
            )
    })
})

const image = new Image();
image.src = './img/BrimL1.png';

const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png';

const playerDown = new Image();
playerDown.src = './img/Brim/BDown.png';

const playerUp = new Image();
playerUp.src = './img/Brim/BUp.png';

const playerLeft = new Image();
playerLeft.src = './img/Brim/BLeft.png';

const playerRight = new Image();
playerRight.src = './img/Brim/BRight.png';


const player = new Sprite({
    position: {
        x: canvas.width/2 - 192/4/2, 
        y: canvas.height/2 - 68/2,
    },
    image: playerDown,
    frames: {
        max: 4,
    },
    sprites: {
        up: playerUp,
        left: playerLeft,
        right: playerRight,
        down: playerDown,
    }
})

const background = new Sprite({
    position: {
        x: offset.x, 
        y: offset.y,
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x, 
        y: offset.y,
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

const moveables = [background, ...boundaries, foreground];

function rectangularCollision({rect1, rect2}){
    return(
        rect1.position.x + rect1.width >= rect2.position.x && 
        rect1.position.x <= rect2.position.x + rect2.width && 
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height
    )
}

function animate(){
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    });
    player.draw();
    foreground.draw();

    let moving = true;
    player.moving = false;
    if(keys.w.pressed) {
        player.moving = true;
        player.image = player.sprites.up;
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rect1: player, 
                    rect2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x,
                            y: boundary.position.y + 3,
                        }
                    }
                })
                ){
                console.log('collision');
                moving = false;
                break;
            }
        }
        if(moving)
            moveables.forEach(moveable => {
                moveable.position.y += 3
            })
    }
    else if(keys.a.pressed) {
        player.moving = true;
        player.image = player.sprites.left;
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rect1: player, 
                    rect2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x + 3,
                            y: boundary.position.y,
                        }
                    }
                })
                ){
                console.log('collision');
                moving = false;
                break;
            }
        }
        if(moving)
            moveables.forEach(moveable => {
                moveable.position.x += 3
            })
    }
    else if(keys.s.pressed) {
        player.moving = true;
        player.image = player.sprites.down;
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rect1: player, 
                    rect2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x,
                            y: boundary.position.y - 3,
                        }
                    }
                })
                ){
                console.log('collision');
                moving = false;
                break;
            }
        }
        if(moving)
            moveables.forEach(moveable => {
                moveable.position.y -= 3
            })
    }
    else if(keys.d.pressed) {
        player.moving = true;
        player.image = player.sprites.right;
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rect1: player, 
                    rect2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x - 3,
                            y: boundary.position.y,
                        }
                    }
                })
                ){
                console.log('collision');
                moving = false;
                break;
            }
        }
        if(moving)  
            moveables.forEach(moveable => {
                moveable.position.x -= 3
            })
    }
}

animate();

window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }
})

window.addEventListener('keyup', (e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
})
