using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wilsterman.Models
{
    public class PlayerFormModel :PlayerModel
    {
        public IFormFile PlayerImage { get; set; }
        public IFormFile CurrentTeamImage { get; set; }
    }
}
