var inputDisplay = document.getElementById("input-display");
var lists = document.getElementById("lists");
var todoArr = []

// addItem adds items given in the input to the l
function addItem() {
  todoArr[todoArr.length] = inputDisplay.value;

  lists.innerHTML =""; //empty string will erase all the li befor running of for-each loop
  // if statement checks for ""empty string in given in the input
  if (  inputDisplay.value !== ""){
    if(todoArr.length<13){
  renderList()
    inputDisplay.value = ""
    }else{
      alert( "You have reached the limit of 12 items! Please remove some or all items to add more")
      todoArr.pop()
      renderList()
    }
  }else{
    alert("Please add an To Do Item to add ")
    todoArr.pop() // the empty string will be removed from the array, b/c if not next time the empty string in the array will be added again
    renderList()
  }
}


// renderList will render the list of items in the ul
function renderList(){
  todoArr.forEach(function(val, i) {
  // when running this loop all the elements will be added to the ul from the starting of the array
      lists.innerHTML += `
      <li> 
        ${todoArr[i]}
        <div>
        <button id="edit-btn${i}"><i class="ri-edit-box-line"></i></button>
        <button id="dele-btn${i}"><i class="ri-delete-bin-2-line" ></i></button>
        </div>
      </li>
      `  })
}


// deleteAll will delete all the items in the array
var modal = document.getElementById("modal");
function deleteAll(){
  if(todoArr.length !== 0){
    modal.style.display = "initial"  
  }
  else{
    alert("Please add items to delete!")
  }
  // lists.innerHTML ="";
  // todoArr = [];
}
function modalDelete (){
  lists.innerHTML ="";
  todoArr = [];
  modal.style.display = "none"
}
function modalCancel(){
  modal.style.display = "none"
}



//event bubbling || whenver there is a click inside the ul it will run the function
function mainLists(event){
  var btnId= event.target.id;
  // console.log(btnId)

  var newBtnId =btnId.slice(8); // it will give the index that is given to the button in li

  // if ==> if the id of the button is edit-btn then it will update the array value and then empty the ul and will render the new array again
  if(btnId.includes("edit-btn")){
    var newTodo =prompt("Enter new To Do Item")

    todoArr[newBtnId] = newTodo;
    // console.log(todoArr)
    lists.innerHTML =""
    renderList()
  }else if(btnId.includes("dele-btn")){
    todoArr.splice(newBtnId,1)
    lists.innerHTML=""
    renderList()
  }
}

function getStarted() {
  window.location.href = "/login.html";
}