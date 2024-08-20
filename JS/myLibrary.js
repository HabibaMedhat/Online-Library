

const toggle = document.querySelector('.header .links .toggle'),
ul = document.querySelector('.header .links ul'),
arrow = document.querySelector('.header .links .toggle .arrow');

toggle.addEventListener('click', () => {

    if (arrow.style.display == 'block') {
        arrow.style.display = 'none'
        ul.style.display = 'none';
    } else{
        arrow.style.display =  'block';
        ul.style.display = 'block';
    }
    
})


window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
        ul.style.display = 'flex';
        arrow.style.display = 'none';
    } else {
        if (arrow.style.display === 'block') {
            ul.style.display = 'block';
        } else {
            ul.style.display = 'none';
        }
    }
});


async function getBooks(url) {
    let data = [];
    try {
        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            data = result.reading_log_entries;
        } else {
            console.log('Server error:', response.status);
        }
    } catch (error) {
        console.log(`Fetch error: ${error}`);
    }
    return data;
}

async function getCurrentlyBooks() {
    const url = 'https://openlibrary.org/people/mekBot/books/currently-reading.json';
    const data = await getBooks(url);
    let myReadBooks = ``, myListenBooks = ``;
    for (let i = 0; i < data.length; i++) {
                if (i < data.length / 2) {
                    myReadBooks += 
                        `<div class="book">
                                <img src="https://covers.openlibrary.org/b/id/${data[i].work.cover_id}-M.jpg" alt="${data[i].work.title}">
                                <div class="progress">
                                    <div class="line"></div>
                                    <div class="details">
                                        <span class="page-num">411 of 502</span>
                                        <span class="percentage">81%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                } else {
                    myListenBooks += 
                        `<div class="book">
                                <img src="https://covers.openlibrary.org/b/id/${data[i].work.cover_id}-M.jpg" alt="${data[i].work.title}">
                                <div class="progress">
                                    <div class="line"></div>
                                    <div class="details">
                                        <span class="page-num">411 of 502</span>
                                        <span class="percentage">81%</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
                } 
    }
    if (!myReadBooks.length) {
        myReadBooks = `Not Books read yet`;
    }
    if (!myListenBooks.length) {
        myListenBooks = `Not Books listen yet`;
    } 
    document.querySelector('.myread .slider').innerHTML = myReadBooks;
    document.querySelector('.mylisten .slider').innerHTML = myListenBooks;
}

async function getBooksForYou() {
    const url = 'https://openlibrary.org/people/mekBot/books/want-to-read.json';
    const data = await getBooks(url);
    let booksForYou = ``;
    for (let i = 0; i < data.length; i++) {
        booksForYou += 
            `<div class="book for-you">
                <img src="https://covers.openlibrary.org/b/id/${data[i].work.cover_id}-M.jpg" alt="${data[i].work.title}">
                <div class="action hidden">
                    <div class="love">
                        <img src="images/heart.svg" alt="love">
                    </div>
                    <div class="read">
                        <img src="images/blueBook.svg" alt="to read">
                    </div>
                    <div class="listen">
                        <img src="images/blueHeadphone.svg" alt="to listen">
                    </div>
                </div>
            </div>
            `
    }
    if (!booksForYou.length) {
        booksForYou = `up comming...`;
    }
    document.querySelector('.books-for-you .slider').innerHTML = booksForYou;
}

getCurrentlyBooks()
getBooksForYou()


document.querySelectorAll('.slider').forEach(slider => {
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;

    // Event listeners for mouse events
    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);

    // Event listeners for touch events
    slider.addEventListener('touchstart', startDrag);
    slider.addEventListener('touchmove', drag);
    slider.addEventListener('touchend', endDrag);
    slider.addEventListener('touchcancel', endDrag);

    function startDrag(event) {
        isDragging = true;
        startPosition = getPosition(event);
        slider.style.cursor = 'grabbing';
    }

    function drag(event) {
        if (!isDragging) return;

        const currentPosition = getPosition(event)
        const movedBy = currentPosition - startPosition;
        currentTranslate = previousTranslate + movedBy;

        // Get slider and container dimensions
        const sliderWidth = slider.scrollWidth;
        const containerWidth = slider.parentElement.clientWidth;

        // Calculate bounds
        const maxTranslate = 0;
        const minTranslate = containerWidth - sliderWidth;

        // Constrain translation within bounds
        // the current translate must be between the 0 and (containerwidth - sliderwidth)
        // and you can say max, min
        currentTranslate = Math.max(Math.min(currentTranslate, maxTranslate), minTranslate);

        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function endDrag() {
        isDragging = false;
        previousTranslate = currentTranslate;
        slider.style.cursor = 'grab';
    }

    function getPosition(event) {
        return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    }

})
