const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx);

const collisionsMap = [];
for(let i = 0; i < collisions.length; i += 100){
    collisionsMap.push(collisions.slice(i, 100 + i));
}

class Boundary{
        static width = 48;
        static height = 48;
        constructor({position}){
            this.position = position;
            this.width = 48;
            this.height = 48;
        }
        draw(){
            ctx.fillStyle = 'rgba(255, 0, 0, 0.0)';
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
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

const playerImage = new Image();
playerImage.src = './img/Brim/BDown.png';

class Sprite{
    constructor({position, velocity, image, frames = {max: 1}}){
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.image.onload = () => {
            this.width = this.image.width/this.frames.max;
            this.height = this.image.height;
        }
    }   

    draw(){
        // ctx.drawImage(this.image, this.position.x, this.position.y);
        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
        );
    }
}

const player = new Sprite({
    position: {
        x: canvas.width/2 - 192/4/2, 
        y: canvas.height/2 - 68/2,
    },
    image: playerImage,
    frames: {
        max: 4,
    }
})

const background = new Sprite({
    position: {
        x: offset.x, 
        y: offset.y,
    },
    image: image
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

const moveables = [background, ...boundaries];

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

    let moving = true;
    if(keys.w.pressed) {
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
