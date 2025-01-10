document.getElementById("create-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    fetch("/api/news", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
    })
        .then((response) => response.json())
        .then(() => {
            alert("Article créé avec succès !");
            window.location.href = "/";
        })
        .catch((err) => console.error("Erreur lors de la création de l'article :", err));
});
