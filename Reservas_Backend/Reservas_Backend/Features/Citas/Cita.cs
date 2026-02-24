using System.ComponentModel.DataAnnotations;

namespace Reservas_Backend.Features.Citas;

public class Cita
{
    public int Id { get; set; }

    [Required]
    [RegularExpression(@"^[A-Z]{3}-\d{4}$", ErrorMessage = "El formato de la placa debe ser XXX-0000")]
    public string Placa { get; set; } = string.Empty;

    [Required]
    public DateTime FechaHora { get; set; }

    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
}
