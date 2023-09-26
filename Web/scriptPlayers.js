import generateMenu from "./Components/menuComponent.js";
import generateFooter from "./Components/footerComponent.js";

window.addEventListener('DOMContentLoaded', function(event){

    const baseRawUrl = 'http://localhost:5500';

    document.getElementById("menu").innerHTML = generateMenu();
    document.getElementById("footer").innerHTML = generateFooter();

    async function GetPlayers(event){

        let remPlayersHtml = document.querySelectorAll('.players-by-position');
        for (const rem of remPlayersHtml) {
            rem.remove();
        }

        let filterCountry = "";
        let posiblePlayers = "";
        if(this.dataset != undefined){
            filterCountry = this.dataset.buttonFilter;
            posiblePlayers = this.dataset.posiblePlayers;
        }

        const url = `http://localhost:5500/api/player?country=${filterCountry}&posiblePlayers=${posiblePlayers}`;
        let response = await fetch(url);
        try{
            if(response.status == 200){
                let data = await response.json();

                let name = data.map(g => `<p class="name">${g.name}</p>`);
                let shirt = data.map(g => `<p class="number">${g.shirt}</p>`);
                let pos = data.map(g => `<p class="position">${g.generalPosition}</p>`);
                let generalPosition = data.map(g => g.generalPosition);
                let playerImage = data.map(g => g.playerPath? `${baseRawUrl}/${g.playerPath}` : "");
                let playerId = data.map(g => g.id);


                let position =['Arquero', 'Defensa', 'Mediocampo', 'Ataque'];
                let fullContent = "";
                let playersContent = "";
                let counter = 0;

                for(let i = 0; i < 4; i++){
                    
                    while(counter < playerId.length){

                        if(position[i] == generalPosition[counter]){

                            let contentBox= `<div class="player">
                                                <div class="data-player">
                                                    <img src="${playerImage[counter]}" alt="">
                                                    <div class="data">
                                                        ${pos[counter]}
                                                        <div class="number-name"> 
                                                            ${shirt[counter]}
                                                            ${name[counter]}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="buttons-player">
                                                    <button class="edit" data-edit-player-id="${playerId[counter]}"><img src="./Images/Icons/CREATE.gif" alt=""></button>
                                                    <button class="delete" data-delete-player-id="${playerId[counter]}"><img src="./Images/Icons/DELETE.gif" alt=""></button>
                                                    <button class="delete edit transfer" data-transfer-player-id="${playerId[counter]}"><img src="./Images/Icons/transferencia.gif" alt=""></button>
                                                </div>
                                            </div>`;

                            playersContent = playersContent+contentBox;
                        }
                        counter=counter+1;
                    }
                    if(playersContent != ""){
                        let contentPositionContainer =  `<div class="players-by-position">
                                                            <div class="position-panel"><p>${position[i]}</p></div>
                                                            <div class="list-players">
                                                                ${playersContent}
                                                            </div>
                                                        </div>`
                        fullContent = fullContent+contentPositionContainer;
                    }
                    
                    playersContent = "";
                    counter = 0;
                }

                document.getElementById('position-player-container').innerHTML = fullContent;
                let deleteButtons = document.querySelectorAll('[data-delete-player-id]'); //Delete
                for (const button of deleteButtons) {
                    button.addEventListener('click', DeletePlayer);
                }

                let rumorButtons = document.querySelectorAll('[data-transfer-player-id]'); //Delete
                for (const button of rumorButtons) {
                    button.addEventListener('click', GotoCreateRumor);
                }

                let editButtons = document.querySelectorAll('[data-edit-player-id]'); //Delete
                for (const button of editButtons) {
                    button.addEventListener('click', GotoEditPlayer);
                }

            } else {
                let errorText = await response.text();
                alert(errorText);
            }
        } catch(error){
            let errorText = await error.text();
            alert(errorText);
        }
    }


    function DeletePlayer(event){
        
        let result = confirm("Are you sure you want to delete it?");
        if (result) {
            let playerId = this.dataset.deletePlayerId;
            let url = `http://localhost:5500/api/player/${playerId}`;
            fetch(url, { 
            method: 'DELETE' 
            }).then((data)=>{
                if(data.status === 200){
                    alert('deleted');
                }
            }); 
            location.reload();
        } 
    }


    function GotoCreateRumor(event){
        let playerId = this.dataset.transferPlayerId;
        window.location.href = `newRumor.html?type=create&playerId=${playerId}`;
    }

    function GotoEditPlayer(event){
        let playerId = this.dataset.editPlayerId;
        window.location.href = `newPlayer.html?playerId=${playerId}`;
    }

    function GotoCreatePlayer(event){
        window.location.href = `newPlayer.html`;
    }


    GetPlayers();

    let buttons = document.querySelectorAll('[data-button-filter]');
    for (const button of buttons) {
        button.addEventListener('click', GetPlayers);
    }

    document.querySelector('.add-player').addEventListener('click', GotoCreatePlayer);
});
