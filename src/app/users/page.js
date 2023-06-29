'use client'

import { useState, useEffect } from 'react';
import { Card, Table, Button, Breadcrumb, Divider, Input } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import { baseURL, headerValue, fetcher } from '@/components/Utils'
import { CheckCircleFilled, CloseCircleFilled, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

export default function Users() {
    const [filteredInfo, setFilteredInfo] = useState("");
    const [sortedInfo, setSortedInfo] = useState(null);

    const { data, error, isLoading } = useSWR([`${baseURL}/users`, headerValue], fetcher);

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    useEffect(() => {
        if (filteredInfo != null && filteredInfo !== "") {
            setSortedInfo(data.filter(e => {
                if (e.name.toUpperCase().search(filteredInfo.toUpperCase()) > -1 || e.email.toUpperCase().search(filteredInfo.toUpperCase()) > -1) {
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            width: 5,
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
            title: 'Agendamento',
            dataIndex: 'professionalAllowsScheduling',
            key: 'professionalAllowsScheduling',
            width: 2,
            render: (professionalAllowsScheduling) => (
                professionalAllowsScheduling ? <CheckCircleFilled className='text-green-500' /> : <CloseCircleFilled className="text-red-600" />
            )
        },
        {
            title: '',
            key: 'operation',
            width: 2,
            render: ({ id }) => <a><Link href={`/users/${id}`} legacyBehavior><a><EditOutlined /></a></Link></a>,
        },
    ];

    return (
        <Card>
            <div className='flex gap-2'>
                <div className='grid'>
                    <h1 className='font-bold text-2xl'>Usuários</h1>
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/dashboard">Dashboard</a>,
                            },
                            {
                                title: <a href="/users">Usuários</a>,
                            },
                            {
                                title: "Listagem de Usuários",
                            }
                        ]}
                    />
                </div>
                <div className='absolute right-6'>
                    <Button className='bg-primary text-white h-8'>
                        <Link href={`/users/new`} legacyBehavior>
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
                    placeholder='Pesquise por Nome ou email'
                    prefix={<SearchOutlined />}
                />
            </div>
            <Table
                columns={columns}
                dataSource={sortedInfo ?? data}
                onChange={handleChange}
                pagination={{"hideOnSinglePage": true}}
                rowKey={(record) => record.id}
            />
        </Card>
    );
}
