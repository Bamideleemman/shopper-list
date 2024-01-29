const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter')
let isEditMode = false
const formBtn = itemForm.querySelector('button')


function displayItems() {
    const itemsFromStorage = getItemsFromStrorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI()

}

function OnAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value

    //validate Input
    if(newItem ===''){
        alert('Please add an item');
        return;

    }
    //Check for edit mode
    if (isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    }  else{
        if(checkIfItemExists(newItem)){
            alert(`${newItem} already exists!`)
            return
        }
    }


    //Create item to DOM element
    addItemToDOM (newItem);

    //Add item to local storage
    addItemToStorage(newItem)

    checkUI();

    itemInput.value =''

        
}

function addItemToDOM (item) {

        //Create list item
    const li = document.createElement('li');
    const button = createButton ("remove-item btn-link text-red");
    li.appendChild(document.createTextNode(item));
    li.appendChild(button);
    itemList.appendChild(li);

}

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStrorage()

    //Add new item to array
    itemsFromStorage.push(item)

    //covert to JSON string and set to Local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStrorage(item){
     let itemsFromStorage;
    if (localStorage.getItem('items') ===null) {
        itemsFromStorage = [];
    } else {

        itemsFromStorage = JSON.parse(localStorage.getItem('items'));

    }
    return itemsFromStorage


}


function onClickItem(e){
    if (e.target.parentElement.classList.contains( "remove-item")){
        removeItem(e.target.parentElement.parentElement);

    } else {
        setItemToEdit(e.target)
      
    }

}

function checkIfItemExists(item){
    const itemsFromStorage = getItemsFromStrorage();
    return itemsFromStorage.includes(item)
}

function setItemToEdit(item){
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'))    
    
    item.classList.add('edit-mode')
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item'
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent;
}

function createButton (classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function removeItem(item){
    if (confirm('Are you sure?')){
    //Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
    }



   //const clearButton = document.getElementsByClassName("fa-solid fa-xmark")

//    if (e.target.parentElement.classList.contains( "remove-item")){
//     if (confirm('Are you sure?')){
//         e.target.parentElement.parentElement.remove();
//     }
    

//    }

//    checkUI()
    
}

    function removeItemFromStorage(item){
        let itemsFromStorage = getItemsFromStrorage()

        //Filter out item to be removed

        itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

        //Re-set to localstorage
        localStorage.setItem('items', JSON.stringify(itemsFromStorage))

    }

function clearItems(e){
    if (confirm('Are you sure?')){

    while (itemList.firstChild){
        
        itemList.removeChild(itemList.firstChild);
    }}
    // e.target.remove();
    // itemList.remove();
    // filter.remove();

    // Clear from localstoarge
    localStorage.removeItem('items')
    checkUI()

}


function checkUI(){
    itemInput.value = ''
    const items = itemList.querySelectorAll('li')
    if (items.length === 0){
        filter.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        filter.style.display = 'block';
        clearBtn.style.display = 'block';

    }

    if (items.length === 1){
        filter.style.display = 'none';
    } 
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = '#333'

    isEditMode = false
    }

function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.innerText.toLocaleLowerCase();

    if (itemName.indexOf(text) != -1){

        item.style.display = 'flex';
    } else {
         item.style.display = 'none';
    }

    
})
}

//Initialize app

function init(){
    
//Event Listner
itemForm.addEventListener('submit', OnAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();

}

init()
