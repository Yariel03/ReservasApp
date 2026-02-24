namespace Reservas_Backend.Features.Citas;

public interface ICitasService
{
    Task<IEnumerable<CitaResponseDto>> GetByPlacaAsync(string placa);
    Task<(bool Success, string Message, CitaResponseDto? Data)> CreateAsync(CitaCreateDto dto);
}
