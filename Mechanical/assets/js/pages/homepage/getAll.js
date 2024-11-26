const showItems = document.querySelector("#show-items");
const formSearch = document.querySelector("#form-search");
const tableBody = document.querySelector("#table-body");
const svgIcon = document.querySelector("#update-icon");

window.addEventListener("load", async () => {
  counterOfItemsOnTable();
  updateTable(await getAll());
});

svgIcon.addEventListener("click", async () => {
  updateTable(await getAll());
  counterOfItemsOnTable();
});

formSearch.addEventListener("submit", async (event) => {
  event.preventDefault();
  updateTable(await getAll());
  counterOfItemsOnTable();
});

function updateTable(productItems) {
  tableBody.innerHTML = "";
  productItems.forEach((element) => {
    const tr = document.createElement("tr");

    const id = document.createElement("td");
    const name = document.createElement("td");
    const price = document.createElement("td");
    const quantity = document.createElement("td");
    const total = document.createElement("td");

    id.innerText = element.itemId;
    name.innerText = element.product.name;
    price.innerText = `R$${element.product.price}`;
    quantity.innerText = element.quantity;
    total.innerText = element.totalPrice;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(price);
    tr.appendChild(quantity);
    tr.appendChild(total);

    tableBody.appendChild(tr);
  });
}

async function counterOfItemsOnTable() {
  const productItems = await getAll();
  if (productItems.length > 1) {
    showItems.innerText = `Mostrando ${productItems.length} itens`;
  } else {
    showItems.innerText = `Mostrando ${productItems.length} item`;
  }
  svgIcon.classList.remove("d-none");
}

async function getAll() {
  const response = await fetch(`http://localhost:8080/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
