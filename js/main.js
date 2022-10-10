const theme = 'theme';
const tabStatus = 'tabStatus';
const dataTheme = 'data-theme';
const themeTab = '.theme-toggle__tab';
const switchBtn = 'theme-toggle__switch-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const modalVisible = 'modal--visible';
const root = document.documentElement;
const dataFilter = '[data-filter]';
const filterLink = 'filter-link';
const portfolioData = '[data-card]';
const cardWrapper = 'cardWrapper';
const htmlCss = 'html/css';
const javascript = 'javascript';
const react = 'react';
const java = 'java';
const search = 'search';
const all = 'all';




/* Theme Toggle */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.getElementsByClassName(switchBtn);
const currentTheme = localStorage.getItem(theme);
const checkTabStatus = localStorage.getItem(tabStatus);

//Set correct theme on page load
if (currentTheme && currentTheme === light) {
  root.setAttribute(dataTheme, currentTheme);

  for (const btn of switcher) {
    if (btn.className.includes(active)) {
      btn.classList.remove(active);
    } else {
      btn.classList.add(active);
    }
  }
}

//Set if tab is open or closed ono page load
if (checkTabStatus) {
  toggleTheme.parentElement.classList.remove(open);
}

//Add click event to theme buttons
for (const btn of switcher) {
  btn.addEventListener('click', function() {
    const toggle = this.dataset.toggle;
    setActive(btn, switchBtn);
    setTheme(toggle);
  })
}

//Set theme and save to local storage
function setTheme(val) {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
}

//Toggle tab open/close and save status
toggleTheme.addEventListener('click', function() {
  const tab = this.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
    localStorage.setItem(tabStatus, '');
  } else {
    tab.classList.remove(open);
    localStorage.setItem(tabStatus, 'closed');
  }
})




/* Portfolio */
const filterLinksList = document.querySelectorAll(dataFilter);
const portfolioWrapper = document.getElementById(cardWrapper);
const searchBox = document.getElementById(search);

//Array of card data
const cardArr = [
  {
    filterType: "html/css",
    imgSrc: "/images/croppedface.jpg",
    imgAlt: "My cropped face",
    href:"https://www.google.com",
    popupH3: "No Seriously"
  },
  {
    filterType: "javascript",
    imgSrc: "/images/2022_05_01_10n_Kleki.png",
    imgAlt: "Stickman",
    href:"https://www.facebook.com",
    popupH3: "Seriously"
  },
  {
    filterType: "html/css",
    imgSrc: "images/2022_05_01_111_Kleki.png",
    imgAlt: "Ninja smiley",
    href:"https://www.linkedin.com",
    popupH3: "WAAAAHHH"
  },
  {
    filterType: "javascript",
    imgSrc: "images/2022_05_01_115_Kleki.png",
    imgAlt: "Normal Smiley",
    href:"https://www.github.com",
    popupH3: "Goodbye"
  },
  {
    filterType: "react",
    imgSrc: "/images/croppedface.jpg",
    imgAlt: "My face again",
    href:"https://www.twitter.com",
    popupH3: "Another cropped face"
  },
  {
    filterType: "java",
    imgSrc: "images/20220313_170715.jpg",
    imgAlt: "My car",
    href:"https://www.instagram.com",
    popupH3: "My Car"
  }
]

//input card elements into html document
for (const {filterType, imgSrc, imgAlt, href, popupH3} of cardArr) {
  portfolioWrapper.innerHTML +=
  `<div class="portfolio__card" data-card="${filterType}">
    <div class="card__body">
      <img src="${imgSrc}" alt="${imgAlt}">
      <a class="card__popup" href="${href}" target="_blank">
        <div>${filterType}</div>
        <h3>${popupH3}</h3>
      </a>
    </div>
  </div>`
}

//Must be after cards are created in html document
const portfolioItems = document.querySelectorAll(portfolioData);

//Add click event to filter links
for (const link of filterLinksList) {
  link.addEventListener('click', function() {
    setActive(link, filterLink);

    const filter = link.dataset.filter;
    portfolioItems.forEach(card => {
      if (filter === all) {
        card.style.display = 'block';
      } else if (card.dataset.card === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    })
  })
}

//Add keyup event to search input
searchBox.addEventListener('keyup', e => {
  const searchInput = e.target.value.toLowerCase().trim();

  //Set 'all' as active filterLink
  if (!filterLinksList[0].className.includes(active)) {
    console.log("heyo");
    setActive(filterLinksList[0], filterLink);
  }

  for (const card of portfolioItems) {
    if (card.dataset.card.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }
})




/* Open and Close Modals */
const allModalOpen = document.querySelectorAll(modalOpen);
const allModalClose = document.querySelectorAll(modalClose);

//Add click event to open modals
for (const elm of allModalOpen) {
  elm.addEventListener('click', function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(modalVisible);
  })
}

//Add click event to close modals
for (const elm of allModalClose) {
  elm.addEventListener('click', function() {
    this.parentElement.parentElement.classList.remove(modalVisible);
  })
}




/* General */

//Add active class to clicked element
function setActive(elm, selector) {
  if (!elm.className.includes(active)) {
    document.querySelector(`.${selector}.${active}`).classList.remove(active);
    elm.classList.add(active);
  }
}