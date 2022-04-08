USE ArkonaDB
GO

IF (SELECT COUNT(*) FROM Genres) = 0
begin
    INSERT INTO Genres(Name)
    VALUES (N'Akcja')
    , (N'Animowany')
    , (N'Biograficzny')
    , (N'Dramat')
    , (N'Familijny')
    , (N'Fantasy')
    , (N'Horror')
    , (N'Komedia')
    , (N'Komedia romantyczna')
    , (N'Kryminał')
    , (N'Musical')
    , (N'Obyczajowy')
    , (N'Przygodowy')
    , (N'Romans')
    , (N'Science-Fiction')
    , (N'Sensacyjny')
    , (N'Thriller')
    , (N'Fantastyka')
end

IF (SELECT COUNT(*) FROM AgeConstraints) = 0
begin
    INSERT INTO AgeConstraints(MinAge)
    VALUES (0)
    , (3)
    , (7)
    , (13)
    , (15)
end

SELECT * FROM Offers

IF (SELECT COUNT(*) FROM Offers) = 0
begin
    INSERT INTO Offers(GenreId, Name, Description, DiscountValue, AgeConstraintId, DiscountedNumberOfTickets,
                       Discriminator, RequiredNumberOfTickets, ValidFrom, ValidTo)
    VALUES (15, 'Weekend z filmami SF',
N'Poczuj klimat przyszłości oglądająć filmy Science-Fiction!

Wszystkie bilety zakupione na filmy z oznaczeniem Science-Fiction -10%.'
        , 0.9, NULL, NULL, N'MovieGenreOffer', NULL, '02-04-2022', '03-04-2022')
    , (NULL, N'Rodzinny tydzień - Dorośli płacą tyle co dzieci!',
N'Ciesz się oglądaniem filmów wraz z dziećmi!

Zabierz dziecko na film oznaczony kategorią od lat 7 i zapłać tyle samo co dziecko.'
        , 0.5, 3, NULL, 'AgeConstraintOffer', NULL, '28-03-2022', '03-04-2022')
    , (NULL, '4 bilety w cenie 3!',
N'Kup 4 bilety i zapłać za 3!

Przy zakupie dowolnych 4 biletów, jeden bilet za 0 zł.'
        , 0.0, NULL, 1, N'AmountOffer', '4', '28-03-2022', '10-04-2022')
end

