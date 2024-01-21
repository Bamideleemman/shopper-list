const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter')


function OnAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value

    //validate Input
    if(newItem ===''){
        alert('Please add an item');
        return;

    }

    addItemToDOM (newItem);


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

// function addItemToStorage(item){
//     let itemsFromStorage;
//     if (localStorage.getItem('items') ===null) {
//         itemsFromStorage = []
//     } else {

//     }
// }


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

function removeItem(e){

   //const clearButton = document.getElementsByClassName("fa-solid fa-xmark")

   if (e.target.parentElement.classList.contains( "remove-item")){
    if (confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
    }
    

   }

   checkUI()
    
}

function clearItems(e){
    if (confirm('Are you sure?')){

    while (itemList.firstChild){
        
        itemList.removeChild(itemList.firstChild);
    }}
    // e.target.remove();
    // itemList.remove();
    // filter.remove();
    checkUI()

}


function checkUI(){
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



checkUI();

//Event Listner
itemForm.addEventListener('submit', OnAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems)