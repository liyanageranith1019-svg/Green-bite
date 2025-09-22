const container = document.getElementById('recipesContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const modal = document.getElementById('recipeModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalIngredients = document.getElementById('modalIngredients');
const modalSteps = document.getElementById('modalSteps');
const modalNutrition = document.getElementById('modalNutrition').querySelector('tbody');
const closeModal = document.querySelector('.close');

let recipes = [];


fetch('food.json')
    .then(response => response.json())
    .then(data => {
        recipes = data;
        populateCategories();
        renderRecipes();
    });


function populateCategories() {
    const categories = [...new Set(recipes.map(r => r.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}


function renderRecipes(filterName = '', filterCategory = 'all') {
    container.innerHTML = '';
    const filtered = recipes.filter(r => 
        r.name.toLowerCase().includes(filterName.toLowerCase()) &&
        (filterCategory === 'all' || r.category === filterCategory)
    );

    filtered.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="card-content">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
            </div>
        `;
        card.addEventListener('click', () => openModal(recipe));
        container.appendChild(card);
    });
}


function openModal(recipe) {
    modalTitle.textContent = recipe.name;
    modalImage.src = recipe.image;
    modalIngredients.innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
    modalSteps.innerHTML = recipe.steps.map(s => `<li>${s}</li>`).join('');
    modalNutrition.innerHTML = Object.entries(recipe.nutrition).map(([nutrient, value]) =>
        `<tr><td>${nutrient}</td><td>${value}</td></tr>`
    ).join('');
    modal.style.display = 'block';
}


closeModal.onclick = () => modal.style.display = 'none';
window.onclick = e => { if(e.target === modal) modal.style.display = 'none'; }

// search
searchInput.addEventListener('input', () => renderRecipes(searchInput.value, categoryFilter.value));
categoryFilter.addEventListener('change', () => renderRecipes(searchInput.value, categoryFilter.value));

// footer
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("footer a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); 
      const text = link.textContent.trim();

      
      navigator.clipboard.writeText(text).then(() => {
        alert(`${text} copied to clipboard!`);
      });
    });
  });
});
