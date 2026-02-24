using Microsoft.EntityFrameworkCore;
using Reservas_Backend.Core.Data;

namespace Reservas_Backend.Features.Citas;

public class CitasService : ICitasService
{
    private readonly AppDbContext _context;

    public CitasService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CitaResponseDto>> GetByPlacaAsync(string placa)
    {
        return await _context.Citas
            .Where(c => c.Placa.ToUpper() == placa.ToUpper())
            .OrderBy(c => c.FechaHora)
            .Select(c => new CitaResponseDto
            {
                Id = c.Id,
                Placa = c.Placa,
                FechaHora = c.FechaHora
            })
            .ToListAsync();
    }

    public async Task<(bool Success, string Message, CitaResponseDto? Data)> CreateAsync(CitaCreateDto dto)
    {
        if (dto.FechaHora.Date < DateTime.Today)
        {
            return (false, "Error: No se pueden agendar citas para fechas pasadas.", null);
        }

        if (dto.FechaHora.DayOfWeek == DayOfWeek.Saturday || dto.FechaHora.DayOfWeek == DayOfWeek.Sunday)
        {
            return (false, "Error: Solo se permiten citas de Lunes a Viernes (Regla de Negocio 1).", null);
        }

        var hora = dto.FechaHora.Hour;
        var minutos = dto.FechaHora.Minute;

        if (hora < 8 || (hora >= 14 && minutos > 0))
        {
            return (false, "Error: El horario de atención es estrictamente de 08:00 AM a 14:00 PM (Regla de Negocio 1).", null);
        }

        if (minutos != 0 && minutos != 30)
        {
            return (false, "Error: Los intervalos de atención deben ser de 30 minutos (Regla de Negocio 2).", null);
        }

        var existeCita = await _context.Citas
            .AnyAsync(c => c.FechaHora == dto.FechaHora);

        if (existeCita)
        {
            return (false, "Error: El horario ya está ocupado por otro vehículo (Validación Crítica).", null);
        }

        var nuevaCita = new Cita
        {
            Placa = dto.Placa.ToUpper(),
            FechaHora = dto.FechaHora
        };

        _context.Citas.Add(nuevaCita);
        await _context.SaveChangesAsync();

        var response = new CitaResponseDto
        {
            Id = nuevaCita.Id,
            Placa = nuevaCita.Placa,
            FechaHora = nuevaCita.FechaHora
        };

        return (true, "Éxito: Cita agendada correctamente.", response);
    }
}
