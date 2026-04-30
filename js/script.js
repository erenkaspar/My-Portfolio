const parallaxObjects = document.querySelectorAll('.parallax-obj');
const heroSection = document.querySelector('.section-hero');

let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

let ticking = false; 

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});

heroSection.addEventListener('mousemove', (e) => {
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;
  
  mouseX = e.clientX - centerX;
  mouseY = e.clientY - centerY;
  
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});

heroSection.addEventListener('mouseleave', () => {
  mouseX = 0;
  mouseY = 0;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});

function updateParallax() {
  if (scrollY > heroSection.offsetHeight) return; 

  parallaxObjects.forEach(obj => {
    let speed = parseFloat(obj.getAttribute('data-speed'));
    let xPos = mouseX * speed;
    let yPos = (mouseY * speed) + (scrollY * speed * 2);
    obj.style.transform = `translate(${xPos}px, ${yPos}px)`;
  });
}

///////- Terminal -///////
const output = document.getElementById('terminal-output');

const contactData = [
  { label: "Email", value: "erenkaspar@gmail.com", link: "mailto:erenkaspar@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/erenkaspar", link: "https://www.linkedin.com/in/erenkaspar" },
  { label: "GitHub", value: "github.com/erenkaspar", link: "https://github.com/erenkaspar" },
  { label: "Location", value: "Rize, Turkey", link: null }
];

async function runTerminal() {
  if (!output || output.innerHTML !== "") return;

  const msg = document.createElement('p');
  msg.className = 'terminal-output-text';
  msg.innerText = "> Fetching contact details...";
  output.appendChild(msg);
  
  await new Promise(r => setTimeout(r, 1000));

  for (const item of contactData) {
    const div = document.createElement('div');
    div.className = 'terminal-link-item';
    
    if (item.link) {
      div.innerHTML = `${item.label}: <a href="${item.link}" target="_blank">${item.value}</a>`;
    } else {
      div.innerHTML = `${item.label}: ${item.value}`;
    }
    
    output.appendChild(div);
    await new Promise(r => setTimeout(r, 500));
  }
}

const observer = new IntersectionObserver((entries) => {
  if(entries[0].isIntersecting) runTerminal();
}, { threshold: 0.5 });

observer.observe(document.querySelector('.terminal-container'));