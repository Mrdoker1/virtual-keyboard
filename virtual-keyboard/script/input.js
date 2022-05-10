export class Input {

    constructor() {
        this.operationSystem = 'Windows';
        this.languageChange = 'левыe ctrl + alt'
    }

    createInput() {
        let input = document.createElement('div');
        input.classList.add('input');
        input.innerHTML = `
        <p>Начните печатать или выберите область ввода</p>
        <textarea id="input" rows="4" cols="50"></textarea>
            <div class="info">
                <p>Клавиатура создана в операционной системе: ${this.operationSystem}</p>
                <p>Для переключения языка: ${this.languageChange}</p>
            </div>`

        return input;
    }
}