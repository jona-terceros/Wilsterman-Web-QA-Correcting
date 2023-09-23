using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wilsterman.Models
{
    public class GameFormModel:GameModel
    {
        public IFormFile LocalTeamImage { get; set; }
        public IFormFile AwayTeamImage { get; set; }
    }
}
