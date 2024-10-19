import { setData } from "./handlers.js";

async function app() {
    const data = document.getElementById("data");
    await setData();

    const create = async (e) => {
        e.preventDefault();
        const name = document.getElementById("name");
        const age = document.getElementById("age");
        const email = document.getElementById("email");
        const body = { name: name.value, age: age.value, email: email.value };

        const response = await fetch("https://tarea-backend-id2v.onrender.com/api/users", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            method: "POST"
        });
        const parsed = await response.json();
        console.log(parsed);
        data.innerHTML = "";  
        await setData();
    };

    const form = document.getElementById("form");
    form.addEventListener("submit", create);
}

app();
