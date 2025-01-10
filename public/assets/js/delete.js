document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const newsId = params.get("id");
    const articleName = document.getElementById("article-name");

    if (newsId) {
        fetch(`/api/news/${newsId}`)
            .then((response) => response.json())
            .then((news) => {
                articleName.textContent = news.title;
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération de l'article :", err);
                articleName.textContent = "Erreur : Article introuvable.";
            });

        document.getElementById("delete-confirm").addEventListener("click", () => {
            fetch(`/api/news/${newsId}`, {
                method: "DELETE",
            })
                .then(() => {
                    alert("Article supprimé avec succès !");
                    window.location.href = "/";
                })
                .catch((err) => console.error("Erreur lors de la suppression de l'article :", err));
        });
    } else {
        articleName.textContent = "Aucun article sélectionné.";
    }
});