IF (SELECT COUNT(*) FROM Movies) = 0
begin
    INSERT INTO Movies(Title, Image, ReleaseDate, Duration, Description, AgeConstraintId)
    VALUES (N'Interstellar', (SELECT BulkColumn FROM Openrowset
        ( Bulk 'C:\Users\PC\Desktop\Studia Informatyka\Praca inżynierska\Images\Interstellar.jpg', Single_Blob) as img)
        , '07-11-2014', 169,
N'Epicki film science fiction z 2014 roku, którego współautorem, reżyserem i producentem ' +
'jest Christopher Nolan. W rolach głównych Matthew McConaughey, Anne Hathaway, Jessica Chastain,' +
' Bill Irwin, Ellen Burstyn, Matt Damon i Michael Caine. Film osadzony jest w dystopijnej przyszłości,' +
' w której ludzkość walczy o przetrwanie, film pokazuje grupę astronautów, którzy podróżują przez tunel' +
' czasoprzestrzenny w pobliżu Saturna w poszukiwaniu nowego domu dla ludzkości.', 4),
    (N'Batman', (SELECT BulkColumn FROM Openrowset
        ( Bulk 'C:\Users\PC\Desktop\Studia Informatyka\Praca inżynierska\Images\Batman.jpg', Single_Blob) as img)
        , '04-03-2022', 176,
N'Batman to amerykański film o superbohaterach oparty na postaci Batmana z DC Comics. ' +
'Batman, który od dwóch lat walczy z przestępczością w Gotham City, odkrywa korupcję, ścigając' +
' Człowieka-Zagadkę, seryjnego mordercę, którego celem jest elita Gotham.', 4)
    , (N'Nasze magiczne Encanto', (SELECT BulkColumn FROM Openrowset
        ( Bulk 'C:\Users\PC\Desktop\Studia Informatyka\Praca inżynierska\Images\NaszeMagiczneEncanto.jpg', Single_Blob) as img)
        , '26-11-2021', 110,
N'Film opowiada o rodzinie Madrigal, mieszkającej w magicznym zakątku zwanym Encanto, w górach Kolumbii.' +
N' Jej członkowie w dzieciństwie zyskują niezwykłe zdolności, które w późniejszym czasie mają wykorzystywać' +
N' by pomagać innym, lecz piętnastoletnia Mirabel nie otrzymała żadnego daru. Okazuje się jednak,' +
N' że to właśnie ona musi ochronić rodzinę przed jej własnymi członkami', 1)
    , (N'To nie wypanda', (SELECT BulkColumn FROM Openrowset
        ( Bulk 'C:\Users\PC\Desktop\Studia Informatyka\Praca inżynierska\Images\ToNieWypanda.jpg', Single_Blob) as img)
        , '11-03-2022', 100,
N'To nie wypanda to amerykańska animowana komputerowo komedia z 2022 roku, wyprodukowana ' +
N'przez Pixar Animation Studios i dystrybuowana przez Walt Disney Studios Motion Pictures. ' +
N'Akcja filmu rozgrywająca się w 2002 roku w Toronto w prowincji Ontario, podąża za Meilin „Mei” Lee, ' +
N'13-letnią uczennicą z Kanady, która z powodu dziedzicznej klątwy przemienia się w wielką czerwoną pandę,' +
N' gdy wyraża jakiekolwiek silne emocje.', 3)
end

IF (SELECT count(*) FROM MovieGenre) = 0
begin
    INSERT INTO MovieGenre(MovieId, GenreId)
    VALUES (2,15)
    , (3, 1)
    , (3, 10)
    , (4, 2)
    , (4, 5)
    , (4, 13)
    , (5, 2)
    , (5, 5)
    , (5, 8)
end

IF (SELECT count(*) FROM CinemaHalls) = 0
begin
    INSERT INTO CinemaHalls(HallNumber, NumberOfSeats)
    VALUES (1, 240)
    , (2, 240)
    , (3, 360)
    , (4, 360)
    , (5, 240)
    , (6, 240)
    , (7, 360)
    , (8, 360)
end

IF (SELECT count(*) FROM Seances) = 0
begin
    INSERT INTO Seances(StartDateTime, MovieId, CinemaHallId)
    VALUES ('28-03-2022 16:00:00', 2, 1)
    , ('28-03-2022 16:00:00', 3, 2)
    , ('28-03-2022 18:00:00', 4, 7)
    , ('30-03-2022 12:30:00', 2, 1)
    , ('30-03-2022 14:15:00', 3, 2)
    , ('01-04-2022 16:30:00', 2, 1)
    , ('01-04-2022 10:30:00', 4, 8)
    , ('01-04-2022 14:45:00', 5, 8)
    , ('02-04-2022 12:30:00', 4, 3)
    , ('03-04-2022 15:30:00', 5, 5)
    , ('03-04-2022 17:45:00', 5, 5)
end

IF (SELECT count(*) FROM Orders) = 0
begin
    INSERT INTO Orders(DateTimeOfOrder, AgeOfferId, AmountOfferId, MovieGenreOfferId)
    VALUES (GETDATE(), NULL, NULL, NULL)
    , ('27-03-2022 14:34:54', 2, NULL, NULL)
    , ('28-03-2022 13:59:13', NULL, NULL, NULL)
    , ('25-03-2022 07:13:20', NULL, NULL, 1)
end

