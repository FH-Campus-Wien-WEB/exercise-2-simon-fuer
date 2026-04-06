window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        const article = document.createElement("article");
        article.id = movie.imdbID;

        //showing the poster
        const poster = document.createElement("img");
        poster.src = movie.Poster;
        poster.alt = movie.Title + " Poster";
        article.appendChild(poster);
        //showing the title
        const title = document.createElement("h2");
        title.textContent = movie.Title;
        article.appendChild(title);
        //add all the meta info
        const metaInfo = document.createElement("p");
        const hours = Math.floor(movie.Runtime / 60);
        const minutes = movie.Runtime % 60;
        const releaseDate = new Date(movie.Released).toLocaleDateString();
        metaInfo.textContent = `Runtime ${hours}h ${minutes}m | Released on ${releaseDate}`;
        article.appendChild(metaInfo);
        //add ratings
        const ratings = document.createElement("p");
        ratings.innerHTML = `<strong>IMDb Rating:</strong> ${movie.imdbRating}/10 | <strong>Metascore:</strong> ${movie.Metascore}/100`;
        article.appendChild(ratings);
        //add genres
        const genres = document.createElement("p");
        movie.Genres.forEach((genre) => {
          const genreSpan = document.createElement("span");
          genreSpan.className = "genre";
          genreSpan.textContent = genre + " ";
          genres.appendChild(genreSpan);
        });
        article.append(genres);
        //add plot
        const plot = document.createElement("p");
        plot.textContent = movie.Plot;
        article.appendChild(plot);
        //add unorderedList to manage Directors, Writers and Actors
        function createList(headingText, itemsArray) {
          const heading = document.createElement("h3");
          heading.textContent = headingText;
          article.appendChild(heading);

          const ul = document.createElement("ul");
          itemsArray.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          article.appendChild(ul);
        }
        createList("Directors", movie.Directors);
        createList("Writers", movie.Writers);
        createList("Actors", movie.Actors);

        //add edit Button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
          location.href = 'edit.html?imdbID=' + movie.imdbID;
        }
        article.appendChild(editButton);

        //adds everything onto the page
        bodyElement.appendChild(article);
      }
    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText,
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
