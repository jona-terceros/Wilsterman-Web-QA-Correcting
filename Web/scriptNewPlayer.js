import generateFooter from "./Components/footerComponent.js";
import generateMenu from "./Components/menuComponent.js";

window.addEventListener('DOMContentLoaded', function(event){

    let queryParams = window.location.search.split('?');
    let playerId;
    document.getElementById("menu").innerHTML = generateMenu();
    document.getElementById("footer").innerHTML = generateFooter();

    if(queryParams.length == 1){
        document.getElementById('form-box').addEventListener('submit', CreatePlayer);
    }
    else
    {
        playerId = queryParams[1].split('=')[1];
        GetPlayer();
        document.getElementById('form-box').addEventListener('submit', UpdatePlayer);
    }

    const baseRawUrl = 'http://localhost:5500';

    function CreatePlayer(event){
        event.preventDefault();
        let url = `http://localhost:5500/api/player`;
        const formData = new FormData();

        formData.append('Name', event.currentTarget.playerName.value);
        formData.append('Age', event.currentTarget.age.value);
        formData.append('CurrentTeam', event.currentTarget.teamName.value);
        formData.append('Country', event.currentTarget.country.value);
        formData.append('Shirt', event.currentTarget.shirt.value);
        formData.append('GeneralPosition', event.currentTarget.generalPosition.value);
        formData.append('PlayerImage', event.currentTarget.playerImage.files[0]);
        formData.append('CurrentTeamImage', event.currentTarget.teamImage.files[0]);

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            if(response.status === 201){
                alert('New player created.');
                window.location.href = "players.html";
            } else {
                response.text()
                .then((error)=>{
                    alert(error);
                });
            }
        });
    }


    async function GetPlayer(event){

        const url = `http://localhost:5500/api/player/${playerId}`;
        let response = await fetch(url);
        let data = await response.json();
        let editForm = document.getElementById('form-box');
        let playerPath =  `${baseRawUrl}/${data.playerPath}`;
        let teamPath = `${baseRawUrl}/${data.currentTeamPath}`;
        let title = `<p class="title-principal">Editar Datos del Jugador</p>`;

        let imagesContent = `<div id ="data-player" class="data-header">
                                <img src="${playerPath}" alt="" class="standar-image">
                                <div id="image-name-player">
                                    <input type="file" name="playerImage" id="playerImage">
                                    <input type="text" name="playerName" id="playerName">
                                    <label for="playerName">Nombre</label>
                                </div>
                            </div>
                            <div id="data-current-team" class="data-header">
                                <img src="${teamPath}" alt="" class="standar-image">
                                <div id="image-name-team">
                                    <input type="file" name="teamImage" id="teamImage">
                                    <input type="text" name="teamName" id="teamName">
                                    <label for="teamName">Nombre</label>
                                </div>
                            </div>`

        document.getElementById('title-changer').innerHTML=title;
        document.getElementById('data-names-files').innerHTML=imagesContent;

        editForm.playerName.value = data.name;
        editForm.age.value = data.age;
        editForm.teamName.value = data.teamName;
        editForm.country.value = data.country;
        editForm.shirt.value = data.shirt;
        editForm.generalPosition.value = data.generalPosition;
        editForm.teamName.value = data.currentTeam;
        editForm[0].disabled = true;
        editForm[2].disabled = true;
    }

    function UpdatePlayer(event){
        console.log(event.currentTarget);
        event.preventDefault();

        let playerToUpdate = {
            name:           event.currentTarget.playerName.value,
            age:            parseInt(event.currentTarget.age.value),
            teamName:       event.currentTarget.teamName.value,
            country:        event.currentTarget.country.value,
            shirt:          parseInt(event.currentTarget.shirt.value),
            generalPosition:event.currentTarget.generalPosition.value,
            currentTeam:    event.currentTarget.teamName.value,
        }

        let playerJson = JSON.stringify(playerToUpdate);
        let url = `http://localhost:5500/api/player/${playerId}`;
        
        fetch(url, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'PUT',
            body: playerJson
        }).then((response) => {
            if (response.status === 200) {
                alert("Player updated successfuly.");
                window.location.href = "players.html";
            } 
            else{
                response.text().then((data) => {
                    debugger;
                    console.log(data);
                });
            }
        }).catch((response) => {
                debugger;
                console.log(data);
        });
    }
});