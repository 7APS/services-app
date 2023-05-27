'use client'

import { useState } from 'react';
import { Card, Table, Button } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import { baseURL, headerValue, fetcher } from '@/components/Utils'

export default function Items() {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const { data, error, isLoading } = useSWR([`${baseURL}/items`, headerValue], fetcher);

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,

        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            ellipsis: true,
        },
        {
            title: 'Duração',
            dataIndex: 'duration',
            key: 'duration',
            ellipsis: true,
        },
        {
            title: 'Valor',
            dataIndex: 'salesValue',
            key: 'salesValue',
            render: (salesValue) => `R$ ${salesValue}`
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            render: ({ id }) => <a><Link href={`/items/${id}`} legacyBehavior><a>Editar</a></Link></a>,
        },
    ];

    return (
        <Card>
            <h1>Items</h1>
            <Table
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                scroll={{ x: 1500, y: 450, }}
            />
            <Button><Link href={`/items/new`} legacyBehavior><a>Novo</a></Link></Button>
        </Card>
    );
}
