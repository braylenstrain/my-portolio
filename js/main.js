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
const modalSmallVisible = '.modal--small.modal--visible';
const root = document.documentElement;
const dataFilter = '[data-filter]';
const filterLink = 'filter-link';
const portfolioData = '[data-card]';




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
const portfolioWrapper = document.getElementById('cardWrapper');
const searchBox = document.getElementById('search');

//Array of card and small modal data
const cardArr = [
  {
    filterType: "html/css",
    imgSrc: "/images/croppedface.jpg",
    imgAlt: "My cropped face",
    href:"https://www.google.com",
    popupH3: "No Seriously",
    modalId: "card1",
    modalTitle: "",
    modalText: "",
    modalLink: ""
  },
  {
    filterType: "javascript",
    imgSrc: "/images/2022_05_01_10n_Kleki.png",
    imgAlt: "Stickman",
    href:"https://www.facebook.com",
    popupH3: "Seriously",
    modalId: "card2",
    modalTitle: "",
    modalText: "",
    modalLink: ""
  },
  {
    filterType: "html/css",
    imgSrc: "images/2022_05_01_111_Kleki.png",
    imgAlt: "Ninja smiley",
    href:"https://www.linkedin.com",
    popupH3: "WAAAAHHH",
    modalId: "card3",
    modalTitle: "",
    modalText: "",
    modalLink: ""
  },
  {
    filterType: "javascript",
    imgSrc: "images/2022_05_01_115_Kleki.png",
    imgAlt: "Normal Smiley",
    href:"https://www.github.com",
    popupH3: "Goodbye",
    modalId: "card4",
    modalTitle: "",
    modalText: "",
    modalLink: ""
  },
  {
    filterType: "react",
    imgSrc: "/images/croppedface.jpg",
    imgAlt: "My face again",
    href:"https://www.twitter.com",
    popupH3: "Another cropped face",
    modalId: "card5",
    modalTitle: "",
    modalText: "",
    modalLink: ""
  },
  {
    filterType: "java",
    imgSrc: "images/20220313_170715.jpg",
    imgAlt: "My car",
    href:"https://www.instagram.com",
    popupH3: "My Car",
    modalId: "card6",
    modalTitle: "asdfasd",
    modalText: "asdfsadf",
    modalLink: "https://www.google.com"
  }
]

//input card elements into html document
for (const {filterType, imgSrc, imgAlt, href, popupH3, modalId} of cardArr) {
  portfolioWrapper.innerHTML +=
  `<div class="portfolio__card" data-card="${filterType}" data-open="${modalId}">
    <div class="card__body">
      <img src="${imgSrc}" alt="${imgAlt}">
      <div class="card__popup">
        <div>${filterType}</div>
        <h3>${popupH3}</h3>
      </div>
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
      if (filter === 'all') {
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




/* Modals */
const allModalOpen = document.querySelectorAll(modalOpen);
const allModalClose = document.querySelectorAll(modalClose);
const portfolioModalsWrapper = document.getElementById('portfolioModalsWrapper');

//Add click event for opening modals
for (const elm of allModalOpen) {
  elm.addEventListener('click', function() {
    const modalId = this.dataset.open;

    //Add portfolio modal if doesn't exist
    if (document.getElementById(modalId) === null) {
      for (const i of cardArr) {
        if (i.modalId === modalId) {
          addModal(i);
          break;
        }
      }
    }

    setTimeout(() => {
//Make modal visible
document.getElementById(modalId).classList.add(modalVisible);
    }, 10)

  })
}

//Add click event to close modals with X button
for (const elm of allModalClose) {
  elm.addEventListener('click', function() {
    this.parentElement.parentElement.parentElement.classList.remove(modalVisible);
  })
}

//Add click event to close small modals by clicking background
document.addEventListener('click', e => {
  if (e.target === document.querySelector(modalSmallVisible)) {
    document.querySelector(modalSmallVisible).classList.remove(modalVisible);
  }
})

//Allow escape key to exit small modal
document.addEventListener('keyup', e => {
  if (e.key === 'Escape' && document.querySelector(modalSmallVisible) !== null) {
    document.querySelector(modalSmallVisible).classList.remove(modalVisible);
  }
})

//Add portfolio modal based on parameter data
function addModal({modalId, popupH3, imgSrc, imgAlt, modalText, modalTitle, modalLink}) {
  portfolioModalsWrapper.insertAdjacentHTML('beforeend',
  `<div id="${modalId}" class="modal--small" data-animation="slideInOutTop">
    <div class="modal__dialog--small">
      <header class="modal__header">
        <h3>${popupH3}</h3>
        <i class="fas fa-times" data-close></i>
      </header>

      <div class="modal__body">
        <div class="modal__img-wrapper--small">
          <img src="${imgSrc}" alt="${imgAlt}">
        </div>

        <div class="modal__text--small">
          <p><strong>${modalTitle}</strong></p>
          <p>${modalText}</p>
          <a href="${modalLink}" target="_blank">Click here to view the project: ${modalLink}</a>
        </div>
      </div>
    </div>
  </div>`)

  document.getElementById(modalId).querySelector('[data-close]').addEventListener('click', function() {
    this.parentElement.parentElement.parentElement.classList.remove(modalVisible);
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