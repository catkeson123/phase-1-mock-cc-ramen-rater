// write your code here

document.addEventListener("DOMContentLoaded", () => {
  const ramenMenu = document.querySelector("#ramen-menu");
  let featuredRamenId = 1;
  const deleteRamen = document.querySelector("#delete");

  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      renderMain(ramens[0]);
      ramens.forEach(renderImage);
    });

  function renderImage(ramen) {
    const img = document.createElement("img");
    img.src = ramen.image;

    img.addEventListener("click", () => renderMain(ramen));

    ramenMenu.append(img);
  }

  const detailImage = document.querySelector(".detail-image");
  const ramenName = document.querySelector(".name");
  const restaurant = document.querySelector(".restaurant");
  const rating = document.querySelector("#rating-display");
  const comment = document.querySelector("#comment-display");

  function renderMain(ramen) {
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
    featuredRamenId = ramen.id;
  }

  deleteRamen.addEventListener("click", () => {
    detailImage.src = "./assets/image-placeholder.jpg";
    detailImage.alt = "Deleted Ramen";
    ramenName.textContent = "Deleted Ramen";
    restaurant.textContent = "Deleted";
    rating.textContent = "Deleted";
    comment.textContent = "Deleted";

    fetch(`http://localhost:3000/ramens/${featuredRamenId}`, {
      method: "DELETE",
    });
  });

  const editForm = document.querySelector("#edit-ramen");
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    rating.textContent = e.target.rating.value;
    comment.textContent = e.target.newComment.value;

    fetch(`http://localhost:3000/ramens/${featuredRamenId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: parseInt(e.target.rating.value),
        comment: e.target.newComment.value,
      }),
    });

    editForm.reset();
  });

  const ramenForm = document.querySelector("#new-ramen");
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
