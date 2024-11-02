import styled from "styled-components";
import { Paper } from "@mui/material";

export const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background: #1a1a1a;
  min-height: 100vh;
  color: #fff;
`;

export const GuideSection = styled(Paper)`
  && {
    background-color: #2a2a2a;
    color: #fff;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 4px;

    h1 {
      font-size: 1.5rem;
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      color: #4fc3f7;
    }

    strong {
      color: #81d4fa;
      font-size: 1.2rem;
    }

    a {
      color: #29b6f6;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`; 