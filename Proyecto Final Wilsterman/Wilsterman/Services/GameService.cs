using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wilsterman.Data.Entities;
using Wilsterman.Data.Repository;
using Wilsterman.Exceptions;
using Wilsterman.Models;

namespace Wilsterman.Services
{
    public class GameService : IGameService
    {
        private IWilstermanRepository _wilstermanRepository;
        private IMapper _mapper;

        public GameService(IWilstermanRepository wilstermanRepository, IMapper mapper)
        {
            _wilstermanRepository = wilstermanRepository;
            _mapper = mapper;
        }


        public async Task<GameModel> CreateGameAsync(GameModel game)
        {
            var gameEntity = _mapper.Map<GameEntity>(game);
            _wilstermanRepository.CreateGame(gameEntity);
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (result)
            {
                var gameModel = _mapper.Map<GameModel>(gameEntity); ;
                return gameModel;
            }
            throw new Exception("Database Error");
        }

        public async Task DeleteGameAsync(int gameId)
        {
            await GetGameAsync(gameId);
            await _wilstermanRepository.DeleteGameAsync(gameId);
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");
            }
        }

        public async Task<IEnumerable<GameModel>> GetAllGamesAsync()
        {
            var gamesEntityList = await _wilstermanRepository.GetAllGamesAsync();
            var gamesModelList = _mapper.Map<IEnumerable<GameModel>>(gamesEntityList);
            return gamesModelList;
        }

        public async Task<GameModel> GetGameAsync(int gameId)
        {
            var game = await _wilstermanRepository.GetGameAsync(gameId);

            if (game == null)
            {
                throw new NotFoundElementException($"The game with id:{gameId} does not exists.");
            }
            var gameModel = _mapper.Map<GameModel>(game);
            return gameModel;
        }

        public async Task<GameModel> UpdateGameAsync(int gameId, GameModel game)
        {
            await GetGameAsync(gameId);
            var gameEntity = _mapper.Map<GameEntity>(game);
            await _wilstermanRepository.UpdateGameAsync(gameId, gameEntity);
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (result)
            {
                var gameModel = _mapper.Map<GameModel>(game);
                return gameModel;
            }
            throw new Exception("Database Error.");
        }

        public async Task UpdateResultGameAsync(int gameId, int localGoals, int awayGoals)
        {
            await GetGameAsync(gameId);
            await _wilstermanRepository.UpdateResultGameAsync(gameId, localGoals, awayGoals);
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");
            }
        }

        public async Task<IEnumerable<GameModel>> FilterTournamentAsync(string tournament, string finish)
        {
            var gamesEntityList = await _wilstermanRepository.FilterTournamentAsync(tournament, finish);
            var gamesModelList = _mapper.Map<IEnumerable<GameModel>>(gamesEntityList);
            return gamesModelList;
        }

        public async Task<IEnumerable<GameModel>> GetResultGameAsync()
        {
            var lastResult = await _wilstermanRepository.GetLastResultAsync();
            var nextGame = await _wilstermanRepository.GetNextGameAsync();

            var lastResultModel = _mapper.Map<GameModel>(lastResult);
            var nextGameModel = _mapper.Map<GameModel>(nextGame);

            var list = new List<GameModel>();
            list.Add(lastResultModel);
            list.Add(nextGameModel);
            return list;
        }
    }
}
