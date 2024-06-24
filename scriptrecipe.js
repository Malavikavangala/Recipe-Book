document.addEventListener('DOMContentLoaded', () => {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const mainContent = document.getElementById('main-content');
    const homeLink = document.getElementById('home-link');
    const addLink = document.getElementById('add-link');
    const searchInput = document.getElementById('search');

    // Display all recipes initially
    displayRecipes(recipes);

    // Event listener for home link
    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        displayRecipes(recipes);
    });

    // Event listener for add link
    addLink.addEventListener('click', (event) => {
        event.preventDefault();
        showAddForm();
    });

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredRecipes = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm)
        );
        displayRecipes(filteredRecipes);
    });

    function displayRecipes(recipesToDisplay) {
        mainContent.innerHTML = '';
        recipesToDisplay.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            // Check if image URL exists or use a default image
            const imageUrl = recipe.image || 'https://via.placeholder.com/300';

            recipeCard.innerHTML = `
                <img src="${imageUrl}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p><strong>Category:</strong> ${recipe.category}</p>
                <p><strong>Ingredients:</strong></p>
                <p>${recipe.ingredients}</p>
                <p><strong>Instructions:</strong></p>
                <p>${recipe.instructions}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            mainContent.appendChild(recipeCard);

            // Attach event listener for delete button
            const deleteButton = recipeCard.querySelector('.delete-btn');
            deleteButton.addEventListener('click', () => {
                deleteRecipe(index);
            });
        });
    }

    function deleteRecipe(index) {
        recipes = recipes.filter((_, i) => i !== index);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes(recipes);
    }

    function showAddForm() {
        mainContent.innerHTML = `
            <section>
                <h2>New Recipe</h2>
                <form id="add-recipe-form">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required>
                    
                    <label for="category">Category:</label>
                    <select id="category" name="category" required>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                    </select>
                    
                    <label for="ingredients">Ingredients:</label>
                    <textarea id="ingredients" name="ingredients" required></textarea>
                    
                    <label for="instructions">Instructions:</label>
                    <textarea id="instructions" name="instructions" required></textarea>
                    
                    <label for="image">Image URL:</label>
                    <input type="text" id="image" name="image">
                    
                    <button type="submit">Add Recipe</button>
                </form>
            </section>
        `;

        const addRecipeForm = document.getElementById('add-recipe-form');
        addRecipeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const newRecipe = {
                title: addRecipeForm.title.value.trim(),
                category: addRecipeForm.category.value,
                ingredients: addRecipeForm.ingredients.value.trim(),
                instructions: addRecipeForm.instructions.value.trim(),
                image: addRecipeForm.image.value.trim()
            };

            recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            displayRecipes(recipes);
            
            addRecipeForm.reset();
        });
    }
});
