let pageNumber = 1
let container = document.querySelector('#monster-container')



const createMonsterForm = () => {
    let formDiv =  document.querySelector('#create-monster')
    let form = document.createElement('form')
    let nameForm = document.createElement('input')
    let ageForm = document.createElement('input')
    let bioForm = document.createElement('textarea')
    let submit = document.createElement('button')
    let br = document.createElement('br')
    let br1 = document.createElement('br')
    let br2 = document.createElement('br')
    form.id = 'monster-form'
    nameForm.id = "name", 
    ageForm.id = "age", 
    bioForm.id = "bio", 
    nameForm.placeholder = "Input Name", 
    ageForm.placeholder = "Input Age", 
    bioForm.placeholder = "Input Bio",  
    submit.innerHTML = "Create A Monster";
    
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let name = document.querySelector('#name'),
            age = document.querySelector('#age'),
            bio = document.querySelector('#bio'); 
        fetch('http://localhost:3000/monsters/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
            body: JSON.stringify({
                name: name.value,
                age: parseFloat(age.value),
                description: bio.value
            })
        })
        .then(resp => resp.json())
        .then((monster) => {
            form.reset()
            console.log(monster);
        })
    })
    form.append(nameForm,br,ageForm,br1,bioForm,br2,submit)
    formDiv.append(form)
} 

const createMonsterCard = (monster) => {
    let card = document.createElement('div')
    let namePlate = document.createElement('h2')
    let agePlate = document.createElement('h4')
    let bioPlate = document.createElement('p')
    namePlate.innerText = monster.name
    agePlate.innerText = Math.round(monster.age)
    bioPlate.innerText = monster.description
    card.append(namePlate,agePlate,bioPlate)
    return card
}

const getMonsters = () => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(resp => resp.json())
    .then(monsterList => {
        console.log(monsterList)
        monsterList.forEach(monster => {
            container.append(createMonsterCard(monster))
        });
    })
}
const addButtonEventListeners = () => {
    const forward = document.getElementById('forward')
    const back = document.getElementById('back')
    forward.addEventListener("click", nextPage )
    back.addEventListener("click", lastPage )
}
const clear = () => {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    }
}
const nextPage = () => {
    clear()
    pageNumber ++
    getMonsters()
}
const lastPage = () => {
   1 < pageNumber ? (clear(), pageNumber --, getMonsters()) : alert("Can't go back")
}

const initialize  = () => {
    createMonsterForm()
    addButtonEventListeners()
    getMonsters()
}

initialize()