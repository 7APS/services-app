import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { baseURL, headerValue, fetcher } from "@/components/Utils";
import Scheduler, {
  Resource,
  View,
  Scrolling,
} from "devextreme-react/scheduler";

import {
  resources,
  generateAppointments,
  // appointments,
} from "./data.js";
// import ResourceCell from './ResourceCell.js';
// import Appointment from './Appointment.js';
// import AppointmentTooltip from './AppointmentTooltip.js';

const currentDate = new Date();
const groups = ["humanId"];

const startDayHour = 8;
const endDayHour = 21;

export default function ScheduleTeste() {
  const [appointments, setAppointments] = useState(null);
  const { data, isLoading } = useSWR(
    [`${baseURL}/calendar/events`, headerValue],
    fetcher
  ); //?filter{startEvent->GTE->"2023-06-27T05:00:00Z"}
  const { data: userData, isLoading: isLoadingUsers } = useSWR(
    [`${baseURL}/users`, headerValue],
    fetcher
  ); //?filter{professionalAllowsScheduling->EQ->true,active->EQ->true}

  useEffect(() => {
    if (!isLoading && !isLoadingUsers && data != null && userData != null) {
      setAppointments(generateAppointments(data?.content, userData?.content));
    }
  }, [data, userData]);

  return (
    <Scheduler
      timeZone="America/Sao_Paulo"
      dataSource={appointments}
      height={700}
      defaultCurrentView="Timeline"
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
        type="timelineDay"
        name="Linha do Tempo"
        groupOrientation="vertical"
      />
      <View type="day" name="Dia" groupOrientation="vertical" />
      <View type="workWeek" name="Semana" groupOrientation="vertical" />
      <View type="month" name="Mês" groupOrientation="horizontal" />
      <Resource fieldExpr="humanId" dataSource={resources} label="Employee" />
      <Scrolling mode="virtual" />
    </Scheduler>
  );
}
