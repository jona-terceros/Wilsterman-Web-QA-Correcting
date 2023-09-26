import generateMenu from "./Components/menuComponent.js";
import generateFooter from "./Components/footerComponent.js";
import fetchUpdate from "./Repository/fetchUpdate.js";

window.addEventListener('DOMContentLoaded', function(event){

    document.getElementById("menu").innerHTML = generateMenu();
    document.getElementById("footer").innerHTML = generateFooter();
    
    let queryParams = window.location.search.split('&');
    let type = queryParams[0].split('=')[1];
    let playerId = queryParams[1].split('=')[1];
    let rumorId = playerId;

    if(type == "create"){
        GetPlayer();
        document.getElementById('form-box').addEventListener('submit', CreateRumor);
    }
    else
    {
        GetRumor();

        document.getElementById('form-box').addEventListener('submit', UpdateRumor);
    }

    let namePlayer = "";
    let playerPath = "";

    const baseRawUrl = 'http://localhost:5500';

    async function GetPlayer(event){

        const url = `http://localhost:5500/api/player/${playerId}`;
        let response = await fetch(url);
        let data = await response.json();
        let editForm = document.getElementById('form-box');

        namePlayer = data.name;
        playerPath=  `${baseRawUrl}/${data.playerPath}`;
        editForm.playerName.value = namePlayer;
        editForm[4].disabled = true;
        editForm[5].disabled = true;

        let playerImage = `<img src="${playerPath}"  width="180px" height="180px"></img>`;
        document.getElementById('playerImage').innerHTML=playerImage;
    }


    function CreateRumor(event){
        event.preventDefault();
        let url = `http://localhost:5500/api/rumor`;
        const formData = new FormData();

        formData.append('Type', event.currentTarget.transfer.value);
        formData.append('TargetTeam', event.currentTarget.target.value);

        if(event.currentTarget.target.value == "Wilsterman"){
            formData.append('Transfer', "Llegada");
        }else{
            formData.append('Transfer', "Salida");
        }
        
        formData.append('Price', event.currentTarget.price.value);
        formData.append('TransferVariables', event.currentTarget.variables.value);
        formData.append('Currency', event.currentTarget.divisa.value);
        formData.append('PlayerId', playerId);
        formData.append('PlayerName', namePlayer);
        formData.append('TargetTeamImage', event.currentTarget.fileTarget.files[0]);
       

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            if(response.status === 201){
                alert('New rumor created.');
                window.location.href = "rumors.html";
            } else {
                response.text()
                .then((error)=>{
                    alert(error);
                });
            }
        });
    }

    async function GetRumor(event){

        let title = `<p class="title-principal">Editar Partido</p>`;

        document.getElementById('title-changer').innerHTML=title;

        const url = `http://localhost:5500/api/rumor/${rumorId}`;
        let response = await fetch(url);
        let data = await response.json();
        let editForm = document.getElementById('form-box');

        playerId = data.playerId;
        namePlayer = data.playerName;

        editForm.price.value =        data.price;
        editForm.variables.value =    data.transferVariables;
        editForm.divisa.value =       data.currency;
        editForm.transfer.value =     data.type;
        editForm.target.value =       data.targetTeam;
        editForm[6].disabled = true;
        GetPlayer();

    }


    function UpdateRumor(event){
        console.log(event.currentTarget);
        event.preventDefault();

        let rumorToUpdate = {
            price: parseInt(event.currentTarget.price.value),
            transferVariables: parseInt(event.currentTarget.variables.value),
            currency: event.currentTarget.divisa.value,
            type:  event.currentTarget.transfer.value,
            targetTeam: event.currentTarget.target.value, 
        }

        let gameJson = JSON.stringify(rumorToUpdate);
        let url = `http://localhost:5500/api/rumor/${rumorId}`;
        let alertMessage = "Transfer Rumor updated successfuly.";
        let locationHTML = "rumors.html";
        
        fetchUpdate(url,gameJson,alertMessage,locationHTML,data);
    }
});

