let Mock_API = "http://localhost:3000/users";
let form = document.querySelector("form");
let dateInput = document.querySelector("#date");
let textInput = document.querySelector("#text");
let priceInput = document.querySelector("#price");
let imgInput = document.querySelector("#img");
let submitBtn = document.querySelector(".btn-primary");
let id = new URLSearchParams(window.location.search).get("id");
async function edit() {
  let res = await fetch(`${Mock_API}/${id}`);
  let data = await res.json();
  dateInput.value = data.date;
  textInput.value = data.text;
  priceInput.value = data.price;
}
if (id) {
  edit();
  submitBtn.innerHTML = "Edit";
}
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    date: dateInput.value,
    text: textInput.value,
    price: priceInput.value,
    img: `./images/${imgInput.value.split("\\")[2]}`,
  };
  if (!id) {
    await axios.post(Mock_API, obj);
    window.location = "index.html";
  } else {
    await axios.put(`${Mock_API}/${id}`, obj);
    window.location = "index.html";
  }
});
