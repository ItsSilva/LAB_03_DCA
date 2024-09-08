import * as components from './components/index';
import Worker, {Attribute} from './components/myComponent/myComponent';
import { workers } from './data/data';

class AppContainer extends HTMLElement {
    workers: Worker[] = [];

    constructor(){
        super();
        this.attachShadow({mode: 'open'});

        const elementsWithIdPar = workers.filter(worker => worker.id % 2 === 0);

        elementsWithIdPar.forEach(worker => {
            const workerElement = document.createElement('worker-component') as Worker;
            workerElement.setAttribute(Attribute.image, worker.image);
            workerElement.setAttribute(Attribute.name, worker.name);
            workerElement.setAttribute(Attribute.uid, String(worker.id));
            workerElement.setAttribute(Attribute.age, String(worker.age));
            workerElement.setAttribute(Attribute.gender, worker.gender);
            workerElement.setAttribute(Attribute.area, worker.jobDetails.area);
            workerElement.setAttribute(Attribute.position, worker.jobDetails.position);
            workerElement.setAttribute(Attribute.timeInCompany, String(worker.jobDetails.timeInCompany));
            workerElement.setAttribute(Attribute.experience, String(worker.jobDetails.experience));
            
            this.workers.push(workerElement);
        });
        // console.log('Workers filter:', elementsWithIdPar); 
    };

    connectedCallback() {
        this.render();
    };

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `<h1>Workers</h1>`;
            this.workers.forEach(worker => {
                this.shadowRoot?.appendChild(worker);
            });
        }
    };
};

customElements.define('app-container', AppContainer);
