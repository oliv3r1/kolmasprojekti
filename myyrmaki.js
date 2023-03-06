const url = "https://www.sodexo.fi/ruokalistat/output/weekly_json/152";
const menuContainer = document.getElementById("menu-container");
const weekdays = [
  "Sunnuntai",
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai"
];

function changeScript() {
    const script = document.getElementById('script');
    if (script.src.endsWith('index.js')) {
      script.src = 'index.js';
    } else {
      script.src = 'myyrmaki.js';
    }
  }
  

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const restaurantName = data.meta.ref_title;
    const mealDates = data.mealdates;
    const currentDate = new Date();
    const currentWeekday = weekdays[currentDate.getDay()].toLowerCase();
    const todaysLunchList = mealDates.find(
      (e) => e.date.toLowerCase() === currentWeekday
    );
    
    console.log(mealDates)
    const menuItems = todaysLunchList.courses;

    const menuList = document.createElement("ul");
    menuList.innerHTML = `<h3>${currentWeekday}</h3>`;
    console.log(menuList.innerHTML);
    Object.keys(menuItems).forEach((key) => {
      const menuItem = menuItems[key];
      const menuItemElement = document.createElement("li");
      const menuItemName = menuItem.title_fi;
      const menuItemProperties = `Diet codes: ${menuItem.dietcodes}, Price: ${menuItem.price}`;
      menuItemElement.textContent = `${menuItemName} (${menuItemProperties})`;
      menuList.appendChild(menuItemElement);
    });
    menuContainer.innerHTML = `<h2 style="color: orange">${restaurantName}</h2>`;
    menuContainer.appendChild(menuList);
  })
  .catch((error) => console.log(error));





const myCarouselElement = document.querySelector('#myCarousel')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})