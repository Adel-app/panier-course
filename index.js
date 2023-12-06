import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://projet-2802b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
//son
const jump = new Audio('sound/jump-luffy.mp3');

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    emptyField()
})


onValue(shoppingListInDB, function (snapshot) {


    if (snapshot.exists()) {

        let shopList = Object.entries(snapshot.val())


        clearShoppingListEl()

        for (let i = 0; i < shopList.length; i++) {
            let currentItem = shopList[i]

            list(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "circuler rien a voir içi ...."
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function emptyField() {
    inputFieldEl.value = ""

}

function list(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    newEl.addEventListener("click", function () {


        // Joue le son
        jump.play();
        let location = ref(database, `shoppingList/${itemID}`)
        remove(location)
    })
    shoppingListEl.append(newEl)

}
