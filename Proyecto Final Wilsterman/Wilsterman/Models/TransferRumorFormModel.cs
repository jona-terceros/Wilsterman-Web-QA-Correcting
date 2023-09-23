using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wilsterman.Models
{
    public class TransferRumorFormModel:TransferRumorModel
    {
        public IFormFile TargetTeamImage { get; set; }
    }
}
