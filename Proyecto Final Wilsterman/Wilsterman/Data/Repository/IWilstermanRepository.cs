using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wilsterman.Data.Entities;

namespace Wilsterman.Data.Repository
{
    public interface IWilstermanRepository
    {
        // Rumors

        Task<TransferRumorEntity> GetRumorAsync(int rumorId);
        void CreateRumor(TransferRumorEntity rumor);
        Task UpdatePlayerPathAsync(int rumorId);
        Task UpdateRumorAsync(int rumorId, TransferRumorEntity rumor);
        Task DeleteRumorAsync(int rumorId);
        Task<IEnumerable<TransferRumorEntity>> GetAllRumorsAsync();


        //Players

        Task<PlayerEntity> GetPlayerAsync(int playerId);
        void CreatePlayer(PlayerEntity player);
        Task UpdatePlayerAsync(int playerId, PlayerEntity player);
        Task DeletePlayerAsync(int playerId);
        Task<IEnumerable<PlayerEntity>> GetAllPlayersAsync();

        

        //Games
        Task<GameEntity> GetGameAsync(int gameId);
        void CreateGame(GameEntity game);
        Task UpdateGameAsync(int gameId, GameEntity game);
        Task DeleteGameAsync(int gameId);
        Task<IEnumerable<GameEntity>> GetAllGamesAsync();



        //Business Logic

        Task ConfirmRumorAsync(int rumorId);
        Task<IEnumerable<PlayerEntity>> FilterPlayersAsync(string generalPosition, string country, string posiblePlayers);
        Task UpdateResultGameAsync(int gameId, int localGoals, int awayGoals);
        Task<IEnumerable<GameEntity>> FilterTournamentAsync(string tournament, string finish);


        Task<bool> SaveChangesAsync();

        //complements


        Task<GameEntity> GetLastResultAsync();
        Task<GameEntity> GetNextGameAsync();
        
    }
}
