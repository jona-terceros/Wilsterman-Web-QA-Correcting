using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wilsterman.Data.Entities;

namespace Wilsterman.Data
{
    public class WilstermanDBContext: DbContext 
    {
        public DbSet<TransferRumorEntity> Rumors { get; set; }
        public DbSet<GameEntity> Games { get; set; }
        public DbSet<PlayerEntity> Players { get; set; }

        public WilstermanDBContext(DbContextOptions<WilstermanDBContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TransferRumorEntity>().ToTable("TransferRumors");
            modelBuilder.Entity<TransferRumorEntity>().Property(r => r.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<TransferRumorEntity>().HasOne(p => p.Player).WithMany(r => r.Rumors);

            modelBuilder.Entity<PlayerEntity>().ToTable("Players");
            modelBuilder.Entity<PlayerEntity>().Property(r => r.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<PlayerEntity>().HasMany(r => r.Rumors).WithOne(p=>p.Player);

            modelBuilder.Entity<GameEntity>().ToTable("Game");
            modelBuilder.Entity<GameEntity>().Property(r => r.Id).ValueGeneratedOnAdd();
        }
        //dotnet tool install --global dotnet-ef
        //dotnet ef --help
        //dotnet ef migrations add {InitialCreate}
        //dotnet ef database update
    }
}
