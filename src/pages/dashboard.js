import Layouts from "@/components/layouts"
import { Row, Col, Card } from 'antd';

import Stats from '../components/home/Stats';
import ProgressBar from '../components/home/ProgressBar';
import GradientProgess from '../components/home/GradientProgess';
import Barchart from '../components/home/Barchart';

import user1 from '../static/images/user1.png';
import user2 from '../static/images/user2.png';
import sale from '../static/images/icon-sale.png';
import order from '../static/images/icon-order.png';
import user from '../static/images/icon-user.png';
import visitor from '../static/images/icon-visitor.png';

export default function Dashboard() {
    return <div>

        {/* <!--Stats view --> */}
        <Row gutter={16}>
            <Col xs={24} sm={12} lg={6} className="custom-statcards">
                <Card
                    bordered={false}
                    className="sale"
                    bodyStyle={{ padding: '20px' }}
                >
                    <Stats icon={sale} text="Total em Vendas (Mês)" number="9541" />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6} className="custom-statcards">
                <Card
                    bordered={false}
                    className="order"
                    bodyStyle={{ padding: '20px' }}
                >
                    <Stats icon={order} text="Total de Agendamentos (Mês)" number="9541" />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6} className="custom-statcards">
                <Card
                    bordered={false}
                    bodyStyle={{ padding: '20px' }}
                    className="user"
                >
                    <Stats icon={user} text="Novos Usuários (Mês)" number="9541" />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6} className="custom-statcards">
                <Card
                    bordered={false}
                    bodyStyle={{ padding: '20px' }}
                    className="visitor"
                >
                    <Stats icon={visitor} text="Ticket Médio" number="9541" />
                </Card>
            </Col>
        </Row>

        {/* Custom Chart */}
        <Row gutter={16} className="m-t-15">
            <Col lg={24} xs={24}>
                <Card
                    bordered={false}
                    title={<p>Relatório de vendas no Semestre</p>}
                    bodyStyle={{ padding: '0 0 20px' }}
                >
                    <Barchart />
                </Card>
            </Col>
            {/* To do List */}
            <Col lg={8} xs={24} className="custom-tocard">
                {/* <TodoList /> */}
            </Col>
        </Row>

        <Row gutter={16} className="m-t-15">
            <Col xl={12} lg={16}>
                <Card
                    bordered={false}
                    title={<p>Progress Report </p>}
                    bodyStyle={{ padding: '0 20px 20px' }}
                >
                    <Row>
                        <Col sm={8} xs={24} className="text-center custom-categories">
                            <ProgressBar number="70" color="#4BBACE" width="10" />
                        </Col>
                        <Col sm={8} xs={24} className="text-center custom-categories">
                            <ProgressBar number="30" color="#E66793" width="10" />
                        </Col>
                        <Col sm={8} xs={24} className="text-center custom-categories">
                            <ProgressBar number="100" color="#45CD93" width="10" />
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col xl={12} lg={16}>
                <Card bordered={false} className="m-t-15">
                    <GradientProgess />
                </Card>
            </Col>
        </Row>

    </div>
}

Dashboard.getLayout = function getLayout(page) {
    return (
        <Layouts title="assets" classname="dashboard">
            {page}
        </Layouts>
    )
}