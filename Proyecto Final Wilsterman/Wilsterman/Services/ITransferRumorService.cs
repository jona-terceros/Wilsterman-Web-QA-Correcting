using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wilsterman.Models;

namespace Wilsterman.Services
{
    public interface ITransferRumorService
    {
        Task<TransferRumorModel> GetRumorAsync(int rumorId);
        Task<TransferRumorModel> CreateRumorAsync(TransferRumorModel rumor);
        Task<TransferRumorModel> UpdateRumorAsync(int rumorId, TransferRumorModel rumor);
        Task DeleteRumorAsync(int rumorId);
        Task<IEnumerable<TransferRumorModel>> GetAllRumorsAsync();
        //business Logic
        Task ConfirmRumorAsync(int rumorId, string confirm);
    }
}
