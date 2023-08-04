"use client";

import { Button, Card, Breadcrumb, Divider } from "antd";
import ScheduleTeste from "@/components/Schedule/Schedule";
import { PlusOutlined } from "@ant-design/icons";

// ideias:
// * https://fullcalendar.io/demos
// * https://bryntum.com/products/scheduler/examples/nestedevents/

export default function Schedule() {
  return (
    <Card>
      <div className="flex gap-2">
        <div className="grid">
          <h1 className="font-bold text-2xl">Agenda</h1>
          <Breadcrumb
            items={[
              {
                title: <a href="/dashboard">Dashboard</a>,
              },
              {
                title: <a href="/schedule">Agenda</a>,
              },
            ]}
          />
        </div>
        <div className="absolute right-6">
          <Button className="bg-primary text-white h-8" disabled>
            {/* <Link href={`/users/new`} legacyBehavior> */}
            <a className="p-4">
              <PlusOutlined /> Adicionar
            </a>
            {/* </Link> */}
          </Button>
        </div>
      </div>
      <Divider />
      {/* {renderCalendar()} */}
      <ScheduleTeste />
    </Card>
  );
}

// const getListData = (value) => {
//     let listData;
//     switch (value.date()) {
//         case 8:
//             listData = [
//                 {
//                     type: 'warning',
//                     content: 'This is warning event.',
//                 },
//                 {
//                     type: 'success',
//                     content: 'This is usual event.',
//                 },
//             ];
//             break;
//         case 10:
//             listData = [
//                 {
//                     type: 'warning',
//                     content: 'This is warning event.',
//                 },
//                 {
//                     type: 'success',
//                     content: 'This is usual event.',
//                 },
//                 {
//                     type: 'error',
//                     content: 'This is error event.',
//                 },
//             ];
//             break;
//         case 15:
//             listData = [
//                 {
//                     type: 'warning',
//                     content: 'This is warning event',
//                 },
//                 {
//                     type: 'success',
//                     content: 'This is very long usual event。。....',
//                 },
//                 {
//                     type: 'error',
//                     content: 'This is error event 1.',
//                 },
//                 {
//                     type: 'error',
//                     content: 'This is error event 2.',
//                 },
//                 {
//                     type: 'error',
//                     content: 'This is error event 3.',
//                 },
//                 {
//                     type: 'error',
//                     content: 'This is error event 4.',
//                 },
//             ];
//             break;
//         default:
//     }
//     return listData || [];
// };

// const getMonthData = (value) => {
//     if (value.month() === 8) {
//         return 1394;
//     }
// };

// const renderCalendar = () => {
//     const monthCellRender = (value) => {
//         const num = getMonthData(value);
//         return num ? (
//             <div className="notes-month">
//                 <section>{num}</section>
//                 <span>Backlog number</span>
//             </div>
//         ) : null;
//     };
//     const dateCellRender = (value) => {
//         const listData = getListData(value);
//         return (
//             <ul className="events">
//                 {listData.map((item) => (
//                     <li key={item.content}>
//                         <Badge status={item.type} text={item.content} />
//                     </li>
//                 ))}
//             </ul>
//         );
//     };

//     return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
// };
