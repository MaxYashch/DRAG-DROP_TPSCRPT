/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base_components.ts":
/*!*******************************************!*\
  !*** ./src/components/base_components.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
class Component {
    constructor(templated, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templated);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}


/***/ }),

/***/ "./src/components/project_input.ts":
/*!*****************************************!*\
  !*** ./src/components/project_input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_components */ "./src/components/base_components.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind_decorator */ "./src/decorators/autobind_decorator.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project_state */ "./src/state/project_state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _base_components__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
    renderContent() { }
    ;
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(titleValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(descriptionValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(peopleValidatable)) {
            alert('Invalid input, please try again!');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project_item.ts":
/*!****************************************!*\
  !*** ./src/components/project_item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _base_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_components */ "./src/components/base_components.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind_decorator */ "./src/decorators/autobind_decorator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class ProjectItem extends _base_components__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        console.log('DragEnd');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    ;
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + ' assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
    ;
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project_list.ts":
/*!****************************************!*\
  !*** ./src/components/project_list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project_model */ "./src/models/project_model.ts");
/* harmony import */ var _base_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base_components */ "./src/components/base_components.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind_decorator */ "./src/decorators/autobind_decorator.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project_state */ "./src/state/project_state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project_item */ "./src/components/project_item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _base_components__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.moveProject(prjId, this.type === 'active' ? _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active : _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addListener((projects) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active;
                }
                return prj.status === _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.element.querySelector('ul').id, prjItem);
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind_decorator.ts":
/*!**********************************************!*\
  !*** ./src/decorators/autobind_decorator.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}


/***/ }),

