'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, notification } from 'antd';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import StyledForm from '@/components/Form';
import { baseURL, headerValue, fetcher, sendRequest } from '@/components/Utils'

export default function User({ params }) {
  const router = useRouter();
  const { id } = params;

  const url = `${baseURL}/users/${id}`;
  let urlMutation = url;
  if (id === 'new') {
    urlMutation = `${baseURL}/users`;
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
        email: newData?.email,
        professionalAllowsScheduling: newData?.professionalAllowsScheduling ?? false,
        active: newData?.active ?? false,
        password: newData?.password,
      }
      const isUpdate = newData?.id ? true : false;
      const result = await trigger(objToSave, /* opções */);

      if (isUpdate) {
        openNotificationWithIcon('success', 'Atualização', 'Operação realizada com sucesso!');
        router.push(`/users`);
      } else if (result.id && !isUpdate) {
        openNotificationWithIcon('success', 'Criação', 'Operação realizada com sucesso!');
        router.push(`/users/${result?.id}`);
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
      <h1>Formulário do Usuário [{newData?.name}]</h1>
      {isLoading || isMutating && <p>Loading...</p>}
      {!newData && id !== "new" && <p>No data...</p>}
      {newData &&
        <StyledForm
          data={newData}
          backPath="users"
          handleSave={handleSave}
          handleChange={handleChange}
          rows={[
            { label: "Nome", type: "input", placeholder: "Nome", name: "name" },
            { label: "Email", type: "input", placeholder: "Email", name: "email" },
            { label: "Senha", type: "input", placeholder: "Senha", name: "password" },
            { label: "Ativo", type: "switch", placeholder: "", name: "active" },
            { label: "Agendamento", type: "switch", placeholder: "", name: "professionalAllowsScheduling" },
          ]}
        />
      }
    </Card>
  );
}
