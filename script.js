
const revealElements = document.querySelectorAll(
  "section, .card, .project, .phone"
);

const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add("show");

    }

  });

}, {
  threshold: 0.15
});

revealElements.forEach((el) => {
  revealObserver.observe(el);
});




const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 60) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

});




const counters = document.querySelectorAll(".stats strong");

const animateCounter = (counter) => {

  const target = counter.innerText;

  if (!target.includes("%") && isNaN(parseInt(target))) return;

  let number = parseInt(target);

  if (isNaN(number)) return;

  let count = 0;

  const speed = Math.max(15, 2000 / number);

  const update = () => {

    count++;

    if (count < number) {

      if (target.includes("%")) {

        counter.innerText = count + "%";

      } else {

        counter.innerText = count;

      }

      setTimeout(update, speed);

    } else {

      counter.innerText = target;

    }

  };

  update();

};


const statsObserver = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      counters.forEach(counter=>{

        if(!counter.dataset.started){

          counter.dataset.started = true;

          animateCounter(counter);

        }

      });

    }

  });

},{threshold:0.6});

const stats = document.querySelector(".stats");

if(stats){

  statsObserver.observe(stats);

}





const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const top = section.offsetTop - 150;

    if (pageYOffset >= top) {

      current = section.getAttribute("id");

    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {

      link.classList.add("active");

    }

  });

});





const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "top-button";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

  if(window.scrollY>400){

    topButton.classList.add("show");

  }else{

    topButton.classList.remove("show");

  }

});

topButton.addEventListener("click",()=>{

  window.scrollTo({

    top:0,

    behavior:"smooth"

  });

});





const phone = document.querySelector(".phone");

if(phone){

  phone.addEventListener("mousemove",(e)=>{

    const rect = phone.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateY = (x - rect.width/2) / 25;

    const rotateX = -(y - rect.height/2) / 25;

    phone.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

  });

  phone.addEventListener("mouseleave",()=>{

    phone.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
    `;

  });

}