async function displayWelcomeBooks() {
    
    document.getElementById('category-output').style.display = "none";
    document.getElementById('country-output').style.display = "none";
    document.getElementById('output').style.display = "none";
    const outputElement = document.getElementById('welcome-books');
    outputElement.innerHTML = "Loading books...";

    try {
        const fetchBestsellers = fetch(`http://openlibrary.org/search.json?subject=bestsellers&limit=8`);
        const fetchNewReleases = fetch(`http://openlibrary.org/search.json?subject=new&limit=12`);

        const [bestsellersResponse, newReleasesResponse] = await Promise.all([fetchBestsellers, fetchNewReleases]);
        const bestsellersData = await bestsellersResponse.json();
        const newReleasesData = await newReleasesResponse.json();

        let booksHTML = '';

        // Combine books from both categories
        const combinedBooks = [
            ...bestsellersData.docs,
            ...newReleasesData.docs
        ];

        // Filter out books without cover images and limit to the first 8
        const filteredBooks = combinedBooks
            .filter(book => book.cover_i) // Only include books with cover images
            .slice(0, 8);

        // Process and display books
        const processBooks = (books) => {
            books.forEach(book => {
                const coverImage = `<img src='http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' alt='Cover image' style='width: 100%; height: auto;'>`;
                booksHTML += `<div class="book">${coverImage}</div>`;
            });
        };

        if (filteredBooks.length > 0) {
            processBooks(filteredBooks);
        } else {
            booksHTML += "<p>No books with cover images available to display.</p>";
        }

        outputElement.innerHTML = booksHTML;

    } catch (error) {
        outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
    }
}

window.onload = displayWelcomeBooks;

