var toDoContainer = [];
var addBtn = document.getElementById('ADD');
var complete = document.getElementById('complete');
var enteredData = document.getElementById('Data');
var deletedd = Array.from(document.getElementsByClassName('fa-trash-can'));
var apiKey = "676304c460a208ee1fde4e57"


getAllTodo();
addBtn.addEventListener('click', function () {
  // if(enteredData.value.trim() ==0){
  //     toastr.error('Enter ToDo.', 'Inconceivable!')
  // }
  // if(enteredData.value.trim()>0 ){
  addtodo();
  // }
  clear();
})

async function addtodo() {
  const todo =
  {
    "title": enteredData.value,
    "apiKey": apiKey
  }

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      "content-type": "application/json"
    }
  };

  const response = await fetch("https://todos.routemisr.com/api/v1/todos", requestOptions)
  if (response.ok) {
    const data = await response.json();
    if (data.message == "success") {
      toastr.success('Add Successfully!', 'Toastr APP ')
      await getAllTodo();
    }
    else {
      toastr.error('I do not think that word means what you think it means.', 'Inconceivable!')

    }
  }
}
async function getAllTodo() {
  const response = await fetch(`https://todos.routemisr.com/api/v1/todos/${apiKey}`);

  if (response.ok) {
    const data = await response.json();
    if (data.message == "success") {
      toDoContainer = data.todos;
      console.log(toDoContainer);

      addToDoBut();

    }

  }
}

async function addToDoBut() {

  var cartona = ``;
  for (var i = 0; i < toDoContainer.length; i++) {
    cartona += `
        <div class="border-bottom d-flex justify-content-between p-4 align-items-center">
            <p onclick="markCompleted ('${toDoContainer[i]._id}')" id ="complete" ${toDoContainer[i].completed ? `style="text-decoration: line-through;"` : ""}   >${toDoContainer[i].title}</p>
            <div>
            ${toDoContainer[i].completed ? `<i class="fa-regular fa-circle-check icon-color "></i>` : ""}
                
                <i onclick="deleteed('${toDoContainer[i]._id}')" class="fa-solid fa-trash-can bg-main text-white p-2 fs-6 rounded-2 poiner mx-3"></i>
            </div>
        </div>
        `;
  }
  document.getElementById("NewRow").innerHTML = cartona;
  document.getElementById("Add-num").innerHTML = toDoContainer.length;
  // document.getElementById("mins-num").innerHTML = length(toDoContainer.completed);
}

function clear() {
  enteredData.value = null;
}



async function deleteed(hamada) {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      const tododata = {
        todoId: hamada,
      }
      const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(tododata),
        headers: {
          "content-type": "application/json"
        }
      };

      const response = await fetch("https://todos.routemisr.com/api/v1/todos", requestOptions)
      if (response.ok) {
        const data = await response.json();
        if (data.message === "success") {
          await getAllTodo();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      }
    }
  });



}
async function markCompleted(idComplete) {


  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, complete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {



      const tododata = {
        todoId: idComplete,
      }
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(tododata),
        headers: {
          "content-type": "application/json"
        }
      };


      const response = await fetch("https://todos.routemisr.com/api/v1/todos", requestOptions)
      if (response.ok) {
        const data = await response.json();
        if (data.message === "success") {
          await getAllTodo();
          Swal.fire({
            title: "Completed!",
            text: "Your file has been Complete.",
            icon: "success"
          });
          toastr.success('Done Completed!', 'Coungratulation')
        }
        console.log(data);
      }

    }
  });


}
