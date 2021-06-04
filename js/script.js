
const submit = document.getElementById('submit');
const search = document.getElementById('search');
const resultHead = document.getElementById('result-heading')
const mealsDisplay = document.getElementById('meals')
const singleMeal = document.getElementById('single-meal')



function searchMeal(e){
  e.preventDefault();
  resultHead.innerHTML = "";
  const term = search.value;
  
  console.log(term);
  if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res=> res.json())
    .then(data =>{ console.log(data);
      resultHead.innerHTML = `<h1> Here is Your '${term}' search result:</h1>`;
      if( data.meals === null){
        resultHead.innerHTML = `<p>No item Is found! Try for another Name. </p>`

      }else{
        mealsDisplay.innerHTML = data.meals
        .map(meal=> `
        <div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class ="meal-info" mealID ="${meal.idMeal}">
        <h3> ${meal.strMeal}</h3>
        </div>
        </div>`).join("");
      }
    });
  
 search.value =null;
  }else{
    alert("Please enter a valid text")
  }
}
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMeal.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    </div>
  </div>`;
}
submit.addEventListener("submit", searchMeal);
mealsDisplay.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});