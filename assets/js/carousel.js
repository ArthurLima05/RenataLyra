document.addEventListener('DOMContentLoaded', function () {
    const cards = Array.from(document.querySelectorAll('.depoimento-card'));
    const setaEsquerda = document.querySelector('.seta-esquerda');
    const setaDireita = document.querySelector('.seta-direita');

    let currentIndex = 0;

    function updateCards() {
        const isDesktop = window.matchMedia('(min-width: 80em)').matches;

        cards.forEach((card) => {
            card.style.display = 'none';
        });

        if (isDesktop) {
            if (cards[currentIndex]) cards[currentIndex].style.display = 'block';
            if (cards[currentIndex + 1]) cards[currentIndex + 1].style.display = 'block';
        } else {
            if (cards[currentIndex]) cards[currentIndex].style.display = 'block';
        }
    }

    setaDireita.addEventListener('click', () => {
        const isDesktop = window.matchMedia('(min-width: 80em)').matches;
        const maxIndex = isDesktop ? cards.length - 2 : cards.length - 1;

        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        updateCards();
    });

    setaEsquerda.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - 1;
        }

        updateCards();
    });

    updateCards();
    window.addEventListener('resize', updateCards);
});
