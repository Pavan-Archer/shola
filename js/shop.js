/*==================================
        SHOLA HAMPERS
==================================*/

document.addEventListener("DOMContentLoaded", function () {

    const hamperTabs = document.querySelectorAll(".shola-hamper-tab");

    if (!hamperTabs.length) return;

    const hampers = [

        {
            category: "Luxury Collection",
            title: "Anniversary Luxury Hamper",
            image: "https://placehold.co/800x800/f7f3ec/b98b4d?text=Anniversary+Hamper",
            description: "Celebrate timeless love with handcrafted honey, artisan coffee, scented candles and a personalized greeting scroll.",
            items: [
                "Raw Honey",
                "Premium Coffee",
                "Candle",
                "Greeting Scroll",
                "Luxury Box"
            ]
        },

       

    ];

    const image = document.getElementById("hamperImage");
    const category = document.getElementById("hamperCategory");
    const title = document.getElementById("hamperTitle");
    const description = document.getElementById("hamperDescription");
    const items = document.getElementById("hamperItems");

    hamperTabs.forEach(tab => {

        tab.addEventListener("click", function () {

            hamperTabs.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const hamper = hampers[this.dataset.hamper];

            image.classList.add("hamper-fade");
            category.classList.add("hamper-fade");
            title.classList.add("hamper-fade");
            description.classList.add("hamper-fade");
            items.classList.add("hamper-fade");

            setTimeout(() => {

                image.src = hamper.image;
                category.textContent = hamper.category;
                title.textContent = hamper.title;
                description.textContent = hamper.description;

                items.innerHTML = "";

                hamper.items.forEach(item => {

                    const chip = document.createElement("span");
                    chip.textContent = item;
                    items.appendChild(chip);

                });

                image.classList.remove("hamper-fade");
                category.classList.remove("hamper-fade");
                title.classList.remove("hamper-fade");
                description.classList.remove("hamper-fade");
                items.classList.remove("hamper-fade");

            }, 300);

        });

    });

});