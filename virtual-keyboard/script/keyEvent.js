export function createKeyEvent(event, type, additional) {

    let e = new KeyboardEvent(type, {
        bubbles: false,
        key: additional ? additional.key : event.key,
        code: additional ? additional.code : event.code,
        cancelable: true,
        composed: true,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
    });

    Object.defineProperties(e, {
        'caps': {
            value: event.getModifierState('CapsLock') ? true : false
        }
    });

    return e;
}