export enum Attribute {
    'image' = 'image',
    'name' = 'name',
    'uid' = 'uid',
    'age' = 'age',
    'gender' = 'gender',
    'area' = 'area',
    'position' = 'position',
    'timeInCompany' = 'timeInCompany',
    'experience' = 'experience'
}

class Worker extends HTMLElement {
    image?: string;
    name?: string;
    uid?: number;
    age?: number;
    gender?: string;
    area?: string;
    position?: string;
    timeInCompany?: number;
    experience?: number;
    
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            case Attribute.uid: // If the value of the property is a number, it is converted to a number.
                this.uid = newValue ? Number(newValue) : undefined; // Ternary operator. If the value is undefined, it is assigned as undefined.
                break;

            case Attribute.age:
                this.age = newValue ? Number(newValue) : undefined;
                break;

            case Attribute.timeInCompany:
                this.timeInCompany = newValue ? Number(newValue) : undefined;
                break;

            case Attribute.experience:
                this.experience = newValue ? Number(newValue) : undefined;
                break;

            default:
                this[propName] = newValue; //  If the value of the property is a string, it is assigned directly.
                break;
        }
    }

    connectedCallback() {
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <section>
            <img src="${this.image || 'No Image'}" alt="${this.name || 'No Name'}">
            <h2>${this.name || 'No Name'}</h2>
            <p>Worker ID: ${this.uid || 'No ID'}</p>
            <p>Age: ${this.age || 'No Age'}</p>
            <p>Gender: ${this.gender || 'No Gender'}</p>
            <p>Area: ${this.area || 'No Area'}</p>
            <p>Position: ${this.position || 'No Position'}</p>
            <p>Time in Company: ${this.timeInCompany || 'No Time in Company'}</p>
            <p>Experience: ${this.experience || 'No Experience'}</p>
            </section>
            `
        }
    }
}
customElements.define('worker-component', Worker);
export default Worker;