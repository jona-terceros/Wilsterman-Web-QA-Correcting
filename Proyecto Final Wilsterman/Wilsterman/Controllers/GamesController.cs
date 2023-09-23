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
    [Route("api/game")]
    public class GamesController : Controller
    {
        private IGameService _gameService;
        private IFileService _fileService;

        public GamesController(IGameService gamesService, IFileService fileService)
        {
            _gameService = gamesService;
            _fileService = fileService;
        }



        [HttpPost]
        public async Task<ActionResult<GameModel>> PostGameAsync([FromForm] GameFormModel game)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var localTeamFile = game.LocalTeamImage;
                var awayTeamFile = game.AwayTeamImage;

                string localTeamPath = _fileService.UploadFile(localTeamFile);
                string awayTeamPath = _fileService.UploadFile(awayTeamFile);

                game.LocalTeamPath = localTeamPath;
                game.AwayTeamPath = awayTeamPath;

                var newGame = await _gameService.CreateGameAsync(game);
                return Created($"/api/game/{newGame.Id}", newGame);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameModel>>> GetAllGamesAsync(string tournament, bool twoGamesOnly, string finish)
        {
            try
            {
                if (tournament != null || finish != null)
                {
                    var games = await _gameService.FilterTournamentAsync(tournament, finish);
                    return Ok(games);
                }
                else
                {
                    if (twoGamesOnly == true)
                    {
                        var games = await _gameService.GetResultGameAsync();
                        return Ok(games);
                    }
                    else
                    {
                        var games = await _gameService.GetAllGamesAsync();
                        return Ok(games);
                    }
                }
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




        [HttpGet("{gameId:int}")]
        public async Task<ActionResult<GameModel>> GetGameAsync(int gameId)
        {
            try
            {
                var games = await _gameService.GetGameAsync(gameId);
                return Ok(games);
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



        [HttpDelete("{gameId:int}")]
        public async Task<ActionResult> DeleteGameAsync(int gameId)
        {
            try
            {
                await _gameService.DeleteGameAsync(gameId);
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



        [HttpPut("{gameId:int}")]
        public async Task<ActionResult<GameModel>> PutGameAsync(int gameId, [FromBody] GameModel game)
        {
            try
            {
                var updatedGame= await _gameService.UpdateGameAsync(gameId, game);
                return Ok(updatedGame);
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



        [HttpPut]
        public async Task<ActionResult<GameModel>> UpdateResultAsync(int gameId, int localGoals, int awayGoals)
        {
            try
            {
                await _gameService.UpdateResultGameAsync(gameId, localGoals, awayGoals);
                return Ok();
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
