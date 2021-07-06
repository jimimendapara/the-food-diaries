const recipeManager = new RecipeManager(0);
recipeManager.load();
recipeManager.render();


const nameId = document.getElementById("name_form");
const errMsg = document.getElementById("name_valid");
const addTaskBtn = document.getElementById("submit_btn");
const descID = document.getElementById("description_form");
const form = document.getElementById("collapseExample");
const ingrID = document.getElementById("ingredients_form");
const ingreErrMsg = document.getElementById("desc_valid");
const addbtn = document.getElementById("submit_btn");
validationFail = 0;

function clearFormField() {
    nameId.value = "";
    ingrID.value = "";
    descID.value = "";
    errMsg.innerHTML ="";
    ingreErrMsg.innerHTML = "";
    
}
const validateDesc = () => {
    if (nameId.value.trim().length < 5) {
        errMsg.style.color = 'red';
        errMsg.innerHTML = "<span>Task name must be greater than 5 characters in length</span>";
        validationFail++;
    }
    else {
        errMsg.innerHTML = "";

    };

    if (ingrID.value.trim() === "") {
        ingreErrMsg.style.color = 'red';
        ingreErrMsg.innerHTML = "<span>Ingredients can't be empty</span>";
        validationFail++;
    }
    else {
        ingreErrMsg.innerHTML = "";
    }



    if (validationFail > 0) {
        validationFail = 0;
        return;
    }
    else {

        recipeManager.addTask(
            nameId.value,
            ingrID.value,
            descID.value,
        );
        console.log("Name: " + nameId.value);
        console.log("Description: " + ingrID.value);
        console.log("Assign To: " + descID.value);
        clearFormField();
        recipeManager.render();
        recipeManager.save();
    }
}

addbtn.addEventListener('click', validateDesc);

//reset button functionality
const reset = document.getElementById("reset");
reset.addEventListener('click', clearFormField);

//done button changing status functionality
const card = document.getElementById("card");

function done(event) {

    
    if (event.target.classList.contains("delete-button")) {
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
        console.log(parentTask);
        const taskId = Number(parentTask.dataset.taskId);
        console.log(taskId);
        recipeManager.deleteTask(taskId);
        recipeManager.save();
        recipeManager.render();
    

    }
}
card.addEventListener('click', done);
