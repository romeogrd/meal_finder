const inputMain = document.querySelector(".inputMain");
const submitMain = document.querySelector(".submitMain");
const containerGrid = document.querySelector(".containerGrid");
const modal = document.querySelector(".modal");
const closeButton = document.createElement("button");
const request = document.querySelector(".request");

closeButton.textContent = "Close";
closeButton.addEventListener("click", () => {
  modal.close();
});

inputMain.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Empêche le saut de ligne dans le champ de texte
    submitMain.click(); // Cliquez sur le bouton de soumission
  }
});

submitMain.addEventListener("click", function (e) {
  const inputValue = inputMain.value;
  inputMain.value = "";

  request.textContent = `These are the results for ${inputValue}` ;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then((response) => {
      console.log('resolved', response);
      return response.json();
    })
    .then(data => {
      containerGrid.innerHTML = ''; 

      if (data.meals) {
        for (let i = 0; i < data.meals.length; i++) {
          const mealName = data.meals[i].strMeal;
          const mealImg = data.meals[i].strMealThumb;
          const divFood = document.createElement("div");
          const imgElement = document.createElement("img");
          imgElement.src = mealImg;

          divFood.textContent = mealName;
          divFood.innerHTML += " <br>";
          divFood.appendChild(imgElement);
          containerGrid.appendChild(divFood);

          divFood.addEventListener('click', () => {
            modal.innerHTML = ''; // Clear previous modal content
            modal.showModal();

            modal.appendChild(divFood);
           
            for (let j = 1; j <= 20; j++) { // Adjust the limit as per your data
              
              const mealIngredient = data.meals[i][`strIngredient${j}`];
              const mealMeasure = data.meals[i][`strMeasure${j}`];
              

              if (mealIngredient && mealMeasure) {
                const ingredientItem = document.createElement("p");
                ingredientItem.textContent = `${mealMeasure} ${mealIngredient}`;
                modal.appendChild(ingredientItem);
              }
            }

            const instructions = data.meals[i].strInstructions;
            const instructionsItem = document.createElement("p");
            instructionsItem.textContent = instructions;
            
            modal.appendChild(instructionsItem);

           

          });
        }
      } else {
        containerGrid.textContent = 'No meals found.';
      }
    })
    .catch((err) => {
      console.error('Error:', err);
    });
});



modal.addEventListener('click', (e) => {
    modal.close();
  }
);
