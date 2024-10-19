// handlers.js

export async function setData() {
    const dataContainer = document.getElementById("data");
    const response = await fetch("https://tarea-backend-id2v.onrender.com/api/users");
    const users = await response.json();
    
    dataContainer.innerHTML = ""; 

    users.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.className = "user-card"; 
        userDiv.innerHTML = `
            <p>ID: ${user._id}</p>
            <p>Nombre: ${user.name}</p>
            <p>Edad: ${user.age}</p>
            <p>Email: ${user.email}</p>
            <button onclick="deleteUser('${user._id}')">Eliminar</button>
            <button onclick="editUser('${user._id}', '${user.name}', ${user.age}, '${user.email}')">Editar</button>
            <hr>
        `;
        dataContainer.appendChild(userDiv);
    });
}

window.deleteUser = async (id) => {
    await fetch(`https://tarea-backend-id2v.onrender.com/api/users/${id}`, {
        method: "DELETE"
    });
    await setData(); 
};

window.editUser = async (id, name, age, email) => {
    const newName = prompt("Nuevo nombre:", name);
    const newAge = prompt("Nueva edad:", age);
    const newEmail = prompt("Nuevo correo electrónico:", email);

    if (newName && newAge && newEmail) { 
        const body = { name: newName, age: newAge, email: newEmail };

        await fetch(`https://tarea-backend-id2v.onrender.com/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        await setData(); 
    } else {
        alert("Todos los campos son obligatorios para editar.");
    }
};
