import {
  fetchData,
  addData,
  deleteData,
  getDataById,
  updateData,
} from "./services.js";
import Activity from "./activity.js";
import ListActivity from "./listActivity.js";
const getEle = (id) => document.getElementById(id);

const getListData = () => {
  fetchData()
    .then((res) => {
      renderHTML(res.data);
    })
    .catch((err) => console.log(err));
};
getListData();

const renderHTML = (data) => {
  renderData(data);
  data.forEach((item) => {
    if (list.array.includes(item) === false) {
      list.array.push(item);
    }
  });
};
// Add Activity
document.getElementById("addItem").addEventListener("click", () => {
  var name = getEle("newTask").value;
  if (name == "") {
    alert("Please enter an activity");
  } else {
    const activity = new Activity("", name, "");

    addData(activity)
      .then((res) => {
        getListData();
      })
      .catch((err) => console.log(err));
  }
});

// Delete Activity
const deleteItem = (id) => {
  deleteData(id)
    .then((res) => getListData())
    .catch((err) => console.log(err));
};
window.deleteItem = deleteItem;

// Arrange activity's name
var list = new ListActivity();
const renderData = (newArray) => {
  getEle("todo").innerHTML = "";
  getEle("completed").innerHTML = "";
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i].status == "") {
      getEle("todo").innerHTML += `<li>
                                    <div class="list">
                                        <p>${newArray[i].name}</p>
                                        <div>
                                            <button class="btn" onclick="deleteItem(${newArray[i].id})">
                                                <i class="far fa-trash-alt"></i>
                                            </button>
                                            <button class="btn" onclick="changeStatus(${newArray[i].id})">
                                              <i class="check fas fa-check-circle" id="${newArray[i].id}"></i>
                                            </button>                                 
                                        </div>
                                    </div>
                                </li>`;
    } else {
      getEle("completed").innerHTML += `<li>
                                    <div class="list">
                                        <p>${newArray[i].name}</p>
                                        <div>
                                            <button class="btn" onclick="deleteItem(${newArray[i].id})">
                                                <i class="far fa-trash-alt"></i>
                                            </button>
                                            <button class="btn" onclick="changeStatus(${newArray[i].id})">
                                              <i class="active check fas fa-check-circle" id="${newArray[i].id}"></i>
                                            </button>                                 
                                        </div>
                                    </div>
                                </li>`;
    }
  }
};
window.renderData = renderData;
document.getElementById("two").addEventListener("click", () => {
  let newArray = list.array.sort((x, y) => {
    let a = x.name.toUpperCase(),
      b = y.name.toUpperCase();
    return a == b ? 0 : a > b ? 1 : -1;
  });
  const filteredArr = newArray.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  renderData(filteredArr);
});

// Arrange activity's name (reverse)
document.getElementById("three").addEventListener("click", () => {
  let newArray = list.array.reverse((x, y) => {
    let a = x.name.toUpperCase(),
      b = y.name.toUpperCase();
    return a == b ? 0 : a > b ? 1 : -1;
  });
  const filteredArr = newArray.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  renderData(filteredArr);
});

//activity done
const renderDataDoneOrNot = (array, done, notDone, status, active) => {
  getEle(done).innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].status == status) {
      getEle(done).innerHTML += `<li>
                                      <div class="list">
                                          <p>${array[i].name}</p>
                                          <div>
                                              <button class="btn" onclick="deleteItem(${array[i].id})">
                                                  <i class="far fa-trash-alt"></i>
                                              </button>
                                              <button class="btn" onclick="changeStatus(${array[i].id}})">
                                                <i class="${active} check fas fa-check-circle" id="${array[i].id}}"></i>
                                              </button>                                 
                                          </div>
                                      </div>
                                  </li>`;
    }
    getEle(notDone).innerHTML = "";
  }
};
window.renderDataDoneOrNot = renderDataDoneOrNot;
document.getElementById("one").addEventListener("click", () => {
  renderDataDoneOrNot(list.array, "completed", "todo", "done", "active");
});

//activity not done
document.getElementById("all").addEventListener("click", () => {
  renderDataDoneOrNot(list.array, "todo", "completed", "", "");
});
//chang status
const changeStatus = (id) => {
  document.getElementById(id).classList.toggle("active");

  getDataById(id)
    .then((res) => {
      res.data.status = "done";
      const activity = new Activity(id, res.data.name, res.data.status);

      updateData(activity)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
window.changeStatus = changeStatus;
console.log(list.array);
