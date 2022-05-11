export class Input {

    constructor() {
        this.operationSystem = 'Windows';
        this.languageChange = 'левыe ctrl + alt'
    }

    createInput() {
        let input = document.createElement('div');
        input.classList.add('input');
        input.innerHTML = `
        <div class="description">
           <p>Начните печатать или выберите область ввода</p>
           <a href="https://github.com/Mrdoker1/virtual-keyboard/pull/1">Pull Request Link</a>
        </div>
        <textarea id="input" rows="4" cols="50"></textarea>
            <div class="info">
                <p>Клавиатура создана в операционной системе: ${this.operationSystem}</p>
                <p>Для переключения языка: ${this.languageChange}</p>
            </div>`

        return input;
    }
}