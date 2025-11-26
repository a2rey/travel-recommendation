const search = document.getElementById('btnSearch');
const keywordsInput = document.getElementById('keywordsInput');
const clear = document.getElementById('clearResults');
const bookBtn = document.getElementById('book');

function searchResults(keywords) {
    fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        if (keywords.trim() === 'countries') {
            data['countries'].forEach(destination => {
                document.getElementsByClassName('recommendations')[0].innerHTML = `<div id="top"></div>`;
                destination.cities.forEach(city => {
                    const recommendationDiv = document.createElement('div');
                    recommendationDiv.className = 'recommendation-item';
                    const img = document.createElement('img');
                    img.src = city.imageUrl;
                    const title = document.createElement('h3');
                    title.textContent = city.name;
                    const description = document.createElement('p');
                    description.textContent = city.description;
                    const btnVisit = document.createElement('button');
                    btnVisit.textContent = 'Visit';
                    recommendationDiv.appendChild(img);
                    recommendationDiv.appendChild(title);
                    recommendationDiv.appendChild(description);
                    recommendationDiv.appendChild(btnVisit);
                    document.getElementsByClassName('recommendations')[0].appendChild(recommendationDiv);
                });
            });
        } else if (data[keywords.trim()]) {
            document.getElementsByClassName('recommendations')[0].innerHTML = `<div id="top"></div>`;
            data[keywords.trim()].forEach(destination => {
                const recommendationDiv = document.createElement('div');
                recommendationDiv.className = 'recommendation-item';
                const img = document.createElement('img');
                img.src = destination.imageUrl;
                const title = document.createElement('h3');
                title.textContent = destination.name;
                const description = document.createElement('p');
                description.textContent = destination.description;
                const btnVisit = document.createElement('button');
                btnVisit.textContent = 'Visit';
                recommendationDiv.appendChild(img);
                recommendationDiv.appendChild(title);
                recommendationDiv.appendChild(description);
                recommendationDiv.appendChild(btnVisit);
                document.getElementsByClassName('recommendations')[0].appendChild(recommendationDiv);
            });
        } else if (keywords.trim() === '') {
            document.getElementsByClassName('recommendations')[0].style.visibility = 'hidden';
            alert('No keywords were given.');
        } 
    })
    .catch(error => {
        console.error('Error fetching recommendations:', error);
        const recommendationDiv = document.createElement('div');
        recommendationDiv.className = 'recommendation-item';
        const message = document.createElement('p');
        message.textContent = 'Error fetching recommendations. Please try again later.';
        recommendationDiv.appendChild(message);
        document.getElementsByClassName('recommendations')[0].appendChild(recommendationDiv);
    });
}

search.addEventListener('click', () => {
    searchResults(keywordsInput.value.toLowerCase());
    document.getElementsByClassName('recommendations')[0].style.visibility = 'visible';
});

clear.addEventListener('click', () => {
    keywordsInput.value = '';
    document.getElementsByClassName('recommendations')[0].innerHTML = '';
    document.getElementsByClassName('recommendations')[0].style.visibility = 'hidden';
});

