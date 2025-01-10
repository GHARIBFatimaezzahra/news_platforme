// Vérifie si l'utilisateur est authentifié
async function verifyAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
}

// Récupère les articles de l'utilisateur connecté
async function fetchUserNews() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/news/mine', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Impossible de charger vos articles.');
        }

        const data = await response.json();
        displayUserNews(data.news);
    } catch (error) {
        console.error('Erreur:', error);
        showError('Erreur lors du chargement des articles.');
    }
}

// Affiche les articles de l'utilisateur connecté
function displayUserNews(news) {
    const container = document.getElementById('user-news-container');
    container.innerHTML = '';

    if (news.length === 0) {
        container.innerHTML = '<p class="text-center">Aucun article trouvé.</p>';
        return;
    }

    news.forEach(article => {
        container.innerHTML += `
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.body.substring(0, 100)}...</p>
                        <div class="d-flex justify-content-between">
                            <a href="news.html?id=${article.id}" class="btn btn-primary">Voir</a>
                            <button class="btn btn-warning" onclick="editNews('${article.id}')">Modifier</button>
                            <button class="btn btn-danger" onclick="deleteNews('${article.id}')">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Supprime un article
async function deleteNews(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/news/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'article.');
        }

        alert('Article supprimé avec succès.');
        fetchUserNews(); // Rafraîchit la liste des articles
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de supprimer cet article.');
    }
}

// Affiche un message d'erreur
function showError(message) {
    const container = document.getElementById('user-news-container');
    container.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}

// Redirige vers la page d'édition
function editNews(id) {
    window.location.href = `edit.html?id=${id}`;
}

// Gère la déconnexion
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    verifyAuth();
    fetchUserNews();
    document.getElementById('logout-btn').addEventListener('click', logout);
});
