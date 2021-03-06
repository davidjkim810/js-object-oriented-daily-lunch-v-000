// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals(){

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }

    return this.deliveries().map(delivery => delivery.meal()).filter( onlyUnique)
  }
}

let customerId = 0;

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent(){
    let spent = 0;
    this.meals().map(meal => spent = spent + meal.price)
    return spent;
  }

}

let mealId = 0;

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice(){
    return store.meals.sort(function(a,b){return b.price-a.price});
  }

}

let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}
