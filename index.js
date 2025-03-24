document.addEventListener("DOMContentLoaded", function () {
    // Sidebar toggle function
    function toggleNav() {
        let sidebar = document.getElementById("sidebar");
        sidebar.style.left = sidebar.style.left === "0px" ? "-250px" : "0px";
    }

    document.querySelector(".menu-icon").addEventListener("click", toggleNav);
    document.querySelector(".close-btn").addEventListener("click", toggleNav);



    // Profile picture handling
    const profilePic = document.getElementById("profilePic");
    const uploadInput = document.getElementById("uploadProfilePic");
    const changePicBtn = document.getElementById("changePicBtn");
    const deletePicBtn = document.getElementById("deletePicBtn");
    const defaultImage = "./profil-pic.png"; // Default image path

    // Function to open overlay with enlarged image
    profilePic.addEventListener("click", function () {
        // Remove existing overlay if it exists
        const existingOverlay = document.getElementById("imgOverlay");
        if (existingOverlay) {
            existingOverlay.remove();
        }

        // Create overlay
        const overlay = document.createElement("div");
        overlay.id = "imgOverlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.background = "rgba(0, 0, 0, 0.7)";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "1000";

        // Create enlarged image
        const enlargedImg = document.createElement("img");
        enlargedImg.src = profilePic.src;
        enlargedImg.style.width = "300px";
        enlargedImg.style.height = "300px";
        enlargedImg.style.borderRadius = "50%";
        enlargedImg.style.border = "5px solid white";
        enlargedImg.style.cursor = "pointer";

        // Create button container
        const btnContainer = document.createElement("div");
        btnContainer.style.display = "flex";
        btnContainer.style.gap = "10px";
        btnContainer.style.marginTop = "10px";

        // Create new buttons
        const newChangePicBtn = document.createElement("button");
        newChangePicBtn.textContent = "Modifier";
        newChangePicBtn.style.backgroundColor = "#7c3aed";
        newChangePicBtn.style.color = "white";
        newChangePicBtn.style.padding = "10px 15px";
        newChangePicBtn.style.border = "none";
        newChangePicBtn.style.borderRadius = "5px";
        newChangePicBtn.style.cursor = "pointer";
        newChangePicBtn.addEventListener("click", function () {
            uploadInput.click();
        });

        const newDeletePicBtn = document.createElement("button");
        newDeletePicBtn.textContent = "Supprimer";
        newDeletePicBtn.style.backgroundColor = "red";
        newDeletePicBtn.style.color = "white";
        newDeletePicBtn.style.padding = "10px 15px";
        newDeletePicBtn.style.border = "none";
        newDeletePicBtn.style.borderRadius = "5px";
        newDeletePicBtn.style.cursor = "pointer";
        newDeletePicBtn.addEventListener("click", function () {
            const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer votre photo de profil ?");
            if (confirmDelete) {
                profilePic.src = defaultImage; // Reset profile image
                enlargedImg.src = defaultImage; // Update enlarged image
                localStorage.removeItem("profileImage"); // Remove from local storage
                overlay.remove(); // Close overlay after deleting
            }
        });
        

        // Append buttons to the button container
        btnContainer.appendChild(newChangePicBtn);
        btnContainer.appendChild(newDeletePicBtn);

        // Append everything to overlay
        overlay.appendChild(enlargedImg);
        overlay.appendChild(btnContainer);
        document.body.appendChild(overlay);

        // Close overlay when clicking outside
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                overlay.remove();
            }
        });
    });

    // Upload profile picture
    uploadInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result; // Update profile picture
                localStorage.setItem("profileImage", e.target.result); // Save to local storage

                // Also update enlarged image if overlay is open
                const enlargedImg = document.querySelector("#imgOverlay img");
                if (enlargedImg) {
                    enlargedImg.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved profile picture from local storage
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        profilePic.src = savedImage;
    }

    // Save and restore user details
    const saveBtn = document.querySelector(".save-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const inputs = document.querySelectorAll(".input-box input");

    function loadProfileData() {
        inputs.forEach(input => {
            const savedValue = localStorage.getItem(input.id);
            if (savedValue) {
                input.value = savedValue;
            }
        });
    }

    saveBtn.addEventListener("click", function () {
        inputs.forEach(input => {
            localStorage.setItem(input.id, input.value);
        });
        alert("Informations enregistrées avec succès !");
    });

    cancelBtn.addEventListener("click", function () {
        loadProfileData();
        alert("Modifications annulées !");
    });

    loadProfileData();

    // Toggle password visibility
    const togglePassword = document.querySelector(".toggle-password");
    const passwordInput = document.getElementById("password");

    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        });
    }
});



