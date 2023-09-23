using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Wilsterman.Data.Entities
{
    public class GameEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string LocalTeam { get; set; }
        public string AwayTeam { get; set; }
        public int LocalGoals { get; set; }
        public int AwayGoals { get; set; }
        public string Result { get; set; }
        public DateTime MatchDateTime { get; set; }
        public string Stadium { get; set; }
        public string OtherSituation { get; set; }
        public string LocalTeamPath { get; set; }
        public string AwayTeamPath { get; set; }

        public string Tournament { get; set; } //nombre de la compe
        public string StageTournament { get; set; } //fase de la compe
        public string MatchdayTournament { get; set; } //jornada de la compe
        public string SeasonTournament { get; set; } //temporada de la compe

        public string Day { get; set; }
        public string Month { get; set; }
        public string DayWeek { get; set; }
        public string Hour { get; set; }
        public string Minutes { get; set; }

    }
}
