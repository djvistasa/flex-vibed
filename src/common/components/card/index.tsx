import type { ICardProps } from "./types";
import { StyledCard } from "./styles";

export function Card({ children, className }: ICardProps) {
  return <StyledCard className={className}>{children}</StyledCard>;
}

export default Card;
