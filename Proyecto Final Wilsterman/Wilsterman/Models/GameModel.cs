using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wilsterman.Models
{
    public class GameModel
    {
        public int Id { get; set; }
        public string LocalTeam { get; set; } //nombre equipo local
        public string AwayTeam { get; set; } //nombre equipo visitante
        public int LocalGoals { get; set; } //goles local
        public int AwayGoals { get; set; } //goles visitante
        public string Result { get; set; } //resultado según wilsterman
        public DateTime MatchDateTime { get; set; } //fecha del partido
        public string Stadium { get; set; } //nombre del stadium
        public string OtherSituation { get; set; } //situacion extraordinaria del partido (suspendido, abandono, retraso)

        public string Tournament { get; set; } //nombre de la compe
        public string StageTournament { get; set; } //fase de la compe
        public string MatchdayTournament { get; set; } //jornada de la compe
        public string SeasonTournament { get; set; } //temporada de la compe
        public string LocalTeamPath { get; set; }
        public string AwayTeamPath { get; set; }


        public string Day { get; set; }
        public string Month { get; set; }
        public string DayWeek { get; set; }
        public string Hour { get; set; }
        public string Minutes { get; set; }
    }
}
