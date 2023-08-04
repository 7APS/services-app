export const resources = [
  {
    id: 0,
    text: "Simoneto",
    color: "#74d57b",
    // avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png',
    // age: 27,
    // discipline: 'ABS, Fitball, StepFit',
  },
  {
    id: 1,
    text: "Casara",
    color: "#1db2f5",
  },
  {
    id: 2,
    text: "Montanger",
    color: "#f5564a",
  },
];

export function generateAppointments(dataList, userData) {
  const appointments = [];

  dataList?.forEach((data) => {
    const { startEvent, finishEvent, description } = data;

    appointments.push({
      text: description,
      startDate: new Date(startEvent),
      endDate: new Date(finishEvent),
      humanId: 0,
    });
  });

  return appointments;
}
