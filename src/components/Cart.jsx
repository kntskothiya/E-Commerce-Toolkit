import React, { useEffect } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { fetchClothData, updateQuantity, removeFromCart } from "../toolkit/slice";
import axios from '../utils/axios';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";
import { useDispatch, useSelector } from "react-redux";
import { cartURL } from "../config/url";

const Cart = () => {
    let clothdata = useSelector((state) => state.info.product);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClothData());
    }, [dispatch]);

    const changequantity = async (itemId, newQuantity) => {
        try {
            if (newQuantity > 0) {
                await dispatch(updateQuantity({ itemId, quantity: newQuantity }));
            }
        } catch (error) {
            console.error("Error updating quantity:", error.message);
        }
    };

    const deleteproduct = (itemId) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${cartURL}/${itemId}`)
                    .then(response => {
                        dispatch(removeFromCart(itemId));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your product has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        });
    };

    const total = () => {
        return clothdata.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <>
            <div>
                {clothdata?.map((item) => (
                    <div className="d-flex justify-content-evenly" key={item.id}>
                        <div className="mt-5 mb-5">
                            <img src={item.image} alt="Not Found" height={"200px"} />
                        </div>
                        <div style={{ marginTop: "80px" }}>
                            <h5>Type : {item.type}</h5>
                            <h5>Price : ₹ {item.price}</h5>
                            <h5 className="d-flex align-items-center">
                                Quantity :{' '}
                                <FaMinusCircle
                                    className="me-2 ms-1"
                                    onClick={() => changequantity(item.id, item.quantity - 1)}
                                />
                                <span>{item.quantity}</span>
                                <FaPlusCircle
                                    className="ms-2"
                                    onClick={() => changequantity(item.id, item.quantity + 1)}
                                />
                            </h5>
                            <h5> Amount : ₹ {item.price * item.quantity}</h5>
                            <button className="btn btn-danger" onClick={() => deleteproduct(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3">
                <h3 className="d-flex justify-content-center">Total : ₹ {total}</h3>
            </div>
        </>
    );
};

export default Cart;