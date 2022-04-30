using System.ComponentModel;

namespace Domain.Enums;

public enum AgeRestrictionId
{
    [Description("Bez ograniczeń")]
    BezOgraniczen = 0,
    [Description("Od lat 3")]
    OdLat3 = 3,
    [Description("Od lat 7")]
    OdLat7 = 7,
    [Description("Od lat 13")]
    OdLat13 = 13,
    [Description("Od lat 15")]
    OdLat15 = 15
}