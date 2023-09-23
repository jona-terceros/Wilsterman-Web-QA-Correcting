window.addEventListener('DOMContentLoaded', function(event){

    let resultAndGame = []
    const baseRawUrl = 'http://localhost:5500';
    const baseUrl = `${baseRawUrl}/api`;



    async function GetResultAndNextGame(){
        const url = `http://localhost:5500/api/game?twoGamesOnly=true`;
        let response = await fetch(url);
        try{
            if(response.status == 200){
                let data = await response.json();

                var day = data.map(g => `<div class="date-day"><p>${g.day}</p></div>`);
                var dayWeek = data.map(g => `<div class="date-day-literal"><p>${g.dayWeek}</p></div>`);
                var month = data.map(g => `<div class="date-month"><p>${g.month}</p></div>`);
                var localImage = data.map(g => g.localTeamPath? `${baseRawUrl}/${g.localTeamPath}` : "");
                var awayImage = data.map(g => g.awayTeamPath? `${baseRawUrl}/${g.awayTeamPath}` : "");
                var stage = data.map(g => `<div class="stage"><p>${g.stageTournament}</p></div>`);
                var matchday = data.map(g => `<div class="matchday"><p>${g.matchdayTournament}</p></div>`);
                var localTeam = data.map(g => `<div class="team-name"><p>${g.localTeam}</p></div>`);
                var goals = data.map(g => `<div class="local-goals"><p>${g.localGoals}</p></div><div class="versus"><p>-</p></div><div class="away-goals"><p>${g.awayGoals}</p></div>`);
                var awayTeam = data.map(g => `<div class="team-name"><p>${g.awayTeam}</p></div>`);
                var stadium = data.map(g => `<div class="stadium-name"><p>${g.stadium}</p></div>`);
                var timeMatch = data.map(g => `<div class="hour"><p>${g.hour}</p></div><div class="two-points"><p>:</p></div><div class="minute"><p>${g.minutes}</p></div>`);
                var tournament = data.map(g => g.tournament);
                var gameId = data.map(g => g.id);
                var monthText = data.map(g => g.month);
                var tournamentImage;
                var tournamentImage2;


                var contentResult = `<div class="result-header">
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

                    var contentGame =   `<div class="result-header">
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
                var errorText = await response.text();
                alert(errorText);
            }
        } catch(error){
            var errorText = await error.text();
            alert(errorText);
        }
    }






    async function GetRumors(){
        const url = `http://localhost:5500/api/rumor`;
        let response = await fetch(url);
        try{
            if(response.status == 200){
                let data = await response.json();

                var type = data.map(r => `<p class="type-transfer-literal">${r.type}</p>`);
                var currency = data.map(r => `<div class="currency"><p>${r.currency}</p></div>`);
                var price = data.map(r => `<div class="price"><p>${r.price}</p></div>`);
                var playerImage = data.map(g => g.playerPath? `${baseRawUrl}/${g.playerPath}` : "");
                var teamImage = data.map(g => g.targetTeamPath? `${baseRawUrl}/${g.targetTeamPath}` : "");
                var targetTeam = data.map(r => `<div class="target-team-name"><p>${r.targetTeam}</p></div>`);
                var playerName = data.map(r => `<div class="player-transfer-name"><p>${r.playerName}</p></div>`);
                var transfer = data.map(r => r.transfer);
                var rumorId = data.map(r => r.id);

                var inOutImage;
                var fullContent = "";

                for(var i = 0; i < 3; i++){
                    switch(transfer[i]){
                        case "Salida":{inOutImage = "./Images/Otros/salida.gif";break}
                        case "Llegada":{inOutImage = "./Images/Otros/llegada.gif";break}
                    }
                    var transfersContent=   `<div class="transfer">
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
                var errorText = await response.text();
                alert(errorText);
            }
        } catch(error){
            var errorText = await error.text();
            alert(errorText);
        }
    }

    function convertTextMonth(month){
        switch(month){
            case '01':return 'Enero';break;
            case '02':return 'Febrero';break;
            case '03':return 'Marzo';break;
            case '04':return 'Abril';break;
            case '05':return 'Mayo';break;
            case '06':return 'Junio';break;
            case '07':return 'Julio';break;
            case '08':return 'Agosto';break;
            case '09':return 'Septiembre';break;
            case '10':return 'Octubre';break;
            case '11':return 'Noviembre';break;
            case '12':return 'Diciembre';break;
        }
    }

    function tournamentPathImage(tournament){
        switch(tournament){
            case "Copa Sudamericana":{return "./Images/Tournaments/Copa Sudamericana.png";break}
            case "Liga Boliviana":{return "./Images/Tournaments/Liga Boliviana.png";break}
            case "Amistoso":{return "./Images/Tournaments/amistoso.png";break}
            default:{return "./Images/Tournaments/Liga Boliviana.png";break}
        }
    }


    GetResultAndNextGame();
    GetRumors();

});

