import {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateProducts = () => {
  const [values, setValues] = useState({
    ProductName: "",
    ProductDescription: "",
    ProductPrice: "",
    Product_Category_Id: "",
    Product_Type_Id: "",
    Product_Weight_Id: "",
    Color_Id: "",
    Image: "",
  })

  const [data, setData] = useState({
    productCategory: [],
    productType: [],
    productWeight: [],
    color: [],
  })

  const navigate = useNavigate()

  
  useEffect( ()=> {
    async function getAllData() { 
      try {
        const productCategoryResponse = await axios.get("http://localhost:3030/getAllProductCategory");
        const productTypeResponse = await axios.get("http://localhost:3030/getAllProductType");
        const productWeightResponse = await axios.get("http://localhost:3030/getAllProductWeight");
        const colorResponse = await axios.get("http://localhost:3030/getAllColors");
    
        setData({
          productCategory: productCategoryResponse.data,
          productType: productTypeResponse.data,
          productWeight: productWeightResponse.data,
          color: colorResponse.data,
        });
      } catch (error) {
        console.log(error);
      }
    }

    getAllData();
  }, [])

  useEffect(() => {
    console.log(data);
  }, [data]);

  function handleChange(event) {
    if (event.target.type === 'file') {
      setValues(prevValue => ({
        ...prevValue,
        [event.target.name]: event.target.files[0]
      }));
    } else {
      setValues(prevValue => ({
        ...prevValue,
        [event.target.name]: event.target.value
      }));
    }
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('ProductName', values.ProductName)
    formData.append('ProductDescription', values.ProductDescription)
    formData.append('ProductPrice', values.ProductPrice)
    formData.append('Product_Category_Id', values.Product_Category_Id)
    formData.append('Product_Type_Id', values.Product_Type_Id)
    formData.append('Product_Weight_Id', values.Product_Weight_Id)
    formData.append('Color_Id', values.Color_Id)
    formData.append('Image', values.Image)
    axios.post('http://localhost:3030/createProduct', formData)
    .then(res => navigate('/dashboard/Products'))
    .catch(err => console.log(err))
  }

  return (
    <div className="form-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ProductName">Product Name</label>
        <input 
          type="text"
          id="ProductName"
          onChange={handleChange} 
          name="ProductName"
          required
        />
        <label htmlFor="ProductDescription">Product Description</label>
        <input
          type="text" 
          id="ProductDescription"
          onChange={handleChange}
          name="ProductDescription"
          required
        />
        <label htmlFor="ProductPrice">Product Price</label>
        <input
          type="number" 
          id="ProductPrice"
          onChange={handleChange}
          name="ProductPrice"
          required
        />
        <label htmlFor="Product_Category_Id">Product Category</label>
        <select name="Product_Category_Id" id="Product_Category_Id" onChange={handleChange}>
          <option value="select">select</option>
          {data.productCategory.map((item, index) => (
            <option key={index} value={item.Product_Category_Id}>{item.Product_Category_Name}</option>
          ))}
        </select>
        <label htmlFor="Product_Type_Id">Product Type</label>
        <select name="Product_Type_Id" value={values.Product_Type_Id} id="Product_Type_Id" onChange={handleChange}>
          <option value="select">select</option>
          {data.productType.map((item, index) => (
            <option key={index} value={item.Product_Type_Id}>{item.Product_Type_Name}</option>
          ))}
        </select>
        <label htmlFor="Product_Weight_Id">Product Weight</label>
        <select name="Product_Weight_Id" id="Product_Weight_Id" onChange={handleChange}>
          <option value="select">select</option>
          {data.productWeight.map((item, index) => (
            <option key={index} value={item.Product_Weight_Id}>{item.Product_Weight}</option>
          ))}
        </select>
        <label htmlFor="Color_Id">Color</label>
        <select name="Color_Id" value={values.Color_Id} id="Color_Id" onChange={handleChange}>
          <option value="select">select</option>
          {data.color.map((item, index) => (
            <option key={index} value={item.Color_Id}>{item.Color_Name}</option>
          ))}
        </select>
        <label htmlFor="Image">Image</label>
        <input
          type="file" 
          id="Image"
          onChange={handleChange}
          name="Image"
          required
        />
        <button className="submit-btn">submit</button>
      </form>
    </div>
  )
}
