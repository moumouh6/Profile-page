
function toggleNav() {
    let sidebar = document.getElementById("sidebar");
    
    // Vérifie si la sidebar est déjà visible
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px"; // Cache la sidebar
    } else {
        sidebar.style.left = "0px"; // Affiche la sidebar
    }
}
    

    // Sélection de l'image de profil
    const profilePic = document.querySelector(".profile-pic");

    // Ajouter un événement au clic sur l'image de profil
    profilePic.addEventListener("click", function () {
        // Créer une div pour l'overlay sombre
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.background = "rgba(0, 0, 0, 0.7)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "1000";

        // Créer une image agrandie
        const enlargedImg = document.createElement("img");
        enlargedImg.src = profilePic.src;
        enlargedImg.style.width = "300px";
        enlargedImg.style.height = "300px";
        enlargedImg.style.borderRadius = "50%";
        enlargedImg.style.border = "5px solid white";
        enlargedImg.style.cursor = "pointer";

        // Ajouter l'image agrandie à l'overlay
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);

        // Ajouter un événement pour fermer l'image agrandie en cliquant sur l'overlay
        overlay.addEventListener("click", function () {
            document.body.removeChild(overlay);
        });
    });

    document.querySelectorAll(".site-mzl").forEach(button => {
        button.addEventListener("click", () => {
            alert("cette page n'est pas accessible pour le moment!");
        });
    });


    // modifier la photo de profile

    document.addEventListener("DOMContentLoaded", function () {
        const profilePic = document.getElementById("profilePic");
        const uploadInput = document.getElementById("uploadProfilePic");
        const changePicBtn = document.getElementById("changePicBtn");
        const deletePicBtn = document.getElementById("deletePicBtn");
    
        const defaultImage = "./profil-pic.png"; // Image par défaut
    
        // Ouvrir le sélecteur de fichier
        changePicBtn.addEventListener("click", function () {
            uploadInput.click();
        });
    
        // Lorsque l'utilisateur sélectionne une nouvelle image
        uploadInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePic.src = e.target.result; // Afficher la nouvelle image
                    localStorage.setItem("profileImage", e.target.result); // Sauvegarde locale
                };
                reader.readAsDataURL(file);
            }
        });
    
        // Bouton pour supprimer la photo et remettre l'image par défaut
        deletePicBtn.addEventListener("click", function () {
            profilePic.src = defaultImage; // Remettre l'image par défaut
            localStorage.removeItem("profileImage"); // Supprimer du stockage local
        });
    
        // Charger l'image depuis le stockage local si elle existe
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            profilePic.src = savedImage;
        }
    });

    
    // enregistrer et supprimer les infos

    document.addEventListener("DOMContentLoaded", function () {
        const saveBtn = document.querySelector(".save-btn");
        const cancelBtn = document.querySelector(".cancel-btn");
    
        // Sélectionner tous les champs d'entrée du formulaire
        const inputs = document.querySelectorAll(".input-box input");
    
        // Charger les données enregistrées
        function loadProfileData() {
            inputs.forEach(input => {
                const savedValue = localStorage.getItem(input.id);
                if (savedValue) {
                    input.value = savedValue;
                }
            });
        }
    
        // Sauvegarder les informations du profil
        saveBtn.addEventListener("click", function () {
            inputs.forEach(input => {
                localStorage.setItem(input.id, input.value);
            });
            alert("Informations enregistrées avec succès !");
        });
    
        // Annuler les modifications et revenir aux dernières valeurs enregistrées
        cancelBtn.addEventListener("click", function () {
            loadProfileData();
            alert("Modifications annulées !");
        });
    
        // Charger les données enregistrées au chargement de la page
        loadProfileData();
    });
    
    // afficher et masquer le mot de passe 
    const togglePassword = document.querySelector(".toggle-password");
    const passwordInput = document.getElementById("password");

    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        });
    }