
function createTaskHtml(id, name, ingredients, description) 
{
  const html=`<div class="col data-task-id="${id}">
                <div class="card h-100">
                        <div class="card-header bg-secondary">
                          <h5 class="card-title text-white">${name}</h5>
                        </div>
                        <div class="card-body">
                          <h6>Ingredients</h6>
                          <p class="card-text text-secondary">${ingredients}</p>
                          <h6>Description</h6>
                          <p class="card-text text-secondary">${description}</p>
                        </div>
                      <div class="card-footer">
                          <a class="p-2" href="#deletebutton"><i class="bi bi-trash text-danger delete-button"></i></a>
                      </div>
                  </div>
              </div>`
  return html;

};

class RecipeManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, ingredients, discription) {

    const task = {
      id: this.currentId++,
      name: name,
      ingredients: ingredients,
      discription: discription, 
    };
    this.tasks.push(task);
  }

  getTaskById(taskId) {
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;

  }


  render() {
    let tasksHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.ingredients,
        task.discription,
        
        
      );
      tasksHtmlList.push(taskHtml);
    }

    const tasksHtml = tasksHtmlList.join("");

    const tasksList = document.querySelector('#card');
    tasksList.innerHTML = tasksHtml;
  }

  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    const currentId = String(this.currentId);
    localStorage.setItem('currentId', currentId);
  }
  load() {
    if (localStorage.getItem('tasks')) {
      const tasksJson = localStorage.getItem('tasks');
      this.tasks = JSON.parse(tasksJson);

    }
    if (localStorage.getItem('currentId')) {

      const currentId = localStorage.getItem('currentId');
      this.currentId = Number(currentId);
    }

  }
  deleteTask(taskId) {
    const newTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }
}





