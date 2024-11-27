document.addEventListener("DOMContentLoaded", () => {

    const tools = [
        {
            name: "TO-DO List",
            description: "\"List Happens\" ✅—because staying organized doesn't have to be a chore!",
            link: "./prod-tools/todo.html",
        },
        {
            name: "Pomodoro Timer",
            description: "\"Pomodo-more\" 🍅—helping you focus and get more done, one tomato at a time!",
            link: "./prod-tools/pomodoro.html",
        },
        {
            name: "Notes",
            description: "\"Noteworthy\" 🖋️—where your thoughts always make the highlight reel!",
            link: "./prod-tools/notes.html",
        },
    ];


    const developers = [
        { name: "Aryan Dubey", role: "Frontend Developer & Backend Contributor", photo: "./Devimages/WPMe.jpg" },
        { name: "Harsh Dadsena", role: "Frontend Developer", photo: "./Devimages/WPHarshDadsena.jpg" },
        { name: "Navyansh Singh", role: "Frontend Developer", photo: "./Devimages/WPNavyanshSingh.jpg" },
        { name: "Anushka Anil", role: "Backend Developer", photo: "./Devimages/WPAnushkaAnil.jpg" },
        { name: "Abhinav Shrivastava", role: "Backend Developer", photo: "./Devimages/WPAbhinavShrivastava.jpg" },
    ];


    const toolContainer = document.getElementById("tool-blocks");
    if (toolContainer) {
        tools.forEach(tool => {
            const block = document.createElement("a");
            block.href = tool.link;
            block.className = "tool-block";
            block.innerHTML = `
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
            `;
            toolContainer.appendChild(block);
        });
    } else {
        console.error("Tool container (#tool-blocks) not found in the DOM.");
    }

  
    let currentDevIndex = 0;
    const devCard = document.getElementById("developer-card");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (devCard && prevBtn && nextBtn) {
        function renderDeveloper(index) {
            const dev = developers[index];
            devCard.innerHTML = `
                <img src="${dev.photo}" alt="${dev.name}" />
                <h3>${dev.name}</h3>
                <p>${dev.role}</p>
            `;
        }

        prevBtn.addEventListener("click", () => {
            currentDevIndex = (currentDevIndex - 1 + developers.length) % developers.length;
            renderDeveloper(currentDevIndex);
        });

        nextBtn.addEventListener("click", () => {
            currentDevIndex = (currentDevIndex + 1) % developers.length;
            renderDeveloper(currentDevIndex);
        });


        renderDeveloper(currentDevIndex);
    } else {
        console.error("Developer card or navigation buttons not found in the DOM.");
    }
});
