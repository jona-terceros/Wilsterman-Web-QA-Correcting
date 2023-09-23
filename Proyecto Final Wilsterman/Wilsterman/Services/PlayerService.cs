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
    public class PlayerService : IPlayerService
    {
        private IWilstermanRepository _wilstermanRepository;
        private IMapper _mapper;

        public PlayerService(IWilstermanRepository wilstermanRepository, IMapper mapper)
        {
            _wilstermanRepository = wilstermanRepository;
            _mapper = mapper;
        }


        public async Task<PlayerModel> CreatePlayerAsync(PlayerModel player)
        {
            var playerEntity = _mapper.Map<PlayerEntity>(player);
            _wilstermanRepository.CreatePlayer(playerEntity);
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (result)
            {
                var playerModel = _mapper.Map<PlayerModel>(playerEntity); ;
                return playerModel;
            }
            throw new Exception("Database Error");
        }

        public async Task DaletePlayerAsync(int playerId)
        {
            await GetPlayerAsync(playerId);
            await _wilstermanRepository.DeletePlayerAsync(playerId);
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");
            }
        }

        public async Task<IEnumerable<PlayerModel>> GetAllPlayersAsync()
        {
            var playersEntityList = await _wilstermanRepository.GetAllPlayersAsync();
            var playersModelList = _mapper.Map<IEnumerable<PlayerModel>>(playersEntityList);
            return playersModelList;
        }

        public async Task<PlayerModel> GetPlayerAsync(int playerId)
        {
            var player = await _wilstermanRepository.GetPlayerAsync(playerId);

            if (player == null)
            {
                throw new NotFoundElementException($"The player with id:{playerId} does not exists.");
            }
            var playerModel = _mapper.Map<PlayerModel>(player);
            return playerModel;
        }

        public async Task<PlayerModel> UpdatePlayerAsync(int playerId, PlayerModel player)
        {
            await GetPlayerAsync(playerId);
            var playerEntity = _mapper.Map<PlayerEntity>(player);
            await _wilstermanRepository.UpdatePlayerAsync(playerId, playerEntity);
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (result)
            {
                var playerModel = _mapper.Map<PlayerModel>(player);
                return playerModel;
            }
            throw new Exception("Database Error.");
        }



        public async Task<IEnumerable<PlayerModel>> FilterPlayersAsync(string generalPosition, string country, string posiblePlayers)
        {
            var playersEntityList = await _wilstermanRepository.FilterPlayersAsync(generalPosition, country, posiblePlayers);
            var playersModelList = _mapper.Map<IEnumerable<PlayerModel>>(playersEntityList);
            return playersModelList;
        }
    }
}