// books by name structured
function getBooksByName() {
    document.getElementById('welcome-books').style.display = "none";
    document.getElementById('category-output').style.display = "none";
    document.getElementById('country-output').style.display = "none";
    document.getElementById('output').style.display = "block";
    document.getElementById('welcome-books').style.display = "none";
    document.getElementById('country-select').value = "choose-country";
    document.getElementById('category-input').value = "choose-category";
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = "";
    outputElement.innerHTML = "Loading books...";

    const query = document.getElementById("input").value;
    fetch(`http://openlibrary.org/search.json?q=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.docs.length === 0) {
                outputElement.innerHTML = "<p>No books found.</p>";
                return;
            }

            let booksHTML = '';
            data.docs.forEach(book => {
                const title = book.title || "No title available";
                const author = book.author_name ? book.author_name[0] : "Unknown author";
                const isbn = book.isbn ? book.isbn[0] : null;
                const coverImage = isbn 
                    ? `<img src='http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg' alt='Book Cover' class='cover-image'>` 
                    : "<p>No cover image available</p>";

                booksHTML += `
                    <div class="book">
                        ${coverImage}
                        <div class="book-info">
                            <h3>${title}</h3>
                            <p>${author}</p>
                        </div>
                    </div>`;
            });

            outputElement.innerHTML = booksHTML;
        })
        .catch(error => {
            outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
        });
}


// books by cover only
// function getBooksByName(){
//     document.getElementById('welcome-books').style.display = "none";
//     document.getElementById('category-output').style.display = "none";
//     document.getElementById('country-output').style.display = "none";
//     document.getElementById('output').style.display = "block";
//     const outputElement = document.getElementById('output');
//     outputElement.innerHTML = "";
//     outputElement.innerHTML = "Loading books...";
    
//     const query = document.getElementById("input").value;
//     fetch(`http://openlibrary.org/search.json?q=${query}`)
//     .then(response => response.json())
//     .then(data => {
//         if (data.docs.length === 0) {
//             outputElement.innerHTML = "<p>No books found.</p>";
//             return;
//         }
        
//         let booksHTML = '';
//         data.docs.forEach(book => {
//             const isbn = book.isbn ? book.isbn[0] : null;
//             if (isbn) { 
//                 // Skip books without ISBN
//                 const coverImage = `<img src='http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg' alt='Book cover'><br>`;
//                 booksHTML += `<div class="book">${coverImage}</div>`;
//             }
//         });

//         if (booksHTML === '') {
//             outputElement.innerHTML = "<p>No books with covers available.</p>";
//         } else {
//             outputElement.innerHTML = booksHTML;
//         }
//     })
//     .catch(error => {
//         outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
//     });
// }




// books by details
// function getBooksByName(){
//     document.getElementById('welcome-books').style.display="none";
//     const outputElement = document.getElementById('output');
//     outputElement.innerHTML = "";
//     outputElement.innerHTML = "Loading books...";
    
//     const query = document.getElementById("input").value;
//     fetch(`http://openlibrary.org/search.json?q=${query}`)
//     .then(response => response.json())
//     .then(data => {
//         if (data.docs.length === 0) {
//             outputElement.innerHTML = "<p>No books found.</p>";
//             return;
//         }
        
//         let booksHTML = '';
//         data.docs.forEach(book => {
//             const title = book.title || "No title available";
//             const author = book.author_name ? book.author_name[0] : "Unknown author";
//             const isbn = book.isbn ? book.isbn[0] : null;
//             const coverImage = isbn ? `<img src='http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg'><br>` : "<p>No cover image available</p>";

//             // booksHTML += `<h2>${title}</h2>${author}<br>${coverImage}<br>`;
//             booksHTML += `<div class="book">${coverImage}</div>`;
//         });

//         outputElement.innerHTML = booksHTML;
//     })
//     .catch(error => {
//         outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
//     });
// }

function getBooksByAuthor() {
    document.getElementById('welcome-books').style.display="none";
    document.getElementById('category-output').style.display = "none";
    document.getElementById('country-output').style.display = "none";
    document.getElementById('output').style.display = "block";
    document.getElementById('country-select').value = "choose-country";
    document.getElementById('category-input').value = "choose-category";
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = "";
    
    const authorQuery = document.getElementById("input").value;
    fetch(`http://openlibrary.org/search.json?author=${encodeURIComponent(authorQuery)}`)
    .then(response => response.json())
    .then(data => {
        if (data.docs.length === 0) {
            outputElement.innerHTML = "<p>No books found for this author.</p>";
            return;
        }

        let booksHTML = '';
        data.docs.forEach(book => {
            const title = book.title || "No title available";
            const author = book.author_name ? book.author_name[0] : "Unknown author";
            const isbn = book.isbn ? book.isbn[0] : null;
            const coverImage = isbn ? `<img src='http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg'><br>` : "<p>No cover image available</p>";

            booksHTML += `
                    <div class="book">
                        ${coverImage}
                        <div class="book-info">
                            <h3>${title}</h3>
                            <p>${author}</p>
                        </div>
                    </div>`;
        });

        outputElement.innerHTML = booksHTML;
    })
    .catch(error => {
        outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
    });
}

async function searchByCategory() {
    document.getElementById('welcome-books').style.display="none";
    document.getElementById('category-output').style.display = "block";
    document.getElementById('country-output').style.display = "none";
    document.getElementById('output').style.display = "none";
    document.getElementById('country-select').value = "choose-country";
    document.getElementById('input').value = "";
    
    const category = document.getElementById('category-input').value;
    const outputElement = document.getElementById('category-output');
    outputElement.innerHTML = "Loading books...";

    try {
        const response = await fetch(`http://openlibrary.org/subjects/${category}.json?limit=10`);
        const data = await response.json();

        if (data.works && data.works.length > 0) {
            let booksHTML = '';

            data.works.forEach(book => {
                const title = book.title || "No title available";
                const author = book.authors && book.authors.length > 0 ? book.authors[0].name : "Unknown author";
                const coverImage = book.cover_id ? `<img src='http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg'><br>` : "<p>No cover image available</p>";

                booksHTML += `
                <div class="book">
                    ${coverImage}
                    <div class="book-info">
                        <h3>${title}</h3>
                        <p>${author}</p>
                    </div>
                </div>`;
            });

            outputElement.innerHTML = booksHTML;
        } else {
            outputElement.innerHTML = "<p>No books found for this category.</p>";
        }
    } catch (error) {
        outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
    }
}

async function fetchByCategory(category) {
    
    document.getElementById('welcome-books').style.display = "none";
    document.getElementById('category-output').style.display = "block";
    document.getElementById('country-output').style.display = "none";
    document.getElementById('country-select').value = "choose-country";
    document.getElementById('category-input').value = "choose-category";
    document.getElementById('output').style.display = "none";
    document.getElementById('input').value = "";
   
    const outputElement = document.getElementById('category-output');
    outputElement.innerHTML = "Loading books...";

    try {
        
        const response = await fetch(`http://openlibrary.org/subjects/${category}.json?limit=10`);
        const data = await response.json();
        console.log(data); // Log the response to check its structure

        if (data.works && data.works.length > 0) {
            let booksHTML = '';

            data.works.forEach(book => {
                const title = book.title || "No title available";
                const author = book.authors && book.authors.length > 0 ? book.authors[0].name : "Unknown author";
                const coverImage = book.cover_id ? `<img src='http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg'><br>` : "<p>No cover image available</p>";

                booksHTML += `
                    <div class="book">
                        ${coverImage}
                        <div class="book-info">
                            <h3>${title}</h3>
                            <p>${author}</p>
                        </div>
                    </div>`;
            });

            outputElement.innerHTML = booksHTML;
        } else {
            outputElement.innerHTML = "<p>No books found for this category.</p>";
        }
    } catch (error) {
        outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
    }
}





async function searchByCountry() {
    document.getElementById('welcome-books').style.display="none";
    document.getElementById('category-output').style.display = "none";
    document.getElementById('country-output').style.display = "block";
    document.getElementById('output').style.display = "none";
    document.getElementById('input').value = "";
    const country = document.getElementById('country-select').value;
   
    document.getElementById('category-input').value = "choose-category";
    const outputElement = document.getElementById('country-output');
    outputElement.innerHTML = "Loading books...";

    if (!country) {
        outputElement.innerHTML = "<p>Please select a country.</p>";
        return;
    }

    try {
        
        const response = await fetch(`http://openlibrary.org/search.json?q=${encodeURIComponent(country)}&limit=10`);
        const data = await response.json();

        // console.log(data); // Log the entire response for debugging

        if (data.docs && data.docs.length > 0) {
            let booksHTML = '';

            data.docs.forEach(book => {
                const title = book.title || "No title available";
                const author = book.author_name ? book.author_name[0] : "Unknown author";
                const isbn = book.isbn ? book.isbn[0] : null;
                const coverImage = isbn ? `<img src='http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg'><br>` : "<p>No cover image available</p>";

                booksHTML += `
                    <div class="book">
                        ${coverImage}
                        <div class="book-info">
                            <h3>${title}</h3>
                            <p>${author}</p>
                        </div>
                    </div>`;
            });

            outputElement.innerHTML = booksHTML;
        } else {
            outputElement.innerHTML = "<p>No books found for this country.</p>";
        }
    } catch (error) {
        outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
    }
}

const list = document.getElementById('list-view');
list.addEventListener('click', function() {
    const containerIds = ['welcome-books', 'category-output', 'country-output', 'output'];

for (let i = 0; i < containerIds.length; i++) {
    const container = document.getElementById(containerIds[i]);
    container.classList.add('flex-view');
    container.classList.remove('grid-view');
}

});

const grid = document.getElementById('grid-view');
grid.addEventListener('click', function() {
    const containerIds = ['welcome-books', 'category-output', 'country-output', 'output'];

    for (let i = 0; i < containerIds.length; i++) {
        const container = document.getElementById(containerIds[i]);
        container.classList.add('grid-view');
        container.classList.remove('flex-view');
    }
    

});




// async function searchByLanguage() {
//     document.getElementById('welcome-books').style.display="none";
//     const languageCode = document.getElementById('language-select').value;
//     const outputElement = document.getElementById('language-output');
//     outputElement.innerHTML = "Loading books...";

//     // Check if a language code is selected
//     if (!languageCode) {
//         outputElement.innerHTML = "<p>Please select a language.</p>";
//         return;
//     }

//     try {
//         // Use the language code to influence the search results
//         const response = await fetch(`http://openlibrary.org/search.json?language:${languageCode}&limit=10`);
//         const data = await response.json();

//         console.log(data); // Log the entire response for debugging

//         if (data.docs && data.docs.length > 0) {
//             let booksHTML = '';

//             data.docs.forEach(book => {
//                 const title = book.title || "No title available";
//                 const author = book.author_name ? book.author_name[0] : "Unknown author";
//                 const isbn = book.isbn ? book.isbn[0] : null;
//                 const coverImage = isbn ? `<img src='http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg'><br>` : "<p>No cover image available</p>";

//                 booksHTML += `<div class="book"><h2>${title}</h2>${author}<br>${coverImage}</div>`;
//             });

//             outputElement.innerHTML = booksHTML;
//         } else {
//             outputElement.innerHTML = "<p>No books found for this language.</p>";
//         }
//     } catch (error) {
//         outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
//     }
// }

// async function searchByYear() {
//     document.getElementById('welcome-books').style.display="none";
//     const year = document.getElementById('year-select').value;
//     const outputElement = document.getElementById('year-output');
//     outputElement.innerHTML = "Loading books...";

//     if (!year) {
//         outputElement.innerHTML = "<p>Please select a year.</p>";
//         return;
//     }

//     try {
//         const response = await fetch(`http://openlibrary.org/search.json?first_publish_year=${year}&limit=10`);
//         const data = await response.json();
//         // console.log(data);

//         if (data.docs && data.docs.length > 0) {
//             let booksHTML = '';

//             data.docs.forEach(book => {
//                 const title = book.title || "No title available";
//                 const author = book.author_name ? book.author_name[0] : "Unknown author";
//                 const isbn = book.isbn ? book.isbn[0] : null;
//                 const coverImage = isbn ? `<img src='http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg'><br>` : "<p>No cover image available</p>";

//                 booksHTML += `<div class="book"><h2>${title}</h2>${author}<br>${coverImage}</div>`;
//             });

//             outputElement.innerHTML = booksHTML;
//         } else {
//             outputElement.innerHTML = "<p>No books found for this year.</p>";
//         }
//     } catch (error) {
//         outputElement.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
//     }
// }





