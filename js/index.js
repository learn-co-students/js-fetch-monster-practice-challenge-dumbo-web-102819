let monsterDiv = document.querySelector("#monster-container");
let createDiv = document.querySelector("#create-monster");
let forwardBtn = document.querySelector("#forward");
let backBtn = document.querySelector("#back");

let form = document.createElement("form");
form.id = "monster-form"
form.innerHTML = `
    <input type="text" name="name" placeholder="name...">
    <input type="text" name="age" placeholder="age...">
    <input type="text" name="bio" placeholder="description...">
    <input type="submit" name="submit" value="Create">
`
createDiv.append(form);

fetchApi(1);

//fetch all monsters RESTful API
function fetchApi(num) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
        .then(res => res.json())
        .then(monstersData => {
            //iterate array of objects with forEach method
            monstersData.forEach(turnObjToHtml);
        });
}

//turn objects to html format
function turnObjToHtml(monsterObj) {
    let monsterLi = document.createElement('div');
    monsterLi.innerHTML = `
        <h2>${monsterObj.name}</h2>
        <h4>Age: ${monsterObj.age}</h4>
        <p>Bio: ${monsterObj.description}</p>
    `;
    monsterDiv.append(monsterLi);
}

//create and save monster in db
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let newMonster = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.bio.value,
    }

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newMonster)
    })
    .then(res => res.json())
    .then(monster => {
        turnObjToHtml(monster)
    });

    //clear inputs when submitted
    form.reset();
});

let counter = 1;
forwardBtn.addEventListener('click', () => {
    // e.preventDefault();
    monsterDiv.innerHTML = "";
    counter += 1;
    fetchApi(counter);
});

backBtn.addEventListener('click', () => {
    // e.preventDefault();
    if(counter > 1) {
        monsterDiv.innerHTML = "";
        counter -= 1;
        fetchApi(counter)
    }
});
