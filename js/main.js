(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar — simplified to avoid layout shifts
    $(window).on('scroll resize', function () {
        if ($(this).scrollTop() > 45) {
            $('.fixed-top').addClass('bg-white shadow');
        } else {
            $('.fixed-top').removeClass('bg-white shadow');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


})(jQuery);

/*==================================
      SHOLA PRODUCT SHOWCASE
==================================*/

document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".shola-tab");

    if (!tabs.length) return;

    const products = [

        {
            category: "Signature Collection",
            title: "Wild Forest Honey Hamper",
            image: "https://placehold.co/700x700/f7f3ec/b98b4d?text=Wild+Forest+Honey",
            description: "Premium raw honey harvested from the forests of the Western Ghats, beautifully paired with handcrafted gourmet delights.",
            features: ["Raw Honey", "Artisan Made", "Sustainable"]
        },

        {
            category: "Coffee Collection",
            title: "Malnad Coffee Box",
            image: "https://placehold.co/700x700/f7f3ec/b98b4d?text=Malnad+Coffee",
            description: "Freshly roasted single-origin coffee sourced from the finest estates of Karnataka, packed for unforgettable gifting.",
            features: ["Single Origin", "Fresh Roast", "Premium Beans"]
        },

        {
            category: "Spice Collection",
            title: "Heritage Spice Box",
            image: "https://placehold.co/700x700/f7f3ec/b98b4d?text=Heritage+Spices",
            description: "Discover authentic Malnad spices carefully selected to bring rich aroma and traditional flavours into every kitchen.",
            features: ["Organic", "Farm Fresh", "Traditional"]
        },

        {
            category: "Wedding Collection",
            title: "Wedding Gift Hamper",
            image: "https://placehold.co/700x700/f7f3ec/b98b4d?text=Wedding+Hamper",
            description: "Elegant handcrafted hampers curated for weddings, engagements and life's most cherished celebrations.",
            features: ["Luxury", "Custom", "Elegant"]
        },

        {
            category: "Wellness Collection",
            title: "Nature's Wellness Basket",
            image: "https://placehold.co/700x700/f7f3ec/b98b4d?text=Wellness+Basket",
            description: "A mindful collection of natural honey, herbal products and wellness essentials inspired by nature.",
            features: ["Healthy", "Natural", "Eco Friendly"]
        },

        {
            category: "Corporate Collection",
            title: "Corporate Signature Box",
            image: "https://placehold.co/700x700/f7f3ec/b98b4d?text=Corporate+Gift",
            description: "Premium corporate gifting solutions designed to leave a lasting impression on clients and teams alike.",
            features: ["Custom Branding", "Bulk Orders", "Premium"]
        }

    ];

    const image = document.getElementById("productImage");
    const category = document.getElementById("productCategory");
    const title = document.getElementById("productTitle");
    const description = document.getElementById("productDescription");
    const features = document.getElementById("productFeatures");

    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            tabs.forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

            const product = products[this.dataset.product];

            image.classList.add("fade-out");
            category.classList.add("fade-out");
            title.classList.add("fade-out");
            description.classList.add("fade-out");
            features.classList.add("fade-out");

            setTimeout(() => {

                image.src = product.image;

                category.textContent = product.category;

                title.textContent = product.title;

                description.textContent = product.description;

                features.innerHTML = "";

                product.features.forEach(feature => {

                    const chip = document.createElement("span");

                    chip.textContent = feature;

                    features.appendChild(chip);

                });

                image.classList.remove("fade-out");
                category.classList.remove("fade-out");
                title.classList.remove("fade-out");
                description.classList.remove("fade-out");
                features.classList.remove("fade-out");

            }, 250);

        });

    });

});

/*==================================
        SHOLA GALLERY
==================================*/

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = document.querySelectorAll(".shola-gallery-item");
    const lightbox = document.querySelector(".shola-lightbox");
    const lightboxImage = document.getElementById("sholaLightboxImage");

    const closeBtn = document.querySelector(".shola-lightbox-close");
    const prevBtn = document.querySelector(".shola-lightbox-prev");
    const nextBtn = document.querySelector(".shola-lightbox-next");

    if (!galleryItems.length) return;

    let currentIndex = 0;

    function openImage(index){

        currentIndex = index;

        const img = galleryItems[index].querySelector("img");

        lightboxImage.src = img.src;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeImage(){

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

    function nextImage(){

        currentIndex++;

        if(currentIndex >= galleryItems.length){

            currentIndex = 0;

        }

        lightboxImage.src =
        galleryItems[currentIndex]
        .querySelector("img").src;

    }

    function prevImage(){

        currentIndex--;

        if(currentIndex < 0){

            currentIndex =
            galleryItems.length - 1;

        }

        lightboxImage.src =
        galleryItems[currentIndex]
        .querySelector("img").src;

    }


    galleryItems.forEach((item,index)=>{

        item.addEventListener("click",()=>{

            openImage(index);

        });

    });


    closeBtn.addEventListener("click",closeImage);

    nextBtn.addEventListener("click",nextImage);

    prevBtn.addEventListener("click",prevImage);


    lightbox.addEventListener("click",(e)=>{

        if(e.target===lightbox){

            closeImage();

        }

    });


    document.addEventListener("keydown",(e)=>{

        if(!lightbox.classList.contains("active")) return;

        if(e.key==="Escape"){

            closeImage();

        }

        if(e.key==="ArrowRight"){

            nextImage();

        }

        if(e.key==="ArrowLeft"){

            prevImage();

        }

    });

});
