 
 
async function displayBooks() {
  let response = await fetch('https://openlibrary.org/people/mekBot/books/already-read.json');
  let result = await response.json();
  console.log(result.reading_log_entries);

  let boxa = ``;
  
  for (let i = 0; i < result.reading_log_entries.length; i++) {
    let entry = result.reading_log_entries[i];  
  
    boxa += `
      <div class="card">
        <img src="https://covers.openlibrary.org/b/id/${entry.work.cover_id}-M.jpg" onerror="this.onerror=null;this.src='images/1760517-M.jpg';" alt="${entry.work.title}">
        <h4>${entry.work.title}</h4>
        <p>by ${entry.work.author_names}</p>
        <span>First published: ${entry.work.first_publish_year}</span>
      </div>
    `;
  }

  document.getElementById('book-card').innerHTML = boxa;
}

displayBooks();



const spinnerLayer = document.querySelector('.spinner-layer');
setTimeout(() => {
  spinnerLayer.style.display = 'none';
}, 5000); 


 