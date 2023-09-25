window.addEventListener('DOMContentLoaded', function(event){


    const queryParams = window.location.search.split('?');
    let gameId = "";
    if(queryParams.length == 1){
        document.getElementById('form-box').addEventListener('submit', CreateGame);
    }
    else
    {
        gameId = queryParams[1].split('=')[1];
        GetOneGame();
        document.getElementById('form-box').addEventListener('submit', UpdateGame);
    }
        
    const baseRawUrl = 'http://localhost:5500';

    function CreateGame(event){
        
        event.preventDefault();
        let url = `http://localhost:5500/api/game`;
        const formData = new FormData();
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

        formData.append('LocalTeam', event.currentTarget.local.value);
        formData.append('AwayTeam', event.currentTarget.visitante.value);
        formData.append('Stadium',event.currentTarget.stadium.value);
        formData.append('OtherSituation', "Pendiente");
        formData.append('Tournament', event.currentTarget.tournament.value);
        formData.append('StageTournament', event.currentTarget.stage.value);
        formData.append('MatchdayTournament', event.currentTarget.matchday.value);
        formData.append('LocalTeamImage', event.currentTarget.imageLocal.files[0]);
        formData.append('AwayTeamImage', event.currentTarget.imageVisita.files[0]);
        formData.append('Day', event.currentTarget.day.value);
        formData.append('Month', month);
        formData.append('DayWeek', event.currentTarget.dayWeek.value);
        formData.append('Hour', event.currentTarget.hour.value);
        formData.append('Minutes', event.currentTarget.minutes.value);
       

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            if(response.status === 201){
                alert('New game created.');
                window.location.href = "games.html";
            } else {
                response.text()
                .then((error)=>{
                    alert(error);
                });
            }
        });
    }

    

    async function GetOneGame(event){

        const url = `http://localhost:5500/api/game/${gameId}`;
        let response = await fetch(url);

        let data = await response.json();
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
        editForm[6].disabled = true;//fotos
        editForm[10].disabled = true;
        editForm.day.value = data.day;
        editForm.month.value = month;
        editForm.dayWeek.value = data.dayWeek;
        editForm.hour.value = data.hour;
        editForm.minutes.value = data.minutes;


        var localPath =  `${baseRawUrl}/${data.localTeamPath}`;
        var awayPath = `${baseRawUrl}/${data.awayTeamPath}`;

        var localImage = `<img src="${localPath}"  width="180px" height="180px"></img>`;
        var awayImage = `<img src="${awayPath}"  width="180px" height="180px"></img>`;
        var title = `<p class="title-principal">Editar Partido</p>`;

        document.getElementById('title-changer').innerHTML=title;
        document.getElementById('localImage').innerHTML=localImage;
        document.getElementById('awayImage').innerHTML=awayImage;
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
            hour:           event.currentTarget.hour.value,
            minutes:        event.currentTarget.minutes.value,
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
                window.location.href = "games.html";
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