// ajouter le track de cours
// Exécute le code après le chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
    // Sélection des éléments HTML où on va afficher les cours et les statistiques
    const courseTableBody = document.getElementById("courseTableBody");
    const skillsList = document.getElementById("skillsList");
    const totalCourses = document.getElementById("totalCourses");
    const completedCourses = document.getElementById("completedCourses");
    const averageProgress = document.getElementById("averageProgress");

    // Liste des cours suivis (exemple de données simulées)
    const courses = [
        {
            title: "React & Next.js",
            progress: 100, // Progression en pourcentage
            startDate: "01/03/2024",
            endDate: "01/04/2024",
            completed: true, // Cours terminé ?
            skills: ["React", "Next.js", "State Management"] // Compétences acquises
        },
        {
            title: "SQL & NoSQL",
            progress: 80,
            startDate: "10/03/2024",
            endDate: "10/04/2024",
            completed: false,
            skills: ["SQL", "NoSQL", "Database Optimization"]
        },
        {
            title: "Python Basics",
            progress: 60,
            startDate: "15/03/2024",
            endDate: "15/04/2024",
            completed: false,
            skills: ["Python", "Scripting", "Data Structures"]
        }
    ];

    /**
     * Fonction pour afficher les cours suivis dynamiquement
     */
    function loadCourses() {
        courseTableBody.innerHTML = ""; // Vide la table avant d'ajouter les nouvelles données
        let completedCount = 0; // Compteur de cours terminés
        let totalProgress = 0; // Somme des pourcentages de progression

        courses.forEach(course => {
            const row = document.createElement("tr"); // Création d'une nouvelle ligne pour chaque cours

            row.innerHTML = `
                <td>${course.title}</td>
                <td>
                    <div class="progress-bar">
                        <span style="width: ${course.progress}%;"></span>
                    </div>
                    ${course.progress}%
                </td>
                <td>${course.startDate}</td>
                <td>${course.endDate}</td>
                <td>${course.completed ? "✅ Terminé" : "⌛ En cours"}</td>
            `;

            courseTableBody.appendChild(row); // Ajout de la ligne au tableau

            // Mise à jour du compteur des cours terminés
            if (course.completed) completedCount++;

            // Ajout de la progression totale pour le calcul de la moyenne
            totalProgress += course.progress;
        });

        // Mise à jour des statistiques globales
        totalCourses.textContent = courses.length; // Nombre total de cours
        completedCourses.textContent = completedCount; // Nombre de cours terminés
        averageProgress.textContent = Math.round(totalProgress / courses.length) + "%"; // Moyenne de progression
    }

    /**
     * Fonction pour afficher les compétences acquises à partir des cours terminés
     */
    function loadSkills() {
        skillsList.innerHTML = ""; // Vide la liste avant d'ajouter les nouvelles compétences
        const allSkills = new Set(); // Utilisation d'un Set pour éviter les doublons

        // Parcourt les cours terminés pour récupérer les compétences associées
        courses.forEach(course => {
            if (course.completed) {
                course.skills.forEach(skill => allSkills.add(skill));
            }
        });

        // Ajoute chaque compétence unique à la liste
        allSkills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    }

    // Chargement initial des cours et des compétences
    loadCourses();
    loadSkills();
});
