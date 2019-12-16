const createMonsDiv = document.getElementById("create-monster")
const monsConDiv = document.getElementById("monster-container")
let monForm = document.createElement("form")
    monForm.innerHTML = 'Name: <input type=text name="name"><br>Age: <input type=text name="age"><br>Description: <input type=text name="description"><button>Create Monster</button>'
    createMonsDiv.append(monForm)
const backBtn = document.getElementById("back")
const forwardBtn = document.getElementById('forward')

fetchApi(1)
    
function fetchApi(num){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
    .then(r => r.json())
    .then(monsArr => {
        monsArr.forEach(turnJSONtoHTML)
    })
}



function turnJSONtoHTML(mon){
    let monLi = document.createElement("li")
        monLi.innerHTML = `<p>name: ${mon.name}</p><p>age: ${mon.age}</p><p>description: ${mon.description}</p>`
         monsConDiv.append(monLi)
}

monForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    monName = evt.target.name.value
    monAge = evt.target.age.value
    monDes = evt.target.description.value
  
fetch("http://localhost:3000/monsters",{
    method: "POST",
    headers: {
         "Content-Type": "application/json",
          Accept: "application/json"
        },
    body: JSON.stringify({ 
        name: monName, 
        age: monAge, 
        description: monDes })
})
 .then(r => r.json())
 .then(turnJSONtoHTML)

     evt.target.reset()
})

let counter = 1
backBtn.addEventListener("click", (evt) => {
    
    if(counter > 1){
      monsConDiv.innerHTML = ""
        counter -= 1
        fetchApi(counter)}
   
})

forwardBtn.addEventListener("click", (evt) => {
    monsConDiv.innerHTML = ""
    counter += 1
    fetchApi(counter)
})


