import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCart from "../components/ProductCart";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";

const Collection = () => {
  const { products, search,
    showSearch, } = useContext(ShopContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectSubCategory, setSubSelectCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
 

  const toogleCategory = (e) => {
    if (selectCategory.includes(e.target.value)) {
      setSelectCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSelectCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toogleSubCategory = (e) => {
    if (selectSubCategory.includes(e.target.value)) {
      setSubSelectCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSubSelectCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applayFilter = () => {
    let productCopy = [...products];

    if(showSearch && search){
        productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (selectCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        selectCategory.includes(item.category)
      );
    }
    if (selectSubCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        selectSubCategory.includes(item.subCategory)
      );
    }
    setFilterProduct(productCopy);
  };
  const sortProduct = () => {
    let fpSort = [...products];
    switch (sortType) {
      case "low-high":
        setFilterProduct(fpSort.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(fpSort.sort((a, b) => b.price - a.price));
        break;
      default:
        applayFilter();
        break;
    }
  };

  useEffect(() => {
    applayFilter();
  }, [selectCategory, selectSubCategory,search,showSearch,products]);
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);
  console.log(filterProduct);

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:gap-10 pt-10 border-t">
      {/* filter side */}
      <div className="max-w-60">
        <div className="mb-10 flex items-center gap-5  border border-gray-200 p-3 max-w-30">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="cursor-pointe"
          >
            Filters
          </p>
          <img
            src={assets.dropdown_icon}
            alt="icon"
            className={`h-4 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </div>
        {/* filter content */}
        <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
          <div className="flex-col border border-gray-200 p-5">
            <p>Category</p>
            <div className="flex items-center gap-4">
              <input type="checkbox" value={"Men"} onChange={toogleCategory} />
              <p>Man</p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                value={"Women"}
                onChange={toogleCategory}
              />
              <p>Women</p>
            </div>

            <div className="flex items-center gap-4">
              <input type="checkbox" value={"Kids"} onChange={toogleCategory} />
              <p>Kids</p>
            </div>
          </div>

          <div className="flex-col border border-gray-200 p-5">
            <p>Subcategory</p>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                value={"Topwear"}
                onClick={toogleSubCategory}
              />
              <p>Topwear</p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                value={"Bottomwear"}
                onClick={toogleSubCategory}
              />
              <p>Bottomwear</p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                value={"Winterwear"}
                onClick={toogleSubCategory}
              />
              <p>Winterwear</p>
            </div>
          </div>
        </div>
      </div>

      {/* sort filter */}
      <div className="flex-1 flex-col">
        <div className="flex items-center justify-between">
          <Title text="All" category="Collection" />
          <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
            <select
              className="mb-10 border border-gray-100 p-3"
              onChange={(e) => setSortType(e.target.value)}
            >
              Sort By
              <option value="relavent">Sort By:Relavent</option>
              <option value="low-high">Sort By:Low To High</option>
              <option value="high-low">Sort By:High-To-Low</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filterProduct.map((product, index) => (
              <ProductCart product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
