window.addEventListener('DOMContentLoaded', function(event){


    var queryParams = window.location.search.split('&');
    var type = queryParams[0].split('=')[1];
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

    var namePlayer = "";
    var playerPath = "";

        

    let resultAndGame = []
    const baseRawUrl = 'http://localhost:5500';
    const baseUrl = `${baseRawUrl}/api`;

    



    async function GetPlayer(event){

        const url = `http://localhost:5500/api/player/${playerId}`;
        var response = await fetch(url);
        var data = await response.json();
        var editForm = document.getElementById('form-box');

        namePlayer = data.name;
        playerPath=  `${baseRawUrl}/${data.playerPath}`;
        editForm.playerName.value = namePlayer;
        editForm[4].disabled = true;
        editForm[5].disabled = true;

        var playerImage = `<img src="${playerPath}"  width="180px" height="180px"></img>`;
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

        var title = `<p class="title-principal">Editar Partido</p>`;

        document.getElementById('title-changer').innerHTML=title;

        const url = `http://localhost:5500/api/rumor/${rumorId}`;
        var response = await fetch(url);
        var data = await response.json();
        var editForm = document.getElementById('form-box');

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

        var rumorToUpdate = {
            price: parseInt(event.currentTarget.price.value),
            transferVariables: parseInt(event.currentTarget.variables.value),
            currency: event.currentTarget.divisa.value,
            type:  event.currentTarget.transfer.value,
            targetTeam: event.currentTarget.target.value, 
        }

        var gameJson = JSON.stringify(rumorToUpdate);
        let url = `http://localhost:5500/api/rumor/${rumorId}`;
        
        fetch(url, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'PUT',
            body: gameJson
        }).then((response) => {
            if (response.status === 200) {
                alert("Transfer Rumor updated successfuly.");
                window.location.href = "rumors.html";
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

