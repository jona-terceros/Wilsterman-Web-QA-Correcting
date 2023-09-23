using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wilsterman.Models
{
    public class TransferRumorModel
    {
        public int Id { get; set; }
        public string Type { get; set; } //tipo de transferencia (compra, jugador libre, cesion)
        public string TargetTeam { get; set; } //equipo al que llega el jugador
        public string Transfer { get; set; } //llegada o salida de Wilsterman
        public int Price { get; set; } //precio de la transferencia
        public int TransferVariables { get; set; } //valor de variables de transferencia
        public string Currency { get; set; } //tipo de moneda del traspado
        public int PlayerId { get; set; } //Jugador involucrado
        public string TargetTeamPath { get; set; }
        public string PlayerPath { get; set; }
        public string PlayerName { get; set; }
    }
}
