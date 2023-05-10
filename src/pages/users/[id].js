import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import Layouts from "@/components/layouts";
import { Card } from 'antd';
import StyledForm from '@/components/Form';
import useSWR from 'swr'
import { baseURL, headerValue, fetcher } from '../api';

export default function User() {
  const router = useRouter();
  const { id } = router.query;

  const url = `${baseURL}/${id}`;
  const { data, error, isLoading } = useSWR([url, headerValue], fetcher);

  return (
    <Card>
      <h1>Formulário do Usuário [{data?.name}]</h1>
      {isLoading && <p>Loading...</p>}
      {!data && <p>No data...</p>}
      {data &&
        <StyledForm
          data={data}
          urlPath="users"
          rows={[
            { label: "Nome", type: "input", placeholder: "Nome", name: "name" },
            { label: "Email", type: "input", placeholder: "Email", name: "email" },
            { label: "Ativo", type: "switch", placeholder: "Ativo", name: "active" },
            { label: "Ativo", type: "switch", placeholder: "Ativo", name: "professionalAllowsScheduling" },
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
