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
playerImage.src = './img/Brim-down1.png';
// playerImage.width = '100%';

image.onload = () => {
    ctx.drawImage(image, 0, -500);
    ctx.drawImage(playerImage, canvas.width / 2, canvas.height / 2); 
}
