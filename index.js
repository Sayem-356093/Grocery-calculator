let allItems = document.getElementById("all-items");
let addItem = document.getElementById("add-item");
let maxInput = document.getElementById("max");
let budgetText = document.getElementById("budget-text");
addItem.addEventListener("click", addNewItem);

function addNewItem() {
  let html = `<div class="input-block">
                    <input type="text" name="item-name" placeholder="Enter item name">
                    <input type="number" name="price" placeholder="Price">
                    <div class="delete"><i class="fa-solid fa-xmark"></i>x</div>
                </div>`;

  allItems.insertAdjacentHTML("beforeend", html);
}

function sum(valueArray) {
  let sumArray = [];
  valueArray.forEach((value, index) => {
    if (valueArray[index] == undefined) {
      valueArray[index] = 0;
      sumArray.push(valueArray[index]);
    } else {
      sumArray.push(valueArray[index]);
    }
  });
  let sum = 0;
  for (let i = 0; i < sumArray.length; i++) {
    sum = sumArray[i] + sum;
  }

  return sum;
}

function showAlert(amount) {
  let max = Number(maxInput.value);

  if (amount > max) {
    budgetText.innerText = `Cost is too high`;
    budgetText.style.color = "red";
  } else {
    budgetText.innerText = `Maximum budget is ${max}`;

    budgetText.style.color = "white";
  }
}

maxInput.addEventListener("change", budgetTextChnage);

function budgetTextChnage() {
  let amount = sum(valueArray);
  showAlert(amount);
}

let valueArray = [];

allItems.addEventListener("click", (e) => {
  let removeItem = document.querySelectorAll(".delete");
  removeItem.forEach((value, index) => {
    if (e.target.closest(".delete") == removeItem[index]) {
      removeItem[index].closest(".input-block").remove();
      valueArray.splice(index, 1);

      document.getElementById("total").innerText = `${sum(valueArray)}`;

      showAlert(sum(valueArray));
    }
  });
});

allItems.addEventListener("change", (e) => {
  let priceInput = document.getElementsByName("price");

  priceInput.forEach((value, index) => {
    if (e.target.closest("input[name=price]") == priceInput[index]) {
      valueArray[index] = Number(priceInput[index].value);

      if (Number(document.getElementById("max").value) == 0) {
        document.getElementById("max").value = sum(valueArray);
      }

      document.getElementById("total").innerText = `${sum(valueArray)}`;

      showAlert(sum(valueArray));
    }
  });
});

function generateInvoice() {
  let allKeys = document.getElementsByName("item-name");
  let allValues = document.getElementsByName("price");
  let invoice = document.getElementById("invoice");
  let sum = 0;

  function invoiceListing() {
    for (let i = 0; i < allKeys.length; i++) {
      let keys = allKeys[i].value;
      let values = allValues[i].value;
      sum = sum + Number(values);
      let invoiceElement = `<h3 class="invoice-text"><span>${i+1}. ${keys} :</span> ${values}</h3>`;
      invoice.insertAdjacentHTML("beforeend", invoiceElement);
    }
    let invoiceTotal = `<h3 class="invoice-result"><span>Total Amount :</span> ${sum}</h3>`;
    invoice.insertAdjacentHTML("beforeend", invoiceTotal);

    let remainingAmount = `<h3 class="invoice-result"><span>Remaining Amount :</span> ${Number(maxInput.value) - sum}</h3>`;
    invoice.insertAdjacentHTML("beforeend", remainingAmount);
  }

  if ((invoice.textContent = "")) {
    invoiceListing();
  } else {
    invoice.textContent = "";
    invoiceListing();
  }
}

document
  .getElementById("get-result")
  .addEventListener("click", generateInvoice);
