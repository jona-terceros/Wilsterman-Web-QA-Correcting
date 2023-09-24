document.addEventListener('DOMContentLoaded', async (event) => {


    let  queryParams = window.location.search.split('&');
    let type = queryParams[0].split('=')[1];
    let gameId = queryParams[1].split('=')[1];
    const baseRawUrl = 'http://localhost:5500';

    const initializePage = () => {
        if (type === "edit") {
          GetResultNormal();
          document.getElementById('form-box').addEventListener('submit', UpdateGame);
        } else {
          GetGameToPlay();
          document.getElementById('form-box').addEventListener('submit', UpdatePlayGame);
        }
    };

    const handleMonthConversion = (month) => {
        const monthMap = {
          '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril', '05': 'Mayo',
          '06': 'Junio', '07': 'Julio', '08': 'Agosto', '09': 'Septiembre',
          '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
        };
        return monthMap[month] || month;
      };
    const fetchGameData = async () => {
        const url = `http://localhost:5500/api/game/${gameId}`;
        const response = await fetch(url);
        return await response.json();
    };
    const updateUI = (type, data) => {
        const editForm = document.getElementById('form-box');
        const localPath = `${baseRawUrl}/${data.localTeamPath}`;
        const awayPath = `${baseRawUrl}/${data.awayTeamPath}`;
        const localImage = `<img src="${localPath}"  width="180px" height="180px"></img>`;
        const awayImage = `<img src="${awayPath}"  width="180px" height="180px"></img>`;
        const title = `<p class="title-principal">${type === "edit" ? "Editar Partido" : "Simular Partido"}</p>`;
    
        document.getElementById('title-changer').innerHTML = title;
        document.getElementById('localImage').innerHTML = localImage;
        document.getElementById('awayImage').innerHTML = awayImage;
    
        populateForm(editForm, data);
      };
    const populateForm = (editForm, data) => {
        editForm.local.value = data.localTeam;
        editForm.visitante.value = data.awayTeam;
        editForm.stadium.value = data.stadium;
        editForm.tournament.value = data.tournament;
        editForm.stage.value = data.stageTournament;
        editForm.matchday.value = data.matchdayTournament;
        editForm[6].disabled = true;
        editForm[10].disabled = true;
        editForm.day.value = data.day;
        editForm.month.value = handleMonthConversion(data.month);
        editForm.dayWeek.value = data.dayWeek;
        editForm.localGoals.value = data.localGoals;
        editForm.awayGoals.value = data.awayGoals;
    };
    const disableFormFields = (editForm) => {
        for (let i = 0; i < 14; i++) {
          editForm[i].disabled = true;
        }
        editForm[8].disabled = false;
        editForm[9].disabled = false;
        editForm[13].disabled = false;
      };
    
    const fetchAndUpdateGame = async (url) => {
        try {
          const response = await fetch(url, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'PUT',
          });
    
          if (response.status === 200) {
            alert("Game updated successfully");
            window.location.href = "result.html";
          } else {
            const errorData = await response.text();
            debugger;
            console.log(errorData);
          }
        } catch (error) {
          debugger;
          console.log(error);
        }
      };
      const GetResultNormal = async () => {
        const data = await fetchGameData();
        updateUI("edit", data);
      };
    
      const GetGameToPlay = async () => {
        const data = await fetchGameData();
        const editForm = document.getElementById('form-box');
        disableFormFields(editForm);
        updateUI("play", data);
      };
    
      const UpdatePlayGame = (event) => {
        event.preventDefault();
        const localGoals = event.currentTarget.localGoals.value;
        const awayGoals = event.currentTarget.awayGoals.value;
        const url = `http://localhost:5500/api/game?gameId=${gameId}&localGoals=${localGoals}&awayGoals=${awayGoals}`;
        fetchAndUpdateGame(url);
      };
    
      const UpdateGame = (event) => {
        event.preventDefault();
        const month = handleMonthConversion(event.currentTarget.month.value);
        const gameToUpdate = {
          localTeam: event.currentTarget.local.value,
          awayTeam: event.currentTarget.visitante.value,
          stadium: event.currentTarget.stadium.value,
          tournament: event.currentTarget.tournament.value,
          stageTournament: event.currentTarget.stage.value,
          matchdayTournament: event.currentTarget.matchday.value,
          day: event.currentTarget.day.value,
          month: month,
          dayWeek: event.currentTarget.dayWeek.value,
          localGoals: parseInt(event.currentTarget.localGoals.value),
          awayGoals: parseInt(event.currentTarget.awayGoals.value),
        };
        const url = `http://localhost:5500/api/game/${gameId}`;
        fetchAndUpdateGame(url,gameToUpdate);
      };
    
      initializePage();
    });