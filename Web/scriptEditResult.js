window.addEventListener('DOMContentLoaded', function(event){


    var queryParams = window.location.search.split('&');
    var type = queryParams[0].split('=')[1];
    let gameId = queryParams[1].split('=')[1];

    if(type == "edit"){
        GetResultNormal();

        document.getElementById('form-box').addEventListener('submit', UpdateGame);
    }
    else
    {
        GetGameToPlay();

        document.getElementById('form-box').addEventListener('submit', UpdatePlayGame);
    }
        

    let resultAndGame = []
    const baseRawUrl = 'http://localhost:5500';
    const baseUrl = `${baseRawUrl}/api`;



    async function GetResultNormal(event){

        const url = `http://localhost:5500/api/game/${gameId}`;
        var response = await fetch(url);

        var data = await response.json();
        var editForm = document.getElementById('form-box');

        var month = data.month;
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


        var localPath =  `${baseRawUrl}/${data.localTeamPath}`;
        var awayPath = `${baseRawUrl}/${data.awayTeamPath}`;

        var localImage = `<img src="${localPath}"  width="180px" height="180px"></img>`;
        var awayImage = `<img src="${awayPath}"  width="180px" height="180px"></img>`;
        var title = `<p class="title-principal">Editar Partido</p>`;

        document.getElementById('title-changer').innerHTML=title;
        document.getElementById('localImage').innerHTML=localImage;
        document.getElementById('awayImage').innerHTML=awayImage;
    }



    async function GetGameToPlay(event){

        const url = `http://localhost:5500/api/game/${gameId}`;
        var response = await fetch(url);

        var data = await response.json();
        var editForm = document.getElementById('form-box');

        var month = data.month;
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

        for(var i=0; i< 14; i++){
            editForm[i].disabled = true;
        }
        editForm[8].disabled = false;
        editForm[9].disabled = false;
        editForm[13].disabled = false;

        var localPath =  `${baseRawUrl}/${data.localTeamPath}`;
        var awayPath = `${baseRawUrl}/${data.awayTeamPath}`;

        var localImage = `<img src="${localPath}"  width="180px" height="180px"></img>`;
        var awayImage = `<img src="${awayPath}"  width="180px" height="180px"></img>`;
        var title = `<p class="title-principal">Simular Partido</p>`;

        document.getElementById('title-changer').innerHTML=title;
        document.getElementById('localImage').innerHTML=localImage;
        document.getElementById('awayImage').innerHTML=awayImage;
    }



    function UpdatePlayGame(event){

        console.log(event.currentTarget);
        event.preventDefault();

        
        localGoals=event.currentTarget.localGoals.value;
        awayGoals=event.currentTarget.awayGoals.value;

        
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

        var month = "";

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

        var gameToUpdate = {
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

        var gameJson = JSON.stringify(gameToUpdate);
        let url = `http://localhost:5500/api/game/${gameId}`;
        
        fetch(url, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'PUT',
            body: gameJson
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


});

