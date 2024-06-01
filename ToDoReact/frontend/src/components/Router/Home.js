import Container from "../Layout/Container";

import Header from "../Layout/Header";

import RenameTitle from "../Tools/RenameTitle";
import "./Home.module.css";

export default function Home() {
  return (
    <Container>
      <RenameTitle initialTitle={"ToDo - Home"} />
      <Header />
    </Container>
  );
}
