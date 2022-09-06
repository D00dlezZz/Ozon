const circle = document.querySelector('.progress-circle');
const radius = circle.r.baseVal.value; 
const circumference = 2 * Math.PI * radius;
const percentInput = document.getElementById('percent')
const hideInput = document.getElementById('hide')
const animateInput = document.getElementById('animate')
const circleContainer = document.querySelector('.progress-container')

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

class Progress {
    isHidden = false;   
    isAnimated = false;

    setValue(percent) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
    }

    setValueLimit(percent) {
        if ( percent <= 100) {
            this.setValue(percent)
        }else {
            percentInput.value = 100;
            this.setValue(percentInput.value)
        }
    }

    toggleHiddenValue() {
        this.isHidden = !this.isHidden;
    }

    toggleAnimatedValue() {
        this.isAnimated = !this.isAnimated;
    }

    setHiddenValue() {
        this.toggleHiddenValue();
        this.isHidden ? circleContainer.classList.add('hidden') : circleContainer.classList.remove('hidden');
    }

    setAnimationValue() {
        this.toggleAnimatedValue();
        this.isAnimated ? circle.classList.add('animate') : circle.classList.remove('animate');
    }

}

const progress = new Progress;

percentInput.addEventListener('input', () => {
    percentInput.value = percentInput.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    progress.setValueLimit(percentInput.value);
});

hideInput.addEventListener('click', () => progress.setHiddenValue()); 

animateInput.addEventListener('click', () => progress.setAnimationValue()); 
