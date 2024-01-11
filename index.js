const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx);

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './img/BrimL1.png';
console.log(image);

const playerImage = new Image();
playerImage.src = './img/Brim/Brim-down1.png';
// playerImage.width = '100%';

class Sprite{
    constructor({position, velocity, image}){
        this.position = position;
        this.image = image;
    }

    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({
    position: {x: -450, y: -510},
    velocity: {x: 0, y: 0},
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

function animate(){
    window.requestAnimationFrame(animate);
    // console.log('animate');

    background.draw();
    ctx.drawImage(
        playerImage,
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width/2 - (playerImage.width/4), 
        canvas.height/2 - (playerImage.height/2),
        playerImage.width/4,
        playerImage.height
    );

    if(keys.w.pressed) background.position.y += 1;
    if(keys.a.pressed) background.position.x += 1;
    if(keys.s.pressed) background.position.y -= 1;
    if(keys.d.pressed) background.position.x -= 1;
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
