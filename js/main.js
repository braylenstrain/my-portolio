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

//Add active class to clicked btn
function setActive(btn, selector) {
  if (!btn.className.includes(active)) {
    document.querySelector(`.${selector}.${active}`).classList.remove(active);
    btn.classList.add(active);
  }
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