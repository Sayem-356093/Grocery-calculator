localStorage.setItem("Name", "Sayem");
let allItems = document.getElementById("all-items");
let addItem = document.getElementById("add-item");

addItem.addEventListener("click", addNewItem);

function addNewItem() {
  let html = `<div class="input-block">
                    <input type="text" name="item-name" placeholder="Enter item name">
                    <input type="number" name="price" placeholder="Price">
                    <div class="delete"><i class="fa-solid fa-xmark"></i></div>
                </div>`;

  allItems.insertAdjacentHTML("beforeend", html);
}

allItems.addEventListener("click", (e)=>{
    let removeItem = document.querySelectorAll(".delete");
    removeItem.forEach((value, index)=>{
        if(e.target.closest(".delete") == removeItem[index]){
            removeItem[index].closest(".input-block").remove();
        }
    })

 });
