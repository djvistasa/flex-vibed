import type { ICardProps } from "./types";
import { StyledCard } from "./styles";

export function Card({ children, className, hasPadding = true }: ICardProps) {
  return (
    <StyledCard className={className} $hasPadding={hasPadding}>
      {children}
    </StyledCard>
  );
}

export default Card;
