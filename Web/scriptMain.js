import generateFooter from "./Components/footerComponent.js";
import generateMenu from "./Components/menuComponent.js";

window.addEventListener('DOMContentLoaded', function(event){

    document.getElementById("menu").innerHTML = generateMenu();
    document.getElementById("footer").innerHTML = generateFooter();

    const baseRawUrl = 'http://localhost:5500';
    async function GetResultAndNextGame(){
        const url = `http://localhost:5500/api/game?twoGamesOnly=true`;
        let response = await fetch(url);
        try{
            if(response.status == 200){
                let data = await response.json();

                let day = data.map(g => `<div class="date-day"><p>${g.day}</p></div>`);
                let dayWeek = data.map(g => `<div class="date-day-literal"><p>${g.dayWeek}</p></div>`);
                let localImage = data.map(g => g.localTeamPath? `${baseRawUrl}/${g.localTeamPath}` : "");
                let awayImage = data.map(g => g.awayTeamPath? `${baseRawUrl}/${g.awayTeamPath}` : "");
                let stage = data.map(g => `<div class="stage"><p>${g.stageTournament}</p></div>`);
                let matchday = data.map(g => `<div class="matchday"><p>${g.matchdayTournament}</p></div>`);
                let localTeam = data.map(g => `<div class="team-name"><p>${g.localTeam}</p></div>`);
                let goals = data.map(g => `<div class="local-goals"><p>${g.localGoals}</p></div><div class="versus"><p>-</p></div><div class="away-goals"><p>${g.awayGoals}</p></div>`);
                let awayTeam = data.map(g => `<div class="team-name"><p>${g.awayTeam}</p></div>`);
                let stadium = data.map(g => `<div class="stadium-name"><p>${g.stadium}</p></div>`);
                let timeMatch = data.map(g => `<div class="hour"><p>${g.hour}</p></div><div class="two-points"><p>:</p></div><div class="minute"><p>${g.minutes}</p></div>`);
                let tournament = data.map(g => g.tournament);
                let monthText = data.map(g => g.month);


                let contentResult = `<div class="result-header">
                                        ${day[0]}
                                        <div class="date-day-month">
                                            ${dayWeek[0]}
                                            <div class="date-month"><p>${convertTextMonth(monthText[0])}</p></div>
                                        </div>
                                    </div>
                                    <div class="tournament">
                                        <div class="tournament-image"><img src="${tournamentPathImage(tournament[0])}" alt="Liga" width="40px" height="40px"></div>
                                        ${stage[0]}${matchday[0]}
                                    </div>
                                    <div class="teams">
                                        <div class="local-team">
                                            <div class="local-team-image"><img src="${localImage[0]}" alt="Plamaflor" width="70px" height="70px"></div>
                                            ${localTeam[0]}
                                        </div>
                                        <div class="result-hour">${goals[0]}</div>
                                        <div class="away-team">
                                            <div class="away-team-image"><img src="${awayImage[0]}" alt="Wilsterman" width="70px" height="70px"></div>
                                            ${awayTeam[0]}
                                        </div>
                                    </div>
                                    <div class="stadium">
                                        <div class="stadium-image"><img src="./Images/Otros/stadium plantilla.png" alt="Stadium" width="30px" height="30px"></div>
                                        ${stadium[0]}
                                    </div>`;
                

                if(day.length > 1)
                {

                    let contentGame =   `<div class="result-header">
                                            ${day[1]}
                                            <div class="date-day-month">
                                                ${dayWeek[1]}
                                                <div class="date-month"><p>${convertTextMonth(monthText[1])}</p></div>
                                            </div>
                                        </div>
                                        <div class="tournament">
                                            <div class="tournament-image"><img src="${tournamentPathImage(tournament[1])}" alt="Liga" width="40px" height="40px"></div>
                                            ${stage[1]}${matchday[1]}
                                        </div>
                                        <div class="teams">
                                            <div class="local-team">
                                                <div class="local-team-image"><img src="${localImage[1]}" alt="Plamaflor" width="70px" height="70px"></div>
                                                ${localTeam[1]}
                                            </div>
                                            <div class="result-hour">${timeMatch[1]}</div>
                                            <div class="away-team">
                                                <div class="away-team-image"><img src="${awayImage[1]}" alt="Wilsterman" width="70px" height="70px"></div>
                                                ${awayTeam[1]}
                                            </div>
                                        </div>
                                        <div class="stadium">
                                            <div class="stadium-image"><img src="./Images/Otros/stadium plantilla.png" alt="Stadium" width="30px" height="30px"></div>
                                            ${stadium[1]}
                                        </div>`
                    document.getElementById('game').innerHTML = contentGame;
                }

                document.getElementById('result').innerHTML = contentResult;
                
                
            } else {
                let errorText = await response.text();
                alert(errorText);
            }
        } catch(error){
            let errorText = await error.text();
            alert(errorText);
        }
    }






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
                let inOutImage;
                let fullContent = "";

                for(let i = 0; i < 3; i++){
                    switch(transfer[i]){
                        case "Salida":{inOutImage = "./Images/Otros/salida.gif";break}
                        case "Llegada":{inOutImage = "./Images/Otros/llegada.gif";break}
                    }
                    let transfersContent=   `<div class="transfer">
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
                                            </div>`

                    fullContent = fullContent+transfersContent;
                }
                document.querySelector('.more-rumors').insertAdjacentHTML("afterend", fullContent);

            } else {
                let errorText = await response.text();
                alert(errorText);
            }
        } catch(error){
            let errorText = await error.text();
            alert(errorText);
        }
    }

    function convertTextMonth(month) {
        switch (month) {
            case '01': return 'Enero';
            case '02': return 'Febrero';
            case '03': return 'Marzo';
            case '04': return 'Abril';
            case '05': return 'Mayo';
            case '06': return 'Junio';
            case '07': return 'Julio';
            case '08': return 'Agosto';
            case '09': return 'Septiembre';
            case '10': return 'Octubre';
            case '11': return 'Noviembre';
            case '12': return 'Diciembre';
            default: return 'Mes no válido';
        }
    }
    
    function tournamentPathImage(tournament){
        switch(tournament){
            case "Copa Sudamericana":{return "./Images/Tournaments/Copa Sudamericana.png";}
            case "Liga Boliviana":{return "./Images/Tournaments/Liga Boliviana.png";}
            case "Amistoso":{return "./Images/Tournaments/amistoso.png";}
            default:{return "./Images/Tournaments/Liga Boliviana.png";}
        }
    }


    GetResultAndNextGame();
    GetRumors();

});

