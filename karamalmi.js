const url = "https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=fi";
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



fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const restaurantName = data.RestaurantName + " Karamalmi";
    const mealDates = data.MenusForDays;
    const currentDate = new Date();
    const currentWeekday = weekdays[currentDate.getDay()];
    const todaysLunchList = mealDates.find(
      (e) => {
        const date = new Date(e.Date);
        const weekday = weekdays[date.getDay()];
        return weekday === currentWeekday;
      }
    );
    if (!todaysLunchList) {
      menuContainer.innerHTML = "No menu for today.";
      return;
    }
    const menuItems = todaysLunchList.SetMenus;
    const menuList = document.createElement("ul");
    menuList.innerHTML = `<h3>${currentWeekday}</h3>`;
    menuItems.forEach((menuItem) => {
      const menuItemElement = document.createElement("li");
      const menuItemName = menuItem.Components;
      const menuItemProperties = `Price: ${menuItem.Price}`;
      menuItemElement.textContent = `${menuItemName} (${menuItemProperties})`;
      menuList.appendChild(menuItemElement);
    });
    menuContainer.innerHTML = `<h2 style="color: black">${restaurantName}</h2>`;
    menuContainer.appendChild(menuList);
  })
  .catch((error) => console.log(error));