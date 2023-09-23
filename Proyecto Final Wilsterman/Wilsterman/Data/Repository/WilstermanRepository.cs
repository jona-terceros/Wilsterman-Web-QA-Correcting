using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wilsterman.Data.Entities;

namespace Wilsterman.Data.Repository
{
    public class WilstermanRepository : IWilstermanRepository
    {
        private WilstermanDBContext _dbContext;

        //Constructor
        public WilstermanRepository(WilstermanDBContext dbContext)
        {
            _dbContext = dbContext;
        }



        //*********************************************************************
        //*******************************GAMES*********************************
        //*********************************************************************
        public void CreateGame(GameEntity game)
        {
            _dbContext.Games.Add(game);
        }

        public async Task DeleteGameAsync(int gameId)
        {
            var gameToDelete = await _dbContext.Games.SingleOrDefaultAsync(r => r.Id == gameId);
            _dbContext.Games.Remove(gameToDelete);
        }

        public async Task<IEnumerable<GameEntity>> GetAllGamesAsync()
        {
            IQueryable<GameEntity> query = _dbContext.Games;
            query = query.AsNoTracking();
            
            var result = await query.ToListAsync();
            return result;
        }

        public async Task<GameEntity> GetGameAsync(int gameId)
        {
            IQueryable<GameEntity> query = _dbContext.Games;
            query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync(r => r.Id == gameId);
        }

        public async Task UpdateGameAsync(int gameId, GameEntity game)
        {
            var gameToUpdate = await _dbContext.Games.FirstAsync(r => r.Id == gameId);

            gameToUpdate.LocalTeam = game.LocalTeam ?? gameToUpdate.LocalTeam;
            gameToUpdate.AwayTeam = game.AwayTeam ?? gameToUpdate.AwayTeam;
            gameToUpdate.LocalGoals = game.LocalGoals;
            gameToUpdate.AwayGoals = game.AwayGoals;
            gameToUpdate.Result = game.Result ?? gameToUpdate.Result;
            gameToUpdate.MatchDateTime = game.MatchDateTime;
            gameToUpdate.Stadium = game.Stadium ?? gameToUpdate.Stadium;
            gameToUpdate.OtherSituation = game.OtherSituation ?? gameToUpdate.OtherSituation;
            gameToUpdate.Tournament = game.Tournament ?? gameToUpdate.Tournament;
            gameToUpdate.StageTournament = game.StageTournament ?? gameToUpdate.StageTournament;
            gameToUpdate.MatchdayTournament = game.MatchdayTournament ?? gameToUpdate.MatchdayTournament;
            gameToUpdate.Day = game.Day ?? gameToUpdate.Day;
            gameToUpdate.DayWeek = game.DayWeek ?? gameToUpdate.DayWeek;
            gameToUpdate.Month = game.Month ?? gameToUpdate.Month;
            gameToUpdate.Hour = game.Hour ?? gameToUpdate.Hour;
            gameToUpdate.Minutes = game.Minutes ?? gameToUpdate.Minutes;
        }




        //*********************************************************************
        //******************************RUMORS*********************************
        //*********************************************************************
        public void CreateRumor(TransferRumorEntity rumor)
        {
            _dbContext.Entry(rumor.Player).State = EntityState.Unchanged;
            _dbContext.Rumors.Add(rumor);
        }

        public async Task UpdatePlayerPathAsync(int rumorId)
        {
            var rumorToUpdate = await _dbContext.Rumors.FirstOrDefaultAsync(d => d.Id == rumorId);
            var rumor = await GetRumorAsync(rumorId);
            var player = rumor.Player;
            rumorToUpdate.PlayerPath = player.PlayerPath;
            rumorToUpdate.PlayerName = player.Name;
        }

        public async Task DeleteRumorAsync(int rumorId)
        {
            var rumorToDelete = await _dbContext.Rumors.FirstOrDefaultAsync(d => d.Id == rumorId);
            _dbContext.Rumors.Remove(rumorToDelete);
        }

