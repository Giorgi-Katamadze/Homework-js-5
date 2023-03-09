const hairColor = document.getElementById("hair")
const hair = document.querySelector(".hair")
const shirtColor = document.getElementById("shirt")
const shirt = document.querySelector(".shirt")
const pantsColor = document.getElementById("pants")
const pants = document.querySelector(".pants")


hairColor.addEventListener("input", function changeHairColor(){
    hair.style.backgroundColor = hairColor.value
})
shirtColor.addEventListener("input", function changeShirtColor(){
    shirt.style.backgroundColor = shirtColor.value
})
pantsColor.addEventListener("input", function changePantsColor(){
    pants.style.backgroundColor = pantsColor.value
})


