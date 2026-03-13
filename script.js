let spinner = document.getElementById("spinner");
let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");

function createAndAppendSearchResult(result) {

    let {
        title,
        link,
        description
    } = result;
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResults.appendChild(resultItem);

    //Anchore
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItem.appendChild(titleEl);
    //URL
    let urlEl=document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href=link;
    urlEl.target="_blank";
    urlEl.textContent=link;
    resultItem.appendChild(urlEl);
    //description
    let descriptionEl=document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent=description;
    resultItem.appendChild(descriptionEl);
}

function displayResults(search_results) {
    spinner.classList.add("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }

}

function searchWikipedia(Event) {
    spinner.classList.remove("d-none");
    if (Event.key === "Enter") {

        let searchInputValue = searchInput.value;
        let options = {
            method: "GET"
        };
        fetch(`https://apis.ccbp.in/wiki-search?search=${searchInputValue}`, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInput.addEventListener("keydown", searchWikipedia);