        public async Task<IEnumerable<TransferRumorEntity>> GetAllRumorsAsync()
        {
            IQueryable<TransferRumorEntity> query = _dbContext.Rumors;
            query = query.Include(p => p.Player);
            query = query.AsNoTracking();
            return await query.ToListAsync();
        }

        public async Task<TransferRumorEntity> GetRumorAsync(int rumorId)
        {
            IQueryable<TransferRumorEntity> query = _dbContext.Rumors;
            query = query.Include(p => p.Player);
            query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync(d => d.Id == rumorId);
        }

        public async Task UpdateRumorAsync(int rumorId, TransferRumorEntity rumor)
        {
            var rumorToUpdate = await _dbContext.Rumors.FirstOrDefaultAsync(d => d.Id == rumorId);

            rumorToUpdate.Type = rumor.Type ?? rumorToUpdate.Type;
            rumorToUpdate.TargetTeam = rumor.TargetTeam ?? rumorToUpdate.TargetTeam;
            rumorToUpdate.Transfer = rumor.Transfer ?? rumorToUpdate.Transfer;
            rumorToUpdate.Price = rumor.Price;
            rumorToUpdate.TransferVariables = rumor.TransferVariables;
            rumorToUpdate.Currency = rumor.Currency ?? rumorToUpdate.Currency;
        }





        //*********************************************************************
        //*******************************PLAYERS*******************************
        //*********************************************************************
        public void CreatePlayer(PlayerEntity player)
        {
            _dbContext.Players.Add(player);
        }
        public async Task<PlayerEntity> GetPlayerAsync(int playerId)
        {
            IQueryable<PlayerEntity> query = _dbContext.Players;
            query = query.Include(r => r.Rumors);
            query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync(r => r.Id == playerId);
        }
        public async Task UpdatePlayerAsync(int playerId, PlayerEntity player)
        {
            var playerToUpdate = await _dbContext.Players.FirstAsync(r => r.Id == playerId);

            playerToUpdate.Name = player.Name ?? playerToUpdate.Name;
            playerToUpdate.Position = player.Position ?? playerToUpdate.Position;
            playerToUpdate.Age = player.Age;
            playerToUpdate.CurrentTeam = player.CurrentTeam ?? playerToUpdate.CurrentTeam;
            playerToUpdate.Country = player.Country ?? playerToUpdate.Country;
            playerToUpdate.Shirt = player.Shirt;
            playerToUpdate.GeneralPosition = player.GeneralPosition ?? playerToUpdate.GeneralPosition;
        }
        public async Task DeletePlayerAsync(int playerId)
        {
            var playerToDelete = await _dbContext.Players.SingleOrDefaultAsync(r => r.Id == playerId);

            IQueryable<TransferRumorEntity> query = _dbContext.Rumors;
            query = query.AsNoTracking();
            query = query.Where(r => r.Player.Id == playerId);
            var rumors = await query.ToListAsync();

            foreach (var rum in rumors)
            {
                await DeleteRumorAsync(rum.Id);
            }
            _dbContext.Players.Remove(playerToDelete);
        }
        public async Task<IEnumerable<PlayerEntity>> GetAllPlayersAsync()
        {
            IQueryable<PlayerEntity> query = _dbContext.Players;
            query = query.Include(r => r.Rumors);
            query = query.AsNoTracking();
            query = query.Where(g=>g.CurrentTeam=="Wilsterman");
            var result = await query.ToListAsync();
            return result;
        }


        //*********************************************************************
        //***************************BUSINESS LOGIC****************************
        //*********************************************************************
        public async Task ConfirmRumorAsync(int rumorId)
        {
            var rumorToDelete = await _dbContext.Rumors.FirstOrDefaultAsync(d => d.Id == rumorId);
            if (rumorToDelete != null)
            {
                var rumor = await GetRumorAsync(rumorId);
                var playerId = rumor.Player.Id;
                if (rumorToDelete.Transfer == "Salida")
                {
                    await DeletePlayerAsync(playerId);
                }
                else      //llegada
                {
                    var player = await GetPlayerAsync(playerId);
                    player.CurrentTeam = "Wilsterman";
                    await DeleteRumorAsync(rumorId);
                    await UpdatePlayerAsync(playerId, player);
                }
            }
            else
            {
                _dbContext.Rumors.Remove(rumorToDelete);
            }
        }

