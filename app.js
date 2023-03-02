const searchedMealsList = document.getElementById("searched-meals-list-div");
const noResultDiv = document.getElementById("noResultDiv");
const mealDiv = document.getElementById("meal-details-div");
const input = document.getElementById("inputText");


function warn(text) {
    mealDiv.classList = "d-none";
    searchedMealsList.classList = 'd-none';
    noResultDiv.innerHTML = `
    <h4 class="d-block text-center text-danger">
        ${text}
    </h4>`
}

// search meals by first letter
const searchMealByLetter = () => {
    searchedMealsList.innerHTML = '';
    mealDiv.innerHTML = '';
    const hasLetterOnly = input.value.match(/^[A-Za-z]+$/);

    if (input.value.length > 1) {
        warn("Only single character allowed");
    }
    else if (input.value.length === 0 || hasLetterOnly === null) {
        warn("Please input a letter");
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
    mealDiv.classList = "d-flex";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => mealIngredientDetails(data.meals[0]));
}

const mealIngredientDetails = (meal) => {
    mealDiv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <div>
            <h2>${meal.strMeal}</h2>
            <h5>${meal.strArea} ${meal.strCategory}</h5>
            <ul>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
                <li>${meal.strIngredient6}</li>
                <li class=${!meal.strIngredient7 && 'd-none'} >${meal.strIngredient7}</li>
                <li class=${!meal.strIngredient8 && 'd-none'} >${meal.strIngredient8}</li>
                <li class=${!meal.strIngredient9 && 'd-none'} >${meal.strIngredient9}</li>
            </ul>
        </div>
    `
}