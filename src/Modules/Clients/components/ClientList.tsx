import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../../Config/Redux/core";
import { ClientCard } from "./ClientCard";
import { Table, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import "antd/dist/antd.css";
import { ClientAvatar } from "../components/clientStyledElements";
import { ClientDto } from "../../../Dto/clientDto";
import { TableView, CardView } from "../../../Common/Components/viewsStyled";
import {
  PageContainer,
  PageBGSeparator,
} from "../../../Common/Components/pageStyles";
import useMatchMedia from "use-match-media-hook";
import { matchMedieQueries } from "../../../Common/Constants/matchMediaqueries";
import { HeaderTitleDiv, HeaderTitle } from "../../Layout/components/Header";
import { clientsActions } from "../clientsSlice";
import { clientAvatarServerUrl } from "../../../Common/Constants/names";

const ClientsMainContainer = styled.div`
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const columns: ColumnsType<ClientDto> = [
  {
    title: "Клиент",
    dataIndex: "fullName",
    key: "id",
    width: "25%",
    render: (_, client) => (
      <>
        <ClientAvatar src={client.imageSrc} />
        {client.fullName}
      </>
    ),
  },
  {
    title: "Номер телефона",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Компания",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Дата добавления",
    dataIndex: "dateUpdate",
    key: "dateUpdate",
    render: (_, client) => (
      <>
        {new Date(client.dateUpdate).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
        }) +
          " " +
          new Date(client.dateUpdate).getFullYear()}
      </>
    ),
  },
];

export const ClientList = () => {
  const [mobile] = useMatchMedia(matchMedieQueries);
  const clients = useAppSelector((store) => store.clients.clients).map((c) => {
    let client = Object.assign({}, c);
    client.imageSrc = clientAvatarServerUrl + client.imageSrc;
    return client;
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clientsActions.getClientsFromServer());
  }, []);

  return (
    <>
      <HeaderTitleDiv>
        <HeaderTitle>Клиенты</HeaderTitle>
      </HeaderTitleDiv>
      <PageBGSeparator>
        <PageContainer>
          <ClientsMainContainer>
            {!mobile ? (
              <TableView>
                <Table dataSource={clients} columns={columns} rowKey="id" />
              </TableView>
            ) : !clients || clients.length == 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <CardView>
                {clients?.map((client) => (
                  <ClientCard client={client} key={client.id} />
                ))}
              </CardView>
            )}
          </ClientsMainContainer>
        </PageContainer>
      </PageBGSeparator>
    </>
  );
};
