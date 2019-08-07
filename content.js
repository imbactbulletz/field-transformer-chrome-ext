function DOMChangedCallback() {
    $("input[type='password']").prop('type', 'text')
}

document.addEventListener('DOMNodeInserted', DOMChangedCallback);