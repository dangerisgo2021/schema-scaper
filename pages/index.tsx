import Head from "next/head";
import { Layout, Typography } from "antd";
const { Title } = Typography;
const { Header, Footer, Content } = Layout;
import { CompareTool } from "compareTool/components/CompareTool";

export default function Home() {
  return (
    <>
      <Head>
        <title>Schema</title>
        <meta name="description" content="Compare Schemas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: "100%" }}>
        <Layout style={{ height: "100%" }} className="layout">
          <Header>
            <Title type="danger">Schema Scrapper</Title>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <CompareTool />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Schema Scrapper ©2021 Created by Clark Luskin
          </Footer>
        </Layout>
      </main>
    </>
  );
}
