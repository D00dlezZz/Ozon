class UiProgress extends HTMLElement {

    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        this.setAttribute("value", val)
    }

    static get observedAttributes() {
        return ["value"]
    }

    attributeChangedCallback(prop) {
        if(prop === "value") this.render();
    }

    setValue(percent, circumference, circle) {
        circle.style.strokeDashoffset = String(circumference - percent / 100 * circumference);
    }

    toggleAnimationValue(circle) {
        circle.classList.toggle('animated');
    }

    toggleHiddenValue(circleContainer) {
        circleContainer.classList.toggle('hidden');
    }

    connectedCallback() {
        this.render();
        
        const section = this.children[0];    
        const circle = section.querySelector('.progress-circle');
        const radius = circle.r.baseVal.value; 
        const circumference = 2 * Math.PI * radius;
        const percentInput = section.querySelector('.control-input-percent')
        const hideInput = section.querySelector('.hide')
        const animateInput = section.querySelector('.animate')
        const circleContainer = section.querySelector('.progress-circle-container')

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        this.setValue(percentInput.value,circumference, circle)

        percentInput.addEventListener('input', () => {
            percentInput.value = percentInput.value.replace(/[/d.]/g, '').replace(/(\..*)\./g, '$1');
            if (percentInput.value > 100) {
                percentInput.value = 100
            }
            this.setValue(percentInput.value, circumference, circle);
        });

        animateInput.addEventListener('click', () => this.toggleAnimationValue(circle)); 
        hideInput.addEventListener('click', () => this.toggleHiddenValue(circleContainer));

    }
    render() {
        this.innerHTML = ` 
        <section class="progress-main-wrapper">
            <h1 class="progress-main-title">Progress</h1>
            <div class="progress-main-container">
                <div class="progress-circle-wrapper">
                    <div class="progress-circle-container">

                        <div class="outer">
                            <div class="inner"></div>
                        </div>
                
                        <svg class="progress-ring" width="180" height="180">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="#0062FF" />
                                <stop offset="100%" stop-color="#5eaefd" />
                                </linearGradient>
                            </defs>
                            <circle 
                            class="progress-circle"
                            stroke="url(#gradient)"
                            stroke-width="15" 
                            cx="90" cy="90" r="82" 
                            fill="transparent"
                            />
                        </svg>
                    </div>
                </div>
                <div class="control-buttons-wrapper">
                    <div class="control-button-container">
                        <input 
                        type="text" 
                        class="control-input-percent" 
                        value="${this.value}" 
                        maxlength="3"
                        >
                        <label class="control-button-title">Value</label>
                    </div>
                    <div class="control-button-container">
                        <input type="checkbox" class="control-button-checkbox animate">
                        <label class="control-button-title">Animate</label>
                    </div>
                    <div class="control-button-container">
                        <input type="checkbox" class="control-button-checkbox hide">
                        <label class="control-button-title">Hide</label>
                    </div>
                </div>
            </div>
        </section>
        ` 
    }
}

customElements.define('ui-progress', UiProgress)