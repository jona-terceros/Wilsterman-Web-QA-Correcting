using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wilsterman.Exceptions;
using Wilsterman.Models;
using Wilsterman.Services;

namespace Wilsterman.Controllers
{
    [Route("api/player")]
    public class PlayerController : Controller
    {
        private IPlayerService _playerService;
        private IFileService _fileService;

        public PlayerController(IPlayerService playerService, IFileService fileService)
        {
            _playerService = playerService;
            _fileService = fileService;
        }



        [HttpPost]
        public async Task<ActionResult<PlayerModel>> PostPlayerAsync([FromForm] PlayerFormModel player)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var playerFile = player.PlayerImage;
                var currentTeamFile = player.CurrentTeamImage;

                string playerPath = _fileService.UploadFile(playerFile);
                string currentTeamPath = _fileService.UploadFile(currentTeamFile);

                player.PlayerPath = playerPath;
                player.CurrentTeamPath = currentTeamPath;

                var newPlayer = await _playerService.CreatePlayerAsync(player);
                return Created($"/api/player/{newPlayer.Id}", newPlayer);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }





        [HttpGet("{playerId:int}")]
        public async Task<ActionResult<PlayerModel>> GetPlayerAsync(int playerId)
        {
            try
            {
                var player = await _playerService.GetPlayerAsync(playerId);
                return Ok(player);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }



        [HttpDelete("{playerId:int}")]
        public async Task<ActionResult> DeletePlayerAsync(int playerId)
        {
            try
            {
                await _playerService.DaletePlayerAsync(playerId);
                return Ok();
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }



        [HttpPut("{playerId:int}")]
        public async Task<ActionResult<PlayerModel>> PutPlayerAsync(int playerId, [FromBody] PlayerModel player)
        {
            try
            {
                var updatedPlayer = await _playerService.UpdatePlayerAsync(playerId, player);
                return Ok(updatedPlayer);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Simething happend.");
            }
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameModel>>> FilterPlayersAsync(string generalPosition, string country, string posiblePlayers)
        {
            try
            {
                var players = await _playerService.FilterPlayersAsync(generalPosition, country, posiblePlayers);
                return Ok(players);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Simething happend.");
            }
        }
    }
}
