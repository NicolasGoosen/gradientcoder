

let output = document.getElementById('output');

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', inputUpdated);
});

function inputUpdated(e) {
    document.documentElement.style.setProperty(
        `--${e.target.name}`,
        e.target.value
    );
}