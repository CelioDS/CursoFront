import styleExt from "./Container.module.css";

export default function Container({ children }) {
  return <div className={styleExt.container}>{children} </div>;
}
