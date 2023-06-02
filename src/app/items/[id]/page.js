'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, notification } from 'antd';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import StyledForm from '@/components/Form';
import { baseURL, headerValue, fetcher, sendRequest } from '@/components/Utils'

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
      <h1>Formulário do Pessoa [{newData?.name}]</h1>
      {isLoading || isMutating && <p>Loading...</p>}
      {!newData && id !== "new" && <p>No data...</p>}
      {newData &&
        <StyledForm
          data={newData}
          backPath="items"
          handleSave={handleSave}
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