import { useState } from "react";
import {
  StyledAboutPropertyContainer,
  StyledTitle,
  StyledDescription,
  StyledReadMoreLink,
} from "./styles";
import type { IAboutPropertyProps } from "./types";

export function AboutProperty({ description }: IAboutPropertyProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <StyledAboutPropertyContainer>
      <StyledTitle>About this property</StyledTitle>
      <StyledDescription className={isExpanded ? "expanded" : "collapsed"}>
        {description}
      </StyledDescription>
      <StyledReadMoreLink onClick={handleReadMore}>
        {isExpanded ? "Read less" : "Read more"}
      </StyledReadMoreLink>
    </StyledAboutPropertyContainer>
  );
}

export default AboutProperty;
