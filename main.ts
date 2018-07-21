import './style.scss';
import './src/index.css';
import * as _ from 'lodash';

import { User } from './src/common/user';

export class CommonComponent {

    user: User;
    constructor() {
        console.log(_)
        this.user = new User();
        document.body.appendChild(this.component());
    }

    component() {
        var element = document.createElement('div');
        element.innerHTML = '<span class="hello">Hello</span> <span class="webpack">webpack!</span>';
        // element.classList.add('hello');
        return element;
    }

}

new CommonComponent();