

/* 🦄핵심 파일
App.js
./Sidebar/Sidebar.js
./Sidebar/....Category.js
./Sidebar/....input.js

Nav.js
Card.js
*/

import { useState } from "react";

import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";

function App() {

  // 👉105
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  
  //🍀js 100  query : nav input search bar에서의 value
  const [query, setQuery] = useState("");

  // 👉js 100 
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

/* 
  filteredItems 변수는 검색어를 기반으로 상품 목록(products)을 필터링한 결과를 저장합니다.
  filter 함수를 사용하여 products 배열을 순회하면서 각 상품의 title 속성을 소문자로 변환하고, 
  이 속성에 query 문자열이 포함되어 있는지를 검사합니다.

  indexOf 함수를 사용하여 문자열 검색을 수행하며, 검색 결과가 -1이 아니면 해당 상품을 결과 배열에 포함시킵니다.
  결과적으로 filteredItems 배열에는 검색어와 일치하는 상품들이 포함됩니다.
 */
  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // 🍀js 105 ------ Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

/* 
  filteredData 함수:
  상품 목록(products 배열), 선택한 카테고리(selected), 검색어(query)를 인수로 받습니다.

  먼저 filteredProducts 변수를 초기화합니다.

  검색어 필터링: 검색어(query)가 있을 경우, 상품 목록을 filteredItems 배열로 대체합니다. 이렇게 하면 검색어와 일치하는 상품만 남게 됩니다.

  선택한 필터 적용: 선택한 카테고리(selected)가 있을 경우, 해당 카테고리와 일치하는 상품만 남기고 나머지는 제거합니다. 여기서 filter 메서드를 사용하여 필터링 작업을 수행합니다.

  마지막으로 필터링된 상품들을 map 함수를 사용하여 컴포넌트(Card)로 렌더링합니다.

*/
  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (

        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
}

export default App;
