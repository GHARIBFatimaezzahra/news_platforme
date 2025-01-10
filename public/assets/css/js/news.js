document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const newsDetails = document.getElementById('news-details');

    if (!articleId) {
        newsDetails.innerHTML = `<div class="alert alert-danger">Aucun article sélectionné.</div>`;
        return;
    }

    try {
        const response = await fetch(`/api/news/${articleId}`);
        const article = await response.json();

        if (response.ok) {
            newsDetails.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">${article.title}</h2>
                        <p class="card-text">${article.body}</p>
                        <p><small class="text-muted">ID: ${article.id}</small></p>
                    </div>
                </div>
            `;
        } else {
            newsDetails.innerHTML = `<div class="alert alert-warning">Article introuvable.</div>`;
        }
    } catch (error) {
        console.error('Erreur:', error);
        newsDetails.innerHTML = `<div class="alert alert-danger">Erreur serveur.</div>`;
    }
});
