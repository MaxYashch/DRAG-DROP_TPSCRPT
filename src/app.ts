/// <reference path='models/drag_drop.ts'/>
/// <reference path='models/project_model.ts'/>
/// <reference path='state/project_state.ts'/>
/// <reference path='util/validation.ts'/>
/// <reference path='decorators/autobind_decorator.ts'/>
/// <reference path='components/base_components.ts'/>
/// <reference path='components/project_input.ts'/>
/// <reference path='components/project_item.ts'/>
/// <reference path='components/project_list.ts'/>


namespace App {
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
}