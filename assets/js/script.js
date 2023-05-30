let Mock_API = "http://localhost:3000/users";
let fav_API = "http://localhost:3000/favusers";
let row = document.querySelector("#row");
let sortBtn = document.querySelector(".btn-warning");
let searchInput = document.querySelector("#search");
let readMoreBtn = document.querySelector(".btn-primary.my-4");
let nav = document.querySelector("nav");
let menu = document.querySelector(".fa-bars");
let num = 3;
let copyArr = [];
let sorted;
menu.addEventListener("click", function () {
  nav.classList.toggle("show");
});

async function drawCard(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `
        <div class="col col-sm-12 col-md-12 col-lg-4">
            <img src=${element.img} alt="" />
            <div class="text">
              <p class="data">${element.date}</p>
              <p class="hotel">${element.text}</p>
              <p class="price">${element.price} $</p>
              <ul class="d-flex">
                <li>
                  <a href="" onclick=deleted(${element.id})><i class="fa-solid fa-circle-minus"></i></a>
                </li>
                <li>
                    <a href="form.html?id=${element.id}"><i class="fa-solid fa-pencil"></i></a>
                </li>
                <li><a href="favorites.html" onclick=favorited(${element.id})><i class="fa-solid fa-thumbs-up"></i></a></li>
              </ul>
            </div>
          </div>
        
        `;
  });
}
async function cards() {
  let res = await fetch(Mock_API);
  let data = await res.json();
  copyArr = data.slice(0, num);
  drawCard(copyArr);
}
readMoreBtn.addEventListener("click", function () {
  num += 3;
  cards();
});
cards();
async function deleted(id) {
  await fetch(`${Mock_API}/${id}`, { method: "DELETE" });
}
async function favorited(id) {
  let res = await fetch(`${Mock_API}/${id}`);
  let data = await res.json();
  await axios.post(fav_API, data);
}
sortBtn.addEventListener("click", async function () {
  let res = await fetch(Mock_API);
  let data = await res.json();
  if (sortBtn.innerHTML == "Ascending") {
    sortBtn.innerHTML = "Descending";
    sorted = data.sort((a, b) => a.price - b.price).slice(0, num);
    drawCard(sorted);
  } else if (sortBtn.innerHTML == "Descending") {
    sortBtn.innerHTML = "Default";
    sorted = data.sort((a, b) => b.price - a.price).slice(0, num);
    drawCard(sorted);
  } else {
    sortBtn.innerHTML = "Ascending";
    cards();
  }
});
searchInput.addEventListener("input", async function (e) {
  let res = await fetch(Mock_API);
  let data = await res.json();
  let filtered = data
    .filter((item) =>
      item.text.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    )
    .slice(0, num);
  drawCard(filtered);
});
async function favorited(id) {
  let res = await fetch(`${Mock_API}/${id}`);
  let data = await res.json();
  await axios.post(fav_API, data);
}
