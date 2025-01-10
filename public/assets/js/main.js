async function fetchLatestNews() {
    try {
        const response = await fetch('/api/news'); // Appelle l'API pour récupérer les articles
        const data = await response.json();
        displayNews(data.posts); // Appelle la fonction pour afficher les articles
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles'); // Affiche une erreur si la récupération échoue
    }
}

// QUESTION 1 : Compléter la fonction displayNews dans main.js


function displayNews(news) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Vide le conteneur avant d'ajouter du contenu

    news.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('col-md-4', 'fade-in'); // Ajoute une classe personnalisée pour l'animation
        newsCard.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.body.length > 100 ? article.body.substring(0, 100) + '...' : article.body}</p>
                    <a href="news.html?id=${article.id}" class="btn btn-primary">Lire plus</a>
                </div>
            </div>
        `;

        container.appendChild(newsCard);
    });
}

/**
 * Affiche un message d'erreur Bootstrap si les articles ne peuvent pas être chargés.
 */
function showError(message) {
    const container = document.getElementById('news-container');
    container.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}

/**
 * Déconnecte l'utilisateur et redirige vers la page de connexion.
 */
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Animation CSS ajoutée aux articles
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeIn 0.5s forwards;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Lance la récupération et l'affichage des articles au chargement de la page
document.addEventListener('DOMContentLoaded', fetchLatestNews);
