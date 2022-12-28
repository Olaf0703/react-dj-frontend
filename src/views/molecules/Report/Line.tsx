import { FC } from 'react';
import {
  LineChart, Line, XAxis,
  YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Mon',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Tue',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Wed',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thu',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Fri',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Sat',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

export const SocratesLine: FC = () => {

  return (
    <ResponsiveContainer width={440} height={300}>
      <LineChart
        // width={440}
        // height={280}
        data={data}
        margin={{
          top: 25,
          right: 10,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="10 0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}

