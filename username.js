const user = document.getElementById("username");
const submit = document.querySelector("a");

submit.addEventListener("click", function() {
    localStorage.setItem("userName", user.value);
  })