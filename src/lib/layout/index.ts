import styled, {css} from "styled-components";

interface Props {
  width?: string | number;
  maxw?: string | number;
  alignContent?: "flex-start" | "flex-end" | "center" | "space-around" | "space-between" | "stretch";
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  basis?: string | number;
  grow?: number;
  shrink?: number;
  justify?: "flex-start" | "flex-end" | "center" | "space-around" | "space-between" | "space-evenly" | "safe center" | "unsafe center";
  order?: string | number;
  padding?: string | number;
  gap?: string | number;
  reverse?: boolean;
}

export const mixins = (props: Props) => css`
  width: ${props.width};
  max-width: ${props.maxw};
  align-content: ${props.alignContent};
  align-items: ${props.align};
  flex-basis: ${props.basis};
  flex-grow: ${props.grow};
  flex-shrink: ${props.shrink};
  justify-content: ${props.justify};
  order: ${props.order};
  padding: ${props.padding};
`;

export const Row = styled.div<Props>`
  display: flex;
  flex-direction: ${({reverse}) => reverse ? "row-reverse" : "row"};
  ${mixins};
  
  ${(props) =>
    props.gap && css`
          & > :not(:first-child) {
            margin-left: ${props.gap};
          }
  `}
`;

export const Col = styled.div<Props>`
  display: flex;
  flex-direction: ${({reverse}) => reverse ? "column-reverse" : "column"};
  ${mixins};
  
  ${(props) =>
    props.gap && css`
          & > :not(:first-child) {
            margin-top: ${props.gap};
          }
  `}
`;

