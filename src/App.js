import React, { useState, useEffect } from 'react';
import './App.css';

const MainView = () => {
  const [menuData, setMenuData] = useState({
    strawberry: 0,
    icedtea: 0,
    americano: 0,
    jori: 0,
    cookie: 0,
  });

  useEffect(() => {
    getCount();
  }, []);

  const getCount = () => {
    const data = {};
    data['strawberry'] = parseInt(localStorage.getItem('플레인 요거트 스무디') ?? '0', 10);
    data['icedtea'] = parseInt(localStorage.getItem('아이스티') ?? '0', 10);
    data['americano'] = parseInt(localStorage.getItem('아메리카노') ?? '0', 10);
    data['jori'] = parseInt(localStorage.getItem('에그타르트') ?? '0', 10);
    data['cookie'] = parseInt(localStorage.getItem('치즈타르트') ?? '0', 10);
    setMenuData(data);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">가정과 카페</h1>
        <img src="coffee.png" alt="Coffee" className="image" />
        <div className="divider" />
        <MenuContainer menu="플레인 요거트 스무디" cost={3500} count={menuData.strawberry} />
        <MenuContainer menu="아이스티" cost={2000} count={menuData.icedtea} />
        <MenuContainer menu="아메리카노" cost={2000} count={menuData.americano} />
        <MenuContainer menu="에그타르트" cost={3500} count={menuData.jori} />
        <MenuContainer menu="치즈타르트트" cost={3000} count={menuData.cookie} />
      </div>
    </div>
  );
};

const MenuContainer = ({ menu, cost, count }) => {
  const [localCount, setLocalCount] = useState(count);

  useEffect(() => {
    setLocalCount(count);
  }, [count]);

  const handleDecrement = () => {
    if (localCount > 0) {
      const newCount = localCount - 1;
      setLocalCount(newCount);
      localStorage.setItem(menu, newCount.toString());
    }
  };

  const handleIncrement = () => {
    const newCount = localCount + 1;
    setLocalCount(newCount);
    localStorage.setItem(menu, newCount.toString());
  };

  return (
    <div className="menuContainer">
      <span className="menuText">{menu}</span>
      <div>
        <div className="countContainer">
          <button onClick={handleDecrement} className="button">
            -
          </button>
          <span className="countText">{localCount}</span>
          <button onClick={handleIncrement} className="button">
            +
          </button>
        </div>
        <span className="costText">{localCount * cost}</span>
      </div>
    </div>
  );
};

export default MainView;
