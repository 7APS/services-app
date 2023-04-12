// Exemplo https://js.devexpress.com/Demos/WidgetsGallery/Demo/Scheduler/CustomTemplates/React/Light/Compact/

import React from 'react';
import Query from 'devextreme/data/query';
import localization from 'devextreme/localization';
import { resources } from './data.js';

function getMovieById(id) {
    // return Query(resources).filter(['id', id]).toArray()[0];
    return resources.find(i => i.id === id);
}

export default function Appointment(model) {
    const { resources } = model.data;

    const agendamento = getMovieById(resources?.id) || {};

    return (
        <div className="showtime-preview">
            <div> {agendamento.text}</div>
        </div>
    );
}
