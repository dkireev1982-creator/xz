const switchButtons = document.querySelectorAll('.switch-btn')

switchButtons.forEach(button => {
    button.onclick = function() {
	    const hF = document.querySelector('.hFirst');
        const hS = document.querySelector('.hSecond');
        const h2Elements = document.querySelectorAll('.h2')

		if (this === hF && !hF.classList.contains('active')) {
            hF.classList.add('active');
            hF.classList.remove('unactive');
            
            hS.classList.remove('active');
            hS.classList.add('unactive');
        }
        else if (this === hS && !hS.classList.contains('active')) {
            hS.classList.add('active');
            hS.classList.remove('unactive');
            
            hF.classList.remove('active');
            hF.classList.add('unactive');
        }
        
        let newText = '';
        
        if (hF.classList.contains('active')) {
            newText = 'ОГЭ ТЕХНО';
        } else {
            newText = 'ЕГЭ ТЕХНО';
        }
        
        h2Elements.forEach(h2 => {
            h2.textContent = newText;
        });
	 }
});




