import generateFooter from "./Components/footerComponent.js";
import generateMenu from "./Components/menuComponent.js";
import fetchUpdate from "./Repository/fetchUpdate.js";

document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("menu").innerHTML = generateMenu();
    document.getElementById("footer").innerHTML = generateFooter();
    
    let  queryParams = window.location.search.split('&');
    let type = queryParams[0].split('=')[1];
    let gameId;
    
    const daysSelect = document.getElementById("day");
    const dayWeekSelect = document.getElementById("day-week");
    const monthSelect = document.getElementById("month");
    const tournamentSelect = document.getElementById("tournament");


    if(type == "edit"){
        GetResultNormal();

        document.getElementById('form-box').addEventListener('submit', UpdateGame);
    }
    else
    {
        GetGameToPlay();

        document.getElementById('form-box').addEventListener('submit', UpdatePlayGame);
    }
  
    if (queryParams[1]) {
        gameId = queryParams[1].split('=')[1];
      } else {
        console.error("El queryParams[1] es undefined o no contiene los datos esperados");
    }
        
    const baseRawUrl = 'http://localhost:5500';
    const daysArray = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"));
    
    async function generateOptions(select, optionsArray) {
            for (const optionText of optionsArray) {
                const option = document.createElement("option");
                option.text = optionText;
                select.appendChild(option);
            }
            
    }
    
    generateOptions(daysSelect, daysArray);
    generateOptions(dayWeekSelect, ["Lunes", "Martes", "Miércoles","Jueves","Viernes","Sabado","Domingo"]);
    generateOptions(monthSelect, ["Enero", "Febrero", "Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]);
    generateOptions(tournamentSelect, ["Liga Boliviana", "Copa Sudamericana", "Amistoso"]);

    async function GetResultNormal(event){

        const url = `http://localhost:5500/api/game/${gameId}`;
        let response = await fetch(url);

        let data = await response.json();
        let editForm = document.getElementById('form-box');

        let month = data.month;
        switch(month){
            case '01':month= "Enero";break;
            case '02':month= "Febrero";break;
            case '03':month= "Marzo";break;
            case '04':month= "Abril";break;
            case '05':month= "Mayo";break;
            case '06':month= "Junio";break;
            case '07':month= "Julio";break;
            case '08':month= "Agosto";break;
            case '09':month= "Septiembre";break;
            case '10':month= "Octubre";break;
            case '11':month= "Noviembre";break;
            case '12':month= "Diciembre";break;
        }

        editForm.local.value = data.localTeam;
        editForm.visitante.value = data.awayTeam;
        editForm.stadium.value = data.stadium;
        editForm.tournament.value = data.tournament;
        editForm.stage.value = data.stageTournament;
        editForm.matchday.value = data.matchdayTournament;
        editForm[6].disabled = true;
        editForm[10].disabled = true;
        editForm.day.value = data.day;
        editForm.month.value = month;
        editForm.dayWeek.value = data.dayWeek;
        editForm.localGoals.value = data.localGoals;//goles local
        editForm.awayGoals.value = data.awayGoals;//goles visita


        let localPath =  `${baseRawUrl}/${data.localTeamPath}`;
        let awayPath = `${baseRawUrl}/${data.awayTeamPath}`;

        let localImage = `<img src="${localPath}"  width="180px" height="180px"></img>`;
        let awayImage = `<img src="${awayPath}"  width="180px" height="180px"></img>`;
        let title = `<p class="title-principal">Editar Partido</p>`;

        document.getElementById('title-changer').innerHTML=title;
        document.getElementById('localImage').innerHTML=localImage;
        document.getElementById('awayImage').innerHTML=awayImage;
    }

    async function GetGameToPlay(event){

        const url = `http://localhost:5500/api/game/${gameId}`;
        let response = await fetch(url);

        let data = await response.json();
        let editForm = document.getElementById('form-box');

        let month = data.month;
        switch(month){
            case '01':month= "Enero";break;
            case '02':month= "Febrero";break;
            case '03':month= "Marzo";break;
            case '04':month= "Abril";break;
            case '05':month= "Mayo";break;
            case '06':month= "Junio";break;
            case '07':month= "Julio";break;
            case '08':month= "Agosto";break;
            case '09':month= "Septiembre";break;
            case '10':month= "Octubre";break;
            case '11':month= "Noviembre";break;
            case '12':month= "Diciembre";break;
        }

        editForm.local.value = data.localTeam;
        editForm.visitante.value = data.awayTeam;
        editForm.stadium.value = data.stadium;
        editForm.tournament.value = data.tournament;
        editForm.stage.value = data.stageTournament;
        editForm.matchday.value = data.matchdayTournament;
        editForm.day.value = data.day;
        editForm.month.value = month;
        editForm.dayWeek.value = data.dayWeek;
        editForm.localGoals.value = data.localGoals;//goles local
        editForm.awayGoals.value = data.awayGoals;//goles visita

        for(let i=0; i< 14; i++){
            editForm[i].disabled = true;
        }
        editForm[8].disabled = false;
        editForm[9].disabled = false;
        editForm[13].disabled = false;

        let localPath =  `${baseRawUrl}/${data.localTeamPath}`;
        let awayPath = `${baseRawUrl}/${data.awayTeamPath}`;

        let localImage = `<img src="${localPath}"  width="180px" height="180px"></img>`;
        let awayImage = `<img src="${awayPath}"  width="180px" height="180px"></img>`;
        let title = `<p class="title-principal">Simular Partido</p>`;

        document.getElementById('title-changer').innerHTML=title;
        document.getElementById('localImage').innerHTML=localImage;
        document.getElementById('awayImage').innerHTML=awayImage;
    }



    function UpdatePlayGame(event){

        console.log(event.currentTarget);
        event.preventDefault();

        
        let localGoals=event.currentTarget.localGoals.value;
        let awayGoals=event.currentTarget.awayGoals.value;

        
        let url = `http://localhost:5500/api/game?gameId=${gameId}&localGoals=${localGoals}&awayGoals=${awayGoals}`;
        
        fetch(url, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'PUT',
        }).then((response) => {
            if (response.status === 200) {
                alert("Game updated successfuly");
                window.location.href = "result.html";
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


    function UpdateGame(event){
        console.log(event.currentTarget);
        event.preventDefault();

        let month = "";

        switch(event.currentTarget.month.value){
            case "Enero":month="01";break;
            case "Febrero":month="02";break;
            case "Marzo":month="03";break;
            case "Abril":month="04";break;
            case "Mayo":month="05";break;
            case "Junio":month="06";break;
            case "Julio":month="07";break;
            case "Agosto":month="08";break;
            case "Septiembre":month="09";break;
            case "Octubre":month="10";break;
            case "Noviembre":month="11";break;
            case "Diciembre":month="12";break;
        }

        const gameToUpdate = {
            localTeam:      event.currentTarget.local.value,
            awayTeam:       event.currentTarget.visitante.value,
            stadium:        event.currentTarget.stadium.value,
            tournament:     event.currentTarget.tournament.value,
            stageTournament:event.currentTarget.stage.value,
            matchdayTournament: event.currentTarget.matchday.value,
            day:            event.currentTarget.day.value,
            month:          month,
            dayWeek:        event.currentTarget.dayWeek.value,
            localGoals:     parseInt(event.currentTarget.localGoals.value),
            awayGoals:      parseInt(event.currentTarget.awayGoals.value),
        }

        const gameJson = JSON.stringify(gameToUpdate);
        let url = `http://localhost:5500/api/game/${gameId}`;
        let alertMessage = "Game updated successfuly.";
        let locationHTML = "result.html";
        fetchUpdate(url,gameJson,alertMessage,locationHTML,data);
       

    }


});
