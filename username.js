const user = document.getElementById("username");
const submit = document.getElementById("submit");

submit.addEventListener("click", function() {
    localStorage.setItem("userName", user.value);
  })