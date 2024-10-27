// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


//  owl carousel script
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
});

//    end owl carousel script 



/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// Function to handle smooth scrolling
function smoothScroll(targetId, duration) {
  const target = document.querySelector(targetId);
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar.offsetHeight;
  let offset = navbarHeight + 20; // Adiciona 20px de espaço extra

  // Adiciona offset extra para a seção "Quem Somos"
  if (targetId === '#about') {
    offset += 50; // Adiciona 50px extras para "Quem Somos"
  }

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Function to handle active menu item
function handleActiveMenuItem() {
  const navItems = document.querySelectorAll('.navbar-nav .nav-item .nav-link');

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor behavior

      // Remove 'active' class from all items
      navItems.forEach(navItem => navItem.classList.remove('active'));
      
      // Add 'active' class to clicked item
      this.classList.add('active');

      // Get the target section id
      const targetId = this.getAttribute('href');

      // Smooth scroll to the target section
      if ('scrollBehavior' in document.documentElement.style) {
        // Use native smooth scrolling if supported
        window.scrollTo({
          top: document.querySelector(targetId).offsetTop - 60, // Adjust for navbar height
          behavior: 'smooth'
        });
      } else {
        // Use custom smooth scrolling for older browsers
        smoothScroll(targetId, 1000); // 1000ms duration
      }
    });
  });

  // Set active class based on URL hash on page load
  function setActiveOnLoad() {
    const hash = window.location.hash;
    if (hash) {
      const activeItem = document.querySelector(`.navbar-nav .nav-link[href="${hash}"]`);
      if (activeItem) {
        navItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
      }
    }
  }

  // Call setActiveOnLoad when the page loads
  window.addEventListener('load', setActiveOnLoad);
}

// Initialize the brands slider
function initBrandsSlider() {
  $('.brands-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 4
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 3
      }
    }]
  });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  handleActiveMenuItem();
  initBrandsSlider();
});

// Fechar o menu mobile ao clicar em um item
document.addEventListener('DOMContentLoaded', function() {
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var navbarCollapse = document.querySelector('.navbar-collapse');
  var bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});

  navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function() {
      if (window.innerWidth < 992) {
        bsCollapse.hide();
      }
    });
  });
});
