using System.ComponentModel.DataAnnotations;

namespace Reservas_Backend.Features.Citas;

public class CitaCreateDto
{
    /// <summary>
    /// Placa del vehículo (3 letras, guion, 4 números).
    /// </summary>
    /// <example>ABC-1234</example>
    [Required(ErrorMessage = "La placa es obligatoria")]
    [RegularExpression(@"^[A-Z]{3}-\d{4}$", ErrorMessage = "Formato de placa inválido (Ej: PDF-1234)")]
    public string Placa { get; set; } = string.Empty;

    /// <summary>
    /// Fecha y hora de la cita (Lunes a Viernes, 08:00 AM - 02:00 PM).
    /// </summary>
    /// <example>2026-10-20T10:00:00</example>
    [Required(ErrorMessage = "La fecha y hora son obligatorias")]
    public DateTime FechaHora { get; set; }
}

public class CitaResponseDto
{
    /// <example>1</example>
    public int Id { get; set; }

    /// <example>ABC-1234</example>
    public string Placa { get; set; } = string.Empty;

    /// <example>2026-10-20T10:00:00</example>
    public DateTime FechaHora { get; set; }
}
