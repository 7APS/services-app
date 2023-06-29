'use client'

import { useState, useEffect } from 'react';
import { Card, Table, Button, Breadcrumb, Divider, Input } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import { baseURL, headerValue, fetcher } from '@/components/Utils'
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

export default function Company() {
    const [filteredInfo, setFilteredInfo] = useState("");
    const [sortedInfo, setSortedInfo] = useState(null);

    const { data, error, isLoading } = useSWR([`${baseURL}/company`, headerValue], fetcher);

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    useEffect(() => {
        if (filteredInfo != null && filteredInfo !== "") {
            setSortedInfo(data.filter(e => {
                if (e.businessName.toUpperCase().search(filteredInfo.toUpperCase()) > -1 ||
                    e.fantasyName.toUpperCase().search(filteredInfo.toUpperCase()) > -1) {
                    return e;
                }
            }));
        } else {
            setSortedInfo(null);
        }
    }, [filteredInfo]);

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'businessName',
            key: 'businessName',
            ellipsis: true,
            width: 5,
        },
        {
            title: 'Nome Fantasia',
            dataIndex: 'fantasyName',
            key: 'fantasyName',
            ellipsis: true,
            width: 5,
        },
        {
            title: '',
            key: 'operation',
            width: 2,
            render: (item) => <a><Link href={`/company/${item?.id ?? item}`} legacyBehavior><a><EditOutlined /></a></Link></a>,
        },
    ];

    return (
        <Card>
            <div className='flex gap-2'>
                <div className='grid'>
                    <h1 className='font-bold text-2xl'>Empresa</h1>
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/dashboard">Dashboard</a>,
                            },
                            {
                                title: <a href="/company">Empresa</a>,
                            },
                            {
                                title: "Listagem de Empresa",
                            }
                        ]}
                    />
                </div>
                <div className='absolute right-6'>
                    <Button className='bg-primary text-white h-8' disabled>
                        <Link href={`/company/new`} legacyBehavior>
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
                    placeholder='Pesquise por Nome ou Nome Fantasia'
                    prefix={<SearchOutlined />}
                />
            </div>
            <Table
                columns={columns}
                dataSource={[sortedInfo ?? data]}
                onChange={handleChange}
                pagination={{"hideOnSinglePage": true}}
                rowKey={(record) => record.id}
            />
        </Card>
    );
}
