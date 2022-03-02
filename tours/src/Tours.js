import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const url = 'https://course-api.com/react-tours-project';

const Tours = () => {
    const [tours, setTours] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(true);

    const getTours = async () => {
        setLoading(true);
        const response = await fetch(url);
        const tours = await response.json();
        setLoading(false);
        setTours(tours);
    }

    const removeTour = (id) => {
        const newTours = tours.filter((tour) => tour.id !== id);
        setTours(newTours);
    }

    useEffect(() => {
        getTours();
    }, []);
    if (loading) {
        return (
            <Loading />
        )
    }
    if (tours.length === 0) {
        return (
            <div className='noTour'>
                <h1>no tours left</h1>
                <div className="refreshButton">
                    <button onClick={()=>getTours()}>Refresh</button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='tours'>
                <h1>our tours</h1>
                <div className="underline"></div>
                {tours.map((tour) => {
                    const { id, name, info, image, price } = tour;
                    return (
                        <div className="tour" key={id}>
                            <img src={image} alt="error" />
                            <div className="tourInfo">
                                <h4>{name}</h4>
                                <h4 className='tourPrice'>${price}</h4>
                            </div>
                            <p>
                                {showMore ? info : `${info.slice(0, 150)}...`}
                                <a onClick={() => setShowMore(!showMore)}>
                                    {showMore ? ' show less' : ' show more'}
                                </a>

                            </p>
                            <div className="tourDelete">
                                <button onClick={() => removeTour(id)}>not interested</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default Tours;