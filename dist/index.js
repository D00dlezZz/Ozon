const circle = document.querySelector('.progress-circle');
const radius = circle.r.baseVal.value; 
const circumference = 2 * Math.PI * radius;
const input = document.querySelector('.percent')
const hide = document.getElementById('hide')
const animate = document.getElementById('animate')

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let isHidden = false;
let isAnimated = false;

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

input.addEventListener('change', () => input.value <= 100 ? setProgress(input.value) : setProgress(100));

hide.addEventListener('click', () => {
   isHidden = !isHidden;
   isHidden === true ? circle.style.display = 'none' : circle.style.display = 'flex';
}); 

animate.addEventListener('click', () => {
    isAnimated = !isAnimated;
    isAnimated === true ? circle.classList.add('animate') : circle.classList.remove('animate');
 }); 