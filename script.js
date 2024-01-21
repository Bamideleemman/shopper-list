const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');


function addItem(e){
    e.preventDefault();

    const newItem = itemInput.value

    //validate Input
    if(newItem ===''){
        alert('Please add an item');
        return;

    }
    //Create list item
    const li = document.createElement('li');
    const button = createButton ("remove-item btn-link text-red")
    li.appendChild(document.createTextNode(newItem))
    li.appendChild(button)
    itemList.appendChild(li)
    itemInput.value =''

        
}

//Event Listner
itemForm.addEventListener('submit', addItem)


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