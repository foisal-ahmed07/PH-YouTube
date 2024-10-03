// 1 - fetch, load and  show catagories on html

// creating loadCatagories
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};

// creating displayCatagories

const displayCatagories = (catagories) => {
  const catagoriesContainer = document.getElementById("catagories");

  catagories.forEach((item) => {
    // creating btn
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    catagoriesContainer.append(button);
  });
};
loadCatagories();
