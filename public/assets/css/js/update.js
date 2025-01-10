document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const newsId = params.get("id");

    if (newsId) {
        // Charger les données de l'article existant
        fetch(`/api/news/${newsId}`)
            .then((response) => response.json())
            .then((news) => {
                document.getElementById("title").value = news.title;
                document.getElementById("content").value = news.content;
            })
            .catch((err) => console.error("Erreur lors de la récupération de l'article :", err));
    }

    document.getElementById("update-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        fetch(`/api/news/${newsId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
        })
            .then((response) => response.json())
            .then(() => {
                alert("Article mis à jour avec succès !");
                window.location.href = "/";
            })
            .catch((err) => console.error("Erreur lors de la mise à jour de l'article :", err));
    });
});
