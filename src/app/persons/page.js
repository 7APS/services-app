'use client'

import { useState, useEffect } from 'react';
import { Card, Table, Button, Breadcrumb, Divider, Input } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import { baseURL, headerValue, fetcher } from '@/components/Utils'
import { CheckCircleFilled, CloseCircleFilled, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

export default function Persons() {
    const [filteredInfo, setFilteredInfo] = useState("");
    const [sortedInfo, setSortedInfo] = useState(null);

    const { data, error, isLoading } = useSWR([`${baseURL}/persons`, headerValue], fetcher);

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    useEffect(() => {
        if (filteredInfo != null && filteredInfo !== "") {
            setSortedInfo(data.filter(e => {
                if (e.name.toUpperCase().search(filteredInfo.toUpperCase()) > -1) {
                    return e;
                }
            }));
        } else {
            setSortedInfo(null);
        }
    }, [filteredInfo]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            width: 5,
        },
        {
            title: 'Telefone',
            dataIndex: 'phones',
            key: 'phones',
            ellipsis: true,
            width: 5,
            render: (phones) => phones?.[0]?.number ?? "-"
        },
        {
            title: 'Responsável',
            dataIndex: 'responsible',
            key: 'responsible',
            ellipsis: true,
            width: 5,
            render: (responsible) => responsible?.name ?? "-"
        },
        {
            title: 'Ativo',
            dataIndex: 'active',
            key: 'active',
            width: 2,
            render: (active) => (
                active ? <CheckCircleFilled className='text-green-500' /> : <CloseCircleFilled className="text-red-600" />
            )
        },
        {
            title: '',
            key: 'operation',
            width: 2,
            render: ({ id }) => <a><Link href={`/persons/${id}`} legacyBehavior><a><EditOutlined /></a></Link></a>,
        },
    ];

    return (
        <Card>
            <div className='flex gap-2'>
                <div className='grid'>
                    <h1 className='font-bold text-2xl'>Pessoas</h1>
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/dashboard">Dashboard</a>,
                            },
                            {
                                title: <a href="/persons">Pessoas</a>,
                            },
                            {
                                title: "Listagem de Pessoas",
                            }
                        ]}
                    />
                </div>
                <div className='absolute right-6'>
                    <Button className='bg-primary text-white h-8'>
                        <Link href={`/persons/new`} legacyBehavior>
                            <a className='p-4'>
                                <PlusOutlined /> Adicionar
                            </a>
                        </Link>
                    </Button>
                </div>
            </div>
            <Divider />
            <div className='mb-3 p-2'>
                <Input
                    value={filteredInfo}
                    onChange={(e) => setFilteredInfo(e.target.value)}
                    placeholder='Pesquise por Nome'
                    prefix={<SearchOutlined />}
                />
            </div>
            <Table
                columns={columns}
                dataSource={sortedInfo ?? data}
                onChange={handleChange}
                pagination={{"hideOnSinglePage": true}}
            />
        </Card>
    );
}
