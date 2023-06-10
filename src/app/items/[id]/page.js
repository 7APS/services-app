'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, notification, Button, Breadcrumb, Divider } from 'antd';
import Link from 'next/link';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import StyledForm from '@/components/Form';
import { baseURL, headerValue, fetcher, sendRequest } from '@/components/Utils'
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';

export default function Person({ params }) {
  const router = useRouter();
  const { id } = params;

  const url = `${baseURL}/items/${id}`;
  let urlMutation = url;
  if (id === 'new') {
    urlMutation = `${baseURL}/items`;
  }
  const { data, error, isLoading } = useSWR([url, headerValue], fetcher);
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
        description: newData?.description,
        type: newData?.type,
        duration: newData?.duration,
        salesValue: newData?.salesValue,
        active: newData?.active ?? false,
      }
      const isUpdate = newData?.id ? true : false;
      const result = await trigger(objToSave, /* opções */);

      if (isUpdate) {
        openNotificationWithIcon('success', 'Atualização', 'Operação realizada com sucesso!');
        router.push(`/items`);
      } else if (result.id && !isUpdate) {
        openNotificationWithIcon('success', 'Criação', 'Operação realizada com sucesso!');
        router.push(`/items/${result?.id}`);
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
          <h1 className='font-bold text-2xl'>Formulário do Item</h1>
          <Breadcrumb
            items={[
              {
                title: <a href="/dashboard">Dashboard</a>,
              },
              {
                title: <a href="/items">Item</a>,
              },
              {
                title: "Cadastro/Edição de Item",
              }
            ]}
          />
        </div>
        <div className='flex absolute right-6 gap-2'>
          <Button className='hover:bg-primary h-8' onClick={handleSave}>
            <Link href={`/items`} legacyBehavior>
              <a className='p-4'>
                <RollbackOutlined /> Voltar
              </a>
            </Link>
          </Button>
          <Button className='bg-primary text-white h-8' onClick={handleSave}>
            <Link href={`/items/new`} legacyBehavior>
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
            { label: "Descrição", type: "input", placeholder: "Descrição do item", name: "description" },
            { label: "Tipo", type: "input", placeholder: "Tipo do item", name: "type" },
            { label: "Duração", type: "number", placeholder: "Duração do serviço", name: "duration" },
            { label: "Preço", type: "number", placeholder: "Preço do serviço", name: "salesValue" },
            { label: "Ativo", type: "switch", placeholder: "", name: "active" },
          ]}
        />
      }
    </Card>
  );
}