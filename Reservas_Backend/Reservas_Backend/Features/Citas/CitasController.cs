using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reservas_Backend.Core.Data;

namespace Reservas_Backend.Features.Citas;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class CitasController : ControllerBase
{
    private readonly ICitasService _citasService;
    private readonly AppDbContext _context;

    public CitasController(ICitasService citasService, AppDbContext context)
    {
        _citasService = citasService;
        _context = context;
    }

    /// <summary>
    /// Lista TODAS las citas registradas en el sistema.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<CitaResponseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        var result = await _context.Citas
            .OrderByDescending(c => c.FechaHora)
            .Select(c => new CitaResponseDto
            {
                Id = c.Id,
                Placa = c.Placa,
                FechaHora = c.FechaHora
            })
            .ToListAsync();
        return Ok(result);
    }

    /// <summary>
    /// Consulta el historial de citas por placa.
    /// </summary>
    /// <param name="placa">Formato: ABC-1234</param>
    /// <response code="200">Retorna el listado de citas.</response>
    /// <response code="404">Si no hay citas para esa placa (Requerimiento A).</response>
    [HttpGet("{placa}")]
    [ProducesResponseType(typeof(IEnumerable<CitaResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetByPlaca(string placa)
    {
        if (string.IsNullOrWhiteSpace(placa))
            return BadRequest(new { Message = "La placa es obligatoria." });

        var result = await _citasService.GetByPlacaAsync(placa);
        
        // REQUERIMIENTO A: Validar cuando no hay info
        if (result == null || !result.Any())
        {
            return NotFound(new { Message = $"No se encontraron citas registradas para la placa {placa.ToUpper()}." });
        }

        return Ok(result);
    }

    /// <summary>
    /// Agenda una nueva cita de mantenimiento.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(CitaResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(CitaCreateDto dto)
    {
        var (success, message, data) = await _citasService.CreateAsync(dto);
        
        if (!success)
        {
            return BadRequest(new { Message = message });
        }

        return Ok(data);
    }
}
