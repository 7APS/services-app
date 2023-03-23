import * as React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Janeiro',
    Produtos: 4000,
    Serviços: 2400,
    amt: 2400,
  },
  {
    name: 'Fevereiro',
    Produtos: 3000,
    Serviços: 1398,
    amt: 2210,
  },
  {
    name: 'Março',
    Produtos: 2000,
    Serviços: 9800,
    amt: 2290,
  },
  {
    name: 'Abril',
    Produtos: 2780,
    Serviços: 3908,
    amt: 2000,
  },
  {
    name: 'Maio',
    Produtos: 1890,
    Serviços: 4800,
    amt: 2181,
  },
  {
    name: 'Junho',
    Produtos: 2390,
    Serviços: 3800,
    amt: 2500,
  },
];
class Barchart extends React.Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';
  render () {
    const iconName = `/static/images/icon-${this.props.icon}.png `;
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Produtos" stackId="a" fill="#5984EE" />
          <Bar dataKey="Serviços" stackId="a" fill="#45CD93" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
export default Barchart;
