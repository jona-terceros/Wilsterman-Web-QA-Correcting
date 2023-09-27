import generateFooter from "./Components/footerComponent.js";
import generateMenu from "./Components/menuComponent.js";
import {convertTextMonth, tournamentPathImage} from "./Repository/extraFunctions.js";

window.addEventListener('DOMContentLoaded', function(event){

    document.getElementById("menu").innerHTML = generateMenu();
    document.getElementById("footer").innerHTML = generateFooter();
    const baseRawUrl = 'http://localhost:5500';

    async function GetResult(event){

        const remGamesHtml = document.querySelectorAll('.month-game');
        for (const rem of remGamesHtml) {
            rem.remove();
        }

        let filterTournament = "";
        if(this.dataset != undefined){
            filterTournament = this.dataset.buttonFilter;
        }

        const url = `http://localhost:5500/api/game?finish=Terminado&tournament=${filterTournament}`;
        let response = await fetch(url);
        let errorText;
        try{
            if(response.status == 200){
                let data = await response.json();

                const day = data.map(g => `<div class="date-day"><p>${g.day}</p></div>`);
                const dayWeek = data.map(g => `<div class="date-day-literal"><p>${g.dayWeek}</p></div>`);
                const month = data.map(g => `<div class="date-month"><p>${g.month}</p></div>`);
                const monthText = data.map(g => g.month);
                const localImage = data.map(g => g.localTeamPath? `${baseRawUrl}/${g.localTeamPath}` : "");
                const awayImage = data.map(g => g.awayTeamPath? `${baseRawUrl}/${g.awayTeamPath}` : "");
                const stage = data.map(g => `<div class="stage"><p>${g.stageTournament}</p></div>`);
                const matchday = data.map(g => `<div class="matchday"><p>${g.matchdayTournament}</p></div>`);
                const localTeam = data.map(g => `<div class="team-name"><p>${g.localTeam}</p></div>`);
                const goals = data.map(g => `<div class="local-goals"><p>${g.localGoals}</p></div><div class="versus"><p>-</p></div><div class="away-goals"><p>${g.awayGoals}</p></div>`);
                const awayTeam = data.map(g => `<div class="team-name"><p>${g.awayTeam}</p></div>`);
                const stadium = data.map(g => `<div class="stadium-name"><p>${g.stadium}</p></div>`);
                const tournament = data.map(g => g.tournament);
                const gameId = data.map(g => g.id);

                const listMonths = [];
                let newMonth = "";
                let i;
                for(i = 0; i < month.length; i++){
                    if(newMonth != monthText[i]){
                        newMonth = monthText[i];
                        listMonths.push(newMonth);
                    }
                }

                let gamesByMonth = "";
                let fullContent = "";
                let counter =0;

                for(i = 0; i < listMonths.length; i++){

                    while(counter < monthText.length && listMonths[i] == monthText[counter]){

                        let contentGame=`<div class="game-buttons" title~="${i}">
                                            <div class="game">
                                                <div class="game-header">
                                                ${day[counter]}
                                                <div class="date-day-month">
                                                    ${dayWeek[counter]}
                                                    <div class="date-month"><p>${convertTextMonth(monthText[counter])}</p></div>
                                                </div>
                                                </div>
                                                <div class="tournament">
                                                    <div class="tournament-image"><img src="${tournamentPathImage(tournament[counter])}" alt="Liga" width="40px" height="40px"></div>
                                                    ${stage[counter]}${matchday[counter]}
                                                </div>
                                                <div class="teams">
                                                    <div class="local-team">
                                                        <div class="local-team-image"><img src="${localImage[counter]}" alt="Plamaflor" width="70px" height="70px"></div>
                                                        ${localTeam[counter]}
                                                    </div>
                                                    <div class="result-hour">${goals[counter]}</div>
                                                    <div class="away-team">
                                                        <div class="away-team-image"><img src="${awayImage[counter]}" alt="Wilsterman" width="70px" height="70px"></div>
                                                        ${awayTeam[counter]}
                                                    </div>
                                                </div>
                                                <div class="stadium">
                                                    <div class="stadium-image"><img src="./Images/Otros/stadium plantilla.png" alt="Stadium" width="30px" height="30px"></div>
                                                    ${stadium[counter]}
                                                </div>
                                            </div>
                                            <div class="buttons-game">
                                                <button class="edit" data-edit-game-id="${gameId[counter]}">
                                                    <img src="./Images/Icons/CREATE.gif" alt="">
                                                    <p class="text-button">EDIT GAME</p>
                                                </button>
                                                <button class="delete" data-delete-game-id="${gameId[counter]}">
                                                    <img src="./Images/Icons/DELETE.gif" alt="">
                                                    <p class="text-button">DELETE GAME</p>
                                                </button>
                                            </div>
                                        </div>`;

                        gamesByMonth = gamesByMonth+contentGame;
                        counter=counter+1;
                    }
                    let contentMonth = `<div class="month-game">
                                            <div class="month-bigger"><p>${convertTextMonth(listMonths[i])}</p></div>
                                            <div class="list-games">
                                                ${gamesByMonth}
                                            </div>
                                        </div>`
                    fullContent = fullContent+contentMonth;
                    gamesByMonth = "";
                }
                document.querySelector('.filters').insertAdjacentHTML("afterend", fullContent);
                let deleteButtons = document.querySelectorAll('[data-delete-game-id]'); //Delete
                for (const button of deleteButtons) {
                    button.addEventListener('click', DeleteGame);
                }

                let editButtons = document.querySelectorAll('[data-edit-game-id]'); //Edit
                for (const button of editButtons) {
                    button.addEventListener('click', goToEditGame);
                }
                
            } else {
                errorText = await response.text();
                alert(errorText);
            }
        } catch(error){
            errorText = await error.text();
            alert(errorText);
        }

    }




    function DeleteGame(event){
        
        let r = confirm("Are you sure you want to delete it?");
        if (r) {
            let gameId = this.dataset.deleteGameId;
            let url = `http://localhost:5500/api/game/${gameId}`;
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


    function goToEditGame(event){
        let gameId = this.dataset.editGameId;
        window.location.href = `editResults.html?type=edit&gameId=${gameId}`;
    }

    //Disparadores

    GetResult();

    let filterButtons = document.querySelectorAll('[data-button-filter]'); //Filtros
    for (const button of filterButtons) {
        button.addEventListener('click', GetResult);
    }


});

