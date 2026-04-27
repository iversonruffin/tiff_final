/*
  window.addEventListener("scroll", () => {
    const box = document.querySelector(".floating-box");
    let offset = window.scrollY * 0.5; // adjust speed
    box.style.transform = `translateY(${offset}px)`;
  });
*/



const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

const callback = (entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;

    if (entry.isIntersecting) {
      // remove active from all first
      navLinks.forEach((l) => l.classList.remove("active2"));
      link.classList.add("active2");
    } else {
      // when a section leaves the screen, make sure its link is not active
      link.classList.remove("active2");
    }
  });
};

const observer = new IntersectionObserver(callback, {
  root: null,
  threshold: .8, // tweak for when you want the highlight to trigger
});

const callbacks = (entries) => {
  
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("hey");
        entry.target.classList.remove("showFadeInLeft");
        entry.target.classList.add('showFadeInLeft');
      }else{
        entry.target.classList.remove("showFadeInLeft");
      }
      //animate__animated animate__fadeInDown
    });
}

const callbacks2 = (entries) => {
  
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("hey");
      entry.target.classList.remove("showFadeInRight");
      entry.target.classList.add('showFadeInRight');
    }else{
      entry.target.classList.remove("showFadeInRight");
    }
    //animate__animated animate__fadeInDown
  });
}

const observer2 = new IntersectionObserver(callbacks, {
  root: null,
  threshold: .25, // tweak for when you want the highlight to trigger
});

const observer3 = new IntersectionObserver(callbacks2, {
  root: null,
  threshold: .25, // tweak for when you want the highlight to trigger
});


document.querySelectorAll('.fade-in-right').forEach(el => observer3.observe(el));
document.querySelectorAll('.fade-in-left').forEach(el => observer2.observe(el));


sections.forEach((s) => observer.observe(s));





//DIFFERENT CODE
$(function(){
    $('.tm-gallery').slick({
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 2,
      responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
    });
  });