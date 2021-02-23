/// <reference path='base_components.ts'/>

namespace App {
    
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {    
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
    
        constructor() {
            super('project-input', 'app', true, 'user-input');
    
            //get access to fields
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
            
            this.configure();  //this method should trigger whenever the form is submitted in the submit handler
        }
    
        configure() {
            this.element.addEventListener('submit', this.submitHandler.bind(this));
            // this.element.addEventListener('submit', this.submitHandler);
        }
    
        renderContent() {};
    
        //gather user methods - for type use tuple
        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
    
            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable: Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable: Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5,
            };
    
            if (
                // enteredTitle.trim().length === 0 ||
                // enteredDescription.trim().length === 0 ||
                // enteredPeople.trim().length === 0
    
                // validate({value: enteredTitle, required: true, minLength:5}) &&
                // validate({value: enteredDescription, required: true, minLength:5}) &&
                // validate({value: enteredPeople, required: true, minLength:5})
    
                !validate(titleValidatable) ||
                !validate(descriptionValidatable) ||
                !validate(peopleValidatable)
                ) {
                alert('Invalid input, please try again!');
                return;
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
    
        //clear input
        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }
    
        @autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            // console.log(this.titleInputElement.value);
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }
    }
    }