import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FormControl, Form } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";
import { productURL } from "../config/url";

const Product = () => {
  let [infom, setinfom] = useState([]);
  let [search, setsearch] = useState("");
  let [sizefilter, setsizefilter] = useState("All");
  let [currentpage, setcurrentpage] = useState(1);
  let ippage = 8;

  useEffect(() => {
    axios
      .get(productURL)
      .then((response) => {
        setinfom(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let searchproduct = () => {
    let filteredcloths = infom.filter((cloth) => {
      let ctype = cloth.type.toLowerCase().includes(search.toLowerCase());
      let stype = sizefilter === "All" || cloth.size === sizefilter;
      return ctype && stype;
    });
    return filteredcloths;
  };

  let lastitem = currentpage * ippage;
  let firstitem = lastitem - ippage;
  let currentitem = searchproduct().slice(firstitem, lastitem);

  let paginate = (pno) => setcurrentpage(pno);
  
  let pnumb = [];
  for (let i = 1; i <= Math.ceil(searchproduct().length / ippage); i++) {
    pnumb.push(i);
  }

  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row">
          <div className="d-flex justify-content-end py-3 headingsearch">
            <h4 className="text-white me-auto">
            {/* Showing {firstitem + 1} to {Math.min(lastitem, filtercloths.length)} of {filtercloths.length} results for "Cloth" */}
            Showing the Cloth
            </h4>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <Form.Select
                className="me-3 ms-2"
                value={sizefilter}
                onChange={(e) => setsizefilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </Form.Select>
              <Button variant="success" onClick={() => setcurrentpage(1)}>
                Search
              </Button>
            </Form>
          </div>
        </div>
        <div className="row">
          {currentitem.map((cloth) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={cloth.id}>
              <Link to={`/ProductDetail/${cloth.id}`} style={{ textDecoration: "none" }}>
                <Card style={{ border: "none" }} className="mb-4">
                  <Card.Img variant="top" src={cloth.image} style={{ height: "400px" }} />
                  <Card.Body>
                    <Card.Title>
                      <h2>{cloth.type}</h2>
                    </Card.Title>
                    <Card.Text>
                      <p>Brand : {cloth.brand}</p>
                      <p>Color : {cloth.color}</p>
                      <p>Size : {cloth.size}</p>
                      <p style={{ fontWeight: "bold" }}>Price : ₹ {cloth.price}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        <Pagination className="d-flex justify-content-end pb-4">
          {pnumb.map((number) => (
            <Pagination.Item key={number} active={number === currentpage} onClick={() => paginate(number)}>
              {number}  
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  );
};  

export default Product;