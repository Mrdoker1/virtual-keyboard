import { Keyboard } from './script/keyboard.js';
import { Input } from './script/input.js';

const body = document.querySelector('body');

let input = new Input();

body.appendChild(input.createInput());

let inputNode = document.querySelector('#input');

window.addEventListener('keypress', () => {
    let board = document.querySelector('.keyboard');

    if (board) {
        board.classList.remove('hide');
    } else {
        let keyboard = new Keyboard('en', document.querySelector('#input'), true);
        body.appendChild(keyboard.createKeyboard());
        keyboard.createWindowListener();
    }
})

inputNode.addEventListener('focus', () => {

    let board = document.querySelector('.keyboard');

    if (board) {
        board.classList.remove('hide');
    } else {
        let keyboard = new Keyboard('en', document.querySelector('#input'), true);
        body.appendChild(keyboard.createKeyboard());
        keyboard.createWindowListener();
    }
})

inputNode.addEventListener('focusout', () => {
    let board = document.querySelector('.keyboard');
    board.classList.add('hide');
})