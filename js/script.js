const searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener('click', function () {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
      mealsDetails(data.categories)
    })
  const mealsDetails = meals => {
    for (let i = 0; i < meals.length; i++) {
      const meal = meals[i]
      mealDiv = document.createElement('div')
      mealDiv.className = 'meal'
      const mealInfo = `
      
      <img src= "${meal.strCategoryThumb}">
      <h1>${meal.strCategory}</h1>`


      mealDiv.innerHTML = mealInfo
      mealsDiv.appendChild(mealDiv)
    }
  }
})

// const searchBtn = document.getElementById('search-btn')
// searchBtn.addEventListener('click',function(){
//   fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
//   .then(res => res.json())
//   .then(data => {
//     mealsDetails(data.categories[0].strCategory)
//   })
//   const mealsDetails = categories =>{
//     const mealsDiv = document.getElementById('mealsDiv')
//     for (let i = 0; i < categories.length; i++) {
//       const meal = categories[i]
//       const mealDiv = document.createElement('div')
//       mealDiv.className = 'meal'

//       const mealInfo =  

//       `<img src= "${categories[0].strCategoryThumb}"></img>
//       <br>
//       <h1> ${categories[0].strCategory}</h1>`
//       mealDiv.innerHTML = mealInfo
//       mealsDiv.appendChild(mealDiv)

//     }
//   }
// })
