import React from "react";

function ItemCard({ key, ImageURL, BrandName, GoodsName }) {
    return (
      <li className="component component--item_card" key={key}>
        <img src={ImageURL} className="image--itemcard" alt="" />
        <p>
          브랜드명 : <span className="text--brand">{BrandName}</span>
        </p>
        <p>상품명 : {GoodsName}</p>
      </li>
    );
}

export default ItemCard;