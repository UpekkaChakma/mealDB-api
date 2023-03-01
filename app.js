const searchedMealsList = document.getElementById("searched-meals-list-div");
const noResultDiv = document.getElementById("noResultDiv");
const mealDiv = document.getElementById("meal-details-div");
const input = document.getElementById("inputText");

// search meals by first letter
const searchMealByLetter = () => {
    searchedMealsList.innerHTML = '';
    mealDiv.innerHTML = '';

    if (input.value.length > 1) {
        mealDiv.classList = "d-none";
        searchedMealsList.classList = 'd-none';
        noResultDiv.innerHTML = `
        <h4 class="d-block text-center text-danger">
            Only single character allowed
        </h4>`;
    }
    else if (input.value.length === 0) {
        mealDiv.classList = "d-none";
        searchedMealsList.classList = "d-none";
        noResultDiv.innerHTML = `
        <h4 class="d-block text-center text-danger">
            Please input a letter
        </h4>`;
    } else {
        noResultDiv.innerHTML = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input.value}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchedResult(data.meals));
        input.value = "";
    }
}



// display searched results    
const displaySearchedResult = (meals) => {
    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        searchedMealsList.classList = 'd-grid';
        mealDiv.className = 'single-meal-div';
        const mealInfo = `
        <div onclick = "mealIngredient('${meal.strMeal}')">
            <img src = "${meal.strMealThumb}">
        </div>
        `
        mealDiv.innerHTML = mealInfo;
        searchedMealsList.appendChild(mealDiv);
    });
}



// showing clicked meal ingredients
const mealIngredient = (mealName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => mealIngredientDetails(data.meals[0]));
}




const mealIngredientDetails = (meal) => {
    mealDiv.classList = "d-flex";
    mealDiv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <div>
            <h2>${meal.strMeal}</h2>
            <ul>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
                <li>${meal.strIngredient6}</li>
                <li>${meal.strIngredient7}</li>
                <li>${meal.strIngredient8}</li>
                <li>${meal.strIngredient9}</li>
            </ul>
        </div>
    `
}