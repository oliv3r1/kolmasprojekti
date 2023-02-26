const url = "https://www.sodexo.fi/ruokalistat/output/weekly_json/152";
const menuContainer = document.getElementById("menu-container");
const restaurantNameElement = document.getElementById("restaurant-name");

fetch(url)
  .then(response => response.json())
  .then(data => {
    const restaurantName = data.meta.ref_title;
    restaurantNameElement.textContent = restaurantName;
    
    const mealDates = data.mealdates;
    const today = new Date().toLocaleDateString("fi-FI");
    
    const todayMenu = mealDates.find(day => day.date === today);
    if (!todayMenu) {
      const noMenuMessage = document.createElement("p");
      noMenuMessage.textContent = "Valitettavasti tälle päivälle ei löydy ruokalistaa";
      menuContainer.appendChild(noMenuMessage);
      return;
    }
    
    const menuItems = todayMenu.courses;
    const menuList = document.createElement("ul");
    
    Object.keys(menuItems).forEach(key => {
      const menuItem = menuItems[key];
      const menuItemElement = document.createElement("li");
      const menuItemName = menuItem.title_fi;
      const menuItemProperties = `Diet codes: ${menuItem.dietcodes}, Price: ${menuItem.price}`;
      menuItemElement.textContent = `${menuItemName} (${menuItemProperties})`;
      menuList.appendChild(menuItemElement);
    });
    
    menuContainer.appendChild(menuList);
  })
  .catch(error => console.log(error));
