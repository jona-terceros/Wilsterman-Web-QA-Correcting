window.addEventListener('DOMContentLoaded', function(event){

    const baseRawUrl = 'http://localhost:5500';

    async function GetRumors(){

        const url = `http://localhost:5500/api/rumor`;
        let response = await fetch(url);
        try{
            if(response.status == 200){
                let data = await response.json();

                let type = data.map(r => `<p class="type-transfer-literal">${r.type}</p>`);
                let currency = data.map(r => `<div class="currency"><p>${r.currency}</p></div>`);
                let price = data.map(r => `<div class="price"><p>${r.price}</p></div>`);
                let playerImage = data.map(g => g.playerPath? `${baseRawUrl}/${g.playerPath}` : "");
                let teamImage = data.map(g => g.targetTeamPath? `${baseRawUrl}/${g.targetTeamPath}` : "");
                let targetTeam = data.map(r => `<div class="target-team-name"><p>${r.targetTeam}</p></div>`);
                let playerName = data.map(r => `<div class="player-transfer-name"><p>${r.playerName}</p></div>`);
                let transfer = data.map(r => r.transfer);
                let rumorId = data.map(r => r.id);
                let inOutImage;
                let fullContent = "";

                for(let i = 0; i < transfer.length; i++){
                    switch(transfer[i]){
                        case "Salida":{inOutImage = "./Images/Otros/salida.gif";break}
                        case "Llegada":{inOutImage = "./Images/Otros/llegada.gif";break}
                    }
                    let transfersContent=   `<div class="transfer-buttons">
                                            <div class="transfer">
                                                <div class="transfer-header">
                                                    ${price[i]}
                                                    ${currency[i]}
                                                </div>
                                                <div class="type-transfer">
                                                    <div class="type-transfer-image"><img src="./Images/Otros/transfer-color.gif" alt="Transfer" width="40px" height="40px"></div>
                                                    ${type[i]}
                                                </div>
                                                <div class="actors-transfer">
                                                    <div class="player-transfer">
                                                        <div class="player-transfer-image"><img src="${playerImage[i]}" width="90px" height="90px"></div>
                                                        ${playerName[i]}
                                                    </div>
                                                    <div class="transfer-in-out"><img src="${inOutImage}" width="74px" height="74px"></div>
                                                    <div class="transfer-target-team">
                                                        <div class="target-team-image"><img src="${teamImage[i]}" width="90px" height="90px"></div>
                                                        ${targetTeam[i]}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="buttons">
                                                <button class="edit" data-edit-rumor-id="${rumorId[i]}"><img src="./Images/Icons/CREATE.gif" alt=""></button>
                                                <button class="delete" data-delete-rumor-id="${rumorId[i]}"><img src="./Images/Icons/DELETE.gif" alt=""></button>
                                                <button class="confirm" data-confirm-rumor-id="${rumorId[i]}" data-type-transfer="${transfer[i]}"><img src="./Images/Icons/CONFIRM.gif" alt=""></button>
                                            </div>
                                        </div>`
                    fullContent = fullContent+transfersContent;
                }
                
                document.getElementById('rumors-boxes').innerHTML = fullContent;
                let deleteButtons = document.querySelectorAll('[data-delete-rumor-id]'); //Delete
                for (const button of deleteButtons) {
                    button.addEventListener('click', DeleteRumor);
                }

                let confirmButtons = document.querySelectorAll('[data-confirm-rumor-id]'); //Delete
                for (const button of confirmButtons) {
                    button.addEventListener('click', ConfirmRumor);
                }

                let editButtons = document.querySelectorAll('[data-edit-rumor-id]'); //Delete
                for (const button of editButtons) {
                    button.addEventListener('click', GotoEditRumor);
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


    function DeleteRumor(event) {
        let r = confirm("Are you sure you want to delete it?");
        if (r) {
            let rumorId = this.dataset.deleteRumorId;
            let url = `http://localhost:5500/api/rumor/${rumorId}`;
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
    
    


    function ConfirmRumor(event){
        
        let r = confirm("Are you sure you want to confirm it?");
        if (r) {
            let rumorId = this.dataset.confirmRumorId;
            let url = `http://localhost:5500/api/rumor?rumorId=${rumorId}&confirmRumor=true`;
            fetch(url, { 
            method: 'DELETE' 
            }).then((data)=>{
                if(data.status === 200){
                    alert('Rumor comes true.');
                }
            });
            let typeTransfer = this.dataset.typeTransfer;
            if(typeTransfer == "Llegada"){
                location.reload();
                window.location.href = "players.html";
            }else{
                location.reload();
            }
        } 
    }



    function GotoEditRumor(event){
        let playerId = this.dataset.editRumorId;
        window.location.href = `newRumor.html?type=edit&playerId=${playerId}`;
    }



    GetRumors();


    
});

