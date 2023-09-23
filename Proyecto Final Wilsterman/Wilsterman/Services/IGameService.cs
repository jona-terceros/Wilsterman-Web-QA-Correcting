using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wilsterman.Models;

namespace Wilsterman.Services
{
    public interface IGameService
    {
        Task<GameModel> GetGameAsync(int gameId);
        Task<GameModel> CreateGameAsync(GameModel game);
        Task<GameModel> UpdateGameAsync(int gameId, GameModel game);
        Task DeleteGameAsync(int gameId);
        Task<IEnumerable<GameModel>> GetAllGamesAsync();

        //Business Logic

        Task UpdateResultGameAsync(int gameId, int localGoals, int awayGoals);
        Task<IEnumerable<GameModel>> FilterTournamentAsync(string tournament, string finish);

        //Complements

        Task<IEnumerable<GameModel>> GetResultGameAsync();
    }
}
