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

        {
            category: "Wedding Collection",
            title: "Wedding Celebration Hamper",
            image: "https://placehold.co/800x800/f7f3ec/b98b4d?text=Wedding+Hamper",
            description: "Elegant wedding hampers curated with premium ingredients and beautiful packaging for unforgettable celebrations.",
            items: [
                "Honey",
                "Dry Fruits",
                "Coffee",
                "Luxury Box",
                "Custom Card"
            ]
        },

        {
            category: "Birthday Collection",
            title: "Birthday Surprise Box",
            image: "https://placehold.co/800x800/f7f3ec/b98b4d?text=Birthday+Hamper",
            description: "A joyful birthday hamper featuring gourmet treats, handcrafted honey and thoughtful keepsakes.",
            items: [
                "Honey",
                "Chocolate",
                "Coffee",
                "Mini Plant",
                "Greeting Card"
            ]
        },

        {
            category: "Housewarming",
            title: "Housewarming Gift Hamper",
            image: "https://placehold.co/800x800/f7f3ec/b98b4d?text=Housewarming",
            description: "Celebrate a new beginning with premium honey, aromatic spices and artisan lifestyle essentials.",
            items: [
                "Honey",
                "Spices",
                "Coffee",
                "Decor",
                "Wooden Tray"
            ]
        },

        {
            category: "Festive Collection",
            title: "Festive Celebration Hamper",
            image: "https://placehold.co/800x800/f7f3ec/b98b4d?text=Festive+Hamper",
            description: "Thoughtfully curated festive hampers filled with warmth, flavour and handcrafted goodness.",
            items: [
                "Honey",
                "Tea",
                "Dry Fruits",
                "Spices",
                "Decor"
            ]
        },

        {
            category: "Corporate Collection",
            title: "Corporate Signature Hamper",
            image: "https://placehold.co/800x800/f7f3ec/b98b4d?text=Corporate+Hamper",
            description: "Premium gifting solutions designed for clients, employees and corporate celebrations.",
            items: [
                "Coffee",
                "Honey",
                "Notebook",
                "Pen",
                "Branding"
            ]
        }

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