/***/ "./src/models/project_model.ts":
/*!*************************************!*\
  !*** ./src/models/project_model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus),
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project_state.ts":
/*!************************************!*\
  !*** ./src/state/project_state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project_model */ "./src/models/project_model.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project_model__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project_input */ "./src/components/project_input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project_list */ "./src/components/project_list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvY29tcG9uZW50cy9iYXNlX2NvbXBvbmVudHMudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdF9pbnB1dC50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0X2l0ZW0udHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdF9saXN0LnRzIiwid2VicGFjazovL2RyYWctZHJvcC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kX2RlY29yYXRvci50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvbW9kZWxzL3Byb2plY3RfbW9kZWwudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL3N0YXRlL3Byb2plY3Rfc3RhdGUudHMiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wLy4vc3JjL3V0aWwvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9kcmFnLWRyb3Avd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHJhZy1kcm9wL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmFnLWRyb3Avd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kcmFnLWRyb3Avd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kcmFnLWRyb3AvLi9zcmMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRW1CLE1BQWUsU0FBUztJQUtuQyxZQUFZLFNBQWlCLEVBQUUsYUFBcUIsRUFBRSxhQUFzQixFQUFFLFlBQXFCO1FBQy9GLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQXlCLENBQUM7UUFDbEYsSUFBSSxDQUFD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O0tBQ3ZFO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQzs7Ozs7OztVQzVCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTjBEO0FBQ0Y7QUFFcEQsSUFBSSxtRUFBWSxFQUFFLENBQUM7QUFDbkIsSUFBSSxpRUFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksaUVBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIC8vY29tcG9uZW50IEJhc2UgQ2xhc3NcclxuICAgIGV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQsIFUgZXh0ZW5kcyBIVE1MRWxlbWVudD4ge1xyXG4gICAgICAgIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgICAgICBob3N0RWxlbWVudDogVDsgICAgXHJcbiAgICAgICAgZWxlbWVudDogVTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IodGVtcGxhdGVkOiBzdHJpbmcsIGhvc3RFbGVtZW50SWQ6IHN0cmluZywgaW5zZXJ0QXRTdGFydDogYm9vbGVhbiwgbmV3RWxlbWVudElkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVkKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5ob3N0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhvc3RFbGVtZW50SWQpISBhcyBUO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XHJcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50SWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5hdHRhY2goaW5zZXJ0QXRTdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdEJlZ2lubmluZzogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChpbnNlcnRBdEJlZ2lubmluZyA/ICdhZnRlcmJlZ2luJyA6ICdiZWZvcmVlbmQnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XHJcbiAgICAgICAgYWJzdHJhY3QgcmVuZGVyQ29udGVudCgpOiB2b2lkO1xyXG59XHJcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4vYmFzZV9jb21wb25lbnRzXCI7XHJcbmltcG9ydCAqIGFzIFZhbGlkYXRpb24gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvblwiO1xyXG5pbXBvcnQgeyBhdXRvYmluZCBhcyBBdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kX2RlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdF9zdGF0ZVwiO1xyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnQ+IHsgICAgXHJcbiAgICAgICAgdGl0bGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgcGVvcGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCdwcm9qZWN0LWlucHV0JywgJ2FwcCcsIHRydWUsICd1c2VyLWlucHV0Jyk7XHJcbiAgICBcclxuICAgICAgICAgICAgLy9nZXQgYWNjZXNzIHRvIGZpZWxkc1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Blb3BsZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpOyAgLy90aGlzIG1ldGhvZCBzaG91bGQgdHJpZ2dlciB3aGVuZXZlciB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQgaW4gdGhlIHN1Ym1pdCBoYW5kbGVyXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgY29uZmlndXJlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZW5kZXJDb250ZW50KCkge307XHJcbiAgICBcclxuICAgICAgICAvL2dhdGhlciB1c2VyIG1ldGhvZHMgLSBmb3IgdHlwZSB1c2UgdHVwbGVcclxuICAgICAgICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgZW50ZXJlZFRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZW50ZXJlZERlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZW50ZXJlZFBlb3BsZSA9IHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlVmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZW50ZXJlZFRpdGxlLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtaW5MZW5ndGg6IDUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHBlb3BsZVZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICtlbnRlcmVkUGVvcGxlLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgICAgICAgICBtYXg6IDUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgLy8gZW50ZXJlZFRpdGxlLnRyaW0oKS5sZW5ndGggPT09IDAgfHxcclxuICAgICAgICAgICAgICAgIC8vIGVudGVyZWREZXNjcmlwdGlvbi50cmltKCkubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgICAgICAgICAvLyBlbnRlcmVkUGVvcGxlLnRyaW0oKS5sZW5ndGggPT09IDBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gdmFsaWRhdGUoe3ZhbHVlOiBlbnRlcmVkVGl0bGUsIHJlcXVpcmVkOiB0cnVlLCBtaW5MZW5ndGg6NX0pICYmXHJcbiAgICAgICAgICAgICAgICAvLyB2YWxpZGF0ZSh7dmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbiwgcmVxdWlyZWQ6IHRydWUsIG1pbkxlbmd0aDo1fSkgJiZcclxuICAgICAgICAgICAgICAgIC8vIHZhbGlkYXRlKHt2YWx1ZTogZW50ZXJlZFBlb3BsZSwgcmVxdWlyZWQ6IHRydWUsIG1pbkxlbmd0aDo1fSlcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgIVZhbGlkYXRpb24udmFsaWRhdGUodGl0bGVWYWxpZGF0YWJsZSkgfHxcclxuICAgICAgICAgICAgICAgICFWYWxpZGF0aW9uLnZhbGlkYXRlKGRlc2NyaXB0aW9uVmFsaWRhdGFibGUpIHx8XHJcbiAgICAgICAgICAgICAgICAhVmFsaWRhdGlvbi52YWxpZGF0ZShwZW9wbGVWYWxpZGF0YWJsZSlcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0ludmFsaWQgaW5wdXQsIHBsZWFzZSB0cnkgYWdhaW4hJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW2VudGVyZWRUaXRsZSwgZW50ZXJlZERlc2NyaXB0aW9uLCArZW50ZXJlZFBlb3BsZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL2NsZWFyIGlucHV0XHJcbiAgICAgICAgcHJpdmF0ZSBjbGVhcklucHV0cygpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgQEF1dG9iaW5kXHJcbiAgICAgICAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlKTtcclxuICAgICAgICAgICAgY29uc3QgdXNlcklucHV0ID0gdGhpcy5nYXRoZXJVc2VySW5wdXQoKTtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW3RpdGxlLCBkZXNjLCBwZW9wbGVdID0gdXNlcklucHV0O1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdFN0YXRlLmFkZFByb2plY3QodGl0bGUsIGRlc2MsIHBlb3BsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiIsImltcG9ydCB7RHJhZ2dhYmxlfSBmcm9tIFwiLi4vbW9kZWxzL2RyYWdfZHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0X21vZGVsXCI7XHJcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4vYmFzZV9jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRfZGVjb3JhdG9yXCI7XHJcblxyXG5cclxuICAgIC8vUHJvamVjdEl0ZW0gQ2xhc3NcclxuICAgIGV4cG9ydCBjbGFzcyBQcm9qZWN0SXRlbSBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PiBpbXBsZW1lbnRzIERyYWdnYWJsZSB7XHJcbiAgICBwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XHJcblxyXG4gICAgZ2V0IHBlcnNvbnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvamVjdC5wZW9wbGUgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcxIHBlcnNvbic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlcnNvbnNgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByb2plY3Q6IFByb2plY3QpIHtcclxuICAgICAgICBzdXBlcignc2luZ2xlLXByb2plY3QnLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKTtcclxuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBhdXRvYmluZFxyXG4gICAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5wcm9qZWN0LmlkKTtcclxuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RyYWdFbmQnKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25maWd1cmUoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7ICAgICAgICBcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLnBlcnNvbnMgKyAnIGFzc2lnbmVkJztcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigncCcpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcclxuXHJcbiAgICB9O1xyXG59XHJcbiAgICAiLCJpbXBvcnQgeyBEcmFnVGFyZ2V0IH0gZnJvbSBcIi4uL21vZGVscy9kcmFnX2Ryb3BcIjtcclxuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdF9tb2RlbFwiO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2Jhc2VfY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kX2RlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdF9zdGF0ZVwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gXCIuL3Byb2plY3RfaXRlbVwiO1xyXG5cclxuICAgIC8vUHJvamVjdExpc3QgQ2xhc3NcclxuICAgIGV4cG9ydCBjbGFzcyBQcm9qZWN0TGlzdCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ1RhcmdldCB7XHJcbiAgICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiAnYWN0aXZlJyB8ICdmaW5pc2hlZCcpIHtcclxuICAgICAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xyXG4gICAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBhdXRvYmluZFxyXG4gICAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSA9PT0gJ3RleHQvcGxhaW4nKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcclxuICAgICAgICAgICAgbGlzdEVsLmNsYXNzTGlzdC5hZGQoJ2Ryb3BwYWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQGF1dG9iaW5kXHJcbiAgICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgcHJqSWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoJ3RleHQvcGxhaW4nKTsgICAgICAgIFxyXG4gICAgICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChwcmpJZCwgdGhpcy50eXBlID09PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgQGF1dG9iaW5kXHJcbiAgICBkcmFnTGVhdmVIYW5kbGVyKF86IERyYWdFdmVudCkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcclxuICAgICAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbmZpZ3VyZSgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmRyb3BIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgcHJvamVjdFN0YXRlLmFkZExpc3RlbmVyKChwcm9qZWN0czogUHJvamVjdFtdKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGV2YW50UHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIocHJqID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdhY3RpdmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCA9IGxpc3RJZDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSB0aGlzLnR5cGUudG9VcHBlckNhc2UoKSArICcgUFJPSkVDVFMnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YCkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICAgICAgbGlzdEVsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGZvciAoY29uc3QgcHJqSXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcclxuICAgICAgICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCwgcHJqSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIlxyXG4gICAgLy9hdXRvYmluZCBkZWNvcmF0b3JcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBhdXRvYmluZChfOiBhbnksIF8yOiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG4gICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gICAgY29uc3QgYWRqRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gYm91bmRGbjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGFkakRlc2NyaXB0b3I7XHJcbn1cclxuIiwiLy9wcm9qZWN0IFR5cGVcclxuICAgIGV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xyXG4gICAgQWN0aXZlLFxyXG4gICAgRmluaXNoZWRcclxufVxyXG4gICBleHBvcnQgY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgaWQ6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgcGVvcGxlOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIHN0YXR1czogUHJvamVjdFN0YXR1cyxcclxuICAgICkge31cclxufVxyXG4iLCIgICAgaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdF9tb2RlbFwiO1xyXG5cclxuICAgIC8vcHJvamVjdCBTdGF0ZSBNYW5hZ2VtZW50XHJcbiAgICB0eXBlIExpc3RlbmVyPFQ+ID0gKGl0ZW1zOiBUW10pID0+IHZvaWQ7XHJcbiAgICBcclxuICAgIGNsYXNzIFN0YXRlPFQ+IHtcclxuICAgICAgICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXN0ZW5lcjxUPltdID0gW107IC8vYXJyYXkgb2YgZnVuY3Rpb24gcmVmZXJlbmNlc1xyXG4gICAgXHJcbiAgICAgICAgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgICAgICBhZGRQcm9qZWN0KHRpdGxlOnN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbnVtT2ZQZW9wbGU6IG51bWJlcikge1xyXG4gICAgICAgICAgICAvLyBjb25zdCBuZXdQcm9qZWN0ID0ge1xyXG4gICAgICAgICAgICAvLyAgICAgaWQ6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgLy8gICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgLy8gICAgIHBlb3BsZTogbnVtT2ZQZW9wbGUsXHJcbiAgICAgICAgICAgIC8vIH07XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChcclxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSwgXHJcbiAgICAgICAgICAgICAgICB0aXRsZSwgXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIG51bU9mUGVvcGxlLFxyXG4gICAgICAgICAgICAgICAgUHJvamVjdFN0YXR1cy5BY3RpdmVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIG1vdmVQcm9qZWN0KHByb2plY3RJZDogc3RyaW5nLCBuZXdTdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcmogPT4gcHJqLmlkID09PSBwcm9qZWN0SWQpO1xyXG4gICAgICAgICAgICBpZiAocHJvamVjdCAmJiBwcm9qZWN0LnN0YXR1cyAhPT0gbmV3U3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0LnN0YXR1cyA9IG5ld1N0YXR1cztcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lckZuIG9mIHRoaXMubGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lckZuKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjb25zdCBwcm9qZWN0U3RhdGUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKTtcclxuICAgICIsIi8vdmFsaWRhdGlvblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcclxuICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgICBtaW5MZW5ndGg/OiBudW1iZXI7XHJcbiAgICBtYXhMZW5ndGg/OiBudW1iZXI7XHJcbiAgICBtaW4/OiBudW1iZXI7XHJcbiAgICBtYXg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSh2YWxpZGF0YWJsZUlucHV0OiBWYWxpZGF0YWJsZSkge1xyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcclxuICAgIH1cclxuICAgIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aCAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoID49IHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoICE9IG51bGwgJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS5sZW5ndGggPD0gdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGg7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsaWRhdGFibGVJbnB1dC5taW4gIT0gbnVsbCAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID49IHZhbGlkYXRhYmxlSW5wdXQubWluO1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWF4ICE9IG51bGwgJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heDtcclxuICAgIH1cclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQcm9qZWN0SW5wdXQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2plY3RfaW5wdXRcIjtcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0X2xpc3RcIjtcblxuICAgIG5ldyBQcm9qZWN0SW5wdXQoKTtcbiAgICBuZXcgUHJvamVjdExpc3QoJ2FjdGl2ZScpO1xuICAgIG5ldyBQcm9qZWN0TGlzdCgnZmluaXNoZWQnKTsiXSwic291cmNlUm9vdCI6IiJ9