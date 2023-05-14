import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layouts from "@/components/layouts";
import { Card } from 'antd';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import StyledForm from '@/components/Form';
import { baseURL, headerValue, fetcher, sendRequest } from '../api';

export default function User() {
  const router = useRouter();
  const { id } = router.query;

  const url = `${baseURL}/users/${id}`;
  let urlMutation = url;
  if (id === 'new') {
    urlMutation = `${baseURL}/users`;
  }
  const { data, error, isLoading } = useSWR([url, headerValue], fetcher);
  const [newData, setNewData] = useState({});

  const { trigger, isMutating } = useSWRMutation(urlMutation, sendRequest, /* opções */)

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
        router.push(`/users`);
      } else if (result.id && !isUpdate) {
        router.push(`/users/${result?.id}`);
      }
    } catch (e) {
      console.log("error save users/ >>", e);
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

User.getLayout = function getLayout(page) {
  return (
    <Layouts title="assets" classname="dashboard">
      {page}
    </Layouts>
  )
}
