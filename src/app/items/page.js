'use client'

import { useState, useEffect } from 'react';
import { Card, Table, Button, Breadcrumb, Divider, Input } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import { baseURL, headerValue, fetcher } from '@/components/Utils'
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

export default function Items() {
    const [filteredInfo, setFilteredInfo] = useState("");
    const [sortedInfo, setSortedInfo] = useState(null);

    const { data, error, isLoading } = useSWR([`${baseURL}/items`, headerValue], fetcher);

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    useEffect(() => {
        if (filteredInfo != null && filteredInfo !== "") {
            setSortedInfo(data.filter(e => {
                if (e.description.toUpperCase().search(filteredInfo.toUpperCase()) > -1 ||
                    e.type.toUpperCase().search(filteredInfo.toUpperCase()) > -1) {
                    return e;
                }
            }));
        } else {
            setSortedInfo(null);
        }
    }, [filteredInfo]);

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            width: 5,
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            ellipsis: true,
            width: 2,
        },
        {
            title: 'Duração',
            dataIndex: 'duration',
            key: 'duration',
            ellipsis: true,
            width: 2,
            render: (duration) => `${duration} minutos`,
        },
        {
            title: 'Valor',
            dataIndex: 'salesValue',
            key: 'salesValue',
            width: 2,
            ellipsis: true,
            render: (salesValue) => `R$ ${salesValue}`,
        },
        {
            title: '',
            key: 'operation',
            width: 2,
            ellipsis: true,
            render: ({ id }) => <a><Link href={`/items/${id}`} legacyBehavior><a><EditOutlined /></a></Link></a>,
        },
    ];

    return (
        <Card>
            <div className='flex gap-2'>
                <div className='grid'>
                    <h1 className='font-bold text-2xl'>Items</h1>
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/dashboard">Dashboard</a>,
                            },
                            {
                                title: <a href="/items">Items</a>,
                            },
                            {
                                title: "Listagem de Items",
                            }
                        ]}
                    />
                </div>
                <div className='absolute right-6'>
                    <Button className='bg-primary text-white h-8'>
                        <Link href={`/items/new`} legacyBehavior>
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
                    placeholder='Pesquise por Descrição ou tipo'
                    prefix={<SearchOutlined />}
                />
            </div>
            <Table
                columns={columns}
                dataSource={sortedInfo ?? data}
                onChange={handleChange}
            />
        </Card>
    );
}
