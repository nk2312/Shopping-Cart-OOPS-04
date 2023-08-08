
class Element{
  constructor(attName,attValue){
    this.attName=attName;
    this.attValue=attValue;
  }
}

class Component{
  constructor(renderHook){
    this.hookId=renderHook;
  }
  createElement(tag,classN,attr){
    const newElement=document.createElement(tag);
    if(classN){
      newElement.className=classN;
    }
    if(attr && attr.length>0){
      for(const attribute in attr){
      newElement.setAttribute(attribute.attName,attribute.attValue)
      }
    }
    document.getElementById(hookId).append(newElement);
    return newElement;
  }
}


//A Products class containing the structure of the object
class Products {
  constructor(title, imageUrl, price, desc) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.desc = desc;
  }
}

//A productItem class containing the display logic of every Item

class productItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log(this, this.product);
    App.addToCartProduct(this.product);
  }

  render() {
    const li = document.createElement("li");
    li.className = "product-item";
    li.innerHTML = `
          <div>
              <img src="${this.product.imageUrl}" />
              <div class="product-item__content">
                  <h2>${this.product.title}</h2>
                  <h3>\$${this.product.price}</h3>
                  <p>${this.product.desc}</p>
                  <button>Add to Cart</button>
              </div>
          </div>
          `;
    const btn = li.querySelector("button");
    //   btn.addEventListener('click',this.addToCart) // Here this refers to btn which refers to out button element add to cart
    btn.addEventListener("click", this.addToCart.bind(this)); // now this refers to Products class
    return li;
  }
}

//A Shopping class

class Shopping extends Component{
//   constructor(items) {
//     this.items = items;
//   }

constructor(renderId){
  super(renderId);
}

items=[];

get getTotalAmount(){
 const sum=this.items.reduce((prevValue,currValue)=>{ return prevValue+currValue.price },0)
    return sum;
}

set setCartValue(value){
    this.items=value;
    this.outputTotal.innerHTML=`<h2>Total is : \$${this.getTotalAmount}</h2>`

}

 addToShoppingCart(product){
    
    const updatedItems=[...this.items];
    this.setCartValue=updatedItems.push(product);
    
 }
  render() {
    const section = this.createElement('section','cart') //inheritance
    section.innerHTML = `
            <h2>Total is : \$${0}</h2>
            <button>Order Now!</button>
        
        `;
        this.outputTotal=section.querySelector('h2'); //declaring a property of class inside a function
        return section;
  }
}

// A Class Product List which contain the list of product

class productList {
  productList = [
    new Products(
      "Pillow",
      "https://media.istockphoto.com/id/182213327/photo/red-pillow.jpg?s=1024x1024&w=is&k=20&c=X73pasD3JkEEVNZCANe8bzHDlq_q72S9_XrU5o8Xz98=",
      15,
      "A soft pillow"
    ),
    new Products(
      "Carpet",
      "https://assets.architecturaldigest.in/photos/61e179da474321a0795b0147/16:9/w_1600,c_limit/Bengaluru%20carpets-1.jpg",
      55,
      "A carpet used in your hall"
    ),
  ];
  //render is a property of object products
  render() {
    const ul = document.createElement("ul");
    ul.className = "product-list";
    //accessing productList as it is a property of class Product list
    for (const p of this.productList) {
      const pItem = new productItem(p);
      const li = pItem.render();
      ul.appendChild(li);
    }
    return ul;
  }
}

class Shop {
  render() {
    const app = document.getElementById("app");
    this.cart = new Shopping();
    const shopElement=this.cart.render()
    const p = new productList();
    const ulElement = p.render();
    app.appendChild(shopElement);
    app.appendChild(ulElement);
  }
}


class App{

    static cart;
    static init(){
        const s= new Shop();
        s.render();
        this.cart=s.cart;
    }
    static addToCartProduct(product){
        this.cart.addToShoppingCart(product)
    }
}
App.init();
