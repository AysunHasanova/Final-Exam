let row = document.querySelector("#row");
let fav_API = "http://localhost:3000/favusers";
async function drawFav(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `
    <div class="col col-sm-12 col-md-4">
        <img src=${element.img} alt="" />
        <div class="text">
          <p class="data">${element.date}</p>
          <p class="hotel">${element.text}</p>
          <p class="price">${element.price} $</p>
          <ul class="d-flex">
            <li>
              <a href="" onclick=deleted(${element.id})><i class="fa-solid fa-circle-minus"></i></a>
            </li>
          </ul>
        </div>
      </div>
    
    `;
  });
}
async function favCards() {
  let res = await fetch(fav_API);
  let data = await res.json();
  drawFav(data);
}
favCards();
async function deleted(id) {
  await axios.delete(`${fav_API}/${id}`);
}
