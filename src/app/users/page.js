'use client'

import { useState } from 'react';
import { Card, Table, Button } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import { baseURL, headerValue, fetcher } from '@/components/Utils'

export default function Users() {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const { data, error, isLoading } = useSWR([`${baseURL}/users`, headerValue], fetcher);

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
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
            width: 25,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            // sorter: (a, b) => a.email - b.email,
            // sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
            ellipsis: true,
            width: 25,
        },
        {
            title: 'Ativo',
            dataIndex: 'active',
            key: 'active',
            width: 25,
            render: (active) => active ? "SIM" : "NÃO"
        },
        {
            title: 'Agendamento Ativo',
            dataIndex: 'professionalAllowsScheduling',
            key: 'professionalAllowsScheduling',
            width: 25,
            render: (professionalAllowsScheduling) => professionalAllowsScheduling ? "SIM" : "NÃO"
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 25,
            render: ({ id }) => <a><Link href={`/users/${id}`} legacyBehavior><a>Editar</a></Link></a>,
        },
    ];

    return (
        <Card>
            <h1>Usuários</h1>
            <Table
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                scroll={{ x: 1500, y: 450, }}
            />
            <Button><Link href={`/users/new`} legacyBehavior><a>Novo</a></Link></Button>
        </Card>
    );
}