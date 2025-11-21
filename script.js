const switchButtons = document.querySelectorAll('.switch-btn');


const imagePaths = {
    oge: [
        './img/react.svg',
        './img/react2.svg', 
        './img/react3.svg'
    ],
    ege: [
        '/img/zx.svg',
        './img/q1.svg',
        './img/cv.svg'
    ]
};

switchButtons.forEach(button => {
    button.onclick = function() {
        const hF = document.querySelector('.hFirst');
        const hS = document.querySelector('.hSecond');
        const h2Elements = document.querySelectorAll('.h2');
        const images = document.querySelectorAll('.card img');

        if (this === hF && !hF.classList.contains('active')) {
            hF.classList.add('active');
            hF.classList.remove('unactive');
            hS.classList.remove('active');
            hS.classList.add('unactive');
            
            
            updateImages('oge');
            updateText('ОГЭ ТЕХНО');
            updateH2Color('oge'); 
        }
        else if (this === hS && !hS.classList.contains('active')) {
            hS.classList.add('active');
            hS.classList.remove('unactive');
            hF.classList.remove('active');
            hF.classList.add('unactive');
            
            
            updateImages('ege');
            updateText('ЕГЭ ТЕХНО');
            updateH2Color('ege'); 
        }
    }
});

function updateImages(mode) {
    const images = document.querySelectorAll('.card img');
    images.forEach((img, index) => {
        img.src = imagePaths[mode][index];
    });
}

function updateText(text) {
    const h2Elements = document.querySelectorAll('.h2');
    h2Elements.forEach(h2 => {
        h2.textContent = text;
    });
}


function updateH2Color(mode) {
    const h2Elements = document.querySelectorAll('.h2');
    h2Elements.forEach(h2 => {
        if (mode === 'oge') {
            h2.style.color = '#0019ff'; 
        } else {
            h2.style.color = '#7C3AED'; 
        }
    });
}







