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
    [Route("api/rumor")]
    public class RumorsController : Controller
    {
        public ITransferRumorService _rumorService;
        private IFileService _fileService;

        public RumorsController(ITransferRumorService rumorService, IFileService fileService)
        {
            _rumorService = rumorService;
            _fileService = fileService;
        }




        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransferRumorModel>>> GetAllRumorsAsync()
        {
            try
            {
                var rumors = await _rumorService.GetAllRumorsAsync();
                return Ok(rumors);
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




        [HttpGet("{rumorId:int}")]
        public async Task<ActionResult<TransferRumorModel>> GetRumorAsync(int rumorId)
        {
            try
            {
                var rumor = await _rumorService.GetRumorAsync(rumorId);
                return Ok(rumor);
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

        [HttpPost]
        public async Task<ActionResult<TransferRumorModel>> PostRumorAsync([FromForm] TransferRumorFormModel newRumor)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var targetTeamFile = newRumor.TargetTeamImage;
                var targetTeamPath = _fileService.UploadFile(targetTeamFile);
                newRumor.TargetTeamPath = targetTeamPath;

                var rumor = await _rumorService.CreateRumorAsync(newRumor);
                return Created($"/api/rumor/{rumor.Id}", rumor);

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

        [HttpDelete("{rumorId}")]
        public async Task<ActionResult> DeleteRumorAsync(int rumorId)
        {
            try
            {
                await _rumorService.DeleteRumorAsync(rumorId);
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

        [HttpPut("{rumorId}")]
        public async Task<ActionResult<TransferRumorModel>> UpdateRumorAsync(int rumorId, [FromBody] TransferRumorModel rumor)
        {
            try
            {
                var updatedRumor = await _rumorService.UpdateRumorAsync(rumorId, rumor);
                return Ok(updatedRumor);
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



        [HttpDelete]
        public async Task<ActionResult> ConfirmRumorAsync(int rumorId, string confirmRumor)
        {
            try
            {
                await _rumorService.ConfirmRumorAsync(rumorId, confirmRumor);
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
