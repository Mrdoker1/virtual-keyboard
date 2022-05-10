import { keys } from './keys.js'
import { createKeyEvent } from './keyEvent.js';
import { dragElement } from './draggable.js';

export class Keyboard {

    constructor(language = 'en', input, draggable = true) {
        this.language = localStorage.getItem('KeyboardLanguage') ? localStorage.getItem('KeyboardLanguage') : language;
        this.input = input;
        this.draggable = draggable;
        this.caps = false;
    }

    createWindowListener() {
        window.addEventListener('keydown', (event) => {

            let key = document.querySelector(`.${event.code.toLowerCase()}`);

            if (event.code === 'CapsLock') {

                if (key.classList.contains('active')) {
                    key.classList.remove('active');
                    this.caps = false;
                } else {
                    key.classList.add('active');
                    this.caps = true;
                }
            } else {
                key.classList.add('active');
            }

            if (event.code === 'ArrowUp' ||
                event.code === 'ArrowDown' ||
                event.code === 'ArrowLeft' ||
                event.code === 'ArrowRight') {
                console.log(event.code)
            } else {
                event.preventDefault();
                key.dispatchEvent(createKeyEvent(event, 'keydown'));
            }

        });

        window.addEventListener('keyup', (event) => {

            let key = document.querySelector(`.${event.code.toLowerCase()}`);

            if (event.code !== 'CapsLock') {
                key.classList.remove('active');
            }

            if (event.code === 'ArrowUp' ||
                event.code === 'ArrowDown' ||
                event.code === 'ArrowLeft' ||
                event.code === 'ArrowRight') {
                console.log(event.code)
            } else {
                event.preventDefault();
                key.dispatchEvent(createKeyEvent(event, 'keyup'));
            }


        });
    }

