import React from 'react';

import Scheduler, { Resource, View, Scrolling } from 'devextreme-react/scheduler';
import {
    resources,
    generateAppointments,
    // appointments,
} from './data.js';
// import ResourceCell from './ResourceCell.js';
// import Appointment from './Appointment.js';
// import AppointmentTooltip from './AppointmentTooltip.js';

const currentDate = new Date();

const groups = ['humanId'];

const startDay = new Date(2023, 1, 1);
const endDay = new Date(2024, 1, 1);
const startDayHour = 8;
const endDayHour = 21;

// console.log("appointments", appointments);

const appointments = generateAppointments(startDay, endDay, startDayHour, endDayHour);

export default function ScheduleTeste() {
    return (
        <Scheduler
            timeZone="America/Sao_Paulo"
            dataSource={appointments}
            height={700}
            defaultCurrentView='Timeline'
            defaultCurrentDate={currentDate}
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={60}
            showAllDayPanel={true}
            groups={groups}
            // resourceCellComponent={ResourceCell} // muda a apresentação dos grupos, por exemplo por um avatar ou estilizar a descrição do nome
            showCurrentTimeIndicator={true}
            shadeUntilCurrentTime={true}

            // appointmentComponent={Appointment} // os 3 campos abaixo sao para customizar o card na tela o tooltip e o form
            // appointmentTooltipComponent={AppointmentTooltip}
            // onAppointmentFormOpening={this.onAppointmentFormOpening}
            >
            <View
                type='timelineDay'
                name='Linha do Tempo'
                groupOrientation='vertical'
            />
            <View
                type='day'
                name='Dia'
                groupOrientation='vertical'
            />
            <View
                type='workWeek'
                name='Semana'
                groupOrientation='vertical'
            />
            <View
                type='month'
                name='Mês'
                groupOrientation='horizontal'
            />
            <Resource
                fieldExpr='humanId'
                dataSource={resources}
                label='Employee'
            />
            <Scrolling
                mode='virtual'
            />
        </Scheduler>
    )
}