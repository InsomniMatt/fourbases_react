import "./FormButton.css";
import React, {useState} from "react";

const FormButton = () => {
  let [formOpen, setFormOpen] = useState(false);

  const updateFormModel = (event) => {

  }

  const openForm = () => {
    console.log('what');
    setFormOpen(true);
  }

  const cancel = () => {
    setFormOpen(false);
  }

  const formClass = () => {
    if (formOpen) {
      return "open-form open";
    } else {
      return "open-form";
    }
  }

  return (
      <div class="form-button-container">
        <div class={formClass()} onClick={openForm}>
          <button class="button-copy" onClick={openForm}>Add Product</button>
          <form class="form-button-form" onSubmit={cancel}>
            <div class="form-field">
              <label>Product Title *</label>
              <input type="text" class="form-element" name="title" onChange={updateFormModel} placeholder="Title"></input>
            </div>
            {/*<div class="form-container">*/}
            {/*  <div class="form--field -short">*/}
            {/*    <label>Product Rating *</label>*/}
            {/*    <input type="number" class="form--element" name="rating" v-model="productData.rating" placeholder="Rating" required="" min="0" max="5" step="0.5">*/}
            {/*  </div>*/}
            {/*  <div class="form--field -short">*/}
            {/*    <label>Product Price *</label>*/}
            {/*    <span class="form--price">$</span>*/}
            {/*    <input type="text" class="form--element" name="price" v-model="productData.price" placeholder="Price" required="" min="0" max="500" pattern="\d+(\.\d{2})?">*/}
            {/*  </div>*/}
            {/*  <div class="form--field -short">*/}
            {/*    <label>List Price *</label>*/}
            {/*    <span class="form--price">$</span>*/}
            {/*    <input type="text" class="form--element" name="list_price" v-model="productData.list_price" placeholder="List Price" required="" min="0" max="500" pattern="\d+(\.\d{2})?">*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div class="form-field">
              <label>Product Description</label>
              <textarea class="form--element textarea" placeholder="Description">
              </textarea>
            </div>

            <button type="submit" class="submit-button">Add Product</button>
            <div class="cancel"><button onClick={cancel}>Cancel</button></div>
          </form>
        </div>
      </div>
  )
}

export default FormButton;