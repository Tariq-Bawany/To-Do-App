import { arrayRemove, arrayUnion, auth, db, doc, getDoc, onAuthStateChanged, updateDoc } from "./config/firebase.js";

var inputDisplay = document.getElementById("input-display");
var usernameDisplay = document.getElementById("username-display");
var lists = document.getElementById("lists");
var todoArr = []

const userID = localStorage.getItem("userID");
// console.log(userID);


onAuthStateChanged(auth, async (user) => {
  document.getElementById("main-content").classList.add('hidden')

  if (user) {
    try {
      // const userID = user.uid; // user.uid is saved in userID
      const userID = user.uid; // user.uid is saved in userID
      // localStorage.setItem("userID", userID);
      // console.log(localStorage.getItem("userID"));


      // console.log("User is logged in. User ID:", userID); //console
      const docRef = doc(db, "Users", userID);  // check if user is available or not
      const docSnap = await getDoc(docRef); // get user data
      if (docSnap.exists()) { //if user data is avaliable it will run the fetchUserData() to get todos data
        // all data is stored in userData
        var userData = docSnap.data()
        // console.log("Document data:", userData);
        // username display  value changes from no user to usernmae on the top left 
        usernameDisplay.value = userData.username;
        fetchUserData(userID)
      } else {
        // docSnap.data() will be undefined in this case
        alert("No such document!");
      }




    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      alert(errorMessage);

    }
  } else {
    alert("No user is logged in. Redirecting to login...");
    window.location.href = '/login/login.html'

  }
})
// this func fetches user data and check if user previous data is available or not
async function fetchUserData(userID) {
  try {
    const docRef = doc(db, "Users", userID,);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      todoArr = docSnap.data().todos || []
    }
    if (todoArr.length > 0) {
      renderList()
    } else {
      alert("No previous saved task found");
    }
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorMessage);

  }
  document.getElementById("loading-screen").style.display = 'none'
  document.getElementById("main-content").classList.remove('hidden')
}

// ******************************************************************

// console.log(userID);

// addItem adds items given in the input to the l
function addItem() {
  lists.innerHTML = ""; //empty string will erase all the li befor running of for-each loop
  // if statement checks for ""empty string in given in the input
  if (inputDisplay.value !== "") {
    if (todoArr.length < 13) {
      if (!todoArr.includes(inputDisplay.value)) {
        addDataToFirestore(userID, inputDisplay.value) // first the value is sent as an argument then it is push in the todoArr
        todoArr.push(inputDisplay.value);//push the inputdisplay value to array todoArr
        renderList()
        inputDisplay.value = ""
      } else {
        alert("this value is already added")
        renderList()
      }
    } else {
      alert("You have reached the limit of 12 items! Please remove some or all items to add more")
      renderList()
    }
  } else {
    alert("Please add an To Do Item to add ")
    renderList()
  }
}


// renderList will render the list of items in the ul
function renderList() {
  todoArr.forEach(function (val, i) {
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
function deleteAll() {
  if (todoArr.length !== 0) {
    modal.style.display = "initial"
  }
  else {
    alert("Please add items to delete!")
  }
  // lists.innerHTML ="";
  // todoArr = [];
}
function modalDelete() {
  lists.innerHTML = "";
  todoArr = [];
  modal.style.display = "none"
  deleteAllFirestoreData(userID)
}
function modalCancel() {
  modal.style.display = "none"
}


//event bubbling || whenver there is a click inside the ul it will run the function
function mainLists(event) {
  var btnId = event.target.id;
  // console.log(btnId)

  var newBtnId = btnId.slice(8); // it will give the index that is given to the button in li

  // if ==> if the id of the button is edit-btn then it will update the array value and then empty the ul and will render the new array again
  if (btnId.includes("edit-btn")) {
    var newTodo = prompt("Enter new To Do Item")
    if (!todoArr.includes(newTodo)) {
      todoArr[newBtnId] = newTodo;
      editFirestoreData(userID, todoArr)
      // console.log(todoArr)
      lists.innerHTML = ""
      renderList()
    } else {
      alert("this value is already added")
    }
  } else if (btnId.includes("dele-btn")) {
    deleteFirestoreData(userID, todoArr[newBtnId]) // will delete the selected data from firestore
    todoArr.splice(newBtnId, 1)
    lists.innerHTML = ""
    renderList()
  }
}

var getStarted = document.getElementById("get-started");
getStarted.addEventListener('click', () => {
  window.location.href = "/login/login.html";
})
// editFirestoreData this will edit the data in the locat array and sent whole updated array as an argument and then firestore array replaces with updated array.
async function editFirestoreData(userID, updatedArr) {
  try {
    // Reference to the Firestore document
    const docRef = doc(db, "Users", userID); // Replace with your collection and document ID

    // Update the array field using arrayUnion
    await updateDoc(docRef, {
      todos: [...updatedArr] //resets the todos to empty array
    });

  } catch (error) {
    console.error("Error deleting element to array:", error);
  }
}
// deleteFirestoreData will delete the selected data from todos in firestore data
async function deleteFirestoreData(userID, dataToDelete) {
  try {
    // Reference to the Firestore document
    const docRef = doc(db, "Users", userID); // Replace with your collection and document ID
    // console.log(dataToDelete);

    // Update the array field using arrayUnion
    await updateDoc(docRef, {
      todos: arrayRemove(dataToDelete) //resets the todos to empty array
    });

  } catch (error) {
    console.error("Error deleting element to array:", error);
  }
}
// deleteAllFirestoreData will resets all the Firestore  user todos Data
async function deleteAllFirestoreData(userID) {
  try {
    // Reference to the Firestore document
    const docRef = doc(db, "Users", userID); // Replace with your collection and document ID

    // Update the array field using arrayUnion
    await updateDoc(docRef, {
      todos: [] //resets the todos to empty array
    });

  } catch (error) {
    console.error("Error deleting element to array:", error);
  }
}
// addDataToFirestore will add data to firestore when click on add item
async function addDataToFirestore(userID, addData) {
  try {
    // Reference to the Firestore document
    const docRef = doc(db, "Users", userID); // Replace with your collection and document ID

    // Update the array field using arrayUnion
    await updateDoc(docRef, {
      todos: arrayUnion(addData) // 'todos' is the name of the array field
    });
  } catch (error) {
    console.error("Error adding element to array:", error);
  }
}
window.addItem = addItem
window.deleteAll = deleteAll
window.modalDelete = modalDelete
window.modalCancel = modalCancel
window.mainLists = mainLists



