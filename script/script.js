function saveRecipe() {
    try {
        // Get input values
        let name = document.getElementById("nameInput").value;
        let ingredients = document.getElementById("ingredientInput").value;
        let steps = document.getElementById("stepsInput").value;
        let additionalInformation = document.getElementById("additionalInformationInput").value;

        // Check if any required fields are empty
        if (!name || !ingredients || !steps || !additionalInformation) {
            throw new Error("Please fill in all the required fields.");
        }

        // Create an object to store the recipe data
        let recipe = {
            name: name,
            ingredients: ingredients,
            steps: steps,
            additionalInformation: additionalInformation
        };

        // Check if local storage is available
        if (typeof Storage !== "undefined") {
            // Retrieve existing recipes from local storage or initialize an empty array
            let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

            // Add the new recipe to the array
            recipes.push(recipe);

            // Store the updated array back to local storage
            localStorage.setItem("recipes", JSON.stringify(recipes));

            // Redirect to the home page
      window.location.href = "week_1.html";
      
            alert("Recipe saved successfully!");

            
        } else {
            throw new Error("Local storage is not supported.");
        }
    } catch (error) {
        alert("ERROR: " + error.message);
    }
}


// display the data in the home page
function displayRecipes() {
    // Check if local storage is available
    if (typeof Storage !== "undefined") {
        // Retrieve recipes from local storage
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Reverse the order of recipes
        recipes.reverse();

        // Get the container element where recipes will be displayed
        let recipesContainer = document.getElementById("recipes");

        // Clear the container
        recipesContainer.innerHTML = "";

        // Loop through each recipe and create HTML elements to display them
        recipes.forEach(function (recipe, index) {
            let recipeElement = document.createElement("div");
            recipeElement.classList.add("recipe");

            let imageElement = document.createElement("img");
            imageElement.src = "img/icon2.png";
            imageElement.alt = recipe.name;
            recipeElement.appendChild(imageElement);

            let nameElement = document.createElement("h3");
            nameElement.textContent = recipe.name;
            recipeElement.appendChild(nameElement);

            let descriptionElement = document.createElement("p");
            descriptionElement.textContent = recipe.additionalInformation;
            recipeElement.appendChild(descriptionElement);

            let viewButton = document.createElement("button");
            viewButton.classList.add("button");
            viewButton.textContent = "View More";

            // Add event listener to the view button
            viewButton.addEventListener("click", function () {
                viewRecipeDetails(index);
            });

            recipeElement.appendChild(viewButton);

            recipesContainer.appendChild(recipeElement);
        });
    } else {
        alert("Local storage is not supported.");
    }
}

// Function to view recipe details on a separate page
function viewRecipeDetails(index) {
    // Check if local storage is available
    if (typeof Storage !== "undefined") {
        // Retrieve recipes from local storage
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Reverse the order of recipes to match the displayed order
        recipes.reverse();

        // Check if the index is valid
        if (index >= 0 && index < recipes.length) {
            // Calculate the correct index based on the reversed order
            let selectedRecipeIndex = recipes.length - 1 - index;

            // Store the selected index in local storage
            localStorage.setItem("selectedRecipeIndex", selectedRecipeIndex);

            // Redirect to the recipe details page
            window.location.href = "recipe-details.html";
        } else {
            alert("Invalid recipe index.");
        }
    } else {
        alert("Local storage is not supported.");
    }
}


// view the detail information in the new page

