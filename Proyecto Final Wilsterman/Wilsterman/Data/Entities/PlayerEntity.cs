using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wilsterman.Data.Entities
{
    public class PlayerEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string Name { get; set; } //Nombre del jugador
        public string Position { get; set; } //Posision en la que juega
        public int Age { get; set; } //Edad del jugador
        public string CurrentTeam { get; set; } //Equipo actual
        public string Country { get; set; }
        public int Shirt { get; set; }
        public string GeneralPosition { get; set; }
        public ICollection<TransferRumorEntity> Rumors { get; set; }
        public string PlayerPath { get; set; }
        public string CurrentTeamPath { get; set; }
    }
}