IF (SELECT count(*) FROM TicketDiscount) = 0
begin
    INSERT INTO TicketDiscount(Name, Description, DiscountValue)
    VALUES (N'Zniżka studencka', N'Zniżka przysługuje studentom posiadającym ważną legitymację studencką' +
                                 N' oraz majacym mniej niż 26 lat.', 0.75),
            (N'Zniżka ulgowa', N'Zniżka przysługuje dzieciom poniżej 18 roku życia.', 0.5),
            (N'Zniżka kombatancka', N'Zniżka przysługuje aktywnym lub w stanie spoczynku żołnierzom.', 0.4),
            (N'Senior', 'Zniżka przysługuje osobom z ukończonymi 65 latami.', 0.8)
end

IF (SELECT COUNT(*) FROM Seats) = 0
begin
    INSERT INTO Seats(Number, Row, CinemaHallId)
    VALUES (1, 'A', 1)
    , (2, 'A', 1)
    , (3, 'A', 1)
    , (107, 'E', 2)
    , (108, 'E', 2)
    , (217, 'I', 3)
    , (63, 'C', 5)
    , (64, 'C', 5)
end

IF (SELECT COUNT(*) FROM SeanceSeat) = 0
begin
    INSERT INTO SeanceSeat(SeanceId, SeatId)
    VALUES (12, 1)
    , (12, 2)
    , (12, 3)
    , (5, 4)
    , (5, 5)
    , (9, 6)
    , (10, 7)
    , (10, 8)
end

DECLARE @basePrice decimal(4,2) = '20.00'

IF (SELECT COUNT(*) FROM Tickets) = 0
begin
    INSERT INTO Tickets(BasePrice, DiscountedPrice, SeanceId, OrderId, TicketDiscountId, SeatId)
    VALUES (@basePrice, @basePrice*0.9, 12, 5, NULL, 1) -- Weekend z SF
    , (@basePrice, @basePrice*0.9, 12, 5, NULL, 2) -- Weekend z SF
    , (@basePrice, @basePrice*0.9, 12, 5, NULL, 3) -- Weekend z SF

    , (@basePrice, @basePrice*0.5, 5, 3, NULL, 4) -- Promocja rodzinna
    , (@basePrice, @basePrice*0.5, 5, 3, NULL, 5) -- Promocja rodzinna

    , (@basePrice, @basePrice*0.8, 9, 4, 4, 6) -- Zniżka senior
    , (@basePrice, @basePrice*0.5, 10, 2, 2, 7) -- Zniżka ulgowa
    , (@basePrice, @basePrice, 10, 2, NULL, 8) -- Brak zniżki
end

IF (SELECT COUNT(*) FROM UsedTickets) = 0
begin
    INSERT INTO UsedTickets(MovieTitle, SeanceDateTime, BasePrice,
                            DiscountedPrice, DiscountName, OfferName)
    VALUES('Batman', '28-03-2022 16:00:00', 20.00, 20.00, N'Brak', N'Brak')
end

-- Masywne zapytanie, żeby sprawdzić poprawność relacji
SELECT O.Number,
       T.Number,
       TD.Name as [Nazwa zniżki],
       O2.Name as [Nazwa promocji],
       M.Title,
       S.StartDateTime,
       Ac.MinAge,
       T.DiscountedPrice,
       CH.HallNumber,
       CH.NumberOfSeats,
       S2.Number as [Seat number],
       S2.Row
FROM SeanceSeat ss
JOIN Seances S on ss.SeanceId = S.Id
JOIN Seats S2 on ss.SeatId = S2.Id
JOIn CinemaHalls CH on S.CinemaHallId = CH.Id
JOIN Movies M on S.MovieId = M.Id
JOIN AgeConstraints AC on M.AgeConstraintId = AC.Id
JOIN Tickets T on T.SeatId = S2.Id
JOIN Orders O on T.OrderId = O.Id
LEFT JOIN TicketDiscount TD on T.TicketDiscountId = TD.Id
LEFT JOIN Offers O2 on O2.Id = O.AgeOfferId or
                       O2.Id = O.MovieGenreOfferId or
                       O2.Id = O.AmountOfferId