// Function to retrieve the recipe details from local storage
function getRecipeDetails() {
    // Get the selected recipe index from local storage
    let index = localStorage.getItem("selectedRecipeIndex");

    // Check if local storage is available and index is valid
    if (typeof Storage !== "undefined" && index !== null) {
        // Retrieve recipes from local storage
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Check if the index is valid
        if (index >= 0 && index < recipes.length) {
            let recipe = recipes[index];
            // Display the recipe details on the page
            document.getElementById("recipeName").textContent = recipe.name;
            document.getElementById("recipeAdditional").textContent = recipe.additionalInformation;
            document.getElementById("recipeIngredients").innerHTML = formatAsBulletPoints(recipe.ingredients);
            document.getElementById("recipeSteps").innerHTML = formatAsNumberedList(recipe.steps);

            // Create the update button
            let updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.classList.add("button");
            updateButton.addEventListener("click", function () {
                updateRecipe(index);
            });

            // Create the delete button
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("button");
            deleteButton.addEventListener("click", function () {
                deleteRecipe(index);
            });

            // Append the buttons to the page
            document.getElementById("recipeActions").appendChild(updateButton);
            document.getElementById("recipeActions").appendChild(deleteButton);
     
        }
    } else {
        alert("Local storage is not supported.");
    }
}
// Function to format ingredients as bullet points
function formatAsBulletPoints(ingredients) {
    let ingredientsList = ingredients.split("\n");
    let formattedList = "";

    for (let i = 0; i < ingredientsList.length; i++) {
        formattedList += "&#8226; " + ingredientsList[i] + "<br>";
    }

    return formattedList;
}

// Function to format steps as a numbered list
function formatAsNumberedList(steps) {
    let stepsList = steps.split("\n");
    let formattedList = "<ol>";

    for (let i = 0; i < stepsList.length; i++) {
        formattedList += "<li>" + stepsList[i] + "</li>";
    }

    formattedList += "</ol>";

    return formattedList;
}




// Call the displayRecipes function when the page loads
window.addEventListener("load", displayRecipes);
window.addEventListener("DOMContentLoaded", getRecipeDetails);
function searchByName() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let recipes = document.getElementsByClassName("recipe");

    for (let i = 0; i < recipes.length; i++) {
        let recipeName = recipes[i].getElementsByTagName("h3")[0].textContent.toLowerCase();
        if (recipeName.includes(searchInput)) {
            recipes[i].style.display = "block";
        } else {
            recipes[i].style.display = "none";
        }
    }
}

// Event listener for search input
document.getElementById("searchInput").addEventListener("input", searchByName);


// Function to update a recipe
function updateRecipe(index) {
    // Retrieve recipes from local storage
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  
    // Check if the index is valid
    if (index >= 0 && index < recipes.length) {
      let recipe = recipes[index];
  
      // Prompt the user to enter updated values
      let updatedName = prompt("Enter the updated recipe name", recipe.name);
      let updatedIngredients = prompt("Enter the updated ingredients", recipe.ingredients);
      let updatedSteps = prompt("Enter the updated steps", recipe.steps);
      let updatedAdditionalInformation = prompt("Enter the updated additional information", recipe.additionalInformation);
  
      // Check if any required fields are empty
      if (!updatedName || !updatedIngredients || !updatedSteps || !updatedAdditionalInformation) {
        alert("Please fill in all the required fields.");
        return;
      }
  
      // Update the recipe with the new values
      recipe.name = updatedName;
      recipe.ingredients = updatedIngredients;
      recipe.steps = updatedSteps;
      recipe.additionalInformation = updatedAdditionalInformation;
  
      // Update the recipe in the recipes array
      recipes[index] = recipe;
  
      // Store the updated array back to local storage
      localStorage.setItem("recipes", JSON.stringify(recipes));
  
      // Redirect to the home page
      window.location.href = "week_1.html";
    } else {
      alert("Invalid recipe index.");
    }
  }
  
  // Function to delete a recipe
  function deleteRecipe(index) {
    // Retrieve recipes from local storage
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  
    // Check if the index is valid
    if (index >= 0 && index < recipes.length) {
      // Remove the recipe from the recipes array
      recipes.splice(index, 1);
  
      // Store the updated array back to local storage
      localStorage.setItem("recipes", JSON.stringify(recipes));
  
      // Redirect to the home page
      window.location.href = "week_1.html";
    } else {
      alert("Invalid recipe index.");
    }
  }