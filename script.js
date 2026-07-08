const API_KEY = "d97a3615ec6349e38a1bb94f37cd879b";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const newsContainer = document.getElementById("newsContainer");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (query === "") {
        alert("Please enter a search term.");
        return;
    }

    getNews(query);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

async function getNews(query) {

    newsContainer.innerHTML = "<h2 class='loading'>Loading News...</h2>";

    const today = new Date();
    const lastMonth = new Date(today);

    lastMonth.setMonth(today.getMonth() - 1);

    const fromDate = lastMonth.toISOString().split("T")[0];

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=${fromDate}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${API_KEY}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        if (data.status !== "ok") {
            newsContainer.innerHTML = `<h2>${data.message}</h2>`;
            return;
        }

        displayNews(data.articles);

    } catch (error) {

        newsContainer.innerHTML =
            "<h2>Unable to fetch news.</h2>";

        console.error(error);
    }
}

function displayNews(articles) {

    newsContainer.innerHTML = "";

    if (articles.length === 0) {
        newsContainer.innerHTML = "<h2>No News Found.</h2>";
        return;
    }

    articles.forEach(article => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${article.urlToImage || 'https://picsum.photos/600/400'}">

            <div class="content">

                <h2>${article.title}</h2>

                <p>${article.description || "No description available."}</p>

                <small>
                    <strong>${article.source.name}</strong><br>
                    ${new Date(article.publishedAt).toLocaleString()}
                </small>

                <br><br>

                <a href="${article.url}" target="_blank">
                    Read Full Article →
                </a>

            </div>
        `;

        newsContainer.appendChild(card);

    });
}

// Load default news
getNews("Technology");