// write your code here

document.addEventListener("DOMContentLoaded", () => {
  const ramenMenu = document.querySelector("#ramen-menu");
  const ramenDetail = document.querySelector("#ramen-detail");
  const detailImage = document.querySelector(".detail-image");
  const ramenName = document.querySelector(".name");
  const restaurant = document.querySelector(".restaurant");
  const rating = document.querySelector("#rating-display");
  const comment = document.querySelector("#comment-display");
  const ramenForm = document.querySelector("#new-ramen");

  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => ramens.forEach(renderImage));

  function renderImage(ramen) {
    const img = document.createElement("img");
    img.src = ramen.image;

    img.addEventListener("click", () => {
      detailImage.src = ramen.image;
      detailImage.alt = ramen.name;
      ramenName.textContent = ramen.name;
      restaurant.textContent = ramen.restaurant;
      rating.textContent = ramen.rating;
      comment.textContent = ramen.comment;
    });

    ramenMenu.append(img);
  }

  ramenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ramen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target.newComment.value,
    };
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ramen),
    })
      .then((response) => response.json())
      .then((ramen) => {
        renderImage(ramen);
      });
    ramenForm.reset();
  });
});
