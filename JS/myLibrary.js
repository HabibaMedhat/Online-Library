
// const books = document.querySelector('.books');

// for (let i = 0; i < books.length; i++){

//     const slider = books[i].querySelector('.slider');

//     let isDown = false;
//     let startX;
//     let scrollLeft;

//     slider.addEventListener('mousedown', (e) => {
//         isDown = true;
//         startX = e.pageX - slider.offsetLeft;
//         scrollLeft = slider.scrollLeft;
//         slider.style.cursor = 'grabbing';
//     })

//     function rest() {
//         isDown = false;
//         slider.style.cursor = 'grab';
//     }

//     slider.addEventListener('mouseleave', () => {
//         rest();
//     })

//     slider.addEventListener('mouseup', () => {
//         rest();
//     })

//     slider.addEventListener('mousemove', e => {
//         if (!isDown) return;
//         e.preventDefault();
//         const x = e.pageX - slider.offsetLeft;
//         const walk = (x - startX) * 2;
//         slider.scrollLeft = scrollLeft - walk;
//     })

// }

console.log(document.querySelectorAll('.slider'))

document.querySelectorAll('.slider').forEach(slider => {
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;

    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);

    function startDrag(event) {
        isDragging = true;
        startPosition = event.clientX;
        slider.style.cursor = 'grabbing';
    }

    function drag(event) {
        if (!isDragging) return;

        const currentPosition = event.clientX;
        const movedBy = currentPosition - startPosition;
        currentTranslate = previousTranslate + movedBy;

        // Get slider and container dimensions
        const sliderWidth = slider.scrollWidth; // Total width of the slider content
        const containerWidth = slider.parentElement.clientWidth; // Container width

        // Calculate the maximum and minimum translateX values
        const maxTranslate = 0; // Leftmost position (fully in view)
        const minTranslate = containerWidth - sliderWidth; // Rightmost position

        // Constrain the translation value
        currentTranslate = Math.max(Math.min(currentTranslate, maxTranslate), minTranslate);

        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function endDrag() {
        isDragging = false;
        previousTranslate = currentTranslate;
        slider.style.cursor = 'grab';
    }

})