    createKey(keycode) {

        let key = this.createKeyNode(keycode);

        let insertSymbol = (symbol) => {
            let start = this.input.selectionStart;
            let first = this.input.value.slice(0, start);
            let second = this.input.value.slice(this.input.selectionEnd, this.input.length);

            this.input.value = first + `${symbol}` + second;
            this.input.selectionStart = start + 1;
            this.input.selectionEnd = start + 1;
        }

        key.addEventListener('mousedown', (event) => {

            if (keycode.code === 'CapsLock') {

                if (key.classList.contains('active')) {
                    key.classList.remove('active');
                    this.caps = false;
                } else {
                    key.classList.add('active');
                    this.caps = true;
                }
            } else {
                key.classList.add('active');
            }

            key.dispatchEvent(createKeyEvent(event, 'keydown', keycode));
        })

        key.addEventListener('mouseup', (event) => {

            if (keycode.code !== 'CapsLock') {
                key.classList.remove('active');
            }

            key.dispatchEvent(createKeyEvent(event, 'keyup', keycode));
        });

        key.addEventListener('keydown', (event) => {

            if (event.key !== 'Meta' &&
                event.key !== 'CapsLock' &&
                event.key !== 'Tab' &&
                event.key !== 'Alt' &&
                event.key !== 'Delete' &&
                event.key !== 'Enter' &&
                event.key !== 'Backspace' &&
                event.key !== 'Control' &&
                event.key !== ' ' &&
                event.key !== 'ArrowLeft' &&
                event.key !== 'ArrowRight' &&
                event.key !== 'ArrowUp' &&
                event.key !== 'ArrowDown' &&
                event.key !== 'Shift') {

                insertSymbol(this.getKeyData(key));
            }

            if (event.key === 'Tab') {
                insertSymbol('\t');
            }

            if (event.key === 'ArrowLeft' && !event.isTrusted) {

                let start = this.input.selectionStart;
                let end = this.input.selectionEnd;

                if ((start && end) !== 0) {
                    this.input.selectionStart = this.input.selectionStart - 1;
                    this.input.selectionEnd = this.input.selectionEnd - 1;
                }
            }

            if (event.key === 'ArrowRight' && !event.isTrusted) {
                this.input.selectionEnd = this.input.selectionEnd + 1;
                this.input.selectionStart = this.input.selectionStart + 1;
            }

            if (event.key === 'ArrowUp' && !event.isTrusted) {
                let start = 0;
                this.input.setSelectionRange(start, start);
            }

            if (event.key === 'ArrowDown' && !event.isTrusted) {
                let start = this.input.value.length;
                this.input.setSelectionRange(start, start);
            }

            if (event.key === 'Backspace') {
                if (this.input.selectionEnd !== 0) {

                    if (this.input.selectionEnd > this.input.selectionStart) {

                        let start = this.input.selectionStart;
                        let first = this.input.value.slice(0, this.input.selectionStart);
                        let second = this.input.value.slice(this.input.selectionEnd, this.input.length);

                        this.input.value = first + second;
                        this.input.selectionEnd = start;

                    } else {
                        let temp = this.input.value.slice(0, this.input.selectionEnd - 1);
                        let position = this.input.selectionEnd - 1;
                        this.input.value = temp + this.input.value.slice(this.input.selectionEnd);
                        this.input.selectionEnd = position;
                    }
                }
            }

            if (event.key === 'Delete') {
                let temp = this.input.value.slice(0, this.input.selectionStart);
                let position = this.input.selectionStart;
                this.input.value = temp + this.input.value.slice(this.input.selectionStart + 1, this.input.length);
                this.input.selectionEnd = position;
            }

            if (event.key === 'Enter') {
                insertSymbol('\n');
            }

            if (event.key === ' ') {
                insertSymbol(' ');
            }

            if (event.ctrlKey && event.key === 'Alt') {

                if (this.language === 'ru') {
                    for (const element of document.querySelectorAll(".ru")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".en")) {
                        element.classList.remove('hidden');
                    }
                    this.language = 'en';
                    localStorage.setItem('KeyboardLanguage', 'en');
                    console.log('Keyboard language: en');
                } else {
                    for (const element of document.querySelectorAll(".ru")) {
                        element.classList.remove('hidden');
                    }
                    for (const element of document.querySelectorAll(".en")) {
                        element.classList.add('hidden');
                    }
                    this.language = 'ru';
                    localStorage.setItem('KeyboardLanguage', 'ru');
                    console.log('Keyboard language: ru');
                }
            }

            if (event.key === 'CapsLock') {
                document.querySelector(":root").style.setProperty("--capsLockColor", `#5decaa`);

                for (const element of document.querySelectorAll(".caseDown")) {
                    element.classList.add('hidden');
                }
                for (const element of document.querySelectorAll(".caseUp")) {
                    element.classList.add('hidden');
                }
                for (const element of document.querySelectorAll(".caps")) {
                    element.classList.remove('hidden');
                }
                for (const element of document.querySelectorAll(".shiftCaps")) {
                    element.classList.add('hidden');
                }
            }

            if (event.key === 'Shift') {
                if (this.caps) {
                    for (const element of document.querySelectorAll(".caseDown")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".caseUp")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".caps")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".shiftCaps")) {
                        element.classList.remove('hidden');
                    }
                } else {
                    for (const element of document.querySelectorAll(".caseDown")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".caseUp")) {
                        element.classList.remove('hidden');
                    }
                    for (const element of document.querySelectorAll(".caps")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".shiftCaps")) {
                        element.classList.add('hidden');
                    }
                }
            }
        });

        key.addEventListener('keyup', (event) => {

            if (event.code === 'CapsLock' && !this.caps) {
                document.querySelector(":root").style.setProperty("--capsLockColor", `#C4C4C4`);

                for (const element of document.querySelectorAll(".caseDown")) {
                    element.classList.remove('hidden');
                }
                for (const element of document.querySelectorAll(".caseUp")) {
                    element.classList.add('hidden');
                }
                for (const element of document.querySelectorAll(".caps")) {
                    element.classList.add('hidden');
                }
                for (const element of document.querySelectorAll(".shiftCaps")) {
                    element.classList.add('hidden');
                }
            }

            if (event.key === 'Shift') {

                if (this.caps) {
                    for (const element of document.querySelectorAll(".caseDown")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".caseUp")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".caps")) {
                        element.classList.remove('hidden');
                    }
                    for (const element of document.querySelectorAll(".shiftCaps")) {
                        element.classList.add('hidden');
                    }
                } else {
                    for (const element of document.querySelectorAll(".caseDown")) {
                        element.classList.remove('hidden');
                    }
                    for (const element of document.querySelectorAll(".caseUp")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".caps")) {
                        element.classList.add('hidden');
                    }
                    for (const element of document.querySelectorAll(".shiftCaps")) {
                        element.classList.add('hidden');
                    }
                }
            }
        });

        return key;
    }

    createKeyNode(keycode) {
        let ru = `
        <span class="ru">
            <span class="caseDown">${keycode.ru.caseDown}</span>
            <span class="caseUp hidden">${keycode.ru.caseUp}</span>
            <span class="caps hidden">${keycode.ru.caps}</span>
            <span class="shiftCaps hidden">${keycode.ru.shiftCaps}</span>
        </span>
        <span class="en hidden">
            <span class="caseDown">${keycode.en.caseDown}</span>
            <span class="caseUp hidden">${keycode.en.caseUp}</span>
            <span class="caps hidden">${keycode.en.caps}</span>
            <span class="shiftCaps hidden">${keycode.en.shiftCaps}</span>
        </span>`;

        let en = `
        <span class="ru hidden">
            <span class="caseDown">${keycode.ru.caseDown}</span>
            <span class="caseUp hidden">${keycode.ru.caseUp}</span>
            <span class="caps hidden">${keycode.ru.caps}</span>
            <span class="shiftCaps hidden">${keycode.ru.shiftCaps}</span>
        </span>
        <span class="en">
            <span class="caseDown">${keycode.en.caseDown}</span>
            <span class="caseUp hidden">${keycode.en.caseUp}</span>
            <span class="caps hidden">${keycode.en.caps}</span>
            <span class="shiftCaps hidden">${keycode.en.shiftCaps}</span>
        </span>`;

        let key = document.createElement('div');
        key.classList.add('keyboard-key', keycode.code.toLowerCase());

        this.language === 'en' ? key.innerHTML = en : key.innerHTML = ru;

        return key;
    }

    getKeyData(key) {
        let keyValue = '';

        for (let item of key.children) {
            if (!item.classList.contains('hidden')) {
                for (let child of item.children) {
                    if (!child.classList.contains('hidden')) {
                        keyValue = child.innerHTML;
                    }
                }
            }
        }
        return keyValue;
    }

    createKeyboard() {
        let keyboard = document.createElement('div');
        this.draggable ? keyboard.classList.add('keyboard', 'draggable') : keyboard.classList.add('keyboard');
        keyboard.innerHTML = `
        ${this.draggable ? '<div class="drag">☰</div>' : ''}
        <div class="keyboard-row"></div>
        <div class="keyboard-row"></div>
        <div class="keyboard-row"></div>
        <div class="keyboard-row"></div>
        <div class="keyboard-row"></div>`;

        Object.values(keys).forEach(keycode => {

            let index = keyboard.children.length;

            switch (keycode.row) {
                case 1:
                    keyboard.children[index - 5].appendChild(this.createKey(keycode));
                    break;
                case 2:
                    keyboard.children[index - 4].appendChild(this.createKey(keycode));
                    break;
                case 3:
                    keyboard.children[index - 3].appendChild(this.createKey(keycode));
                    break;
                case 4:
                    keyboard.children[index - 2].appendChild(this.createKey(keycode));
                    break;
                case 5:
                    keyboard.children[index - 1].appendChild(this.createKey(keycode));
                    break;
                default:
                    // code block
            }
        });

        if (this.draggable) {
            dragElement(keyboard);
        } else {
            keyboard.onmousedown = (e) => {
                e.preventDefault();
            }
        }

        return keyboard;
    }
}