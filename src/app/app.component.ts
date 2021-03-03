import { Component } from '@angular/core';
import { Kushki } from '@kushki/js';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupName } from '@angular/forms';



const kushki = new Kushki({
  merchantId: '5af5a6d95c6e489391642ec78d1ed00e', // Your public merchant id 
  inTestEnvironment: true,
});





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'KushkiTraining';
  cardForm: FormGroup


  constructor(    private _builder: FormBuilder  ){
    this.cardForm = this._builder.group({
      name:['', Validators.required],
      cardNumber:['', Validators.required],
      expiryMonth:['', Validators.required],
      expiryYear:['', Validators.required],
      ccv:['',Validators.required]

    })
  }

  send(values){
    console.log(values)
    kushki.requestToken({
      amount: '49.99',
      currency: "USD",
      card: {
        name: this.cardForm.get("name").value,
        number: this.cardForm.get("cardNumber").value,
        cvc: this.cardForm.get("ccv").value,
        expiryMonth: this.cardForm.get("expiryMonth").value,
        expiryYear: this.cardForm.get("expiryYear").value,
      },
    }, (response) => {
      if(response){
        console.log(response);
        var myToken = response["token"];
        console.log(response["token"]);
        console.log("Boolean is true");
        // Submit your code to your back-end
        makePayment(myToken);
      } else {
        console.log('Error: ',response);
      }
    });
  }
}
declare var require: any;
function makePayment(myToken){
  var request = require("request");
  var options = {
    method: 'POST',
    headers: [
      {'Private-Merchant-Id': '98287fccd4274ab4927dabc75c9743d2','content-type':'application/json'} // Replace with your Private merchant id
    ],
    url: 'https://api-uat.kushkipagos.com/card/v1/charges', // Test environment
    body: {
    token: myToken, // Replace with the token you recieved
    amount: {
      subtotalIva: 0,
      subtotalIva0: 49.99,
      ice: 0,
      iva: 0,
      currency: "USD"
    },
    metadata: {
      contractID: "157AB"
    },
    contactDetails: {
      documentType: "CC",
      documentNumber: "1009283738",
      email: "test@test.com",
      firstName: "Diego",
      lastName: "Cadena",
      phoneNumber: "+593988734644"
    },
    orderDetails: {
      siteDomain: "tuebook.com",
      shippingDetails: {
        name: "Diego Cadena",
        phone: "+593988734644",
        address: "Eloy Alfaro 139 y Catalina Aldaz",
        city: "Quito",
        region: "Pichincha",
        country: "Ecuador",
        zipCode: "170402"
      },
      billingDetails: {
        name: "Diego Cadena",
        phone: "+593988734644",
        address: "Eloy Alfaro 139 y Catalina Aldaz",
        city: "Quito",
        region: "Pichincha",
        country: "Ecuador",
        zipCode: "170402"
      }
    },
    productDetails: {
      product: [
        {
          id: "198952AB",
          title: "eBook Digital Services",
          price: 6990000,
          sku: "10101042",
          quantity: 1
        },
        {
          id: "198953AB",
          title: "eBook Virtual Selling",
          price: 9990000,
          sku: "004834GQ",
          quantity: 1
        }
      ]
    },
    fullResponse: true
  },
    json: true
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
}