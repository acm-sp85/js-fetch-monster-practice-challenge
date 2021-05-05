let pageCounter = 1

document.addEventListener('DOMContentLoaded', () => {

    const createButton = document.getElementById("create-button")
    const inputName = document.querySelector('[name="name"]')
    const inputAge = document.querySelector('[name="age"]')
    const inputDescription = document.querySelector('[name="description"]')
    const forwardsButton = document.getElementById('forward')
    const backwardsButton = document.getElementById('back')



    fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`)
        .then(result => result.json())
        .then(data => {
            console.log(data)
            displayMonsters(data)
            // data.forEach(element => {

            //     const ul = document.querySelector('div#monster-container')
            //     ul.style.listStyleType = 'none'
            //     const li = document.createElement('li')

            //     li.innerHTML = `
            // <h2 clas="monster-name">${element.name}</h2>
            // <h3 class="monster-age">${element.age}</h3>
            // <p class="monster-description">${element.description}</p>
            
            // `
            //     ul.append(li)

            // });




        })


    createButton.addEventListener('click', (event) => {
        event.preventDefault()

        console.log(inputName.value)
        console.log(inputAge.value)
        console.log(inputDescription.value)

        const objectRequest = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "name": `${inputName.value}`,
                "age": `${inputAge.value}`,
                "description": `${inputDescription.value}`
            })
        }

        fetch(`http://localhost:3000/monsters`, objectRequest)



    })
    
    forwardsButton.addEventListener('click', () => {
        console.log("forwards")
        pageCounter = pageCounter+1
        document.querySelector('div#monster-container').innerHTML=""
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
            .then(result => result.json())
            .then(data => {
                displayMonsters(data)
                console.log(pageCounter)

            })


    })

    backwardsButton.addEventListener('click', () => {

        console.log("backwards")
        pageCounter = pageCounter-1
        document.querySelector('div#monster-container').innerHTML=""

        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
            .then(result => result.json())
            .then(data => {
                displayMonsters(data)
                console.log(pageCounter)

            })

    })



    function displayMonsters(data){

        data.forEach(element => {

            const ul = document.querySelector('div#monster-container')
            ul.style.listStyleType = 'none'
            const li = document.createElement('li')

            li.innerHTML = `
        <h2 clas="monster-name">${element.name}</h2>
        <h3 class="monster-age">${element.age}</h3>
        <p class="monster-description">${element.description}</p>
        
        `
            ul.append(li)

        });

    }


})





