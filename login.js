const loginForm = document.getElementById("loginform");

const Login = async (email, password) => {
  //console.log("Hi")
  var users = await fetch("./data.json").then((response) => {
    return response.json();
  });
 //console.log(users)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var user = users.login.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email);
  console.log(password);
  try {
    var user = await Login(email, password);
    if(user)
    {
      window.location.href="./task.html"
    }
  
    console.log("Login successful", user);
  } catch (error) {
    console.log("Login failed", error.message);
    alert("Invalid email or password")
  }
});

