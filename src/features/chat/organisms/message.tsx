import React from "react";
import styled, {css} from "styled-components";
import format from "date-fns/format";

import {Col} from "@lib/layout";
import {User} from "@api/common";
import {Text, Avatar, Icon, Skeleton} from "@ui/atoms";

interface Props {
  id: string;
  text: string | null;
  sender: User;
  createdAt: string;
  read: boolean;
  own: boolean;
}

export const Message: React.FC<Props> = ({id, text, sender, createdAt, own, read}) => (
  <Wrapper own={own} data-id={id} data-own={own} data-read={read}>
    <MessageBlock>
      <Header own={own}>
        <DateText>{format(new Date(createdAt), "HH:mm")}</DateText>
      </Header>
      <Block own={own}>
        <AvatarWrapper own={own}>
          <Avatar src={sender.avatar}/>
        </AvatarWrapper>

        <Col>
          <Bubble own={own}>
            <MessageText>{text}</MessageText>
          </Bubble>
        </Col>

        {own && <ReadStatusIcon name={read ? "double-check" : "check"} secondary/>}
      </Block>
    </MessageBlock>
  </Wrapper>
);

export const MessageSkeleton: React.FC = () => {
  const own = Math.round(Math.random()) % 2 === 0;

  return (
    <Wrapper own={own}>
      <MessageBlock>
        <Header own={own}>
          <Skeleton.Text width="4rem" />
        </Header>
        <Block own={own}>
          <AvatarWrapper own={own}>
            <Skeleton.Avatar />
          </AvatarWrapper>

          <Col>
            <Bubble own={own}>
              <Skeleton.Text width="10rem" />
            </Bubble>
          </Col>
        </Block>
      </MessageBlock>
    </Wrapper>
  );
};

interface StylingProps {
  own: boolean;
}

const Wrapper = styled.div<StylingProps>`
  display: flex;

  ${(props) => css`
    flex-direction: ${props.own ? "row-reverse" : "row"};
  `};
`;

const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;

  & > :not(:first-child) {
    margin-top: 0.5rem;
  }
`;

const Header = styled.div<StylingProps>`
  display: flex;

  ${(props) => props.own ? css`
    justify-content: flex-end;
    padding-right: 4.5rem;
  ` : css`
    justify-content: flex-start;
    padding-left: 4.5rem;
  `};
`;

const Block = styled.div<StylingProps>`
  display: flex;
  flex-direction: ${({own}) => own ? "row-reverse" : "row"};
  align-items: flex-start;
`;

const AvatarWrapper = styled.div<StylingProps>`
  min-width: 3.5rem;
  min-height: 3.5rem;
  width: 3.5rem;
  height: 3.5rem;

  ${(props) => props.own ? css`
    margin-left: 0.5rem;
  ` : css`
    margin-right: 0.5rem;
  `}
`;

const Bubble = styled.div<StylingProps>`
  display: flex;
  align-items: center;
  background-color: ${({theme, own}) => own ? theme.palette.secondary.main : theme.palette.primary.main};
  border-radius: 10px;
  padding: 1.5rem;

  ${(props) => props.own ? css`
    border-top-right-radius: 0;
  ` : css`
    border-top-left-radius: 0;
  `}
`;

const DateText = styled(Text)`
  font-size: 1.2rem;
`;

const MessageText = styled(Text)`
  color: ${({theme}) => theme.palette.text.primary};
  font-size: 1.2rem;
`;

const ReadStatusIcon = styled(Icon)`
  min-width: 1.5rem;
  min-height: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  margin-top: auto;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
`;