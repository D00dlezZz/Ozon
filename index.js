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

    attributeChangedCallback(prop, oldValue, newValue) {
        if(prop === "value") this.render();
    }

    setValue(percent, circumference, circle) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
    }

    setValueLimit(percent, circumference, circle) {
        console.log(percent);
        if ( percent <= 100 ) {
            this.setValue(percent, circumference, circle)
        }else {
            this.setValue( 100, circumference, circle)
        }
    }

    setAnimationValue(circle) {
        circle.classList.toggle('animate');
    }

    setHiddenValue(circleContainer) {
        circleContainer.classList.toggle('hidden');
    }

    connectedCallback() {
        this.render();
        
        const section = this.children[0];    
        const circle = section.querySelector('.progress-circle');
        const radius = circle.r.baseVal.value; 
        const circumference = 2 * Math.PI * radius;
        const percentInput = section.querySelector('.control-button-percent')
        const hideInput = section.querySelector('.hide')
        const animateInput = section.querySelector('.animated')
        const circleContainer = section.querySelector('.progress-container')

        const offset = circumference - percentInput.value / 100 * circumference;
        circle.style.strokeDashoffset = offset;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
      
        percentInput.addEventListener('input', () => {
            percentInput.value = percentInput.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
            this.setValueLimit(percentInput.value, circumference, circle);
        });

        animateInput.addEventListener('click', () => this.setAnimationValue(circle)); 
        hideInput.addEventListener('click', () => this.setHiddenValue(circleContainer));

    }

    render() {
        this.innerHTML = ` 
        <section>
            <h1>Progress</h1>
            <div class="main-wrapper">
                <div class="progress-wrapper">
                    <div class="progress-container">
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
                        class="control-button-percent" 
                        value="${this.value}" 
                        maxlength="3"
                        >
                        <label class="control-button-title">Value</label>
                    </div>
                    <div class="control-button-container">
                        <input type="checkbox" class="control-button-checkbox animated">
                        <label class="control-button-title">Animate</label>
                    </div>
                    <div class="control-button-container">
                        <input type="checkbox" class="control-button-checkbox hide">
                        <label class="control-button-title">Hide</label>
                    </div>
                </div>
            </div>
        </section>` 
    }
}

customElements.define('ui-progress', UiProgress)