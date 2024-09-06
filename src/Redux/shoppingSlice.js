import{createSlice} from '@reduxjs/toolkit'
import allDatas from '../data/data_origin'
let allData = allDatas()
 
const shoppingSlice = createSlice({
    name:'shoppingSlice',
    // initialState:[],
    initialState:{cart:[],data:allData},
    reducers:{
        addToBasket:(state,action) =>{
            //add to basket
            state.cart.push(action.payload)
            console.log('action.payload.added',action.payload.added)
            // action.payload.added=true

            //change added products'added property to true
            for(let pro of state.data)
                {
                if(action.payload.name ==pro.name){
                    pro.added=true
                }
            }
        },
        removeFromBasket:(state,action) =>{
            // ！！！ state= [...action.payload] 这样不行？为什么
            // console.log('actionPayload',action.payload)
            // state= [action.payload] 
            
            //change added products'added property to false
            for(let pro of state.data)
                {
                if(state.cart[action.payload].name ==pro.name){
                    pro.added=false
                }
            }

            //remove the item 
            for(let index in state.cart){
                if(index == state.cart.length -1 ){
                    break
                }
                if(index == action.payload || index>action.payload){
                    state.cart[index]=state.cart[Number(index)+1]
                }
            }
            state.cart.pop()
            
           //！！！  setTimeOut 也报错了

        },
        increment:(state,action)=>{
             //Plus 1 to products'quantity
             for(let pro of state.data)
                 {
                 if(action.payload.name ==pro.name){
                     pro.quantity=pro.quantity+1
                 }
             }          
        },
        decrement:(state,action)=>{
             //Minus 1 for products'quantity
             for(let pro of state.data)
                {
                if(action.payload.name ==pro.name){
                    pro.quantity=pro.quantity-1
                }
            }       
        },
        removeAll:(state)=>{
            for(let pro of state.data){
                console.log('pro',pro)
                pro.added =false
            }
            while(state.cart.length>0){
                state.cart.pop()
            }
        },
        setSize:(state,action)=>{
            for(let product of state.data)
                {
                if(action.payload.pro.name ==product.name){
                    product.selectSize = action.payload.size
                }
            }   
        },
        setColor:(state,action)=>{
            for(let product of state.data)
                {
                if(action.payload.pro.name ==product.name){
                    product.selectColor = action.payload.color
                    // console.log('product.selectSize',product.selectSize)
                }
            }  
        }
        
    }
})

export const {addToBasket,removeFromBasket,decrement,increment,removeAll,setSize,setColor} = shoppingSlice.actions
export default shoppingSlice.reducer