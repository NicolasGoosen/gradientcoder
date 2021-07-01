let outputColors = document.getElementById('output');
let copyToClipboard = document.getElementById('clipboard');
let showtext = document.querySelector('h2');
let angle = document.getElementById('angle');

document.querySelectorAll('input:not([type="text"])').forEach(input => {
    input.addEventListener('input', inputUpdated);
});

document.querySelector('input[type="text"]').addEventListener('input', textUpdated);

document.querySelector('select').addEventListener('input', fontUpdated);

function inputUpdated(e) {
    document.documentElement.style.setProperty(
        `--${e.target.name}`,
        e.target.value
    );

    // set average color for footer
    let left  = document.documentElement.style.getPropertyValue('--left-color')  || '#FF00FF';
    let right = document.documentElement.style.getPropertyValue('--right-color') || '#0000FF';

    document.documentElement.style.setProperty(
        '--average-color',
        averageColors(left, right)
    )

    // update sample code
    let leftRGB = hexToRGB(left);
    let rightRGB = hexToRGB(right);
    outputColors.innerHTML = `<span class="code-literal">${angle.value}deg</span>, <span class="code-literal">rgba(${leftRGB.join(',')})</span>, <span class="code-literal">rgba(${rightRGB.join(',')})</span>`;
}


function textUpdated(e) {
    console.log(e.target.value);
    showtext.innerHTML = e.target.value == '' ? 'Type Something' : e.target.value;
}


function fontUpdated(e) {
    let h2 = document.querySelector('h2');

    switch (e.target.value) {
        case 'roboto':
            h2.style.fontFamily = 'Roboto Mono';
            h2.style.fontStyle = 'normal';
            h2.style.fontWeight = '700';
            h2.style.letterSpacing = "-0.020em";
            break;

        case 'lobster':
            h2.style.fontFamily = 'Lobster';
            h2.style.fontStyle = 'normal';
            h2.style.fontWeight = '400';
            h2.style.letterSpacing = "0.000em";
            break;

        case 'abril':
            h2.style.fontFamily = 'Abril Fatface';
            h2.style.fontStyle = 'normal';
            h2.style.fontWeight = '400';
            h2.style.letterSpacing = '0.000em';
            break;

        case 'raleway':
        default:
            h2.style.fontFamily = 'Raleway';
            h2.style.fontStyle = 'normal';
            h2.style.fontWeight = '900';
            h2.style.letterSpacing = '-0.020em';
            break;
    }
}


// thanks to
// https://www.codegrepper.com/code-examples/javascript/javascript+convert+color+string+to+rgb
// for (almost) this function
function hexToRGB(color) {
    var result = new RegExp('#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})').exec(color);
    if (result) {
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        return [r, g, b]; 
    } 
    return null;
}


/* strings come in as hexadecimal and must leave as so */
function averageColors(color1, color2) {
    /* convert to rgb array */
    let a = hexToRGB(color1);
    let b = hexToRGB(color2);
    let ans = "#";

    /* we're just averaging each rgb component and then converting back to hexidecimal */
    for (let i = 0; i < 3; i++) {
        ans += Math.floor((a[i] + b[i]) / 2).toString(16).padStart(2, '0');
    }

    return ans;
}


function setClipboard(text) {
    navigator.clipboard.write(text).then(
        function () {
            console.log('copied');
        },
        function () {
            alert('Oops, something went wrong - please select and copy manually.')
        }
    );
}