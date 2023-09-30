import Category from "./Category/Category";
import Price from "./Price/Price";
import Colors from "./Colors/Colors";
import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {

  // 🦄console-handleChange 찍어보면 setSelectedCategory 가 나옴... 👉여기에서 set~을 해서 props 자식 컴포넌트인데도 불구하고, 상위컴포넌트에 데이터 전달할 수있는 것임
  
  console.log(handleChange)

  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
        <Colors handleChange={handleChange} />
      </section>
    </>
  );
};

export default Sidebar;
