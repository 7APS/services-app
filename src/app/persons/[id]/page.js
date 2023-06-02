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

  const url = `${baseURL}/persons/${id}`;
  let urlMutation = url;
  if (id === 'new') {
    urlMutation = `${baseURL}/persons`;
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
        name: newData?.name,
        phones: [{ number: newData?.phones, standard: true }],
        active: newData?.active ?? false,
        responsible: { id: "f51210c6-1a0c-4369-95fa-0d6ea5b1b8ad" }, // @todo ajustar para load de users no select da tela
      }
      const isUpdate = newData?.id ? true : false;
      const result = await trigger(objToSave, /* opções */);

      if (isUpdate) {
        openNotificationWithIcon('success', 'Atualização', 'Operação realizada com sucesso!');
        router.push(`/persons`);
      } else if (result.id && !isUpdate) {
        openNotificationWithIcon('success', 'Criação', 'Operação realizada com sucesso!');
        router.push(`/persons/${result?.id}`);
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
          backPath="persons"
          handleSave={handleSave}
          handleChange={handleChange}
          rows={[
            { label: "Nome", type: "input", placeholder: "Nome", name: "name" },
            { label: "Telefone", type: "number", placeholder: "Telefone", name: "phones", value: "data?.phones?.[0]?.number" },
            { label: "Responsável", type: "input", placeholder: "Nome do Responsável", name: "responsible", value: "data?.responsible?.name", disabled: true },
            { label: "Ativo", type: "switch", placeholder: "", name: "active" },
          ]}
        />
      }
    </Card>
  );
}