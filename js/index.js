// - When the page loads, show the first 50 monsters. Each monster's name, age, and
//   description should be shown.
// - Above your list of monsters, you should have a form to create a new monster.
//   You should have fields for name, age, and description, and a 'Create Monster
//   Button'. When you click the button, the monster should be added to the list
//   and saved in the API.
// - At the end of the list of monsters, show a button. When clicked, the button
//   should load the next 50 monsters and show them.

document.addEventListener('DOMContentLoaded', dom => {

  const createMonster = document.getElementById('create-monster');
  const monsterList = document.querySelector('#monster-container');
  const backButton = document.querySelector('#back');
  const fwdButton = document.querySelector('#forward');

  let currentPage = 1;

  createSubmissionForm();


  getMonsters(currentPage).then(presentMonsterList);


  fwdButton.addEventListener('click', (forward) => {
    currentPage++;

    getMonsters(currentPage).then(presentMonsterList);
  });

  backButton.addEventListener('click', (forward) => {
    currentPage--;

    getMonsters(currentPage).then(presentMonsterList);
  });









  function getMonsters (pageNumber) {
    // debuggerxws
    return fetch (`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then((r) => r.json())
  }

  function presentMonsterList (list) {
    monsterList.innerHTML = '';
    list.forEach((monster) => {
      let monsterLi = document.createElement('li');

      let monsterName = monster.name;
      let monsterAge = monster.age;
      let monsterDesc = monster.description;


      monsterLi.innerHTML = `<h1>${monsterName}</h1><h2>${monsterAge} Years Old</h2><h3>${monsterDesc}</h3><br><p>DELETE</p><br>`;

      monsterList.appendChild(monsterLi);

      let deleteButton = monsterLi.querySelector('p');

      deleteButton.addEventListener('click', (event) => {
        fetch(`http://localhost:3000/monsters/${monster.id}`, {
          method: 'DELETE'
        })
        .then(r => r.json)
        .then(r => {
          monsterLi.remove();
        });
      });
    });
  };





  function createSubmissionForm () {
    let newMonsterForm = document.createElement('form');

    let newMonsterName = document.createElement('input');
    let newMonsterAge = document.createElement('input');
    let newMonsterDesc = document.createElement('input');
    let newMonsterSubmit = document.createElement('input');

    newMonsterAge.name = 'age';
    newMonsterName.name = 'name';

    newMonsterDesc.name = 'description';
    newMonsterDesc.type = 'textarea';


    newMonsterAge.type = 'number';


    newMonsterSubmit.name = 'submit';
    newMonsterSubmit.type = 'submit';
    newMonsterSubmit.value = 'Add New Monster!';

    newMonsterForm.appendChild(newMonsterName);
    newMonsterForm.appendChild(newMonsterAge);
    newMonsterForm.appendChild(newMonsterDesc);
    newMonsterForm.appendChild(newMonsterSubmit);

    createMonster.appendChild(newMonsterForm);

    newMonsterForm.addEventListener('submit', (form) => {
      form.preventDefault();

      let name = form.target.name.value;
      let age = form.target.age.value;
      let description = form.target.description.value;

      let monsterObj = {
        name,
        age,
        description
      }

      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(monsterObj)
      })
      .then(r => r.json())
      .then(monster => {

          let monsterLi = document.createElement('li');

          let monsterName = monster.name;
          let monsterAge = monster.age;
          let monsterDesc = monster.description;


          monsterLi.innerHTML = `<h1>${monsterName}</h1><h2>${monsterAge} Years Old</h2><h3>${monsterDesc}</h3><br><p>DELETE</p><br>`;

          monsterList.appendChild(monsterLi);
      })
    })

  }
})
