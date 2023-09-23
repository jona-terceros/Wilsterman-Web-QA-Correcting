using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wilsterman.Data.Entities;
using Wilsterman.Models;

namespace Wilsterman.Data
{
    public class AutoMappperProfile:Profile
    {
        public AutoMappperProfile()
        {
            this.CreateMap<PlayerEntity, PlayerModel>()
                .ReverseMap();

            this.CreateMap<GameEntity, GameModel>()
                .ReverseMap();

            this.CreateMap<TransferRumorEntity, TransferRumorModel>()
                .ForMember(mod => mod.PlayerId, ent => ent.MapFrom(entSrc => entSrc.Player.Id))
                .ReverseMap()
                .ForMember(ent => ent.Player, mod => mod.MapFrom(modSrc => new PlayerEntity() { Id = modSrc.PlayerId }));
        }
    }
}
