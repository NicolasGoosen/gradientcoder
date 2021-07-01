let output = document.getElementById('output');
let showtext = document.querySelector('h2');

document.querySelectorAll('input:not([type="text"])').forEach(input => {
    input.addEventListener('input', inputUpdated);
});

document.querySelector('input[type="text"]').addEventListener('input', textUpdated);

function inputUpdated(e) {
    document.documentElement.style.setProperty(
        `--${e.target.name}`,
        e.target.value
    );
}

function textUpdated(e) {
    console.log(e.target.value);
    showtext.innerHTML = e.target.value == '' ? 'Type Something' : e.target.value;
}