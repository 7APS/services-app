'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, notification, Button, Breadcrumb, Divider } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import StyledForm from '@/components/Form';
import { baseURL, headerValue, fetcher, sendRequest } from '@/components/Utils';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';

export default function Person({ params }) {
  const router = useRouter();
  const { id } = params;

  const url = `${baseURL}/company/${id}`;
  let urlMutation = url;
  if (id === 'new') {
    urlMutation = `${baseURL}/company`;
  }
  const { data, error, isLoading } = useSWR([`${baseURL}/company`, headerValue], fetcher);
  const [newData, setNewData] = useState({});
  const { trigger, isMutating } = useSWRMutation(urlMutation, sendRequest, /* opções */)


  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({ message, description, });
  };

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const handleSave = async () => {
    try {
      const objToSave = {
        id: newData?.id ?? null,
        businessName: newData?.businessName,
        fantasyName: newData?.fantasyName,
      }
      const isUpdate = newData?.id ? true : false;
      const result = await trigger(objToSave, /* opções */);

      if (isUpdate) {
        openNotificationWithIcon('success', 'Atualização', 'Operação realizada com sucesso!');
        router.push(`/company`);
      } else if (result.id && !isUpdate) {
        openNotificationWithIcon('success', 'Criação', 'Operação realizada com sucesso!');
        router.push(`/company/${result?.id}`);
      }
    } catch (e) {
      openNotificationWithIcon('error', 'Erro', `A operação falhou! ${e?.message}`);
      console.log("error save >> ", e);
    }
  }

  const handleChange = (field, value) => {
    if (newData === null) {
      setNewData({});
    }
    setNewData({
      ...newData,
      [field]: value,
    })
  }

  return (
    <Card>
      {contextHolder}
      <div className='flex gap-2'>
        <div className='grid'>
          <h1 className='font-bold text-2xl'>Formulário do Empresa</h1>
          <Breadcrumb
            items={[
              {
                title: <a href="/dashboard">Dashboard</a>,
              },
              {
                title: <a href="/company">Empresas</a>,
              },
              {
                title: "Cadastro/Edição de Empresa",
              }
            ]}
          />
        </div>
        <div className='flex absolute right-6 gap-2'>
          <Button className='hover:bg-primary h-8' onClick={handleSave}>
            <Link href={`/company`} legacyBehavior>
              <a className='p-4'>
                <RollbackOutlined /> Voltar
              </a>
            </Link>
          </Button>
          <Button className='bg-primary text-white h-8' onClick={handleSave}>
            <Link href={`/company/new`} legacyBehavior>
              <a className='p-4'>
                <SaveOutlined /> Salvar
              </a>
            </Link>
          </Button>
        </div>
      </div>
      <Divider />
      {isLoading || isMutating && <p>Loading...</p>}
      {!newData && id !== "new" && <p>No data...</p>}
      {newData &&
        <StyledForm
          data={newData}
          handleChange={handleChange}
          rows={[
            { label: "Nome", type: "input", placeholder: "Nome", name: "businessName" },
            { label: "Nome Fantasia", type: "input", placeholder: "Nome Fantasia", name: "fantasyName" },
          ]}
        />
      }
    </Card>
  );
}