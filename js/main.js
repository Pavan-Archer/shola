(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar — simplified to avoid layout shifts
  $(window).on("scroll resize", function () {
    if ($(this).scrollTop() > 45) {
      $(".fixed-top").addClass("bg-dark shadow");
    } else {
      $(".fixed-top").removeClass("bg-dark shadow");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
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
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

/*==================================
      SHOLA PRODUCT SHOWCASE
==================================*/

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".shola-tab");

  if (!tabs.length) return;

  /* ==================================
        SHOLA COLLECTION DATA
  ================================== */

  const collections = [
    {
      category: "Signature Collection",

      description:
        "Thoughtfully curated, consciously crafted: signature hampers designed for sustainable luxury and memorable rituals.",

      products: [
        {
          title: "The Canopy Collection",

          image:
            "https://placehold.co/700x700/f7f3ec/b98b4d?text=Wooden+Tray+Curation",

          description:
            "A rustic blend of pure honey, rich coffee, and bold pepper, paired with handcrafted wooden essentials for your daily ritual.",

          features: [
            "Raw Pure Honey",
            "Single-Origin Aromatic Pepper",
            "Freshly Packed Coffee Powder",
            "Matching Bowl",
            "Nuts Tube",
          ],
        },

        {
          title: "The Aesthetic Coffee Experience",

          image:
            "https://placehold.co/700x700/f7f3ec/b98b4d?text=Aesthete+Coffee+Experience",

          description:
            "A cozy, aromatic ritual packed into a stunning keepsake rigid box.",

          features: [
            "Authentic Premium Coffee Powder",
            "Traditional Brass Coffee Cup & Saucer",
            "Hand-Poured Coffee-Scented Soy Candle",
            "Nuts Tube",
          ],
        },
      ],
    },

    {
      category: "Premium Collection",

      description:
        "Elegant rigid-box hampers ideal for corporate gifting, professional appreciation, and high-profile celebrations.",

      products: [
        {
          title: "The Heritage Crate",

          image:
            "https://placehold.co/700x700/f7f3ec/b98b4d?text=Premium+Collection",

          description:
            "An elegant rigid-box hamper created for corporate gifting, professional appreciation, and high-profile celebrations.",

          features: [
            "Pure Raw Honey",
            "Premium Roasted Coffee",
            "Whole Black Pepper",
            "Nuts Tube",
          ],
        },
      ],
    },

    {
      category: "Curated Hampers",

      description:
        "Compact blend of bold flavors and comforting rituals, perfectly sized for a meaningful thank-you or a personal treat.",

      products: [
        {
          title: "The Sweet & Spice Blend",

          image:
            "https://placehold.co/700x700/f7f3ec/b98b4d?text=Sweet+%26+Spice",

          description:
            "A perfect balance of sweet warmth and bold spice in a curated paper bag, ideal for wellness lovers and gourmet collections.",

          features: [
            "Premium Raw Honey",
            "Whole Black Pepper",
            "Traditional Wooden Honey Dripper",
            "Personalized Message Card",
          ],
        },

        {
          title: "Morning Brew Ritual",

          image:
            "https://placehold.co/700x700/f7f3ec/b98b4d?text=Morning+Brew+Ritual",

          description:
            "The ultimate morning upgrade that pairs rich coffee with the natural sweetness of pure honey.",

          features: [
            "Rich Coffee Powder",
            "Premium Honey",
            "Traditional Wooden Honey Dripper",
            "Personalized Message Card",
          ],
        },

        {
          title: "Bold Mix of Brew & Spice",

          image:
            "https://placehold.co/700x700/f7f3ec/b98b4d?text=Brew+%26+Spice",

          description:
            "An earthy, robust combination designed for those who appreciate deep, intense, and sophisticated flavors.",

          features: [
            "Rich Coffee Powder",
            "Whole Black Pepper",
            "Nuts Tube",
            "Personalized Message Card",
          ],
        },
      ],
    },

    {
      category: "Mini Hampers",

      description:
        "Simple, thoughtful gifts designed to make a big impression. The perfect token of appreciation for large groups and celebrations.",

      products: [
        {
          title: "Gift-lets",

          image: "https://placehold.co/700x700/f7f3ec/b98b4d?text=Mini+Hamper",

          description:
            "A simple and thoughtful gift designed to make a big impression—perfect for celebrations, giveaways, and meaningful thank-you gestures.",

          features: ["Raw Honey", "Nuts Tube", "Personalized Note"],
        },
      ],
    },
  ];

  /* ==================================
        HTML ELEMENTS
  ================================== */

  const image = document.getElementById("productImage");
  const category = document.getElementById("productCategory");
  const title = document.getElementById("productTitle");
  const description = document.getElementById("productDescription");
  const features = document.getElementById("productFeatures");

  /*
    Optional:
    If you have a container for multiple product buttons/cards,
    give it this ID:

    <div id="productSelector"></div>
  */

  const productSelector = document.getElementById("productSelector");

  /* ==================================
        SHOW PRODUCT
  ================================== */

  function showProduct(product, collection) {
    if (!product) return;

    // Update image immediately
    productImage.src = product.image;
    productImage.alt = product.title;

    // Update category immediately
    productCategory.textContent = collection.category;

    // Update title immediately
    productTitle.textContent = product.title;

    // Update description immediately
    productDescription.textContent = product.description;

    // Update features immediately
    productFeatures.innerHTML = "";

    product.features.forEach(function (feature) {
      const chip = document.createElement("span");

      chip.textContent = feature;

      productFeatures.appendChild(chip);
    });

    // Make sure nothing is hidden
    productImage.classList.remove("fade-out");
    productCategory.classList.remove("fade-out");
    productTitle.classList.remove("fade-out");
    productDescription.classList.remove("fade-out");
    productFeatures.classList.remove("fade-out");
  }

  /* ==================================
        CREATE PRODUCT SELECTOR
  ================================== */

  function createProductSelector(collection) {
    productSelector.innerHTML = "";

    if (collection.products.length <= 1) {
      productSelector.style.display = "none";
      return;
    }

    productSelector.style.display = "flex";

    collection.products.forEach(function (product, index) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "shola-product-selector";
      button.textContent = product.title;

      if (index === 0) {
        button.classList.add("active");
      }

      button.addEventListener("click", function (event) {
        event.preventDefault();

        // Remove active from all product buttons
        productSelector
          .querySelectorAll(".shola-product-selector")
          .forEach(function (btn) {
            btn.classList.remove("active");
          });

        // Activate clicked button
        button.classList.add("active");

        // Immediately show selected product
        showProduct(product, collection);
      });

      productSelector.appendChild(button);
    });
  }

  /* ==================================
        COLLECTION TABS
  ================================== */

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");

      const collectionIndex = Number(this.dataset.collection);

      const collection = collections[collectionIndex];

      if (!collection) return;

      // Show first product initially
      const firstProduct = collection.products[0];

      createProductSelector(collection);

      showProduct(firstProduct, collection);
    });
  });

  /* ==================================
        INITIAL COLLECTION
  ================================== */

  const activeTab = document.querySelector(".shola-tab.active") || tabs[0];

  if (activeTab) {
    activeTab.click();
  }
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

  function openImage(index) {
    currentIndex = index;

    const img = galleryItems[index].querySelector("img");

    lightboxImage.src = img.src;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
  }

  function closeImage() {
    lightbox.classList.remove("active");

    document.body.style.overflow = "";
  }

  function nextImage() {
    currentIndex++;

    if (currentIndex >= galleryItems.length) {
      currentIndex = 0;
    }

    lightboxImage.src = galleryItems[currentIndex].querySelector("img").src;
  }

  function prevImage() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = galleryItems.length - 1;
    }

    lightboxImage.src = galleryItems[currentIndex].querySelector("img").src;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openImage(index);
    });
  });

  closeBtn.addEventListener("click", closeImage);

  nextBtn.addEventListener("click", nextImage);

  prevBtn.addEventListener("click", prevImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeImage();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeImage();
    }

    if (e.key === "ArrowRight") {
      nextImage();
    }

    if (e.key === "ArrowLeft") {
      prevImage();
    }
  });
});
/* ------------------------------------------
   SHOLA ART CARD CAROUSEL (Bootstrap-based)
   Swipe support (Bootstrap 5.0 has none built-in)
------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.querySelector(".shola-art-carousel");
  if (!carousel || !window.bootstrap || !bootstrap.Carousel) return;

  // Bootstrap auto-initializes via data-bs-ride; reuse that instance
  var instance = bootstrap.Carousel.getOrCreateInstance(carousel, { interval: 4500 });

  var startX = 0, startY = 0, drag = false;

  carousel.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    drag = true;
  }, { passive: true });

  carousel.addEventListener("touchmove", function (e) {
    if (!drag || e.touches.length !== 1) return;
    var dx = e.touches[0].clientX - startX;
    var dy = e.touches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  carousel.addEventListener("touchend", function (e) {
    if (!drag || !e.changedTouches.length) return;
    drag = false;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < 30 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) { instance.next(); } else { instance.prev(); }
  }, { passive: true });
});
