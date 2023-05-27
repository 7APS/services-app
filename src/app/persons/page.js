'use client'

import { useState } from 'react';
import { Card, Table, Button } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import { baseURL, headerValue, fetcher } from '@/components/Utils'

export default function Persons() {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const { data, error, isLoading } = useSWR([`${baseURL}/persons`, headerValue], fetcher);

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
            width: 25,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            width: 25,
        },
        {
            title: 'Telefone',
            dataIndex: 'phones',
            key: 'phones',
            ellipsis: true,
            width: 25,
            render: (phones) => phones?.[0]?.number ?? "-"
        },
        {
            title: 'Responsável',
            dataIndex: 'responsible',
            key: 'responsible',
            ellipsis: true,
            width: 25,
            render: (responsible) => responsible?.name ?? "-"
        },
        {
            title: 'Ativo',
            dataIndex: 'active',
            key: 'active',
            width: 25,
            render: (active) => active ? "SIM" : "NÃO"
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 25,
            render: ({ id }) => <a><Link href={`/persons/${id}`} legacyBehavior><a>Editar</a></Link></a>,
        },
    ];

    return (
        <Card>
            <h1>Pessoas</h1>
            <Table
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                scroll={{ x: 1500, y: 450, }}
            />
            <Button><Link href={`/persons/new`} legacyBehavior><a>Novo</a></Link></Button>
        </Card>
    );
}