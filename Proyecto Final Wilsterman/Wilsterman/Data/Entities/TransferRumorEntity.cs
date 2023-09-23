using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Wilsterman.Data.Entities
{
    public class TransferRumorEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string Type { get; set; }
        public string TargetTeam { get; set; }
        public string Transfer { get; set; }
        public int Price { get; set; }
        public int TransferVariables { get; set; }
        public string Currency { get; set; }

        [ForeignKey("PlayerId")]
        public virtual PlayerEntity Player { get; set; }
        public string TargetTeamPath { get; set; }
        public string PlayerPath { get; set; }
        public string PlayerName { get; set; }
    }
}
