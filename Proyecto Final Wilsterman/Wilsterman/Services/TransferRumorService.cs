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
    public class TransferRumorService : ITransferRumorService
    {
        private IWilstermanRepository _wilstermanRepository;
        private IMapper _mapper;

        public TransferRumorService(IWilstermanRepository wilstermanRepository, IMapper mapper)
        {
            _wilstermanRepository = wilstermanRepository;
            _mapper = mapper;
        }



        public async Task<TransferRumorModel> CreateRumorAsync(TransferRumorModel rumor)
        {
            await ValidatePlayerAsync(rumor.PlayerId);
            var rumorEntity = _mapper.Map<TransferRumorEntity>(rumor);
            _wilstermanRepository.CreateRumor(rumorEntity);
            var result = await _wilstermanRepository.SaveChangesAsync();
            await _wilstermanRepository.UpdatePlayerPathAsync(rumorEntity.Id);
            await _wilstermanRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<TransferRumorModel>(rumorEntity);
            }
            throw new Exception("Database Error.");
        }

        public async Task DeleteRumorAsync(int rumorId)
        {
            await GetRumorAsync(rumorId);
            await _wilstermanRepository.DeleteRumorAsync(rumorId);
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");
            }
        }

        public async Task<TransferRumorModel> GetRumorAsync(int rumorId)
        {
            var rumor = await _wilstermanRepository.GetRumorAsync(rumorId);
            if (rumor != null)
            {
                var rumorModel = _mapper.Map<TransferRumorModel>(rumor);
                return rumorModel;
            }
            throw new NotFoundElementException($"the rumor with id:{rumorId} does not exists.");
        }

        public async Task<IEnumerable<TransferRumorModel>> GetAllRumorsAsync()
        {
            var rumors = await _wilstermanRepository.GetAllRumorsAsync();
            return _mapper.Map<IEnumerable<TransferRumorModel>>(rumors);
        }

        public async Task<TransferRumorModel> UpdateRumorAsync(int rumorId, TransferRumorModel rumor)
        {
            await GetRumorAsync(rumorId);
            var rumorEntity = _mapper.Map<TransferRumorEntity>(rumor);
            await _wilstermanRepository.UpdateRumorAsync(rumorId, rumorEntity);
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (result)
            {
                var rumorModel = _mapper.Map<TransferRumorModel>(rumorEntity);
                return rumorModel;
            }
            throw new Exception("Database Error.");
        }

        public async Task ConfirmRumorAsync(int rumorId, string confirm)
        {
            await GetRumorAsync(rumorId);
            if (confirm == null)
            {
                throw new InvalidElementOperationException("Operación inválida");
            }
            if (confirm == "true")
            {
                await _wilstermanRepository.ConfirmRumorAsync(rumorId);
            }
            else
            {
                await _wilstermanRepository.DeleteRumorAsync(rumorId);
            }
            var result = await _wilstermanRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");
            }
        }

        private async Task ValidatePlayerAsync(int playerId)
        {
            var player = await _wilstermanRepository.GetPlayerAsync(playerId);
            if (player == null)
                throw new Exceptions.NotFoundElementException($"the Player with id:{playerId} does not exists.");
        }
    }
}
