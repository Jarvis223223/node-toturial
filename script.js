const app = document.querySelector(".users");
const registerBtn = document.querySelector(".register");

registerBtn.addEventListener("click", async () => {
  const name = document.querySelector(".name").value;
  const email = document.querySelector(".email").value;
  const age = document.querySelector(".age").value;
  const userAry = {
    name: name,
    email: email,
    age: age,
  };
  if (name && email && age) {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(userAry),
    });
    const data = await response.json();
    app.innerHTML = "";
    fetchData(data);
    document.querySelector(".name").value = "";
    document.querySelector(".email").value = "";
    document.querySelector(".age").value = "";
  } else {
    return;
  }
});

const deleteUser = async (event) => {
  const newEmail = event.target.id;
  const newEmailObj = {
    email: newEmail,
  };
  const response = await fetch("http://localhost:3000/users", {
    method: "DELETE",
    body: JSON.stringify(newEmailObj),
  });
  app.innerHTML = "";
  fetchData();
};

const updateUser = async (event) => {
  const newEmailID = event.target.id;
  console.log(newEmailID);
  const newObj = {
    email: newEmailID,
  };
  const response = await fetch("http://localhost:3000/users", {
    method: "PUT",
    body: JSON.stringify(newObj),
  });
};

const myBugs = (data) => {
  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    const userDiv = document.createElement("div");
    userDiv.classList.add("userDiv");
    userDiv.innerHTML = `
    <ul><li>${user.name}</li><li>${user.email}</li><li>${user.age}</li></ul>
    <div>
    <button type="submit" class="btn btn-primary buttU" id="${user.email}" onclick=updateUser(event)>Update User</button>
    <button type="submit" class="btn btn-danger butt" id="${user.email}" onclick="deleteUser(event)">Delete</button>
    </div>
    `;
    app.append(userDiv);
  }
};

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  myBugs(data);
};

fetchData();
