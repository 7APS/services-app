'use client'

import { useState } from 'react';
import { Card, Table, Button } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import { baseURL, headerValue, fetcher } from '@/components/Utils'

export default function Company() {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const { data, error, isLoading } = useSWR([`${baseURL}/company`, headerValue], fetcher);

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
            title: 'Nome',
            dataIndex: 'businessName',
            key: 'businessName',
            ellipsis: true,
        },
        {
            title: 'Nome Fantasia',
            dataIndex: 'fantasyName',
            key: 'fantasyName',
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            render: (param) => <a><Link href={`/company/${param?.id}`} legacyBehavior><a>Editar</a></Link></a>,
        },
    ];

    return (
        <Card>
            <h1>Empresa</h1>
            <Table
                columns={columns}
                dataSource={[data]}
                onChange={handleChange}
                scroll={{ x: 1500, y: 450, }}
            />
            {/* <Button><Link href={`/company/new`} legacyBehavior><a>Novo</a></Link></Button> */}
        </Card>
    );
}