        public async Task<IEnumerable<PlayerEntity>> FilterPlayersAsync(string generalPosition, string country, string posiblePlayers)
        {
            IQueryable<PlayerEntity> query = _dbContext.Players;
            query = query.Include(r => r.Rumors);
            query = query.AsNoTracking();

            if (posiblePlayers == "true")
            {
                query = query.Where(g => g.CurrentTeam != "Wilsterman");
            }
            else
            {
                query = query.Where(g => g.CurrentTeam == "Wilsterman");
            }

            if (generalPosition != null)
            {
                query = query.Where(g => g.GeneralPosition == generalPosition);
            }
            if (country != null)
            {
                if (country == "Bolivia")
                {
                    query = query.Where(g => g.Country == country);
                }
                if (country == "Extranjero")
                {
                    query = query.Where(g => g.Country != "Bolivia");
                }
            }
            var result = await query.ToListAsync();
            return result;
        }

        public async Task UpdateResultGameAsync(int gameId, int localGoals, int awayGoals)
        {
            var gameToUpdate = await _dbContext.Games.FirstAsync(r => r.Id == gameId);
            var diference = localGoals - awayGoals;
            string result;

            if (gameToUpdate.AwayTeam == "Wilsterman")
            {
                diference = diference * (-1);
            }
            if (diference > 0)
                result = "Victoria";
            else
            {
                if (diference == 0)
                    result = "Empate";
                else
                    result = "Derrota";
            }
            
            gameToUpdate.LocalGoals = localGoals;
            gameToUpdate.AwayGoals = awayGoals;
            gameToUpdate.Result = result;
            gameToUpdate.OtherSituation = "Terminado";
        }

        public async Task<IEnumerable<GameEntity>> FilterTournamentAsync(string tournament, string finish)
        {
            IQueryable<GameEntity> query = _dbContext.Games;
            query = query.AsNoTracking();
            query = query.OrderBy(g => g.Month).ThenBy(p => p.Day);
            if (tournament != null)
            {
                switch (tournament)
                {
                    case "Liga":
                        {
                            query = query.Where(g => g.Tournament == "Liga Boliviana");break;
                        }
                    case "CopaBol":
                        {
                            query = query.Where(g => g.Tournament == "Copa de Bolivia");break;
                        }
                    case "Sudamericana":
                        {
                            query = query.Where(g => g.Tournament == "Copa Sudamericana");break;
                        }
                    case "Libertadores":
                        {
                            query = query.Where(g => g.Tournament == "Copa Libertadores");break;
                        }
                    case "Amistoso":
                        {
                            query = query.Where(g => g.Tournament == "Amistoso");break;
                        }
                    default:
                        {
                            break;
                        }
                }
            }
            
            if (finish != null)
            {
                switch (finish)
                {
                    case "Terminado":
                        {
                            query = query.Where(g => g.OtherSituation == "Terminado");break;
                        }
                    case "Pendiente":
                        {
                            query = query.Where(g => g.OtherSituation == "Pendiente");break;
                        }
                    default:{break; }
                }
            }
            var result = await query.ToListAsync();
            return result;
        }


        public async Task<GameEntity> GetLastResultAsync()
        {
            IQueryable<GameEntity> query = _dbContext.Games;
            /*query = query.Reverse();*/
            query = query.AsNoTracking();
            
            return await query.FirstOrDefaultAsync(r => r.OtherSituation == "Terminado");
        }

        public async Task<GameEntity> GetNextGameAsync()
        {
            IQueryable<GameEntity> query = _dbContext.Games;
            query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync(r => r.OtherSituation == "Pendiente");
        }



        public async Task<bool> SaveChangesAsync()
        {
            try
            {
                var result = await _dbContext.SaveChangesAsync();
                return result > 0 ? true : false;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
    }
}
