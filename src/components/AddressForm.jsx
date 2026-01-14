import React from "react";
import api from "../utils/api";
// import toast from "react-hot-toast";
import toast, { Toaster, } from 'react-hot-toast';

const handleGetLocation = () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const res = await api.post("/save-geo", {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        const { address, shippingCharge } = res.data;

        setAddress((prev) => ({
          ...prev,
          house: address.fullAddress,
          city: address.city,
          state: address.state,
          pincode: address.zipCode,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          shippingCharge,
        }));

        toast.success(`Shipping charge: ₹${shippingCharge}`);
      } catch (err) {
        toast.error("Failed to fetch location");
      }
    },
    () => toast.error("Location permission denied")
  );
};


const AddressForm = ({ address, setAddress }) => {
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          className="input"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          className="input"
        />

        <input
          name="house"
          placeholder="House / Flat"
          value={address.house}
          onChange={handleChange}
          className="input"
        />

        <input
          name="street"
          placeholder="Street / Area"
          value={address.street}
          onChange={handleChange}
          className="input"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="input"
          />

          <input
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="input"
          />
        </div>

        <input
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          className="input"
        />
      </div>

      <button
  type="button"
  onClick={handleGetLocation}
  className="w-full border rounded-md py-2 text-sm hover:bg-gray-50"
>
  📍 Use Current Location
</button>

    </div>
  );
};

export default AddressForm;
