import React, {useEffect, useState} from 'react'
import SectionContainer from "components/SectionContainer/SectionContainer";
import ProgressBar from "./ProgressBar/ProgressBar";
import {useParams} from "react-router";
import {Navigate, useNavigate} from "react-router-dom";
import TicketDiscounts from "./discounts/TicketDiscounts";
import {BidirectionalStream, SeanceClient} from "generated/seance/seance_pb_service";
import {ChooseSeatRequest, ChooseSeatResponse, DisconnectRequest} from "generated/seance/seance_pb";
import {clearUserId, useUserId} from "hooks/useUserId";
import SeatChoice from "./seatChoice/SeatChoice";
import PurchaseSummary from "./purchaseSummary/PurchaseSummary";
import {TicketDetails} from "./models/TicketDetails";
import {TicketDiscountsDetails} from "generated/ticketDiscount/ticketDiscount_pb";
import {OrderClient} from "generated/order/order_pb_service";
import {FinalizeOrderRequest, SelectedTicket} from "generated/order/order_pb";
import {useJwtMetadata} from "hooks/useJwtMetadata";

function TicketPurchase() {
    const {id, seanceId, action} = useParams();
    const [seanceIdNumber, setSeanceIdNumber] = useState<number>(0);
    const [movieIdNumber, setMovieIdNumber] = useState<number>(0);
    const [offerId, setOfferId] = useState<number>(0);
    const [tickets, setTickets] = useState<Array<TicketDetails>>(new Array<TicketDetails>());
    const [userId,] = useState<string>(useUserId());

    const [userSeatIds, setUserSeatIds] = useState<Array<number>>(new Array<number>());

    const [stage, setStage] = useState<number>(0);
    const [seanceClient,] = useState<SeanceClient>(new SeanceClient(process.env.REACT_APP_SERVER_URL!));
    const [stream, setStream] = useState<BidirectionalStream<ChooseSeatRequest, ChooseSeatResponse>>();
    const [orderClient,] = useState<OrderClient>(new OrderClient(process.env.REACT_APP_SERVER_URL!));
    const [error, setError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const metadata = useJwtMetadata();

    useEffect(() => {
        if (seanceId === undefined || id === undefined) {
            navigate("/");
        }

        setMovieIdNumber(parseInt(id!));
        setSeanceIdNumber(parseInt(seanceId!));

        setStream(seanceClient.chooseSeat(metadata));
    }, [seanceId]);

    useEffect(() => {
        if (stream !== undefined) {
            const request = new ChooseSeatRequest();
            request.setSeanceid(seanceIdNumber);
            request.setUserid(userId);
            request.setMakeupchanges(false);
            stream!.write(request);
            
            return () => {
                stream?.cancel();
                setStream(undefined);
                setUserSeatIds(new Array<number>());
                clearUserId();
            }
        }
    }, [stream])

    useEffect(() => {
        if (action === "discounts") {
            setStage(0);
        } else if (action === "seatChoice") {
            setStage(1);
        } else if (action === "purchaseSummary") {
            setStage(2);
        }
    }, [action]);

    const handleSeatClick = (seatId: number) => {
        const userSeatIdIndex = userSeatIds.findIndex(item => {
            return item === seatId;
        });

        if (userSeatIdIndex === -1) {
            setUserSeatIds([...userSeatIds, seatId]);
        } else {
            userSeatIds.splice(userSeatIdIndex, 1);
            setUserSeatIds(userSeatIds);
        }
    }

    const onDiscountChange = (changedDiscount: TicketDiscountsDetails, ticketsCount: number): void => {
        const ticket = tickets.find(t => t.id === changedDiscount.getId())
        if (ticket === undefined) {
            tickets.push(new TicketDetails(changedDiscount, ticketsCount))
        } else {
            ticket.numberOfTickets = ticketsCount;
            if (ticket.numberOfTickets === 0) {
                tickets.splice(tickets.indexOf(ticket), 1);
            }
        }

        setTickets([...tickets]);
    }

    const onPayClick = () => {
        const request = new FinalizeOrderRequest();
        request.setSeatidsList(userSeatIds);
        request.setSelectedticketsList(tickets.map(item => {
            const selectedTicket = new SelectedTicket();
            selectedTicket.setDiscountid(item.id);
            selectedTicket.setCount(item.numberOfTickets);
            return selectedTicket;
        }));
        request.setOfferid(offerId);
        orderClient.finalizeOrder(request, metadata,(error, responseMessage) => {
            if (responseMessage !== null && responseMessage !== undefined) {
                const disconnectRequest = new DisconnectRequest();
                disconnectRequest.setUserid(userId);
                disconnectRequest.setSeanceid(seanceIdNumber);
                seanceClient.disconnect(disconnectRequest, metadata, () => {
                    navigate("/")
                })
            } else {
                setError(error?.message);
            }
        })
    }

    const render = () => {
        switch (action) {
            case "discounts":
                return <TicketDiscounts movieId={movieIdNumber} seanceId={seanceIdNumber} initialTickets={tickets}
                                        selectedOfferId={offerId}
                                        onOfferIdChange={(changedOfferId) => {
                                            setOfferId(changedOfferId);
                                        }}
                                        onDiscountChange={onDiscountChange}/>
            case "seatChoice": {
                if (tickets.length === 0) {
                    return <Navigate to={`/movie/${movieIdNumber}/tickets-purchase/${seanceId}/discounts`}/>
                }
                return <SeatChoice seanceId={seanceIdNumber} movieId={movieIdNumber}
                                   ticketsCount={tickets.reduce((prev, curr) => prev + curr.numberOfTickets, 0)}
                                   onSeatClick={handleSeatClick} selectedSeats={userSeatIds}
                                   seanceClient={seanceClient}
                                   stream={stream}/>
            }
            case "purchaseSummary": {
                if (tickets.length === 0) {
                    return <Navigate to={`/movie/${movieIdNumber}/tickets-purchase/${seanceId}/discounts`}/>
                }
                return <PurchaseSummary seanceId={seanceIdNumber} promotionId={offerId} discountedTickets={tickets}
                                        onPayClick={onPayClick} errorMessage={error}/>
            }
            default:
                navigate("/")
        }
    }

    return (
        <main className="display-container">
            <SectionContainer minHeight={"auto"} margin={"40px 12px"}>
                <ProgressBar stage={stage}/>
                {render()}
            </SectionContainer>
        </main>
    )
}

export default TicketPurchase;