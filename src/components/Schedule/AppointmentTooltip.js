// Exemplo https://js.devexpress.com/Demos/WidgetsGallery/Demo/Scheduler/CustomTemplates/React/Light/Compact/

import React from 'react';
import Query from 'devextreme/data/query';

import { resources } from './data.js';

function getMovieById(id) {
    // return Query(resources).filter(['id', id]).toArray()[0];
    return resources.find(i => i.id === id);
}

export default class AppointmentTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: getMovieById(props.data.appointmentData.movieId),
        };
    }

    render() {
        const { movieData } = this.state;
        return (
            <div className="movie-tooltip">
                <img src={movieData.image} />
                <div className="movie-info">
                    <div className="movie-title">
                        {movieData.text} ({movieData.year})
                    </div>
                    <div>
                        Director: {movieData.director}
                    </div>
                    <div>
                        Duration: {movieData.duration} minutes
                    </div>
                </div>
            </div>
        );
    }
}
