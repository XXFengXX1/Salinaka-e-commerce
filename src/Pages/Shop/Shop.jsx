import React, { useRef, useState ,useEffect } from 'react'
import {Link} from 'react-router-dom'
import allDatas, { getData } from '../../data/data_origin'
import './Shop.css'
import Footer from '../../Components/Footer/Footer'
import { useDispatch,useSelector } from 'react-redux'
import { addToBasket,removeFromBasket } from '../../Redux/shoppingSlice'
import { setFilter } from '../../Redux/filterSlice'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import RangeSlider from '../../Components/RangeSlider/RangeSlider'
import CloseIcon from '@mui/icons-material/Close';

export default function Shop() {
  const [showingMore,setShowingMore] = useState(false)
  const shoppingList = useSelector(state => state.shoppingSlice.cart)
  const shopData = useSelector(state=>state.shoppingSlice.data)
  const allData = allDatas()

  //track if filter is open
  let filterRef = useRef(null)
  let emptyRef =useRef(null)

  //handle out side click for filter UI
  const handleOutsideClick = (e)=>{
      dispatch(setFilter())
  }
  const handleShowing = ()=>{
    setShowingMore(true)
  }
  //get filter state 
  let filterState =useSelector(state => state.filterSlice)
  
  const dispatch = useDispatch();
  
  const handleAdding = (product)=>{
    let isAdded = false
    let numberNeedtoRemover = 0;
    for(let index in shoppingList){
      
      if(shoppingList[index].id == product.id){
          isAdded = true;
          numberNeedtoRemover =index
      }
    }
    if(!isAdded){

      dispatch(addToBasket(product))
    }
    else{
      let frontPart = shoppingList.slice(0,numberNeedtoRemover)
      let subNum = Number(numberNeedtoRemover) +1
    
      let lastPart = shoppingList.slice(subNum,shoppingList.length)
      let newCart = [...frontPart,...lastPart]
      newCart.push(shoppingList[numberNeedtoRemover])
      dispatch(removeFromBasket(numberNeedtoRemover))

    }
  }
  //get filter data :brand and sort by
  let [brandFilter,setBrandFilter] =useState(false)
  let [sortFilter,setSortFilter] =useState(false)
  let [priceFilter,setPriceFilter] =useState(false)
  let brandRef =useRef('All Brands')
  let sortRef=useRef('None')

  const [filteredData,setFilteredData] = useState([])
  //set a useState to track the state of filter of apply
  const [isApplied,setisApplied] =useState(false)
  
  const [priceValues,setPriceValues] = useState([56,674])

  //change range values while they are changing
  const getRangeValues =(rangeValues)=>{
    setPriceValues(rangeValues)
  }

   //for sigle reset filter
  const resetBrandValue =()=>{
    brandRef.current.value = 'All Brands'

    filterProducts()
  }
  //for sigle reset filter
  const resetSortValue =()=>{
    sortRef.current.value = "None"
    filterProducts()
  }
   //for sigle reset filter
  const resetPriceRange =()=>{
    setPriceValues([56,674])
    setPriceFilter(false)
    setTimeout(()=>{filterProducts()},1000)
  }

  //for reset all filter button
  const resetAll =()=>{
    setPriceValues([56,674])
    brandRef.current.value = 'All Brands'  
    sortRef.current.value = "None"
    filterProducts()    
    dispatch(setFilter())
  }

  //apply filter
  const filterProducts =()=>{

    //set filters' state
    brandRef.current.value == 'All Brands'? setBrandFilter(false):setBrandFilter(true)
    sortRef.current.value == 'None'? setSortFilter(false):setSortFilter(true)

    if(priceValues[0] == 56 && priceValues[1] ==674){ 
      setPriceFilter(false)
    }
    else{setPriceFilter(true);

   } 
    
    //declare a array to store filterd products' ID
    let filteredID =[]
    //filter products 

    //filter by brand
    let pArr =[]
    for(let i of shopData){
      if(i.brand ==brandRef.current.value){
        pArr.push(i)
      }
    }
    if(brandRef.current.value == "All Brands"){
      pArr =shopData
    }

    //filter by price range
    let NpArr =[]

    NpArr=pArr.filter((item)=>{return (item.price>priceValues[0]&&item.price<priceValues[1])})

    //sort
    //stor the id of sorted name array
    let NSNpArr =[]
    //sort by name and pricesection
    let NSPpArr =[]

    if(sortRef.current.value =='None'){
      
      NpArr.forEach ((p)=>{
        filteredID.push(p.id)
      })
    }
    else{
      //sort the array by name section
      let filteredName =[]

      NpArr.forEach((i)=>{
        filteredName.push(i.name)
      })

      filteredName.sort()

      //stor the id of sorted name array
      for(let i of filteredName){
        console.log("i",i)
        for(let j of NpArr){
          if(i == j.name){
            NSNpArr.push(j.id)
          }
        }
      }

      //sort by price section
      let filteredPrice =[]
  
      NpArr.forEach((i)=>{
        filteredPrice.push(i.price)
      })
      filteredPrice.sort()
      //stor the id of sorted price array
      for(let i of filteredPrice){
        for(let j of NpArr){
          if(i == j.price){
            NSPpArr.push(j.id)
          }
        }
      }
    }

    //check the value of the sortRef to get different data
    if(sortRef.current.value=='Name Descending Z-A'){
      filteredID = NSNpArr.reverse()
    }
    else if (sortRef.current.value=='Name Ascending A-Z'){
      filteredID = NSNpArr
    }
    else if(sortRef.current.value=='Price High-Low'){  
      filteredID = NSPpArr.reverse()
    }
    else if(sortRef.current.value=='Price Low-Ligh'){
      filteredID = NSPpArr
    }
    
    let datatrans =[]
    //get the filtered Data by getData method 
    
    filteredID.forEach((p) =>{
      // datatrans.push(getData(p))
      let i= shopData.filter(pro => pro.id == p)
      datatrans.push(i[0])
    })
    console.log('datatrans',datatrans)

    setFilteredData(datatrans)

    if(brandRef.current.value == 'All Brands' && sortRef.current.value == 'None' && priceValues[0] == 56 && priceValues[1] ==674){
      console.log('setting to false')
      setisApplied(false)
    }
    else{
      setisApplied(true)
    }
  }

  const applyFilterByButton =()=>{
    filterProducts()
    dispatch(setFilter())
  }

  useEffect (()=>{
    filterProducts()
    return ()=>{
    }
  },[priceFilter,shopData])
  console.log('filterstate',filterState[0])
  return(
    <div className="shopPage">
       <div className={!showingMore && !isApplied? "lessProducts":'dis-none' }>
        <div className='shopUI '>
          <div className="ShopContainer">
          {shopData.map((product)=>{
              if(product.id <13){
                return (
                  <div className={ product.added==true? 'addedProduct ShopcontentWrapper':'ShopcontentWrapper'} key={product.id}>
                    <Link to ={`/product/${product.parameter}`} className='productWrapper' >
                      <div className="imgWrapper">
                        <img src={product.img}></img>
                      </div>
                      <div className="textWrapper">
                        <div className="title">{product.name}</div>
                        <div className="subTitle">{product.brand}</div>
                        <div className="price">${product.price}</div>
                      </div>
                    </Link>
                    <button onClick={()=>{return handleAdding(product)}} >{product.added==true? 'Remove From Basket':'Add To Basket'}</button>
                  </div>)
              }
          })}
          </div>
          <button onClick={handleShowing}>Show More Items</button>
        </div>
        <Footer></Footer>
      </div>

      <div className={showingMore && !isApplied? "moreProducts":'dis-none' }>

          <div className='ShopContainer'>
            {shopData.map((product)=>{
              return (
              <div className={ product.added==true? 'addedProduct ShopcontentWrapper':'ShopcontentWrapper'} key={product.id}>
                <Link to ={`/product/${product.parameter}`} className='productWrapper' >
                  <div className="imgWrapper">
                    <img src={product.img}></img>
                  </div>
                  <div className="textWrapper">
                    <div className="title">{product.name}</div>
                    <div className="subTitle">{product.brand}</div>
                    <div className="price">${product.price}</div>
                  </div>
                </Link>
                <button onClick={()=>{return handleAdding(product)}} >{product.added==true? 'Remove From Basket':'Add To Basket'}</button>
              </div>)
            })}
            
          </div>
          <Footer></Footer>
      </div>

      {/* filtered products page */}
      <div className={isApplied? "filteredProductsPage" :'dis-none'}>
        <div className="toptext">Found {filteredData.length} products</div>
        <div className="filters">
          {brandFilter &&
           <div className="filterWrapper">
              <div className="text">Brand</div>
              <div className="pill">{brandRef.current.value}<CloseIcon onClick={resetBrandValue}/></div>
              
           </div>}
          {sortFilter &&
           <div className="filterWrapper">
              <div className="text">Sort By</div>
              <div className="pill">{sortRef.current.value}<CloseIcon onClick={resetSortValue} /></div>
              
           </div>}
          {priceFilter &&
           <div className="filterWrapper">
              <div className="text">Price Range</div>
              <div className="pill">${priceValues[0]}-${priceValues[1]}<CloseIcon onClick={resetPriceRange} /></div>
              
           </div>}
        </div>

        <div className='shopUI'>
          <div className="ShopContainer">
          {filteredData.map((product)=>{
                console.log('productAdded',product.added)
                return (
                  <div className={ product.added==true? 'addedProduct ShopcontentWrapper':'ShopcontentWrapper'} key={product.id}>
                    <Link to ={`/product/${product.parameter}`} className='productWrapper' >
                      <div className="imgWrapper">
                        <img src={product.img}></img>
                      </div>
                      <div className="textWrapper">
                        <div className="title">{product.name}</div>
                        <div className="subTitle">{product.brand}</div>
                        <div className="price">${product.price}</div>
                      </div>
                    </Link>
                    <button onClick={()=>{return handleAdding(product)}} >{product.added==true? 'Remove From Basket':'Add To Basket'}</button>
                  </div>)
              
          })}
          </div>
        </div>
        <Footer></Footer>

      </div>

      {/* {filterState[0] &&  */}
       <div className={filterState[0]? 'filterUI':"filterUI dis-none"}>
          <div ref={emptyRef} className="emptyRef" onClick={handleOutsideClick}></div>
          <div className='filterForm' ref={filterRef}>

              <div className="selectors">
                <div className="brand left">
                    <div className="text">Brand</div>
                    <select ref={brandRef} name="brand" id="">
                      <option value="All Brands" disabled selected>All Brands</option>
                      <option value="Salt Maalat" >Salt Maalat</option>
                      <option value="Betsin Maalat">Betsin Maalat</option>
                      <option value="Black Kibal">Black Kibal</option>
                      <option value="Sexbomb">Sexbomb</option>
                  </select>
                  <KeyboardArrowDownOutlinedIcon/>

                </div>
                <div className="SortBy">
                    <div className="text">Sort By</div>
                    <select ref={sortRef} name="brand" id="">
                      <option value="None" disabled selected>None</option>
                      <option value="Name Ascending A-Z" >Name Ascending A-Z</option>
                      <option value="Name Descending Z-A">Name Descending Z-A</option>
                      <option value="Price High-Low">Price High-Low</option>
                      <option value="Price Low-Ligh">Price Low-Ligh</option>
                  </select>
                  <KeyboardArrowDownOutlinedIcon/>
                </div>
                


              </div>
                <div className="priceRange">
                  <div className="text">Price Range</div>
                  <div className="priceValues">
                    <div className="value1">{priceValues[0]}</div>
                    <div className="horiLine">-</div>
                    <div className="value2">{priceValues[1]}</div>
                  </div>
                  <RangeSlider rangeValues ={getRangeValues} />
              </div>
              <div className="filterButtons">
                  <div className="apply button" onClick={applyFilterByButton}>Apply filters</div>
                  <div className="reset button" onClick={resetAll}>Reset filters</div>
              </div>
          </div>


      </div>
    </div>
  )

  
  if(!showingMore && !isApplied){
    return (
      <div className="lessProducts">
        <div className='shopUI dis-none'>
          <div className="ShopContainer">
          {shopData.map((product)=>{
              if(product.id <13){
                return (
                  <div className={ product.added==true? 'addedProduct ShopcontentWrapper':'ShopcontentWrapper'} key={product.id}>
                    <Link to ={`/product/${product.parameter}`} className='productWrapper' >
                      <div className="imgWrapper">
                        <img src={product.img}></img>
                      </div>
                      <div className="textWrapper">
                        <div className="title">{product.name}</div>
                        <div className="subTitle">{product.brand}</div>
                        <div className="price">${product.price}</div>
                      </div>
                    </Link>
                    <button onClick={()=>{return handleAdding(product)}} >{product.added==true? 'Remove From Basket':'Add To Basket'}</button>
                  </div>)
              }
          })}
          </div>
          <button onClick={handleShowing}>Show More Items</button>
        </div>
        <Footer></Footer>

        {filterState[0] && 
        <div className="filterUI">
          <div className='filterForm' ref={filterRef}>

              <div className="selectors">
                <div className="brand left">
                    <div className="text">Brand</div>
                    <select ref={brandRef} name="brand" id="">
                      <option value="All Brands" disabled >All Brands</option>
                      <option value="Salt Maalat" selected>Salt Maalat</option>
                      <option value="Betsin Maalat">Betsin Maalat</option>
                      <option value="Black Kibal">Black Kibal</option>
                      <option value="Sexbomb">Sexbomb</option>
                  </select>
                  <KeyboardArrowDownOutlinedIcon/>

                </div>
                <div className="SortBy">
                    <div className="text">Sort By</div>
                    <select ref={sortRef} name="brand" id="">
                      <option value="All Brands" disabled >none</option>
                      <option value="Name Ascending A-Z" selected>Name Ascending A-Z</option>
                      <option value="Name Descending Z-A">Name Descending Z-A</option>
                      <option value="Price High-Low">Price High-Low</option>
                      <option value="Price Low-Ligh">Price Low-Ligh</option>
                  </select>
                  <KeyboardArrowDownOutlinedIcon/>
                </div>
                


              </div>
                <div className="priceRange">
                  <div className="text">Price Range</div>
                  <div className="priceValues">
                    <div className="value1">{priceValues[0]}</div>
                    <div className="horiLine">-</div>
                    <div className="value2">{priceValues[1]}</div>
                  </div>
                  <RangeSlider rangeValues ={getRangeValues} />
              </div>
              <div className="filterButtons">
                  <div className="apply button" onClick={applyFilterByButton}>Apply filters</div>
                  <div className="reset button" onClick={resetAll}>Reset filters</div>
              </div>
          </div>


        </div>}
      </div>
    )
  }

  else if (showingMore && !isApplied){
    return(
      <div className="moreProducts">

          <div className='ShopContainer'>
            {shopData.map((product)=>{
              return (
              <div className={ product.added==true? 'addedProduct ShopcontentWrapper':'ShopcontentWrapper'} key={product.id}>
                <Link to ={`/product/${product.parameter}`} className='productWrapper' >
                  <div className="imgWrapper">
                    <img src={product.img}></img>
                  </div>
                  <div className="textWrapper">
                    <div className="title">{product.name}</div>
                    <div className="subTitle">{product.brand}</div>
                    <div className="price">${product.price}</div>
                  </div>
                </Link>
                <button onClick={()=>{return handleAdding(product)}} >{product.added==true? 'Remove From Basket':'Add To Basket'}</button>
              </div>)
            })}
            
          </div>
          <Footer></Footer>
      </div>
    )
  }
  else if (isApplied){
    return(
      <div className="filteredProductsPage">
      <div className="toptext">Found {filteredData.length} products</div>
      <div className="filters">
        {brandFilter &&
         <div className="filterWrapper">
            <div className="text">Brand</div>
            <div className="filter">{brandRef.current.value}</div>
            <CloseIcon onClick={resetBrandValue}/>
         </div>}
        {sortFilter &&
         <div className="filterWrapper">
            <div className="text">Sort By</div>
            {/* <div className="filter">{sortRef.current.value}</div> */}
            <CloseIcon onClick={resetSortValue} />
         </div>}
        {priceFilter &&
         <div className="filterWrapper">
            <div className="text">Price Range</div>
            <div className="filter">${priceValues[0]}-${priceValues[1]}</div>
            <CloseIcon onClick={resetPriceRange} />
         </div>}
      </div>

      <div className='shopUI'>
        <div className="ShopContainer">
        {filteredData.map((product)=>{
            
              return (
                <div className={ product.added==true? 'addedProduct ShopcontentWrapper':'ShopcontentWrapper'} key={product.id}>
                  <Link to ={`/product/${product.parameter}`} className='productWrapper' >
                    <div className="imgWrapper">
                      <img src={product.img}></img>
                    </div>
                    <div className="textWrapper">
                      <div className="title">{product.name}</div>
                      <div className="subTitle">{product.brand}</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </Link>
                  <button onClick={()=>{return handleAdding(product)}} >{product.added==true? 'Remove From Basket':'Add To Basket'}</button>
                </div>)
            
        })}
        </div>
        <button onClick={handleShowing}>Show More Items</button>
      </div>
      <Footer></Footer>

    </div>
    )
  }
}
