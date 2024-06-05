import "./Home.module.css";
import Header from "../Layout/Header";
import Container from "../Layout/Container";
import RenameTitle from "../Tools/RenameTitle";

export default function Home() {
  return (
    <Container>
      <RenameTitle initialTitle={"To Do - Home"} />
      <Header />
    </Container>
  );
}
