import generateFooter from "./Components/footerComponent.js";
import generateMenu from "./Components/menuComponent.js";

window.addEventListener('DOMContentLoaded', function(event){

    document.getElementById("menu").innerHTML = generateMenu();
    document.getElementById("footer").innerHTML = generateFooter();

    async function createRumorElement(rumor) {
        const baseRawUrl = 'http://localhost:5500';
    
        const inOutImage = rumor.transfer === 'Salida' ? './Images/Otros/salida.gif' : './Images/Otros/llegada.gif';
    
        const transfersContent = `
            <div class="transfer-buttons">
                <div class="transfer">
                    <div class="transfer-header">
                        <div class="price"><p>${rumor.price}</p></div>
                        <div class="currency"><p>${rumor.currency}</p></div>
                    </div>
                    <div class="type-transfer">
                        <div class="type-transfer-image"><img src="./Images/Otros/transfer-color.gif" alt="Transfer" width="40px" height="40px"></div>
                        <p class="type-transfer-literal">${rumor.type}</p>
                    </div>
                    <div class="actors-transfer">
                        <div class="player-transfer">
                            <div class="player-transfer-image"><img src="${baseRawUrl}/${rumor.playerPath}" width="90px" height="90px"></div>
                            <div class="player-transfer-name"><p>${rumor.playerName}</p></div>
                        </div>
                        <div class="transfer-in-out"><img src="${inOutImage}" width="74px" height="74px"></div>
                        <div class="transfer-target-team">
                            <div class="target-team-image"><img src="${baseRawUrl}/${rumor.targetTeamPath}" width="90px" height="90px"></div>
                            <div class="target-team-name"><p>${rumor.targetTeam}</p></div>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button class="edit" data-edit-rumor-id="${rumor.id}"><img src="./Images/Icons/CREATE.gif" alt=""></button>
                    <button class="delete" data-delete-rumor-id="${rumor.id}"><img src="./Images/Icons/DELETE.gif" alt=""></button>
                    <button class="confirm" data-confirm-rumor-id="${rumor.id}" data-type-transfer="${rumor.transfer}"><img src="./Images/Icons/CONFIRM.gif" alt=""></button>
                </div>
            </div>
        `;
    
        const rumorElement = document.createElement('div');
        rumorElement.innerHTML = transfersContent;
    
        return rumorElement;
    }
    
    function addEventListenersToButtons() {
        const deleteButtons = document.querySelectorAll('[data-delete-rumor-id]');
        const confirmButtons = document.querySelectorAll('[data-confirm-rumor-id]');
        const editButtons = document.querySelectorAll('[data-edit-rumor-id]');
    
        for (const button of deleteButtons) {
            button.addEventListener('click', DeleteRumor);
        }
    
        for (const button of confirmButtons) {
            button.addEventListener('click', ConfirmRumor);
        }
    
        for (const button of editButtons) {
            button.addEventListener('click', GotoEditRumor);
        }
    }
    
    async function GetRumors() {
        try {
            const response = await fetch('http://localhost:5500/api/rumor');
            if (response.status === 200) {
                const data = await response.json();
                const rumorsContainer = document.getElementById('rumors-boxes');
                rumorsContainer.innerHTML = '';
    
                for (const rumor of data) {
                    const rumorElement = createRumorElement(rumor);
                    rumorsContainer.appendChild(rumorElement);
                }
    
                addEventListenersToButtons();
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            const errorText = await error.text();
            alert(errorText);
        }
    }
    
    function DeleteRumor(event) {
        const r = confirm("Are you sure you want to delete it?");
        if (r) {
            const rumorId = this.dataset.deleteRumorId;
            const url = `http://localhost:5500/api/rumor/${rumorId}`;
            fetch(url, { 
                method: 'DELETE' 
            }).then((data) => {
                if (data.status === 200) {
                    alert('deleted');
                }
            }); 
            location.reload();
        } 
    }
    
    function ConfirmRumor(event) {
        const r = confirm("Are you sure you want to confirm it?");
        if (r) {
            const rumorId = this.dataset.confirmRumorId;
            const url = `http://localhost:5500/api/rumor?rumorId=${rumorId}&confirmRumor=true`;
            fetch(url, { 
                method: 'DELETE' 
            }).then((data) => {
                if (data.status === 200) {
                    alert('Rumor comes true.');
                }
            });
            const typeTransfer = this.dataset.typeTransfer;
            if (typeTransfer === "Llegada") {
                location.reload();
                window.location.href = "players.html";
            } else {
                location.reload();
            }
        } 
    }
    
    function GotoEditRumor(event) {
        const rumorId = this.dataset.editRumorId;
        window.location.href = `newRumor.html?type=edit&playerId=${rumorId}`;
    }
    
    document.addEventListener('DOMContentLoaded', function (event) {
        GetRumors();
    });
    
    
});

