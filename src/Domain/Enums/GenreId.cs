using System.ComponentModel;

namespace Domain.Enums;

public enum GenreId
{
    Akcja = 0,
    Animowany = 1,
    Biograficzny = 2,
    Dramat = 3,
    Familijny = 4,
    Fantasy = 5,
    Horror = 6,
    Komedia = 7,
    [Description("Komedia romantyczna")]
    KomediaRomantyczna = 8,
    Kryminał = 9,
    Musical = 10,
    Obyczajowy = 11,
    Przygodowy = 12,
    Romans = 13,
    [Description("Science Fiction")]
    ScienceFiction = 14,
    Sensacyjny = 15,
    Thriller = 16,
    Fantastyka = 17
}