using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wilsterman.Models;

namespace Wilsterman.Services
{
    public interface IPlayerService
    {
        Task<PlayerModel> GetPlayerAsync(int playerId);
        Task<PlayerModel> CreatePlayerAsync(PlayerModel player);
        Task<PlayerModel> UpdatePlayerAsync(int playerId, PlayerModel player);
        Task DaletePlayerAsync(int playerId);
        Task<IEnumerable<PlayerModel>> GetAllPlayersAsync();

        //Business Logic

        Task<IEnumerable<PlayerModel>> FilterPlayersAsync(string generalPosition, string country, string posiblePlayers);
    }
}
